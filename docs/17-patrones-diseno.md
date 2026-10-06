[⬅ Volver al README principal](../README.md)

# 17. Patrones de Diseño para Backend

*Para cada patrón: qué problema resuelve, cuándo usarlo, cuándo evitarlo, y un ejemplo mínimo en Node.js.*

## Repository Pattern

**Resuelve:** desacopla la lógica de negocio del mecanismo de acceso a datos (SQL, ORM, API externa).
**Usar cuando:** quieres poder testear la lógica de negocio sin una base de datos real, o cambiar de motor de persistencia sin tocar los services.
**Evitar cuando:** el proyecto es muy pequeño y la capa extra solo agrega indirección sin beneficio real.

```javascript
class UserRepository {
  async findById(id) { return db.query('SELECT * FROM users WHERE id = $1', [id]); }
}
class UserService {
  constructor(repository) { this.repository = repository; } // inyectado, no instanciado aquí
  async getUser(id) { return this.repository.findById(id); }
}
```

## Service Layer

**Resuelve:** centraliza la lógica de negocio, separada de la capa HTTP (Controller) y de la capa de datos (Repository).
**Usar cuando:** la lógica de negocio tiene reglas propias más allá de un simple CRUD.
**Evitar cuando:** el endpoint es un passthrough trivial sin ninguna regla de negocio.

```javascript
class OrderService {
  constructor(orderRepository, inventoryService) {
    this.orderRepository = orderRepository;
    this.inventoryService = inventoryService;
  }
  async placeOrder(userId, items) {
    await this.inventoryService.reserve(items);          // regla de negocio: reservar stock
    if (items.length === 0) throw new Error('Orden vacía'); // regla de negocio: validación
    return this.orderRepository.create({ userId, items });
  }
}
// el Controller solo llama a orderService.placeOrder(...) — no conoce estas reglas
```

## Factory Pattern

**Resuelve:** centraliza la lógica de creación de objetos cuando esta es compleja o depende de condiciones.
**Usar cuando:** la creación de un objeto varía según tipo/configuración (ej. distintos proveedores de pago).
**Evitar cuando:** un constructor simple ya es suficiente.

```javascript
function createPaymentProvider(type) {
  if (type === 'stripe') return new StripeProvider();
  if (type === 'paypal') return new PaypalProvider();
  throw new Error('Proveedor no soportado');
}
```

## Adapter Pattern

**Resuelve:** traduce la interfaz de una dependencia externa a la interfaz que tu aplicación espera.
**Usar cuando:** integras una librería/API de terceros y no quieres que su forma particular se filtre por todo tu código.
**Evitar cuando:** la interfaz externa ya es estable y coincide con lo que necesitas.

```javascript
// Interfaz propia, consistente, que el resto de la app usa
class PaymentGateway { async charge(amountCents) { throw new Error('no implementado'); } }

// Adapter: traduce la API particular de Stripe a nuestra interfaz propia
class StripeAdapter extends PaymentGateway {
  async charge(amountCents) {
    return stripe.paymentIntents.create({ amount: amountCents, currency: 'usd' }); // forma propia de Stripe
  }
}
// Si mañana cambias a PayPal, solo escribes un PaypalAdapter — el resto de la app no cambia
```

## Strategy Pattern

**Resuelve:** permite intercambiar un algoritmo/comportamiento en tiempo de ejecución sin condicionales gigantes.
**Usar cuando:** tienes varias formas de hacer lo mismo (ej. distintos cálculos de envío según región).
**Evitar cuando:** solo hay una forma de hacer la operación, ahora y en el futuro previsible.

```javascript
const strategies = {
  standard: (total) => total,
  express: (total) => total + 15,
};
function calculateShipping(type, total) { return strategies[type](total); }
```

## Observer Pattern

**Resuelve:** permite que varios "suscriptores" reaccionen a un evento sin que el emisor los conozca directamente.
**Usar cuando:** una acción debe disparar efectos secundarios desacoplados (ej. `EventEmitter`, eventos de dominio).
**Evitar cuando:** el flujo de ejecución necesita ser explícito y fácil de seguir línea por línea (el desacople dificulta el rastreo).

```javascript
emitter.on('order:created', sendConfirmationEmail);
emitter.on('order:created', notifyWarehouse);
emitter.emit('order:created', order);
```

## Singleton Pattern

**Resuelve:** garantiza una única instancia compartida de un recurso (ej. una conexión a base de datos).
**Usar cuando:** el recurso es costoso de crear y debe compartirse globalmente (pool de conexiones, cliente de Redis).
**Evitar cuando:** introduce estado global oculto que dificulta el testing — preferir inyección de dependencias explícita.

```javascript
let instance = null;
class DbConnection {
  static getInstance() {
    if (!instance) instance = new DbConnection(); // se crea UNA sola vez, se reutiliza siempre
    return instance;
  }
}
const db1 = DbConnection.getInstance();
const db2 = DbConnection.getInstance();
console.log(db1 === db2); // true — misma instancia, mismo pool de conexiones
```

## Dependency Injection

**Resuelve:** las dependencias de una clase se reciben desde afuera (constructor) en vez de crearse internamente, facilitando testing y desacoplamiento.
**Usar cuando:** casi siempre en servicios backend con lógica no trivial.
**Evitar cuando:** nunca realmente — pero puede ser excesivo en scripts muy pequeños de un solo uso.

```javascript
// ❌ sin DI: OrderService crea su propia dependencia — imposible de testear sin una DB real
class OrderService { constructor() { this.db = new PostgresConnection(); } }

// ✅ con DI: la dependencia se recibe desde afuera — en tests, se inyecta un mock en su lugar
class OrderService { constructor(db) { this.db = db; } }
const service = new OrderService(fakeDbForTests);
```

## Facade Pattern

**Resuelve:** expone una interfaz simple sobre un subsistema complejo con muchas piezas internas.
**Usar cuando:** quieres ocultar la complejidad de orquestar varios servicios/módulos detrás de un único punto de entrada.
**Evitar cuando:** la simplificación oculta detalles que el caller realmente necesita controlar.

```javascript
// Facade: una sola llamada oculta la orquestación de 3 servicios internos
class CheckoutFacade {
  constructor(inventory, payments, shipping) { Object.assign(this, { inventory, payments, shipping }); }
  async checkout(cart) {
    await this.inventory.reserve(cart.items);
    await this.payments.charge(cart.total);
    await this.shipping.schedule(cart.items);
  }
}
// el caller solo ve: checkoutFacade.checkout(cart) — no necesita conocer los 3 servicios internos
```

## Decorator Pattern

**Resuelve:** agrega comportamiento a un objeto/función sin modificar su código original.
**Usar cuando:** necesitas envolver una función con logging, caching o retry sin tocar su lógica interna (muy común como middleware).
**Evitar cuando:** el encadenamiento de decoradores se vuelve tan profundo que es difícil razonar el comportamiento final.

```javascript
function withLogging(fn) {
  return async (...args) => { console.log('llamando', fn.name); return fn(...args); };
}
const loggedGetUser = withLogging(getUser);
```

## Circuit Breaker, Retry, Saga, CQRS

Ya cubiertos en detalle en [sección 10 — Microservicios](10-microservicios.md#10-microservicios).

**🔥🔥🔥🔥 (toda la sección 17)**

---

---

[⬅ Volver al README principal](../README.md)
