[⬅ Volver al README principal](../README.md)

# 1. JavaScript — Fundamentos

*Scope, tipos, funciones y el modelo de objetos de JavaScript — la base sobre la que se construye todo lo demás.*

## 1.1 Variables y Scope

### `var` vs `let` vs `const`

**Definición:** tres formas de declarar variables, con distinto *scope* y comportamiento de reasignación.

> 💡 Es la base de casi todo el razonamiento sobre closures, loops y hoisting — entender bien esto evita errores en cascada en el resto del código.

```javascript
var a = 1;    // scope de función, redeclarable y reasignable
let b = 2;    // scope de bloque, reasignable, NO redeclarable
const c = 3;  // scope de bloque, NO reasignable (el binding, no el contenido)

const obj = { x: 1 };
obj.x = 2; // ✅ válido — const protege la referencia, no el contenido
```

| Concepto | Comportamiento | Cuándo usar |
|---|---|---|
| `var` | Scope de función, hoisting a `undefined`, redeclarable | Evitar en código moderno |
| `let` | Scope de bloque, reasignable, TDZ | Variables que cambian de valor |
| `const` | Scope de bloque, no reasignable, TDZ | Default recomendado |

**🔥🔥🔥🔥🔥**

### Tipos de Scope

| Tipo | Qué es |
|---|---|
| **Global Scope** | Visible en todo el programa |
| **Function Scope** | Visible solo dentro de la función (`var`) |
| **Block Scope** | Visible solo dentro de `{ }` (`let`/`const`) |
| **Lexical Scope** | El scope se determina por dónde se **escribe** el código, no por dónde se ejecuta — es lo que hace posibles los closures |

### Hoisting y Temporal Dead Zone (TDZ)

**Definición:** el *hoisting* es el comportamiento donde las declaraciones se procesan antes de ejecutar el código línea a línea. La *TDZ* es el período entre el inicio del scope y la línea donde `let`/`const` se declaran, durante el cual la variable existe pero no puede usarse.

```javascript
console.log(typeof foo); // "function" — las function declarations se hoistean completas
function foo() {}

console.log(bar); // undefined — var se hoistea con valor undefined
var bar = 1;

console.log(baz); // ReferenceError — TDZ
let baz = 2;
```

**🔥🔥🔥🔥🔥**

---

## 1.2 Tipos de Datos

| Tipo | Categoría | Notas |
|---|---|---|
| `string`, `number`, `boolean` | Primitivo | Copia por valor |
| `null` | Primitivo | Ausencia de valor **intencional** |
| `undefined` | Primitivo | Variable declarada sin asignar / parámetro no pasado |
| `Symbol` | Primitivo | Valor único e inmutable, usado como clave de propiedad sin riesgo de colisión |
| `BigInt` | Primitivo | Enteros de precisión arbitraria, más allá de `Number.MAX_SAFE_INTEGER` (`10n`) |
| `object`, `array`, `function` | Referencia | Copia por referencia (puntero compartido) |

### Primitivos vs Referencia

> 💡 Explica por qué mutar un objeto "compartido" afecta a otras variables, y es la base de shallow vs deep copy.

```javascript
let a = 5; let b = a; b = 10;
console.log(a); // 5 — copia por valor

let obj1 = { x: 1 }; let obj2 = obj1; obj2.x = 99;
console.log(obj1.x); // 99 — misma referencia en memoria
```

**🔥🔥🔥🔥🔥**

### `null`, `undefined`, `NaN`, Truthy/Falsy

**Valores falsy:** `false, 0, -0, 0n, "", null, undefined, NaN`. Todo lo demás es truthy (incluyendo `[]` y `{}`).

```javascript
console.log(typeof null);      // "object" — bug histórico de JS, nunca corregido
console.log(typeof undefined); // "undefined"
console.log(NaN === NaN);      // false — usar Number.isNaN(x)
console.log(Boolean([]));      // true — un array vacío es truthy
```

**🔥🔥🔥🔥**

---

## 1.3 Igualdad: `==` vs `===`

**Definición:** `==` compara con **coerción de tipos**; `===` compara **tipo y valor** sin conversión.

```javascript
console.log(1 == "1");          // true  (coerción: "1" → 1)
console.log(1 === "1");         // false
console.log(null == undefined); // true  (única excepción "especial" del lenguaje)
```

| Operador | Comportamiento | Cuándo usar |
|---|---|---|
| `==` | Compara con coerción de tipos | Prácticamente nunca en producción |
| `===` | Compara tipo y valor, sin coerción | Siempre — es el default recomendado |

**🔥🔥🔥🔥🔥**

---

## 1.4 Funciones

### Function Declaration vs Expression vs Arrow Function

| Tipo | Hoisting | `this` propio | Uso recomendado |
|---|---|---|---|
| Function declaration | Se hoistea completa | Sí (dinámico) | Funciones de nivel superior |
| Function expression | Solo la variable se hoistea | Sí | Asignación condicional |
| Arrow function | Solo la variable se hoistea | No — hereda `this` léxico | Callbacks, métodos que necesitan `this` externo |

**Function declaration:** se escribe así: `function nombre() { ... }`. Se hoistea completa — JavaScript sube toda la función (no solo el nombre) antes de ejecutar el código. Por eso puedes llamarla antes de donde la escribiste. Tiene `this` propio y dinámico (cambia según quién la llame). Úsala para las funciones principales de tu módulo.

**Function expression:** se escribe así: `const nombre = function () { ... }`. Solo se hoistea la variable, no el contenido. Al inicio del archivo la variable existe pero vale `undefined`, todavía no es una función — por eso falla si la llamas antes de la línea donde se asigna. También tiene `this` propio y dinámico. Se usa para asignar una función condicionalmente.

**Arrow function:** se escribe así: `const nombre = () => { ... }`. Igual que expression, solo se hoistea la variable, así que tampoco puedes llamarla antes de definirla. La diferencia clave es el `this`: no tiene `this` propio, usa el del lugar donde fue escrita (léxico), no el de quien la llama. Por eso es ideal para callbacks o métodos que necesitan "recordar" el `this` externo (por ejemplo, dentro de un `setTimeout` o un `.map()` dentro de una clase).

**En una frase:** declaration es segura de llamar en cualquier orden; expression y arrow function dependen del orden de ejecución; y arrow function es la única que no crea su propio `this`.

```javascript
saluda(); // ✅ funciona — hoisting completo
function saluda() { console.log("hola"); }

saludaExpr(); // ❌ TypeError
var saludaExpr = function () { console.log("hola"); };

const saludaArrow = () => console.log("hola"); // no tiene this propio, hereda el del contexto léxico
saludaArrow();
```

**🔥🔥🔥🔥**

### Callback Functions y Higher-Order Functions

**Definición:** una *callback* es una función pasada como argumento a otra para ejecutarse después. Una *higher-order function* recibe y/o retorna funciones (`map`, `filter`, middlewares, decoradores).

```javascript
// Callback: saludar() recibe otra función y la ejecuta después
function saludar(nombre, callback) { callback(`Hola, ${nombre}`); }
saludar("Ana", (mensaje) => console.log(mensaje)); // "Hola, Ana"

// Higher-order function: recibe una función (map) y también retorna una función (multiplicarPor)
function multiplicarPor(factor) { return (n) => n * factor; }
const duplicar = multiplicarPor(2);
[1, 2, 3].map(duplicar); // [2, 4, 6]
```

### Funciones Puras y Side Effects

**Definición:** una función pura, dado el mismo input, siempre retorna el mismo output y no modifica nada fuera de su scope (sin I/O, sin mutar parámetros, sin depender de estado externo mutable).

> 💡 Las funciones puras son más fáciles de testear (sin mocks de estado externo) y seguras de ejecutar en paralelo.

```javascript
// ❌ Impura: muta el array recibido y depende de Date.now()
function addTimestamp(arr) { arr.push(Date.now()); return arr; }

// ✅ Pura: no muta el input, resultado depende solo de los argumentos
function addItem(arr, item) { return [...arr, item]; }
```

**🔥🔥🔥**

### Recursion

**Definición:** una función que se llama a sí misma hasta alcanzar un caso base.

```javascript
function factorial(n) { return n <= 1 ? 1 : n * factorial(n - 1); }
```

⚠️ Sin caso base correcto → `RangeError: Maximum call stack size exceeded`.

### IIFE (Immediately Invoked Function Expression)

```javascript
(function () { const privado = "no accesible fuera"; console.log(privado); })();
```

Se usaba para encapsular variables antes de que existieran módulos/`let`/`const`, evitando contaminar el scope global.

**🔥🔥**

---

## 1.5 Closures

**Definición:** una función "recuerda" el entorno léxico en el que fue creada, incluso después de que ese entorno haya terminado de ejecutarse.

> 💡 Es probablemente el concepto de JS más aplicado en entrevistas backend: contadores, memoización, módulos privados, y el bug clásico de `var` dentro de loops con callbacks asíncronos.

```javascript
function createCounter() {
  let count = 0; // "atrapada" en el closure
  return function () { return ++count; };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2 — recuerda el estado entre llamadas
```

```javascript
// ❌ con var, las 3 funciones comparten la misma i (termina en 3)
for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); } // 3, 3, 3

// ✅ con let, cada iteración crea un binding de bloque nuevo
for (let i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); } // 0, 1, 2
```

**🔥🔥🔥🔥🔥**

---

## 1.6 Destructuring, Spread/Rest, Template Literals, Optional Chaining, Nullish Coalescing

**Destructuring:** extrae valores de un objeto o array y los guarda en variables individuales, en una sola línea. Puedes darles un valor por defecto (`b = 10`, se usa solo si `b` no existe) y juntar lo que sobra con `...rest`.

**Spread (`...`):** "desempaqueta" los elementos de un array u objeto, por ejemplo para copiarlos o unirlos dentro de otro array/objeto nuevo.

**Rest (`...`):** misma sintaxis que spread pero en sentido contrario — agrupa varios argumentos o elementos sueltos en un solo array.

**Template literals (`` ` `` `):** permiten insertar variables dentro de un string con `${variable}`, sin concatenar con `+`.

```javascript
const { a, b = 10, ...rest } = { a: 1, c: 2, d: 3 };
console.log(a, b, rest); // 1 10 { c: 2, d: 3 }

function sum(...nums) { return nums.reduce((acc, n) => acc + n, 0); } // rest
const merged = [...[1, 2], ...[3, 4]]; // spread

const name = "Node";
console.log(`Hola, ${name}!`); // template literal
```

### Optional chaining (`?.`) y Nullish coalescing (`??`)

**Optional chaining (`?.`):** intenta acceder a una propiedad anidada y, si en el camino algo es `null` o `undefined`, detiene la lectura y devuelve `undefined` en vez de lanzar un error.

**Nullish coalescing (`??`):** devuelve el valor de la derecha solo si el de la izquierda es `null` o `undefined` — a diferencia de `||`, que lo reemplaza con cualquier valor "falsy" (`0`, `""`, `false`, etc.).

> 💡 Confundir `??` con `||` es el error más frecuente al definir valores por defecto cuando `0` o `""` son resultados legítimos.

```javascript
const user = { profile: null };
console.log(user.profile?.name); // undefined, no lanza error

const count = 0;
console.log(count || 10); // ❌ 10 — bug si 0 es un valor válido
console.log(count ?? 10); // ✅ 0  — correcto, 0 no es null/undefined
```

### Ternario y Short-circuit Evaluation

**Ternario (`? :`):** forma corta de un `if/else` que devuelve un valor — `condición ? valorSiTrue : valorSiFalse`.

**Short-circuit con `||`:** evalúa el lado izquierdo y, si es "falsy" (`0`, `""`, `null`, `undefined`, `false`), usa el lado derecho; si no, se queda con el izquierdo.

**Short-circuit con `&&`:** evalúa el lado izquierdo y, solo si es "truthy", continúa y devuelve el lado derecho — útil para acceder algo solo si lo anterior existe.

```javascript
const label = isActive ? "activo" : "inactivo"; // ternario
const value = input || "default";                // short-circuit con ||
const safe = config && config.value;              // short-circuit con &&
```

**🔥🔥🔥🔥**

---

## 1.7 `this`, `call`, `apply`, `bind`

**Definición:** el valor de `this` depende de **cómo se llama una función**, no de dónde se define (excepto en arrow functions, que heredan `this` léxicamente).

| Método | Ejecuta inmediatamente | Argumentos | Retorna |
|---|---|---|---|
| `fn.call(thisArg, a, b)` | Sí | Separados por comas | El resultado de `fn` |
| `fn.apply(thisArg, [a, b])` | Sí | Como array | El resultado de `fn` |
| `fn.bind(thisArg, a, b)` | No | Separados por comas | Una **nueva función** con `this` fijo |

```javascript
const obj = {
  name: "Node",
  regular: function () { return this.name; },
  arrow: () => { return this.name; },
};
console.log(obj.regular()); // "Node"
console.log(obj.arrow());   // undefined — hereda el this del módulo, no de obj
```

**🔥🔥🔥🔥🔥**

---

## 1.8 Prototypes, Clases y Herencia

### Prototype Chain

**Definición:** cada objeto tiene un enlace interno `[[Prototype]]` hacia otro objeto, del cual "hereda" propiedades/métodos. El motor sube por la cadena hasta `null` al buscar una propiedad.

```javascript
function Animal(name) { this.name = name; }
Animal.prototype.speak = function () { return `${this.name} hace un sonido`; };
const dog = new Animal("Rex");
console.log(dog.speak()); // vive en el prototipo, compartido por todas las instancias
```

### Classes, Inheritance, Encapsulation, Polymorphism

```javascript
class Animal {
  #energy = 100; // encapsulation: campo privado, inaccesible desde fuera

  constructor(name) { this.name = name; }
  speak() { return `${this.name} hace un sonido`; }
}

class Dog extends Animal {       // inheritance
  speak() { return `${this.name} ladra`; } // polymorphism: misma interfaz, comportamiento distinto
}

[new Animal("Genérico"), new Dog("Rex")].forEach(a => console.log(a.speak()));
```

| Pilar OOP | Qué es |
|---|---|
| **Encapsulation** | Ocultar el estado interno (`#campo`) y exponer solo lo necesario |
| **Inheritance** | Una clase reutiliza/extiende el comportamiento de otra (`extends`) |
| **Polymorphism** | Distintas clases responden al mismo método de forma diferente |

**🔥🔥🔥**

---

## 1.9 Módulos: CommonJS vs ES Modules

| Concepto | CommonJS | ES Modules (ESM) |
|---|---|---|
| Sintaxis | `require()` / `module.exports` | `import` / `export` |
| Carga | Síncrona | Análisis estático, soporta carga asíncrona |
| Activación | Default en `.js` | Requiere `"type": "module"` o `.mjs` |

```javascript
exports = { hello: () => "hi" };      // ❌ rompe la referencia — NO se exporta
module.exports.world = () => "world"; // ✅ correcto
```

**🔥🔥🔥🔥**

---

## 1.10 Inmutabilidad, Shallow Copy, Deep Copy

**Definición:** copiar un objeto con spread (`{...obj}`) u `Object.assign` solo copia el **primer nivel** (*shallow copy*); una *deep copy* copia recursivamente todos los niveles.

```javascript
const original = { a: 1, nested: { b: 2 } };
const shallow = { ...original };
shallow.nested.b = 99;
console.log(original.nested.b); // 99 — el spread solo copió el primer nivel

const deep = structuredClone(original); // deep copy nativo (Node 17+)
deep.nested.b = 1;
console.log(original.nested.b); // sigue en 99
```

**🔥🔥🔥🔥🔥**

---

## 1.11 Garbage Collection y Memory Management

**Definición:** JS libera automáticamente la memoria de objetos sin ninguna referencia activa. Un *memory leak* ocurre cuando se mantienen referencias vivas a objetos innecesarios (closures con datos grandes, listeners no removidos, caches sin límite).

```javascript
// ❌ cache crece indefinidamente — nunca se libera memoria
const cache = {};
app.get('/data/:id', (req, res) => {
  if (!cache[req.params.id]) cache[req.params.id] = fetchExpensiveData(req.params.id);
  res.json(cache[req.params.id]);
});
```

**🔥🔥🔥🔥**

---

## 1.12 Arrays

| Método | Retorna | Muta el original | Uso típico |
|---|---|---|---|
| `map` | Nuevo array, misma longitud | No | Transformar cada elemento |
| `filter` | Nuevo array, longitud ≤ original | No | Seleccionar elementos |
| `reduce` | Un valor acumulado | No | Totales, agrupaciones |
| `find` / `findIndex` | Primer match / índice | No | Buscar un elemento |
| `some` / `every` | `boolean` | No | ¿Alguno / todos cumplen? |
| `includes` | `boolean` | No | ¿Existe este valor? |
| `sort` | El mismo array, ordenado | **Sí** | Ordenar — ⚠️ sin comparador ordena como strings |
| `forEach` | `undefined` | No (vía callback sí puede) | Iterar con side effects |
| `flat(n)` / `flatMap` | Array aplanado | No | Aplanar arrays anidados |

```javascript
[].reduce((acc, n) => acc + n); // ❌ TypeError: Reduce of empty array with no initial value
console.log([10, 2, 1].sort()); // ["1", "10", "2"] — ordena como string por defecto
console.log([10, 2, 1].sort((a, b) => a - b)); // [1, 2, 10] — orden numérico correcto
```

**🔥🔥🔥🔥🔥**

---

## 1.13 Objetos

```javascript
const user = { id: 1, name: "Ana" };
Object.keys(user);    // ["id", "name"]
Object.values(user);  // [1, "Ana"]
Object.entries(user); // [["id", 1], ["name", "Ana"]]
Object.assign({}, user, { name: "Luis" }); // shallow merge
Object.freeze(user);  // impide agregar/eliminar/reasignar props de primer nivel (shallow)
```

**🔥🔥🔥**

---

---

[⬅ Volver al README principal](../README.md)
