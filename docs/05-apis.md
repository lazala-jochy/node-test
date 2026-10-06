[⬅ Volver al README principal](../README.md)

# 5. APIs

*Cómo se diseña, estructura y documenta una API REST en una aplicación backend real.*

## 5.1 Diseño de API REST — Resource-Based URLs

```
✅ GET /users/42/orders       — recurso en plural, jerarquía clara
❌ GET /getUserOrders?id=42   — verbo en la URL, no sigue la convención REST
```

## 5.2 Controllers, Services, Repositories, DTOs

| Concepto | Qué hace | Express | NestJS |
|---|---|---|---|
| **Middleware** | Corre antes del handler final (auth, logging, parsing) | `app.use(fn)` | `implements NestMiddleware` |
| **Controller** | Recibe la request, delega a un service, retorna respuesta | Función de ruta | `@Controller()` + `@Get()`/`@Post()` |
| **Service** | Contiene la lógica de negocio | Clase/módulo plano | `@Injectable()` |
| **Repository** | Encapsula el acceso a datos | Clase plana / ORM | Provider inyectable |
| **Dependency Injection** | Las dependencias se inyectan, no se crean dentro de la clase | Manual | Nativo, vía constructor |
| **Guard** | Decide si una request puede proceder (auth/roles) | Middleware custom | `implements CanActivate` |
| **Interceptor** | Transforma request/response, logging, caching | Middleware custom | `implements NestInterceptor` |
| **DTO** | Define forma y validación de los datos de entrada/salida | Objeto + librería de validación | Clase con `class-validator` |

Separar la lógica de negocio en un Service en vez de escribirla en el Controller es una separación de responsabilidades: el Controller solo maneja la capa HTTP; el Service es más fácil de testear y reutilizar.

**🔥🔥🔥🔥**

## 5.3 Validación, Sanitización y Serialización

**Request validation:** siempre validar en el servidor, nunca confiar solo en el cliente. **Serialización:** convertir un objeto interno a JSON, ocultando campos sensibles (`passwordHash`). **Deserialización:** el proceso inverso al recibir un request.

## 5.4 API Contracts, OpenAPI/Swagger

**Definición:** OpenAPI (antes Swagger) describe formalmente una API — endpoints, parámetros, schemas de request/response — permitiendo generar documentación interactiva y clientes automáticamente. Un **API contract** formaliza lo que el consumidor puede esperar, independiente de la implementación interna.

## 5.5 Webhooks

**Definición:** en vez de que el cliente pregunte ("polling"), el servidor **notifica** proactivamente a una URL del cliente cuando ocurre un evento (ej. Stripe notificando un pago exitoso).

```javascript
app.post('/webhooks/stripe', verifySignature, async (req, res) => {
  const event = req.body;
  if (event.type === 'payment_intent.succeeded') await markOrderAsPaid(event.data);
  res.sendStatus(200); // responder rápido, procesar en background si es pesado
});
```

⚠️ Siempre verificar la firma del webhook — cualquiera puede hacer `POST` a una URL pública.

## 5.6 Idempotency Keys, Correlation IDs, Request IDs

Ver [sección 10.8](10-microservicios.md#108-idempotencia-en-microservicios) para idempotency keys y [sección 14](14-observabilidad.md#14-observabilidad) para correlation IDs.

**🔥🔥🔥🔥**

---

---

[⬅ Volver al README principal](../README.md)
