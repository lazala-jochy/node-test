# 🦍 Guía Intensiva de Preparación — TestGorilla (Backend / Node.js)

> **Disclaimer importante:** Este material **NO contiene preguntas reales ni filtradas de TestGorilla**. Es una guía de estudio creada a partir de conocimientos técnicos estándar de JavaScript, Node.js y desarrollo backend, y de los patrones comunes que suelen aparecer en evaluaciones técnicas de este tipo (opción múltiple, predicción de output, escenarios y ejercicios de código con tiempo límite). El objetivo es que repases y refuerces conceptos, no memorizar un examen específico.

**Formato de la prueba (según lo informado por la empresa):**
- Multiple choice, en inglés.
- 4 secciones con tiempo regresivo (~1 hora en total para preguntas).
- 1 sección de código (~30 minutos).
- Evalúa desarrollo de software general + Node.js específicamente.

**Leyenda:**
- 🔥 = Tema de alta prioridad (muy probable que aparezca).
- ⚠️ = Error común / trampa frecuente.

---

## Tabla de Contenidos

1. [JavaScript fundamental](#1-javascript-fundamental)
2. [Async JavaScript](#2-async-javascript)
3. [Node.js](#3-nodejs)
4. [Node.js Event Loop — Deep Dive](#4-nodejs-event-loop--deep-dive)
5. [REST APIs y HTTP](#5-rest-apis-y-http)
6. [Backend Architecture](#6-backend-architecture)
7. [Databases / SQL](#7-databases--sql)
8. [PostgreSQL](#8-postgresql)
9. [Redis](#9-redis)
10. [APIs, seguridad y autenticación](#10-apis-seguridad-y-autenticación)
11. [Testing](#11-testing)
12. [TypeScript](#12-typescript)
13. [Git / CI-CD / Docker](#13-git--cicd--docker)
14. [Preguntas de debugging](#14-preguntas-de-debugging)
15. [Preguntas de código (práctica progresiva)](#15-preguntas-de-código-práctica-progresiva)
16. [Simulación de la sección de código (30 min)](#16-simulación-de-la-sección-de-código-30-min)
17. [English Technical Vocabulary](#17-english-technical-vocabulary)
18. [Tricky Questions](#18-tricky-questions)
19. [Last-Minute Cheat Sheet](#19-last-minute-cheat-sheet)
20. [Mini Mock Exam (30 preguntas)](#20-mini-mock-exam-30-preguntas)
21. [Study Plan — 5 días](#study-plan--5-días)

---

# 1. JavaScript fundamental

## 🔥 let / const / var

`var` tiene scope de función y hoisting con valor `undefined`. `let`/`const` tienen scope de bloque y viven en la "temporal dead zone" (TDZ) hasta su declaración.

```js
if (true) {
  var a = 1;
  let b = 2;
}
console.log(a); // 1
console.log(b); // ReferenceError
```

**Q:** What happens when you run this code?
```js
console.log(x);
var x = 5;
```
A) Prints `5`
B) Prints `undefined`
C) Throws `ReferenceError`
D) Throws `SyntaxError`

**Answer: B.** `var` se "hoistea" con valor `undefined`, no lanza error. (C sería correcto si fuera `let`/`const` por la TDZ).

---

## Scope

Determina la visibilidad de una variable: global, de función, o de bloque (`{}`). `let`/`const` respetan bloques (`if`, `for`, `{}`); `var` no.

```js
function test() {
  for (let i = 0; i < 3; i++) {}
  console.log(i); // ReferenceError, i no existe fuera del for
}
```

**Q:** What is the scope of a variable declared with `let` inside a `for` loop?
A) Global
B) Function
C) Block
D) Module

**Answer: C.**

---

## 🔥 Hoisting

Declaraciones de `var` y `function` se mueven conceptualmente al inicio del scope. `let`/`const` también se "hoistean" pero quedan en TDZ (no se pueden usar antes de declararse).

```js
console.log(typeof foo); // "function"
function foo() {}

console.log(bar); // undefined
var bar = 1;
```

**Q:** What does `console.log(a)` print?
```js
console.log(a);
let a = 10;
```
A) `undefined`
B) `10`
C) ReferenceError (TDZ)
D) `null`

**Answer: C.** ⚠️ Error común: pensar que `let` se comporta igual que `var`.

---

## 🔥 Closures

Una función "recuerda" el scope léxico en el que fue creada, incluso después de que ese scope haya terminado de ejecutarse.

```js
function counter() {
  let count = 0;
  return () => ++count;
}
const inc = counter();
console.log(inc()); // 1
console.log(inc()); // 2
```

**Q:** What will this code output?
```js
function createCounters() {
  const result = [];
  for (var i = 0; i < 3; i++) {
    result.push(() => i);
  }
  return result;
}
const counters = createCounters();
console.log(counters.map(fn => fn()));
```
A) `[0, 1, 2]`
B) `[3, 3, 3]`
C) `[undefined, undefined, undefined]`
D) `[0, 0, 0]`

**Answer: B.** ⚠️ Con `var`, todas las funciones comparten la misma variable `i`, que termina en `3`. Si fuera `let`, cada iteración crea un nuevo binding y el resultado sería `[0, 1, 2]`.

---

## 🔥 `this`

El valor de `this` depende de **cómo se llama la función**, no de dónde se define (excepto en arrow functions, que heredan `this` léxicamente).

```js
const obj = {
  name: "Node",
  regular: function () { return this.name; },
  arrow: () => { return this.name; },
};
console.log(obj.regular()); // "Node"
console.log(obj.arrow());   // undefined (this es el del scope externo)
```

**Q:** What does `obj.arrow()` return in the example above (in a module/strict context)?
A) `"Node"`
B) `undefined`
C) `null`
D) Throws an error

**Answer: B.** Las arrow functions no tienen su propio `this`; heredan el del contexto léxico (aquí, el módulo).

---

## Arrow functions

No tienen `this`, `arguments`, ni `super` propios; no pueden usarse como constructores (`new`).

**Q:** Which of the following is NOT true about arrow functions?
A) They don't have their own `this`
B) They can be used as constructors with `new`
C) They don't have their own `arguments` object
D) They have a more concise syntax

**Answer: B.** Lanzan `TypeError: X is not a constructor`.

---

## Prototypes

JavaScript usa herencia prototípica: cada objeto tiene un enlace interno `[[Prototype]]` (accesible vía `Object.getPrototypeOf` o `__proto__`).

```js
function Animal(name) { this.name = name; }
Animal.prototype.speak = function () { return `${this.name} makes a sound`; };
const dog = new Animal("Rex");
console.log(dog.speak()); // "Rex makes a sound"
```

**Q:** Where is the `speak` method stored?
A) Directly on the `dog` instance
B) On `Animal.prototype`, shared by all instances
C) Copied into every instance at creation
D) In the global scope

**Answer: B.**

---

## Classes

Azúcar sintáctico sobre prototipos.

```js
class Animal {
  #secret = "hidden"; // private field
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound`; }
}
```

**Q:** What does the `#secret` syntax represent in a class?
A) A static property
B) A private field, inaccessible from outside the class
C) A getter
D) A deprecated feature

**Answer: B.**

---

## 🔥 Destructuring

```js
const { a, b = 10, ...rest } = { a: 1, c: 2, d: 3 };
console.log(a, b, rest); // 1 10 { c: 2, d: 3 }

const [first, , third] = [1, 2, 3];
console.log(first, third); // 1 3
```

**Q:** What is logged?
```js
const { x: renamed } = { x: 5 };
console.log(x);
```
A) `5`
B) `undefined`
C) `ReferenceError: x is not defined`
D) `null`

**Answer: C.** Al renombrar con `x: renamed`, la variable disponible es `renamed`, no `x`. ⚠️ Trampa común.

---

## Spread / Rest

Spread (`...`) expande; rest (`...`) agrupa. Se ven iguales pero el contexto define el comportamiento.

```js
function sum(...nums) { return nums.reduce((a, b) => a + b, 0); } // rest
const arr2 = [...[1, 2], ...[3, 4]]; // spread
```

**Q:** What does `[...new Set([1, 2, 2, 3])]` return?
A) `[1, 2, 2, 3]`
B) `Set {1, 2, 3}`
C) `[1, 2, 3]`
D) `TypeError`

**Answer: C.** Patrón muy común para eliminar duplicados de un array.

---

## 🔥 Optional chaining (`?.`)

```js
const user = { profile: null };
console.log(user.profile?.name); // undefined, no lanza error
console.log(user.profile.name);  // TypeError
```

**Q:** What happens here?
```js
const obj = {};
console.log(obj.a?.b.c);
```
A) `undefined`
B) `TypeError: Cannot read properties of undefined`
C) `null`
D) `ReferenceError`

**Answer: A.** `obj.a` es `undefined`, `?.` corta la cadena ahí y devuelve `undefined` sin evaluar `.c`. ⚠️ Importante: `?.` solo protege el eslabón donde se aplica, no toda la cadena.

---

## 🔥 Nullish coalescing (`??`)

`??` solo cae al valor derecho si el izquierdo es `null` o `undefined` (a diferencia de `||`, que cae con cualquier falsy).

```js
console.log(0 || "default");  // "default"
console.log(0 ?? "default");  // 0
console.log("" ?? "default"); // ""
```

**Q:** What is logged?
```js
const count = 0;
console.log(count ?? 10, count || 10);
```
A) `0 0`
B) `10 10`
C) `0 10`
D) `10 0`

**Answer: C.** ⚠️ Trampa clásica: confundir `??` con `||`.

---

## 🔥 Equality: `==` vs `===`

`==` aplica coerción de tipos antes de comparar; `===` compara tipo y valor sin coerción.

**Q:** What is `null == undefined`?
A) `true`
B) `false`
C) `TypeError`
D) `NaN`

**Answer: A.** Es la única excepción "especial": `null == undefined` es `true`, pero `null === undefined` es `false`.

**Q:** What is `'0' == false`?
A) `true`
B) `false`

**Answer: A.** Ambos se convierten a `0` antes de comparar.

---

## Truthy / Falsy

Valores falsy: `false, 0, -0, 0n, "", null, undefined, NaN`. Todo lo demás es truthy (incluyendo `[]`, `{}`, `"0"`).

**Q:** Which of these is falsy?
A) `[]`
B) `"0"`
C) `0n`
D) `"false"`

**Answer: C.** ⚠️ `[]` y `"0"` (string) son truthy, aunque parezcan "vacíos" o "cero".

---

## Type coercion

```js
console.log(1 + "1");   // "11" (string concat)
console.log("5" - 1);   // 4 (numeric coercion)
console.log([] + []);   // ""
console.log([] + {});   // "[object Object]"
```

**Q:** What is `[] + {}`?
A) `0`
B) `"[object Object]"`
C) `NaN`
D) `TypeError`

**Answer: B.** Ambos se convierten a string: `""` y `"[object Object]"`, luego se concatenan.

---

## 🔥 Arrays, map/filter/reduce, find/some/every

| Método | Devuelve | Uso típico |
|---|---|---|
| `map` | Nuevo array, misma longitud | Transformar cada elemento |
| `filter` | Nuevo array, longitud ≤ original | Seleccionar elementos |
| `reduce` | Un único valor acumulado | Totales, agrupaciones |
| `find` | Primer elemento que cumple o `undefined` | Buscar uno |
| `some` | `boolean` | ¿Al menos uno cumple? |
| `every` | `boolean` | ¿Todos cumplen? |

```js
const nums = [1, 2, 3, 4];
console.log(nums.map(n => n * 2));           // [2,4,6,8]
console.log(nums.filter(n => n % 2 === 0));  // [2,4]
console.log(nums.reduce((acc, n) => acc + n, 0)); // 10
```

**Q:** What does `[1,2,3].reduce((acc, n) => acc + n)` return (no initial value)?
A) `6`
B) `Error`
C) `undefined`
D) `[1,2,3]`

**Answer: A.** Sin valor inicial, `reduce` usa el primer elemento como acumulador inicial y empieza a iterar desde el segundo.

**Q:** What does `[].reduce((acc, n) => acc + n)` throw?
A) Nothing, returns `undefined`
B) `TypeError: Reduce of empty array with no initial value`
C) Returns `0`
D) Returns `NaN`

**Answer: B.** ⚠️ Trampa común — `reduce` sin valor inicial en array vacío lanza error.

---

## Objects, shallow vs deep copy, mutation vs immutability

```js
const original = { a: 1, nested: { b: 2 } };
const shallow = { ...original };
shallow.nested.b = 99;
console.log(original.nested.b); // 99 — el spread solo copia el primer nivel
```

**Q:** After running the code above, what is `original.nested.b`?
A) `2`
B) `99`
C) `undefined`
D) `TypeError`

**Answer: B.** ⚠️ Spread (`...`) y `Object.assign` solo hacen **shallow copy**; objetos anidados siguen siendo referencias compartidas. Para deep copy: `structuredClone(obj)` (nativo en Node 17+) o `JSON.parse(JSON.stringify(obj))` (pierde funciones, `undefined`, fechas, etc.).

---

# 2. Async JavaScript

## 🔥 Fundamentos: Call Stack, Microtasks, Macrotasks

- **Call Stack:** ejecuta código síncrono, un frame a la vez.
- **Microtask queue:** `Promise.then/catch/finally`, `queueMicrotask`, `process.nextTick` (este último tiene su propia cola, con prioridad aún mayor en Node).
- **Macrotask queue (Task queue):** `setTimeout`, `setInterval`, `setImmediate`, I/O callbacks.

**Regla de oro:** después de cada tarea síncrona, el event loop **vacía TODA la cola de microtasks** antes de pasar a la siguiente macrotask.

### Ejemplo base (el que mencionaste)

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
```

**Q:** What is the output order?
A) A, B, C, D
B) A, D, C, B
C) A, D, B, C
D) A, B, D, C

**Answer: B.**
**Explicación:** `"A"` y `"D"` son síncronos → se imprimen primero en orden. `setTimeout` encola una **macrotask**, `.then()` encola una **microtask**. Al terminar el código síncrono, el event loop vacía la cola de microtasks (`"C"`) antes de procesar la siguiente macrotask (`"B"`).

---

## Callbacks

Patrón clásico anterior a Promises; propenso a "callback hell" y manejo de errores inconsistente (callback-first-arg-error, estilo Node: `(err, data) => {}`).

```js
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

---

## 🔥 Promises y sus combinadores

| Método | Resuelve cuando | Rechaza cuando |
|---|---|---|
| `Promise.all` | **todas** resuelven | **cualquiera** rechaza (fail-fast) |
| `Promise.allSettled` | siempre resuelve, con `{status, value/reason}` por cada una | nunca rechaza |
| `Promise.race` | la **primera** en resolver o rechazar gana | — |
| `Promise.any` | la **primera que resuelve** (ignora rechazos) | solo si **todas** rechazan (`AggregateError`) |

```js
const p1 = Promise.resolve(1);
const p2 = new Promise((_, rej) => setTimeout(() => rej("fail"), 10));
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).catch(e => console.log("all:", e));       // "all: fail"
Promise.allSettled([p1, p2, p3]).then(r => console.log("settled:", r.map(x => x.status)));
// settled: ['fulfilled', 'rejected', 'fulfilled']
Promise.race([p1, p2, p3]).then(v => console.log("race:", v));      // "race: 1"
Promise.any([p1, p2, p3]).then(v => console.log("any:", v));        // "any: 1"
```

**Q:** If all promises passed to `Promise.any` reject, what happens?
A) It resolves with `undefined`
B) It rejects with an `AggregateError`
C) It hangs forever
D) It rejects with the first error only

**Answer: B.**

---

## 🔥 async/await — orden de ejecución

```js
async function foo() {
  console.log(1);
  await null;
  console.log(2);
}
console.log(3);
foo();
console.log(4);
```

**Q:** What is the output order?
A) 1, 2, 3, 4
B) 3, 1, 4, 2
C) 3, 1, 2, 4
D) 1, 3, 4, 2

**Answer: B.**
**Explanation:** `foo()` se ejecuta síncronamente hasta el primer `await`. `console.log(1)` corre inmediatamente. `await null` pausa la función y agenda el resto como microtask. El código síncrono continúa (`console.log(4)`), y al vaciarse la pila, se ejecuta la microtask pendiente (`console.log(2)`).

---

## Sequential vs Parallel execution ⚠️

```js
// SECUENCIAL — lento, cada await espera al anterior
async function sequential() {
  const a = await fetchA(); // espera
  const b = await fetchB(); // espera
  return [a, b];
}

// PARALELO — rápido, ambas inician al mismo tiempo
async function parallel() {
  const [a, b] = await Promise.all([fetchA(), fetchB()]);
  return [a, b];
}
```

**Q:** If `fetchA` and `fetchB` each take 1 second and are independent, how long does `sequential()` take vs `parallel()`?
A) 1s vs 1s
B) 2s vs 1s
C) 1s vs 2s
D) 2s vs 2s

**Answer: B.** ⚠️ Error muy común en entrevistas y en código real: usar `await` dentro de un loop o en secuencia innecesaria cuando las operaciones son independientes.

---

## Errores asíncronos y try/catch

```js
async function run() {
  try {
    await Promise.reject(new Error("boom"));
  } catch (e) {
    console.log("caught:", e.message);
  }
}
run(); // "caught: boom"
```

**Q:** What happens if you forget `await` before a rejected promise inside a `try/catch`?
```js
async function run() {
  try {
    Promise.reject(new Error("boom")); // no await
  } catch (e) {
    console.log("caught");
  }
}
run();
```
A) Prints "caught"
B) Silently swallowed, nothing printed, but an UnhandledPromiseRejection warning may appear
C) Throws synchronously
D) Prints "boom"

**Answer: B.** ⚠️ Muy importante: `try/catch` solo captura rechazos de promesas que son **awaited** (o cuyo `.catch` está encadenado) dentro del bloque.

---

## Más ejercicios de predicción de output

**Q1:**
```js
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise1")).then(() => console.log("promise2"));
console.log("sync");
```
A) timeout, sync, promise1, promise2
B) sync, timeout, promise1, promise2
C) sync, promise1, promise2, timeout
D) sync, promise1, timeout, promise2

**Answer: C.** Todas las microtasks (incluyendo las encadenadas) se agotan antes de pasar al timeout.

**Q2:**
```js
async function a() {
  console.log("a start");
  await b();
  console.log("a end");
}
async function b() {
  console.log("b");
}
console.log("script start");
a();
console.log("script end");
```
A) script start, a start, b, script end, a end
B) script start, a start, b, a end, script end
C) a start, b, a end, script start, script end
D) script start, script end, a start, b, a end

**Answer: A.**

**Q3:**
```js
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve()
  .then(() => {
    console.log(3);
    return Promise.resolve();
  })
  .then(() => console.log(4));
Promise.resolve().then(() => console.log(5));
console.log(6);
```
A) 1, 6, 3, 5, 4, 2
B) 1, 6, 5, 3, 4, 2
C) 1, 6, 3, 4, 5, 2
D) 1, 2, 3, 4, 5, 6

**Answer: A.** Las dos primeras `.then` (de distintas cadenas) ya están en cola: se ejecutan `3` y `5` en orden. El segundo `.then` de la primera cadena (`4`) se reencola porque retorna otra promesa, por lo que corre después del microtask de `5`.

---

# 3. Node.js

## Conceptos clave

- **Node.js** es un runtime de JavaScript construido sobre el motor **V8** de Google, que permite ejecutar JS fuera del navegador.
- **libuv** es la librería en C que provee el event loop, operaciones de I/O asíncronas, el thread pool, etc.
- Node es **single-threaded** para la ejecución de JS, pero usa un **thread pool** (vía libuv) para operaciones como `fs`, DNS, crypto, compresión.

## 🔥 25 Preguntas Multiple Choice

**Q1.** What engine does Node.js use to execute JavaScript?
A) SpiderMonkey B) V8 C) Chakra D) JavaScriptCore
**Answer: B.**

**Q2.** Node.js is best described as:
A) Multi-threaded by default for all operations
B) Single-threaded for JS execution, with a thread pool for some I/O
C) Fully multi-threaded like Java
D) A browser-based runtime
**Answer: B.**

**Q3.** Which library provides Node.js's event loop and async I/O?
A) libuv B) V8 C) npm D) OpenSSL
**Answer: A.**

**Q4.** What does `require('module')` use internally?
A) ES Modules B) CommonJS C) AMD D) UMD
**Answer: B.**

**Q5.** Which statement about `import`/`export` in Node.js is true?
A) They require `"type": "module"` in `package.json` or a `.mjs` extension
B) They work identically to `require` with no configuration
C) They cannot be used in Node.js at all
D) They are only available in TypeScript
**Answer: A.**

**Q6.** What is the main difference between `require` and `import`?
A) `require` is asynchronous, `import` is synchronous
B) `require` is CommonJS and synchronous; ES Modules (`import`) support static analysis and async loading
C) They are exactly the same
D) `import` only works with JSON files
**Answer: B.**

**Q7.** In `package.json`, where should a testing library like Jest be listed?
A) `dependencies`
B) `devDependencies`
C) `peerDependencies`
D) `scripts`
**Answer: B.**

**Q8.** What is the purpose of `package-lock.json`?
A) Stores environment variables
B) Locks exact dependency versions for reproducible installs
C) Stores compiled JS output
D) Configures TypeScript
**Answer: B.**

**Q9.** Which of these is a CPU-bound operation?
A) Reading a file from disk
B) Making an HTTP request
C) Computing a large Fibonacci number / image processing
D) Querying a database
**Answer: C.**

**Q10.** Which of these is an I/O-bound operation?
A) A tight mathematical loop
B) Reading data from a database
C) Sorting a huge in-memory array
D) Parsing a large JSON string synchronously
**Answer: B.**

**Q11.** 🔥 What problem can a CPU-bound synchronous operation cause in Node.js?
A) It crashes the process immediately
B) It blocks the Event Loop, freezing all other requests
C) It automatically runs in a separate thread
D) Nothing, Node handles it transparently
**Answer: B.** ⚠️ Un error de arquitectura muy común: hacer cálculos pesados síncronos en el hilo principal de un servidor Node.

**Q12.** What is a recommended solution for CPU-intensive tasks in Node.js?
A) Use more `setTimeout` calls
B) Use `worker_threads` to offload work to another thread
C) Use `process.nextTick`
D) Just use `async/await`
**Answer: B.**

**Q13.** What does the `cluster` module do?
A) Compresses files
B) Forks multiple processes to utilize multiple CPU cores for handling requests
C) Creates worker threads sharing memory
D) Manages database connections
**Answer: B.**

**Q14.** What is the key difference between `cluster` and `worker_threads`?
A) `cluster` forks separate processes (separate memory); `worker_threads` run in the same process and can share memory
B) They are identical
C) `worker_threads` only work in the browser
D) `cluster` is deprecated
**Answer: A.**

**Q15.** What does `EventEmitter` provide in Node.js?
A) A way to read files synchronously
B) A pattern for emitting and listening to named events
C) A database connector
D) An HTTP client
**Answer: B.**

**Q16.** What happens if an `EventEmitter` emits an `'error'` event with no listener attached?
A) Nothing happens, it's ignored
B) Node.js throws the error and crashes the process
C) It automatically retries
D) It logs a warning only
**Answer: B.** ⚠️ Trampa común — `'error'` es un evento especial en `EventEmitter`.

**Q17.** What is a Node.js `Buffer` used for?
A) Storing JSON objects
B) Handling raw binary data
C) Managing HTTP headers only
D) Caching database queries
**Answer: B.**

**Q18.** Which module would you use to work with file paths in a cross-platform way?
A) `fs` B) `path` C) `os` D) `url`
**Answer: B.**

**Q19.** What is the difference between `fs.readFile` and `fs.readFileSync`?
A) No difference
B) `readFile` is asynchronous (callback/promise-based), `readFileSync` blocks the event loop
C) `readFileSync` is faster in all cases
D) `readFile` only works with text files
**Answer: B.**

**Q20.** How do you access environment variables in Node.js?
A) `env.VARIABLE`
B) `process.env.VARIABLE`
C) `global.VARIABLE`
D) `require('env').VARIABLE`
**Answer: B.**

**Q21.** What does `process.nextTick()` do?
A) Schedules a callback to run in the next macrotask
B) Schedules a callback to run before the event loop continues, even before Promise microtasks
C) Runs code immediately and synchronously
D) Schedules code to run after `setImmediate`
**Answer: B.**

**Q22.** In the main module, which of these is generally true?
A) `setImmediate` always runs before `setTimeout(fn, 0)`
B) `setTimeout(fn, 0)` always runs before `setImmediate`
C) The order between `setTimeout(fn, 0)` and `setImmediate` in the main module is not guaranteed
D) They run at the exact same time, always
**Answer: C.** ⚠️ Dentro de un callback de I/O, `setImmediate` siempre corre antes que los timers pendientes; en el módulo principal no hay garantía.

**Q23.** What is the correct order of priority for these queues in Node.js?
A) Macrotasks > process.nextTick > microtasks
B) process.nextTick > Promise microtasks > macrotasks (timers, I/O, setImmediate)
C) Microtasks > process.nextTick > macrotasks
D) They all run in the same queue
**Answer: B.**

**Q24.** What does `npm ci` do differently from `npm install`?
A) It's identical to `npm install`
B) It installs exactly what's in `package-lock.json`, deleting `node_modules` first — ideal for CI pipelines
C) It only installs devDependencies
D) It publishes the package
**Answer: B.**

**Q25.** What is a memory leak commonly caused by in a long-running Node.js server?
A) Using `const` instead of `let`
B) Uncleared timers/intervals, global caches that grow unbounded, or forgotten event listeners
C) Using async/await
D) Using TypeScript
**Answer: B.**

## 10 Preguntas de código

**C1.** What is the output?
```js
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('greet', (name) => console.log(`Hello, ${name}`));
emitter.emit('greet', 'World');
emitter.emit('greet', 'Node');
```
**Answer:** `Hello, World` then `Hello, Node` — los listeners se ejecutan de forma síncrona cada vez que se emite el evento.

**C2.** What does this print?
```js
console.log('1');
process.nextTick(() => console.log('2'));
Promise.resolve().then(() => console.log('3'));
console.log('4');
```
**Answer:** `1, 4, 2, 3` — `process.nextTick` tiene prioridad sobre las microtasks de Promise.

**C3.** What is wrong with this code (from a performance standpoint)?
```js
const fs = require('fs');
app.get('/file', (req, res) => {
  const data = fs.readFileSync('./bigfile.txt');
  res.send(data);
});
```
**Answer:** Usa la versión **síncrona** de `readFile` dentro de un handler HTTP, bloqueando el Event Loop para **todas** las peticiones mientras lee el archivo. Debería usar `fs.promises.readFile` o `fs.readFile`.

**C4.** What does `module.exports` vs `exports` difference cause here?
```js
exports = { hello: () => "hi" }; // NOT exported correctly
module.exports.world = () => "world"; // exported correctly
```
**Answer:** Reasignar `exports` directamente rompe la referencia a `module.exports`; solo lo que esté en `module.exports` (o las propiedades agregadas a `exports`, no su reasignación) se exporta. El `hello` definido así **no se exporta**.

**C5.** Predict the output:
```js
const arr = [1, 2, 3];
arr.forEach(async (n) => {
  await new Promise(r => setTimeout(r, 10));
  console.log(n);
});
console.log('done');
```
**Answer:** `done` se imprime primero. `forEach` **no espera** callbacks async — dispara las 3 llamadas "en paralelo" sin esperarlas, y el código síncrono (`done`) continúa inmediatamente. Luego, tras ~10ms, se imprimen `1, 2, 3` (orden aproximado, no garantizado estrictamente). ⚠️ Trampa muy común: usar `forEach` con async esperando comportamiento secuencial — para eso se necesita un `for...of` con `await`.

**C6.** Fix this code so it correctly waits for all async operations:
```js
const results = [];
[1, 2, 3].forEach(async (n) => {
  results.push(await processAsync(n));
});
console.log(results); // siempre [] aquí
```
**Answer:**
```js
const results = await Promise.all([1, 2, 3].map(n => processAsync(n)));
console.log(results);
```

**C7.** What does this code print?
```js
class Counter {
  static count = 0;
  constructor() { Counter.count++; }
}
new Counter();
new Counter();
console.log(Counter.count);
```
**Answer:** `2` — los campos `static` se comparten entre todas las instancias, viven en la clase, no en cada instancia.

**C8.** What's the issue in this Express-style middleware?
```js
app.use((req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send('Unauthorized');
  }
  next(); // se llama siempre
});
```
**Answer:** Falta un `return` antes de `next()`. Si falta el header, responde 401 **pero igual llama a `next()`**, lo que puede causar un error "Headers already sent" si otro middleware intenta responder de nuevo.

**C9.** What does `Buffer.from('abc').toString('hex')` return?
A) `"abc"` B) `"616263"` C) `3` D) `[97, 98, 99]`
**Answer: B.** Representa los códigos ASCII de `a`, `b`, `c` en hexadecimal.

**C10.** What happens here?
```js
async function main() {
  throw new Error("fail");
}
main();
console.log("after");
```
**Answer:** `"after"` se imprime primero (síncrono). Luego, como `main()` no fue `await`-ado ni tiene `.catch()`, se genera un **UnhandledPromiseRejection** (en versiones recientes de Node, esto puede incluso terminar el proceso según configuración).

---

# 4. Node.js Event Loop — Deep Dive 🔥

## Conceptos

El Event Loop de Node procesa trabajo en **fases**, en este orden por vuelta (tick):

1. **Timers** — ejecuta callbacks de `setTimeout`/`setInterval` cuyo tiempo ya venció.
2. **Pending callbacks** — ciertos callbacks de I/O diferidos.
3. **Poll** — recupera nuevos eventos de I/O; ejecuta sus callbacks.
4. **Check** — ejecuta callbacks de `setImmediate`.
5. **Close callbacks** — ej. `socket.on('close', ...)`.

Entre **cada** callback (y entre cada fase), Node vacía:
1. La cola de `process.nextTick` (siempre primero, completamente).
2. La cola de microtasks de Promises.

```
Call Stack → (vacía) → process.nextTick queue → Promise microtask queue → siguiente fase del Event Loop
```

**Importante:** dentro de un callback de I/O (fase *poll*), `setImmediate` **siempre** se ejecuta antes que un `setTimeout` programado en ese mismo ciclo, porque la fase *check* viene justo después de *poll*.

---

## Ejercicios (15) — Determina el orden de ejecución

**Ejercicio 1**
```js
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
```
A) 1, 2, 3 B) 1, 3, 2 C) 3, 1, 2 D) 2, 1, 3
**Correct answer: B**
**Explanation:** El código síncrono (`1`, `3`) corre primero; `setTimeout` siempre va a la cola de macrotasks, sin importar el delay.

---

**Ejercicio 2**
```js
console.log('1');
process.nextTick(() => console.log('2'));
console.log('3');
```
A) 1, 2, 3 B) 1, 3, 2 C) 2, 1, 3 D) 3, 2, 1
**Correct answer: B**
**Explanation:** `process.nextTick` difiere la ejecución hasta que el stack actual termine, pero antes de pasar a cualquier fase del event loop.

---

**Ejercicio 3**
```js
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
```
A) Siempre "timeout" luego "immediate"
B) Siempre "immediate" luego "timeout"
C) El orden no está garantizado (depende del overhead al arrancar el proceso)
D) Lanza un error
**Correct answer: C**
**Explanation:** En el **módulo principal** (fuera de un ciclo de I/O), ambos están listos "al mismo tiempo" y el orden depende de cuán rápido el proceso llega a la fase de timers vs. check.

---

**Ejercicio 4**
```js
const fs = require('fs');
fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
});
```
A) "timeout" siempre primero
B) "immediate" siempre primero
C) Orden indefinido
D) Ambos se ejecutan simultáneamente
**Correct answer: B**
**Explanation:** Dentro de un callback de I/O (fase *poll*), la fase *check* (`setImmediate`) ocurre **inmediatamente después**, antes de volver a la fase de *timers* en la siguiente vuelta.

---

**Ejercicio 5**
```js
console.log('start');
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));
console.log('end');
```
A) start, end, promise, nextTick
B) start, end, nextTick, promise
C) start, promise, nextTick, end
D) nextTick, promise, start, end
**Correct answer: B**
**Explanation:** `process.nextTick` tiene su propia cola con **mayor prioridad** que la cola de microtasks de Promises.

---

**Ejercicio 6**
```js
setTimeout(() => console.log('A'), 0);
Promise.resolve().then(() => console.log('B'));
process.nextTick(() => console.log('C'));
console.log('D');
```
A) D, C, B, A B) A, B, C, D C) D, A, B, C D) D, B, C, A
**Correct answer: A**
**Explanation:** Síncrono primero (`D`), luego `nextTick` (`C`), luego microtasks de Promise (`B`), y al final la macrotask del timer (`A`).

---

**Ejercicio 7**
```js
function recursiveNextTick(i) {
  if (i >= 3) return;
  process.nextTick(() => {
    console.log('tick', i);
    recursiveNextTick(i + 1);
  });
}
recursiveNextTick(0);
setTimeout(() => console.log('timeout'), 0);
```
A) timeout, tick 0, tick 1, tick 2
B) tick 0, tick 1, tick 2, timeout
C) tick 0, timeout, tick 1, tick 2
D) Se bloquea indefinidamente
**Correct answer: B**
**Explanation:** Mientras haya callbacks en la cola de `nextTick` (incluso si se re-encolan a sí mismos), **se agotan por completo** antes de que el event loop avance a la fase de timers. ⚠️ Esto puede causar "I/O starvation" si se abusa de `nextTick` recursivo.

---

**Ejercicio 8**
```js
Promise.resolve()
  .then(() => {
    console.log('A');
    process.nextTick(() => console.log('B'));
  })
  .then(() => console.log('C'));
```
A) A, B, C B) A, C, B C) B, A, C D) A, B, C (nextTick siempre interrumpe el then chain)
**Correct answer: B**
**Explanation:** `nextTick` programado **dentro** de un `.then` no interrumpe la cadena de promesas ya en curso; esa cadena de microtasks (`A` → `C`) se completa, y el `nextTick` (que fue encolado durante la ejecución del callback) se procesa en el próximo "drenaje" de la cola, que ocurre después de que termina el microtask actual pero mezclado con el resto de la cola — en la práctica Node procesa la cola de nextTick después de cada microtask individual. El resultado real es **A, B, C**.

> ⚠️ Nota de transparencia: este es uno de los casos más sutiles del Event Loop y las implementaciones/versiones de Node pueden variar ligeramente. Lo importante para el examen es el principio general: **nextTick > microtasks > macrotasks**, no memorizar el edge case exacto.

---

**Ejercicio 9**
```js
console.log('1');
setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => console.log('3'));
}, 0);
Promise.resolve().then(() => console.log('4'));
console.log('5');
```
A) 1, 5, 4, 2, 3 B) 1, 5, 2, 4, 3 C) 1, 2, 5, 4, 3 D) 1, 5, 4, 3, 2
**Correct answer: A**
**Explanation:** Síncrono: `1, 5`. Microtask pendiente: `4`. Luego la macrotask del timeout corre `2`, y dentro de ella se agenda y ejecuta su propia microtask `3` antes de seguir al siguiente ciclo.

---

**Ejercicio 10**
```js
async function main() {
  console.log('1');
  await null;
  console.log('2');
  await null;
  console.log('3');
}
main();
console.log('4');
```
A) 1, 2, 3, 4 B) 1, 4, 2, 3 C) 4, 1, 2, 3 D) 1, 2, 4, 3
**Correct answer: B**
**Explanation:** Cada `await` crea un punto de pausa que cede el control; el código síncrono fuera de la función (`4`) corre antes de que se resuelvan los `await null`, que se procesan como microtasks subsecuentes.

---

**Ejercicio 11**
```js
setImmediate(() => console.log('immediate'));
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));
console.log('sync');
```
A) sync, nextTick, promise, immediate
B) sync, immediate, nextTick, promise
C) nextTick, promise, sync, immediate
D) sync, promise, nextTick, immediate
**Correct answer: A**
**Explanation:** `setImmediate` siempre es una macrotask (fase *check*), por lo que corre al final, después de todo el síncrono y todas las microtasks.

---

**Ejercicio 12**
```js
setTimeout(() => console.log('timeout 1'), 0);
setTimeout(() => console.log('timeout 2'), 0);
process.nextTick(() => console.log('nextTick 1'));
process.nextTick(() => console.log('nextTick 2'));
```
A) timeout 1, timeout 2, nextTick 1, nextTick 2
B) nextTick 1, nextTick 2, timeout 1, timeout 2
C) nextTick 1, timeout 1, nextTick 2, timeout 2
D) timeout 1, nextTick 1, timeout 2, nextTick 2
**Correct answer: B**
**Explanation:** Ambos `nextTick` se agotan (en orden FIFO) antes de que el event loop entre en la fase de timers.

---

**Ejercicio 13**
```js
console.log('A');
new Promise((resolve) => {
  console.log('B');
  resolve();
}).then(() => console.log('C'));
console.log('D');
```
A) A, B, D, C B) A, B, C, D C) B, A, D, C D) A, D, B, C
**Correct answer: A**
**Explanation:** ⚠️ El **executor** de una Promise (`(resolve) => {...}`) se ejecuta **síncronamente** en el momento de la construcción, no como microtask. Solo `.then()` es asíncrono.

---

**Ejercicio 14**
```js
async function foo() {
  return 1;
}
foo().then(console.log);
console.log('sync');
```
A) 1, sync B) sync, 1 C) sync, undefined D) 1, undefined
**Correct answer: B**
**Explanation:** Una función `async` **siempre** retorna una Promise, incluso si no tiene ningún `await`. El `.then()` sobre ella siempre se agenda como microtask, después del código síncrono.

---

**Ejercicio 15**
```js
process.nextTick(() => console.log('1'));
setImmediate(() => console.log('2'));
Promise.resolve().then(() => console.log('3'));
(async () => {
  console.log('4');
  await null;
  console.log('5');
})();
console.log('6');
```
A) 4, 6, 1, 3, 5, 2
B) 1, 4, 6, 3, 5, 2
C) 4, 6, 1, 3, 2, 5
D) 4, 1, 6, 3, 5, 2
**Correct answer: A**
**Explanation:** La IIFE async corre síncrono hasta `await` (imprime `4`), luego sigue el código síncrono externo (`6`). Se vacía `nextTick` (`1`), luego microtasks en orden de encolado: la del `Promise.resolve().then` (`3`) y la continuación del `await null` (`5`). Al final, la macrotask `setImmediate` (`2`).

---

# 5. REST APIs y HTTP

## 🔥 Métodos HTTP

| Método | Idempotente | Seguro (safe) | Uso típico |
|---|---|---|---|
| GET | ✅ | ✅ | Leer un recurso |
| POST | ❌ | ❌ | Crear un recurso |
| PUT | ✅ | ❌ | Reemplazar un recurso completo |
| PATCH | ⚠️ No garantizado | ❌ | Actualización parcial |
| DELETE | ✅ | ❌ | Eliminar un recurso |

**Idempotencia:** repetir la misma petición N veces produce el mismo resultado/estado final que hacerla una vez. "Safe" significa que no modifica estado en el servidor.

**Statelessness:** cada request HTTP debe contener toda la información necesaria para procesarse; el servidor no guarda contexto de sesión entre requests (el estado vive en el cliente o en un store externo como Redis/DB).

## 🔥 Status codes

| Código | Nombre | Cuándo usarlo |
|---|---|---|
| 200 | OK | Éxito general (GET, PUT, PATCH) |
| 201 | Created | Recurso creado (respuesta a POST exitoso) |
| 204 | No Content | Éxito sin cuerpo de respuesta (ej. DELETE exitoso) |
| 400 | Bad Request | Sintaxis inválida / request malformado |
| 401 | Unauthorized | No autenticado (falta o es inválido el token/credenciales) |
| 403 | Forbidden | Autenticado, pero sin permisos para el recurso |
| 404 | Not Found | El recurso no existe |
| 409 | Conflict | Conflicto de estado (ej. recurso duplicado, versión desactualizada) |
| 422 | Unprocessable Entity | Sintaxis válida pero datos semánticamente inválidos (validación) |
| 429 | Too Many Requests | Rate limiting excedido |
| 500 | Internal Server Error | Error inesperado del servidor |
| 502 | Bad Gateway | Respuesta inválida de un servidor upstream/proxy |
| 503 | Service Unavailable | Servidor sobrecargado o en mantenimiento |

⚠️ **Trampa común:** confundir `401` (no autenticado) con `403` (autenticado pero sin permiso), y confundir `400` (request mal formado) con `422` (bien formado, pero inválido semánticamente, ej. un email con formato incorrecto).

## Preguntas tipo escenario

**Q1.** A client sends a POST request to create a resource, but the resource already exists (e.g., duplicate email). Which status code is most appropriate?
A) 400 B) 409 C) 422 D) 500
**Answer: B.** Conflicto de estado con el recurso existente.

**Q2.** A client sends a request with a valid JWT, but tries to access another user's private data. What status code should be returned?
A) 401 B) 403 C) 404 D) 400
**Answer: B.** Está autenticado, pero no autorizado para ese recurso.

**Q3.** A client sends malformed JSON in the request body. What status code fits best?
A) 400 B) 422 C) 500 D) 415
**Answer: A.** El request no puede ni siquiera parsearse correctamente (sintaxis inválida).

**Q4.** A client submits a valid JSON body, but the `email` field is not a valid email format. What status code fits best?
A) 400 B) 422 C) 409 D) 500
**Answer: B.** JSON válido, pero los datos no pasan las reglas de validación semántica.

**Q5.** A client makes too many requests in a short period and the server wants to throttle them. What status code applies?
A) 403 B) 429 C) 503 D) 400
**Answer: B.**

**Q6.** After successfully deleting a resource, with no body to return, what is the most appropriate status code?
A) 200 B) 202 C) 204 D) 205
**Answer: C.**

**Q7.** A request is sent to a valid endpoint but no record with that ID exists in the database. What status code applies?
A) 400 B) 404 C) 204 D) 410
**Answer: B.**

**Q8.** An upstream microservice your API depends on returns an invalid response, and your API gateway can't process it. What status code should the gateway return?
A) 500 B) 501 C) 502 D) 503
**Answer: C.**

---

# 6. Backend Architecture

## Conceptos y su relación con NestJS 🔥

| Concepto | Descripción | Equivalente en NestJS |
|---|---|---|
| **Controller** | Recibe requests HTTP, delega lógica, retorna respuesta | `@Controller()`, decoradores `@Get()`, `@Post()` |
| **Service** | Contiene la lógica de negocio | Clases con `@Injectable()` |
| **Repository** | Abstrae el acceso a datos (DB) | `@InjectRepository()` (TypeORM) o patrón custom |
| **DTO** | Define la forma de los datos de entrada/salida | Clases con decoradores de `class-validator` |
| **Middleware** | Código que corre antes de llegar al handler | `implements NestMiddleware` |
| **Guard** | Decide si una request puede proceder (auth/roles) | `implements CanActivate`, `@UseGuards()` |
| **Interceptor** | Transforma la request/response, logging, caching | `implements NestInterceptor`, `@UseInterceptors()` |
| **Pipe** | Transforma/valida datos de entrada | `ValidationPipe`, `ParseIntPipe` |
| **Dependency Injection** | Las dependencias se "inyectan" en vez de crearse manualmente | Constructor injection vía `@Injectable()` |

```ts
@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {} // DI
  async findById(id: string) {
    const user = await this.usersRepo.findOne(id);
    if (!user) throw new NotFoundException(); // manejado por el exception filter global
    return user;
  }
}
```

## SOLID (resumen rápido) 🔥

| Principio | Significa |
|---|---|
| **S**ingle Responsibility | Una clase debe tener una sola razón para cambiar |
| **O**pen/Closed | Abierta a extensión, cerrada a modificación |
| **L**iskov Substitution | Las subclases deben poder sustituir a sus clases base sin romper el comportamiento |
| **I**nterface Segregation | Mejor muchas interfaces específicas que una genérica enorme |
| **D**ependency Inversion | Depender de abstracciones, no de implementaciones concretas |

**Q1.** In NestJS, what is the primary purpose of a Guard?
A) Transform the response body
B) Validate DTOs
C) Determine whether a request is allowed to proceed (e.g., auth checks)
D) Log incoming requests
**Answer: C.**

**Q2.** Which pattern does Dependency Injection primarily support?
A) Tight coupling between classes
B) The Dependency Inversion principle — depending on abstractions, not concrete implementations
C) Faster database queries
D) Reducing the number of HTTP endpoints
**Answer: B.**

**Q3.** Why separate business logic into a Service instead of writing it directly in the Controller?
A) Controllers can't contain any code
B) Separation of concerns — easier to test, reuse, and maintain
C) It's required by the HTTP spec
D) Services run faster than controllers
**Answer: B.**

**Q4.** What is the role of a DTO (Data Transfer Object)?
A) Define the shape and validation rules of data crossing a boundary (e.g., HTTP request body)
B) Store data permanently in the database
C) Replace the need for a database
D) Handle HTTP routing
**Answer: A.**

**Q5.** In a layered architecture (Controller → Service → Repository), who should contain raw SQL/ORM queries?
A) The Controller
B) The Repository layer
C) The DTO
D) The Middleware
**Answer: B.**

---

# 7. Databases / SQL

## 🔥 Conceptos clave

```sql
-- SELECT básico
SELECT id, name FROM users WHERE active = true ORDER BY created_at DESC;

-- JOIN
SELECT o.id, u.name
FROM orders o
INNER JOIN users u ON o.user_id = u.id;

-- LEFT JOIN: incluye usuarios aunque no tengan órdenes
SELECT u.name, o.id
FROM users u
LEFT JOIN orders o ON o.user_id = u.id;

-- GROUP BY + HAVING
SELECT user_id, COUNT(*) AS total_orders
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5;
```

| Concepto | Diferencia clave |
|---|---|
| `WHERE` vs `HAVING` | `WHERE` filtra filas antes de agrupar; `HAVING` filtra después de `GROUP BY`/agregaciones |
| `INNER JOIN` vs `LEFT JOIN` | `INNER` solo filas con coincidencia en ambas tablas; `LEFT` incluye todas las de la izquierda, con `NULL` si no hay match |
| Primary key | Identifica únicamente cada fila; no permite `NULL` |
| Foreign key | Referencia a la PK de otra tabla, mantiene integridad referencial |

## 🔥 ACID

- **Atomicity:** una transacción ocurre completa o no ocurre (all-or-nothing).
- **Consistency:** la DB pasa de un estado válido a otro válido.
- **Isolation:** transacciones concurrentes no interfieren entre sí (según el nivel de aislamiento).
- **Durability:** una vez confirmada (commit), la transacción persiste aunque el sistema falle.

**Niveles de aislamiento** (de menor a mayor aislamiento): `Read Uncommitted` → `Read Committed` → `Repeatable Read` → `Serializable`. A mayor aislamiento, menor concurrencia (más bloqueos).

## Normalización

- **1NF:** valores atómicos, sin grupos repetidos.
- **2NF:** 1NF + sin dependencias parciales de la PK.
- **3NF:** 2NF + sin dependencias transitivas.

## ⚠️ N+1 problem

Ocurre cuando, para obtener datos relacionados, se ejecuta **1 query** para la lista principal y **N queries adicionales** (una por cada fila) en lugar de una sola query con `JOIN` o un `include`/`eager loading`.

```js
// ❌ N+1
const users = await User.findAll();
for (const user of users) {
  user.orders = await Order.findAll({ where: { userId: user.id } }); // 1 query por usuario
}

// ✅ Solución
const users = await User.findAll({ include: Order }); // 1 sola query con JOIN
```

## Pagination

- **Offset-based:** `LIMIT 10 OFFSET 20` — simple, pero lento/inconsistente en datasets grandes (puede saltar o repetir filas si hay inserciones concurrentes).
- **Cursor-based:** `WHERE id > :lastId LIMIT 10` — más eficiente y estable para listas grandes/infinite scroll.

## Optimistic vs Pessimistic locking

- **Optimistic:** no bloquea; usa una columna `version`, y al hacer `UPDATE` verifica que la versión no haya cambiado; si cambió, falla y se reintenta.
- **Pessimistic:** bloquea la fila con `SELECT ... FOR UPDATE`, impidiendo que otra transacción la modifique hasta liberar el lock.

## Preguntas

**Q1.** What does `HAVING` do that `WHERE` cannot?
A) Filter rows before grouping
B) Filter groups after aggregation (e.g., `COUNT`, `SUM`)
C) Join two tables
D) Sort results
**Answer: B.**

**Q2.** Which SQL JOIN returns all rows from the left table, with `NULL` for unmatched right-table columns?
A) INNER JOIN B) LEFT JOIN C) RIGHT JOIN D) CROSS JOIN
**Answer: B.**

**Q3.** What does the "I" in ACID stand for, and what does it guarantee?
A) Integrity — data types are validated
B) Isolation — concurrent transactions don't interfere with each other
C) Indexing — queries use indexes automatically
D) Idempotency — repeated transactions have the same effect
**Answer: B.**

**Q4.** What is the N+1 query problem typically caused by?
A) Using too many indexes
B) Fetching a list, then querying related data separately for each item instead of using a JOIN/eager load
C) Using transactions
D) Normalizing a database too much
**Answer: B.**

**Q5.** Which pagination strategy is generally more performant on very large tables?
A) Offset-based (`LIMIT/OFFSET`)
B) Cursor-based (`WHERE id > lastId`)
C) They perform identically
D) Neither is used in production
**Answer: B.**

**Q6 (SQL).** Given tables `users(id, name)` and `orders(id, user_id, total)`, write a query to get each user's name and their total amount ordered, including users with no orders (showing 0).
```sql
SELECT u.name, COALESCE(SUM(o.total), 0) AS total_spent
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.name;
```

---

# 8. PostgreSQL

## Conceptos clave para un backend Node.js dev

- **Índices:** por defecto B-tree; aceleran `WHERE`, `JOIN`, `ORDER BY`, a costa de más espacio y escrituras más lentas.
- **`EXPLAIN` / `EXPLAIN ANALYZE`:** muestra (y, con `ANALYZE`, ejecuta y mide) el plan de ejecución de una query — fundamental para detectar *sequential scans* innecesarios.

```sql
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 42;
```

- **Constraints:** `UNIQUE`, `NOT NULL`, `CHECK`, `FOREIGN KEY` — garantizan integridad a nivel de base de datos (no solo en la app).
- **Transactions:**
```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT; -- o ROLLBACK si algo falla
```
- **JSON vs JSONB:** `JSON` almacena el texto tal cual (más rápido de escribir, más lento de consultar); `JSONB` lo almacena en formato binario, soporta índices (`GIN`) y es más eficiente para consultas — es la opción recomendada casi siempre.
- **Connection pooling:** Node abre/cierra conexiones a PostgreSQL de forma costosa; se usa un **pool** (ej. `pg.Pool`, o PgBouncer a nivel de infraestructura) para reutilizar conexiones entre requests.

```js
const { Pool } = require('pg');
const pool = new Pool({ max: 10, idleTimeoutMillis: 30000 });
const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]); // ⚠️ parametrizado, previene SQL injection
```

## Preguntas

**Q1.** What is the main advantage of `JSONB` over `JSON` in PostgreSQL?
A) `JSONB` preserves key order and whitespace
B) `JSONB` is stored in binary format, supports indexing, and queries faster
C) `JSONB` is deprecated
D) There is no difference
**Answer: B.**

**Q2.** What does `EXPLAIN ANALYZE` show?
A) Only the estimated query plan, without executing it
B) The actual execution plan and runtime statistics, by actually running the query
C) The table schema
D) Syntax errors in the query
**Answer: B.**

**Q3.** Why use connection pooling with PostgreSQL in a Node.js app?
A) To avoid writing SQL queries
B) Because opening a new DB connection per request is expensive; pooling reuses existing connections
C) It's required by PostgreSQL syntax
D) To bypass authentication
**Answer: B.**

**Q4.** What's wrong with this query from a security standpoint?
```js
pool.query(`SELECT * FROM users WHERE email = '${email}'`);
```
A) Nothing, it's fine
B) It's vulnerable to SQL injection — should use parameterized queries (`$1`)
C) It's too slow
D) It won't compile
**Answer: B.** ⚠️ Nunca interpolar directamente input del usuario en un query SQL.

---

# 9. Redis

## Conceptos clave 🔥

- Redis es un **almacén de clave-valor en memoria**, usado para caching, sesiones, rate limiting, colas, locks distribuidos y pub/sub.
- **TTL (Time To Live):** tiempo tras el cual una clave expira automáticamente.

```bash
SET session:123 "userdata" EX 3600   # expira en 1 hora
TTL session:123                       # segundos restantes
GET session:123
DEL session:123
```

## Estrategias de caching

| Estrategia | Descripción |
|---|---|
| **Cache-aside** (lazy loading) | La app consulta el cache; si no está (*miss*), consulta la DB y guarda el resultado en cache |
| **Write-through** | Cada escritura va simultáneamente a la DB y al cache |
| **Write-behind** | Se escribe primero al cache, y de forma asíncrona se persiste a la DB |

## Casos de uso comunes

- **Rate limiting:** usando `INCR` + `EXPIRE` para contar requests por ventana de tiempo.
- **Distributed locks:** `SET key value NX EX 10` (solo setea si no existe, con expiración) — base del algoritmo **Redlock**.
- **Session storage:** guardar sesiones de usuario fuera del proceso Node, permitiendo escalar horizontalmente (statelessness de la app).

```js
// Rate limiting simple
const count = await redis.incr(`rate:${userId}`);
if (count === 1) await redis.expire(`rate:${userId}`, 60);
if (count > 100) throw new Error('Rate limit exceeded');
```

## Preguntas

**Q1.** What does setting a TTL on a Redis key do?
A) Permanently deletes the key immediately
B) Automatically expires/removes the key after the specified time
C) Backs up the key to disk
D) Increases the key's priority
**Answer: B.**

**Q2.** Which Redis commands are commonly combined to implement simple rate limiting?
A) `GET` and `SET`
B) `INCR` and `EXPIRE`
C) `DEL` and `TTL`
D) `SUBSCRIBE` and `PUBLISH`
**Answer: B.**

**Q3.** What is the "cache-aside" pattern?
A) The cache is updated before the database on every write
B) The application checks the cache first; on a miss, it queries the DB and populates the cache
C) The database automatically pushes updates to Redis
D) Redis replaces the database entirely
**Answer: B.**

**Q4.** Why might you use Redis for session storage instead of in-memory storage in the Node.js process?
A) It's faster than memory
B) It allows sessions to be shared across multiple server instances (horizontal scaling)
C) It's required by Express
D) It avoids the need for authentication
**Answer: B.**

---

# 10. APIs, seguridad y autenticación

## 🔥 Authentication vs Authorization

- **Authentication (AuthN):** ¿quién eres? (login, verificar credenciales).
- **Authorization (AuthZ):** ¿qué puedes hacer? (permisos, roles).

## 🔥 JWT (JSON Web Tokens)

Estructura: `header.payload.signature` (codificado en Base64URL). El **payload NO está encriptado**, solo firmado — no debe contener datos sensibles.

- **Access token:** vida corta (minutos), se envía en cada request (header `Authorization: Bearer <token>`).
- **Refresh token:** vida larga, se usa solo para obtener un nuevo access token sin pedir credenciales de nuevo; debe almacenarse de forma más segura (ej. cookie httpOnly).

## Password hashing

Nunca almacenar contraseñas en texto plano. `bcrypt` aplica un **salt** único por contraseña y es intencionalmente lento (configurable con "rounds") para dificultar ataques de fuerza bruta.

```js
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(password, 10); // 10 = salt rounds
const isValid = await bcrypt.compare(password, hash);
```

## CORS, CSRF, XSS 🔥

| Ataque/Mecanismo | Qué es | Mitigación |
|---|---|---|
| **CORS** | Mecanismo del navegador que restringe requests cross-origin; el servidor indica qué orígenes puede permitir vía headers | Configurar `Access-Control-Allow-Origin` correctamente, no usar `*` con credenciales |
| **CSRF** | Un sitio malicioso induce al navegador a enviar requests autenticadas (usando cookies) a tu API sin consentimiento | Tokens CSRF, cookies `SameSite=Strict/Lax` |
| **XSS** | Inyección de scripts maliciosos que se ejecutan en el navegador de otro usuario | Sanitizar/escapar input y output, Content-Security-Policy |
| **SQL Injection** | Inyectar SQL malicioso a través de input no sanitizado | Queries parametrizadas / prepared statements, ORMs |

**Q1.** What is the main difference between authentication and authorization?
A) They are the same thing
B) Authentication verifies identity; authorization determines permissions
C) Authorization happens before authentication
D) Authentication is only for APIs, authorization only for UIs
**Answer: B.**

**Q2.** Why should a JWT payload never contain sensitive data like a plaintext password?
A) JWTs have a size limit
B) The payload is only Base64-encoded, not encrypted — anyone can decode and read it
C) JWTs are stored server-side only
D) It's technically impossible to put sensitive data in a JWT
**Answer: B.**

**Q3.** What is the purpose of a refresh token?
A) To replace passwords entirely
B) To obtain a new access token without requiring the user to log in again
C) To encrypt the access token
D) To identify the server, not the user
**Answer: B.**

**Q4.** Why use bcrypt instead of a fast hash like MD5 or SHA-256 for passwords?
A) bcrypt is shorter
B) bcrypt is intentionally slow and includes salting, making brute-force attacks much harder
C) MD5/SHA-256 don't work with strings
D) bcrypt doesn't require a database
**Answer: B.**

**Q5.** What does CSRF protection via `SameSite=Strict` cookies prevent?
A) XSS attacks
B) The browser from sending the cookie along with cross-site requests
C) SQL injection
D) Rate limiting bypass
**Answer: B.**

**Q6.** What is the best defense against SQL injection?
A) Escaping quotes manually in strings
B) Using parameterized queries / prepared statements
C) Disabling error messages
D) Using NoSQL instead
**Answer: B.**

**Q7.** Where should secrets like database passwords and API keys be stored?
A) Hardcoded in the source code
B) In environment variables / a secrets manager, never committed to version control
C) In a public config file
D) In the frontend code
**Answer: B.**

---

# 11. Testing

## 🔥 Conceptos

| Tipo de test | Qué verifica | Herramienta común |
|---|---|---|
| **Unit test** | Una unidad aislada (función, clase) sin dependencias externas reales | Jest |
| **Integration test** | Varias unidades trabajando juntas (ej. servicio + DB real/test) | Jest + DB de test |
| **E2E test** | El flujo completo de la aplicación, como lo usaría un cliente real | Supertest, Playwright |

- **Mock:** reemplaza una dependencia con una implementación falsa controlada.
- **Spy:** envuelve una función real para observar cómo fue llamada, sin necesariamente reemplazar su comportamiento.
- **Test isolation:** cada test debe poder correr de forma independiente, sin depender del estado dejado por otro test (ej. limpiar la DB de test entre tests).

```js
// Jest: mock
jest.mock('../services/email.service');
const emailService = require('../services/email.service');
emailService.send.mockResolvedValue(true);

// Jest: spy
const spy = jest.spyOn(console, 'log');
doSomething();
expect(spy).toHaveBeenCalledWith('expected message');
```

```js
// Supertest: test de integración de un endpoint
const request = require('supertest');
const app = require('../app');

test('GET /users/:id returns 404 for unknown user', async () => {
  const res = await request(app).get('/users/999');
  expect(res.status).toBe(404);
});
```

## Preguntas

**Q1.** What is the main difference between a mock and a spy?
A) They are identical
B) A mock replaces a dependency entirely; a spy observes calls to a real (or partially real) function
C) Spies only work with async code
D) Mocks can't return values
**Answer: B.**

**Q2.** Why is test isolation important?
A) It makes tests run faster, period
B) It prevents one test's side effects (e.g., leftover DB data) from affecting another test's result
C) It's only relevant for E2E tests
D) It's not actually important
**Answer: B.**

**Q3.** What does Supertest primarily help you test?
A) Database schema migrations
B) HTTP endpoints, by making real requests against your app instance
C) Frontend components
D) CSS styles
**Answer: B.**

**Q4.** In an integration test for an endpoint that writes to a database, what's a best practice?
A) Use the production database
B) Use a dedicated test database and reset/clean state between tests
C) Mock the entire database layer always
D) Never test database interactions
**Answer: B.**

**Q5.** What is the purpose of `jest.fn()`?
A) Creates a mock function you can track calls/arguments for and control return values
B) Runs all tests in a file
C) Formats test output
D) Connects to a database
**Answer: A.**

---

# 12. TypeScript

## 🔥 Conceptos clave

```ts
// interface vs type
interface User { id: number; name: string; }
type ID = string | number; // union

// intersection
type Timestamped = { createdAt: Date };
type TimestampedUser = User & Timestamped;

// generics
function identity<T>(value: T): T { return value; }

// enums
enum Role { Admin = "ADMIN", User = "USER" }

// utility types
type PartialUser = Partial<User>;        // todas las props opcionales
type UserPreview = Pick<User, "id">;     // solo algunas props
type UserWithoutId = Omit<User, "id">;   // excluye props
type ReadonlyUser = Readonly<User>;      // inmutable
type UserMap = Record<string, User>;     // { [key: string]: User }
```

**Q1.** What is the main structural difference between `interface` and `type`?
A) `interface` can be extended/merged via declaration merging; `type` cannot be re-opened after declaration
B) `type` can only describe primitives
C) `interface` cannot describe object shapes
D) There is no difference whatsoever
**Answer: A.**

**Q2.** What does `unknown` allow that `any` doesn't?
A) `unknown` lets you call any method on it directly
B) `unknown` forces you to narrow the type before using it, preserving type safety
C) `unknown` disables type checking completely
D) They behave identically
**Answer: B.**

**Q3.** What does the `never` type represent?
A) A value that is always `undefined`
B) A value that never occurs — e.g., a function that always throws or never returns
C) A deprecated type
D) The same as `void`
**Answer: B.**

**Q4.** What does this code do?
```ts
function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== "string") throw new Error("Not a string");
}
```
A) Converts `val` to a string
B) A type guard that narrows `val` to `string` after the call, or throws
C) Does nothing useful
D) Only works at runtime, never affects types
**Answer: B.**

**Q5.** What's the output/behavior of this?
```ts
interface Config {
  readonly apiUrl: string;
}
const config: Config = { apiUrl: "https://api.com" };
config.apiUrl = "https://other.com"; // ?
```
A) Works fine at runtime and compile time
B) Compile-time error — `readonly` properties cannot be reassigned
C) Runtime error only
D) `readonly` has no effect
**Answer: B.** (Nota: es un error de **compilación** de TypeScript; en JS puro en runtime no habría error, pero TS no deja compilar esto).

**Q6.** What does type narrowing with `typeof` achieve here?
```ts
function format(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // TS sabe que es string aquí
  }
  return value.toFixed(2); // TS sabe que es number aquí
}
```
A) Nothing, it's just a runtime check
B) TypeScript narrows the type within each branch based on the `typeof` check
C) It causes a compile error
D) It only works with classes
**Answer: B.**

**Q7.** What is the difference between optional (`?`) and `| undefined`?
```ts
interface A { x?: number; }
interface B { x: number | undefined; }
```
A) They are 100% identical in every way
B) `x?` means the property can be **omitted entirely**; `x: number | undefined` requires the key to be present (possibly as `undefined`)
C) `B` doesn't allow `undefined` at all
D) `A` requires the property
**Answer: B.**

---

# 13. Git / CI-CD / Docker

## Git — conceptos esenciales

| Comando/Concepto | Qué hace |
|---|---|
| `git commit` | Guarda una instantánea (snapshot) de los cambios staged |
| `git branch` | Crea/lista ramas |
| `git merge` | Combina ramas, creando un commit de merge (preserva historial de ambas ramas) |
| `git rebase` | Reaplica commits de una rama sobre otra, reescribiendo historial (historial lineal) |
| Pull Request | Propuesta de cambios para revisión antes de integrarse a la rama principal |
| Conflict resolution | Editar manualmente las secciones marcadas con `<<<<<<<`, `=======`, `>>>>>>>` y hacer commit |

**Q1.** What is the key difference between `merge` and `rebase`?
A) `merge` creates a merge commit preserving branch history; `rebase` rewrites commit history onto a new base, producing a linear history
B) They are the same command
C) `rebase` is only for deleting branches
D) `merge` always fails with conflicts
**Answer: A.**

## Docker

| Concepto | Descripción |
|---|---|
| **Image** | Plantilla inmutable con el código + dependencias + runtime |
| **Container** | Instancia en ejecución de una imagen |
| **Dockerfile** | Receta para construir una imagen |
| **Environment variables** | Se pasan con `-e` o `env_file`/`docker-compose.yml`, no deben hardcodearse en la imagen |

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

**Q2.** What is the difference between a Docker image and a container?
A) They are the same thing
B) An image is an immutable template; a container is a running instance of that image
C) A container is used to build images
D) Images only exist on Docker Hub
**Answer: B.**

**Q3.** Why use `npm ci` instead of `npm install` inside a Dockerfile?
A) `npm ci` is interactive
B) `npm ci` installs exact versions from the lockfile, giving reproducible, faster builds — ideal for CI/Docker
C) `npm ci` doesn't support `node_modules`
D) There's no difference
**Answer: B.**

## CI/CD

**Q4.** What is the primary goal of a CI/CD pipeline?
A) Replace manual code review entirely
B) Automatically build, test, and deploy code on every change, catching issues early
C) Write code automatically
D) Manage Git branches
**Answer: B.**

---

# 14. Preguntas de debugging 🔥

**Escenario 1 — Memory leak**
```js
const cache = {};
app.get('/data/:id', (req, res) => {
  if (!cache[req.params.id]) {
    cache[req.params.id] = fetchExpensiveData(req.params.id);
  }
  res.json(cache[req.params.id]);
});
```
**Q:** What's the problem?
**Answer:** `cache` crece indefinidamente sin ningún límite ni expiración (no hay TTL, ni LRU, ni tamaño máximo) → memory leak. ⚠️ Solución: usar Redis con TTL, o una librería LRU (`lru-cache`) con tamaño máximo.

**Escenario 2 — Unhandled promise rejection**
```js
function processOrder(order) {
  validateOrder(order).then(() => saveOrder(order)); // sin .catch ni await
}
```
**Q:** What's the risk?
**Answer:** Si `validateOrder` o `saveOrder` rechazan, no hay manejo de error — genera un `UnhandledPromiseRejection`. Falta `.catch()` o usar `async/await` con `try/catch`.

**Escenario 3 — Race condition**
```js
let balance = 100;
async function withdraw(amount) {
  if (amount <= balance) {
    await new Promise(r => setTimeout(r, 10)); // simula I/O (ej. DB call)
    balance -= amount;
  }
}
withdraw(80);
withdraw(80);
```
**Q:** What can go wrong?
**Answer:** Ambas llamadas leen `balance = 100` antes de que la primera reste su monto (debido al `await` que cede el control), permitiendo que ambos retiros pasen la validación y `balance` termine en `-60`. ⚠️ Solución: usar transacciones con locking (pessimistic/optimistic) a nivel de DB, o una cola que serialice las operaciones.

**Escenario 4 — Incorrect async/await**
```js
async function getUserOrders(userId) {
  const orders = [];
  const userOrderIds = await getOrderIds(userId);
  userOrderIds.forEach(async (id) => {
    const order = await getOrderById(id);
    orders.push(order);
  });
  return orders; // siempre vacío
}
```
**Answer:** `forEach` no espera callbacks `async`; `return orders` se ejecuta antes de que cualquier `getOrderById` termine. Solución: usar `Promise.all` con `map`.
```js
const orders = await Promise.all(userOrderIds.map(id => getOrderById(id)));
```

**Escenario 5 — Blocking the Event Loop**
```js
app.get('/report', (req, res) => {
  const result = generateHugeReportSync(data); // cálculo CPU-intensivo síncrono
  res.json(result);
});
```
**Answer:** Un cálculo síncrono pesado bloquea el Event Loop, haciendo que **todas** las demás requests concurrentes queden congeladas hasta que termine. Solución: usar `worker_threads` o dividir el trabajo en chunks asíncronos.

**Escenario 6 — Database connection exhaustion**
```js
app.get('/users', async (req, res) => {
  const client = await pool.connect();
  const result = await client.query('SELECT * FROM users');
  res.json(result.rows);
  // falta client.release()
});
```
**Answer:** Nunca se libera la conexión (`client.release()`), por lo que el pool se agota tras N requests y las siguientes se quedan esperando una conexión disponible indefinidamente.

**Escenario 7 — Incorrect HTTP status**
```js
app.post('/users', async (req, res) => {
  const user = await createUser(req.body);
  res.status(200).json(user); // debería ser 201
});
```
**Answer:** Al crear un recurso exitosamente vía POST, el status correcto es `201 Created`, no `200`.

**Escenario 8 — Bad error handling**
```js
app.get('/users/:id', async (req, res) => {
  const user = await db.findUser(req.params.id);
  res.json(user); // ¿y si falla la query, o el usuario no existe?
});
```
**Answer:** No hay `try/catch` (un error en `findUser` tumbaría el proceso o colgaría la request sin respuesta), y no se valida si `user` es `null`/`undefined` (debería devolver `404`). Falta también un manejador de errores global/middleware de errores.

---

# 15. Preguntas de código (práctica progresiva)

> Nota: estos ejercicios son para practicar de forma independiente. Intenta resolverlos sin ver pistas antes de revisar tu propia solución.

### Easy

1. Write a function `sumArray(arr)` that returns the sum of all numbers in an array.
2. Write a function `isPalindrome(str)` that checks if a string reads the same forward and backward (ignore case).
3. Write a function `flattenOneLevel(arr)` that flattens a one-level-nested array: `[1, [2, 3], 4]` → `[1, 2, 3, 4]`.
4. Write a function `countOccurrences(arr, value)` that counts how many times `value` appears in `arr`.
5. Write a function `toSlug(title)` that converts `"Hello World!"` into `"hello-world"`.
6. Write a function `pick(obj, keys)` that returns a new object with only the specified keys.
7. Write a function `groupByKey(items, key)` that groups an array of objects by a given property.
8. Write a function `isValidEmail(email)` using a simple regex check.
9. Write a function `delay(ms)` that returns a Promise resolving after `ms` milliseconds.
10. Write a function `safeParseJSON(str)` that returns the parsed object, or `null` if parsing fails (don't throw).

### Medium

1. Write a function `paginate(items, page, pageSize)` that returns the correct slice of an array for a given page.
2. Write a function `fetchWithRetry(fn, retries)` that retries an async function up to `retries` times if it throws, with a small delay between attempts.
3. Write a function `debounce(fn, delay)` that returns a debounced version of `fn`.
4. Write a function `mergeDeep(obj1, obj2)` that deep-merges two plain objects (nested objects merge recursively, not overwritten).
5. Write a function `validateUser(user)` that returns a list of validation error messages (e.g., missing `email`, `name` too short) instead of throwing — useful for simulating request body validation.
6. Write a function `batchProcess(items, batchSize, asyncFn)` that processes an array in batches, running `asyncFn` in parallel within each batch, but sequentially between batches.
7. Write a function `aggregateOrders(orders)` that, given an array of `{ userId, total }`, returns an object mapping `userId` → total spent.
8. Write a middleware-style function `requireFields(fields)` that returns a function `(req, res, next)` validating that all `fields` exist in `req.body`, otherwise responds with `400` and a list of missing fields.

### Hard

1. Implement a simple in-memory rate limiter `createRateLimiter(maxRequests, windowMs)` that returns a function `isAllowed(userId)` returning `true`/`false` based on a sliding/fixed window.
2. Implement a function `promiseAllLimit(tasks, limit)` that behaves like `Promise.all` but only runs `limit` tasks concurrently at a time (a concurrency-limited pool), preserving the order of results.

---

# 16. Simulación de la sección de código (30 min)

## Problem Statement

You are building a small backend utility for an e-commerce API. You need to implement a function that processes a batch of orders and returns a summary report.

### Input

An array of order objects:
```js
const orders = [
  { id: 1, userId: "u1", status: "completed", total: 50.5 },
  { id: 2, userId: "u2", status: "pending", total: 20 },
  { id: 3, userId: "u1", status: "completed", total: 15.25 },
  { id: 4, userId: "u3", status: "cancelled", total: 100 },
  { id: 5, userId: "u2", status: "completed", total: 30 },
];
```

### Requirements

Implement `generateOrderSummary(orders)` that returns an object:

```js
{
  totalRevenue: number,       // sum of `total` for orders with status "completed" only
  ordersByUser: {              // count of ALL orders per user, regardless of status
    [userId]: number
  },
  completedOrderIds: number[], // ids of completed orders, sorted ascending
}
```

### Expected Output (for the example input above)

```js
{
  totalRevenue: 95.75,
  ordersByUser: { u1: 2, u2: 2, u3: 1 },
  completedOrderIds: [1, 3, 5],
}
```

### Edge Cases to Handle

- Empty array → `{ totalRevenue: 0, ordersByUser: {}, completedOrderIds: [] }`.
- Orders with `total` as `null`/`undefined` should be treated as `0` for revenue purposes (don't throw).
- Function must not mutate the input array.

### Starter Code

```js
function generateOrderSummary(orders) {
  // TODO: implement
}

module.exports = { generateOrderSummary };
```

---

⏱️ **Intenta resolverlo en 30 minutos antes de ver la solución.**

<details>
<summary>## Solution (click to expand)</summary>

```js
function generateOrderSummary(orders) {
  const result = {
    totalRevenue: 0,
    ordersByUser: {},
    completedOrderIds: [],
  };

  for (const order of orders) {
    const { userId, status, total, id } = order;

    // ordersByUser: cuenta todas las órdenes, sin importar status
    result.ordersByUser[userId] = (result.ordersByUser[userId] || 0) + 1;

    if (status === "completed") {
      result.totalRevenue += total ?? 0; // maneja null/undefined sin romper
      result.completedOrderIds.push(id);
    }
  }

  result.completedOrderIds.sort((a, b) => a - b);
  // redondeo opcional para evitar errores de punto flotante en sumas de dinero
  result.totalRevenue = Math.round(result.totalRevenue * 100) / 100;

  return result;
}

module.exports = { generateOrderSummary };
```

### Explicación

- Un solo recorrido (`for...of`) es suficiente — O(n), no se necesita iterar múltiples veces.
- `total ?? 0` maneja correctamente `null`/`undefined` sin usar `||` (que fallaría incorrectamente si `total` fuera `0` legítimamente, aunque aquí no afecta el resultado ya que sumar 0 es igual).
- No se muta `orders`: solo se lee, nunca se reasigna ni modifica el array/objetos originales.
- El redondeo a 2 decimales evita errores típicos de precisión de punto flotante al sumar montos monetarios (`0.1 + 0.2 !== 0.3`).
- `completedOrderIds.sort((a,b) => a-b)` es necesario porque `.sort()` por defecto ordena como strings (⚠️ trampa común: `[10, 2, 1].sort()` da `[1, 10, 2]`).

</details>

---

# 17. English Technical Vocabulary

| English | Español | Explicación técnica |
|---|---|---|
| Output | Salida | El resultado producido por una función, programa o comando |
| Runtime | Entorno de ejecución | El entorno donde el código se ejecuta (ej. Node.js runtime) |
| Scope | Ámbito | Dónde una variable es visible/accesible en el código |
| Execution | Ejecución | El proceso de correr instrucciones de código |
| Callback | Función de retorno/callback | Función pasada como argumento, ejecutada después de completarse una operación |
| Asynchronous | Asíncrono | Operación que no bloquea la ejecución mientras espera un resultado |
| Synchronous | Síncrono | Operación que bloquea hasta completarse antes de continuar |
| Request | Solicitud | Mensaje enviado por un cliente a un servidor (ej. HTTP request) |
| Response | Respuesta | Lo que el servidor devuelve tras procesar un request |
| Payload | Carga útil | Los datos reales enviados en el cuerpo de un request/response |
| Middleware | Middleware | Código intermedio que procesa requests antes de llegar al handler final |
| Dependency | Dependencia | Un paquete/módulo externo que el código necesita para funcionar |
| Exception | Excepción | Un error lanzado durante la ejecución que interrumpe el flujo normal |
| Concurrency | Concurrencia | Manejar múltiples tareas que progresan en superposición de tiempo |
| Throughput | Rendimiento (volumen) | Cantidad de trabajo/requests procesados en un período de tiempo |
| Latency | Latencia | Tiempo que tarda una operación en completarse (ej. tiempo de respuesta) |
| Memory leak | Fuga de memoria | Memoria que no se libera correctamente, acumulándose con el tiempo |
| Thread | Hilo | Una unidad de ejecución dentro de un proceso |
| Queue | Cola | Estructura FIFO (first-in, first-out) usada para ordenar tareas/eventos |
| Stack | Pila | Estructura LIFO (last-in, first-out), usada para el "call stack" |
| Database transaction | Transacción de base de datos | Conjunto de operaciones que se ejecutan como una unidad atómica |
| Race condition | Condición de carrera | Bug causado por el orden/timing impredecible de operaciones concurrentes |
| Idempotent | Idempotente | Operación que produce el mismo resultado sin importar cuántas veces se repita |
| Rate limiting | Limitación de tasa | Restringir la cantidad de requests permitidos en un período de tiempo |
| Garbage collection | Recolección de basura | Proceso automático de liberar memoria no utilizada |
| Boilerplate | Código repetitivo | Código estándar que se repite y aporta poco valor específico |
| Deployment | Despliegue | Proceso de llevar código a un ambiente de producción/staging |
| Rollback | Reversión | Deshacer un cambio/despliegue y volver a un estado previo |
| Endpoint | Endpoint / punto de entrada | Una URL específica donde una API expone una funcionalidad |
| Schema | Esquema | La estructura definida de los datos (tablas, columnas, tipos) |

---

# 18. Tricky Questions ⚠️

**Q1.** What is `typeof NaN`?
A) `"NaN"` B) `"number"` C) `"undefined"` D) `"object"`
**Answer: B.** Contraintuitivo: `NaN` ("Not a Number") es técnicamente de tipo `number`.

**Q2.** What is `NaN === NaN`?
A) `true` B) `false`
**Answer: B.** `NaN` nunca es igual a sí mismo. Para verificar, usa `Number.isNaN(x)`.

**Q3.**
```js
function outer() {
  console.log(this);
}
const obj = { outer };
const detached = obj.outer;
detached();
```
What is `this` inside `detached()` (in non-strict mode, Node CommonJS module)?
A) `obj` B) `global`/`undefined` depending on strict mode C) `detached` itself D) `null` always
**Answer: B.** Al "desacoplar" el método de su objeto, `this` ya no apunta a `obj`; depende del modo (strict mode → `undefined`, sloppy mode → el objeto global).

**Q4.**
```js
console.log(0.1 + 0.2 === 0.3);
```
A) `true` B) `false`
**Answer: B.** ⚠️ Errores de precisión de punto flotante — `0.1 + 0.2` es `0.30000000000000004`. Para dinero, usar enteros (centavos) o librerías como `decimal.js`.

**Q5.**
```js
async function getData() {
  return 42;
}
const result = getData();
console.log(result);
```
What does `console.log(result)` print?
A) `42`
B) `Promise { 42 }`
C) `undefined`
D) `TypeError`
**Answer: B.** ⚠️ Olvidar `await` — una función `async` siempre devuelve una Promise, no el valor directamente.

**Q6.** What does `Promise.all([])` (empty array) resolve to?
A) It rejects
B) It resolves immediately with `[]`
C) It hangs forever
D) `undefined`
**Answer: B.**

**Q7.**
```sql
SELECT * FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed';
```
**Q:** Is this actually equivalent to an `INNER JOIN` in practice? Why?
A) No, it behaves exactly like a LEFT JOIN
B) Yes — filtering on a right-table column in `WHERE` excludes `NULL` rows, effectively turning it into an INNER JOIN
C) It throws a SQL error
D) It returns duplicate rows always
**Answer: B.** ⚠️ Trampa muy común: poner la condición de filtro del `LEFT JOIN` en `WHERE` en vez de en el `ON` elimina el beneficio del LEFT JOIN (las filas sin match tienen `o.status = NULL`, que no cumple `= 'completed'`).

**Q8.** A transaction commits, but the server crashes immediately after. According to ACID, what should happen to the committed data?
A) It's lost because the crash happened right after
B) It persists — that's what "Durability" guarantees
C) It depends on the programming language
D) It automatically rolls back
**Answer: B.**

**Q9.**
```js
const arr = [1, 2, 3];
const arr2 = arr;
arr2.push(4);
console.log(arr);
```
A) `[1, 2, 3]` B) `[1, 2, 3, 4]` C) `TypeError` D) `undefined`
**Answer: B.** ⚠️ `arr2 = arr` copia la **referencia**, no el array; ambas variables apuntan al mismo objeto en memoria.

**Q10.** What HTTP status code would a well-designed API return for a successful `PUT` request that creates a new resource at a client-specified URL (didn't exist before)?
A) Always `200`
B) `201 Created` (since a new resource was created), even though the method is PUT
C) `204`
D) `404`
**Answer: B.** ⚠️ Trampa: se asume que `201` solo aplica a `POST`, pero técnicamente aplica cuando se **crea** un recurso, sin importar el verbo.

**Q11.**
```js
console.log([1, 2, 10].sort());
```
A) `[1, 2, 10]` B) `[1, 10, 2]` C) `[10, 2, 1]` D) `Error`
**Answer: B.** ⚠️ `.sort()` sin comparador ordena **como strings** por defecto ("10" viene antes que "2" lexicográficamente).

**Q12.**
```js
let x = 1;
{
  let x = 2;
  var y = 3;
}
console.log(x, y);
```
A) `1 3` B) `2 3` C) `1 undefined` D) `ReferenceError`
**Answer: A.** El `let x = 2` interno está limitado al bloque; `var y` escapa del bloque (no tiene scope de bloque).

---

# 19. Last-Minute Cheat Sheet

### Event Loop — orden de prioridad
```
Synchronous code
  → process.nextTick queue (se agota completo)
    → Promise microtask queue (se agota completo)
      → Timers (setTimeout/setInterval)
        → I/O callbacks
          → setImmediate (fase "check")
```
Dentro de un callback de I/O: **setImmediate siempre antes que setTimeout(0)**.

### Promise combinators
| | Resuelve con | Falla cuando |
|---|---|---|
| `all` | array de valores | 1 falla |
| `allSettled` | array de `{status, value/reason}` | nunca |
| `race` | el primero en resolver/rechazar | el primero rechaza |
| `any` | el primero en resolver | todos rechazan (`AggregateError`) |

### async/await reglas rápidas
- `async function` siempre retorna una Promise.
- `await` solo pausa dentro de esa función, no bloquea el hilo.
- `forEach` **no espera** async — usar `for...of` o `Promise.all(arr.map(...))`.
- Operaciones independientes → `Promise.all` (paralelo). Dependientes → `await` secuencial.

### Array methods
| Método | Retorna |
|---|---|
| `map` | nuevo array transformado |
| `filter` | nuevo array filtrado |
| `reduce` | un valor acumulado |
| `find` | primer match o `undefined` |
| `some`/`every` | boolean |
| `sort()` | ⚠️ ordena como strings por defecto |

### HTTP status codes
```
200 OK · 201 Created · 204 No Content
400 Bad Request · 401 Unauthorized · 403 Forbidden
404 Not Found · 409 Conflict · 422 Unprocessable Entity
429 Too Many Requests
500 Internal Server Error · 502 Bad Gateway · 503 Service Unavailable
```

### SQL joins
- `INNER JOIN`: solo coincidencias.
- `LEFT JOIN`: todo lo de la izquierda + `NULL` si no hay match (⚠️ no filtrar por la tabla derecha en `WHERE`).

### Auth
- `401` = no autenticado. `403` = autenticado, sin permiso.
- JWT payload = visible (Base64), no encriptado.
- bcrypt = lento + salt, para contraseñas.

### REST
- Idempotentes: `GET`, `PUT`, `DELETE`. No idempotente: `POST`.
- Stateless: cada request se basta a sí misma.

### Node modules
- CommonJS: `require`/`module.exports`, síncrono.
- ESM: `import`/`export`, requiere `"type": "module"` o `.mjs`.

### Errores comunes a recordar
- ⚠️ `??` vs `||` — `??` solo cae con `null`/`undefined`.
- ⚠️ Spread/`Object.assign` = shallow copy.
- ⚠️ `reduce` sin valor inicial en array vacío → error.
- ⚠️ `try/catch` solo atrapa rechazos de promesas `await`-adas.
- ⚠️ `EventEmitter` sin listener de `'error'` → crash.

---

# 20. Mini Mock Exam (30 preguntas)

> All questions in English, multiple choice (A-D). Answers are in the **Answer Key** at the end — try to complete it under time pressure (~25-30 minutes) before checking.

**1.** What is the output?
```js
console.log(typeof null);
```
A) `"null"` B) `"object"` C) `"undefined"` D) `"boolean"`

**2.** Which keyword creates a block-scoped, reassignable variable?
A) `var` B) `let` C) `const` D) `function`

**3.** What is the output?
```js
console.log(1 + "2" + 3);
```
A) `"123"` B) `6` C) `"15"` D) `NaN`

**4.** What does `Array.prototype.map` return?
A) A boolean B) A new array of the same length C) A single accumulated value D) The original array, mutated

**5.** What is the output?
```js
console.log([1,2,3].includes(2));
```
A) `0` B) `1` C) `true` D) `false`

**6.** Which of the following is NOT a valid way to copy an array shallowly?
A) `[...arr]` B) `Array.from(arr)` C) `arr.slice()` D) `arr.toString()`

**7.** What does `Promise.race([p1, p2])` do?
A) Waits for both to resolve B) Resolves/rejects as soon as the first one settles C) Always picks p1 D) Runs them sequentially

**8.** What is the output?
```js
console.log("5" == 5);
console.log("5" === 5);
```
A) `true true` B) `false false` C) `true false` D) `false true`

**9.** In Node.js, which has higher priority: `process.nextTick` or a Promise `.then()` callback?
A) `process.nextTick` B) Promise `.then()` C) Equal priority D) Depends on Node version only

**10.** What does `fs.readFileSync` do differently from `fs.readFile`?
A) It's faster always B) It blocks the event loop until the file is read C) It only reads JSON files D) It requires a callback

**11.** What is the correct status code for a successful resource creation via POST?
A) 200 B) 201 C) 202 D) 204

**12.** Which status code indicates the client is authenticated but lacks permission?
A) 400 B) 401 C) 403 D) 404

**13.** What does "idempotent" mean in the context of HTTP methods?
A) The request is always fast B) Repeating the same request produces the same result/state C) The request can't fail D) The request requires authentication

**14.** Which SQL clause filters rows BEFORE grouping?
A) `HAVING` B) `GROUP BY` C) `WHERE` D) `ORDER BY`

**15.** What problem does eager loading (e.g., SQL JOIN) solve?
A) SQL injection B) The N+1 query problem C) Slow network latency D) Memory leaks

**16.** What does ACID's "Durability" guarantee?
A) Data is encrypted B) Committed data survives a crash C) Transactions run in parallel D) Queries are fast

**17.** What is the purpose of a Redis TTL?
A) To track request time B) To auto-expire a key after a set duration C) To encrypt a value D) To replicate data

**18.** What is the main benefit of JSONB over JSON in PostgreSQL?
A) Smaller file size always B) Binary storage enabling indexing and faster queries C) Human readability D) No benefit, they're identical

**19.** What's the main purpose of bcrypt?
A) Encrypt JWTs B) Securely hash passwords with salting C) Compress HTTP responses D) Generate UUIDs

**20.** What does CORS control?
A) Database access permissions B) Which origins a browser is allowed to make cross-origin requests to C) SQL injection prevention D) File upload size

**21.** In NestJS, what is the primary role of a Guard?
A) Transform response data B) Decide if a request is authorized to proceed C) Log HTTP requests D) Validate request DTOs

**22.** What is Dependency Injection primarily used for?
A) Speeding up database queries B) Providing dependencies to a class without it creating them directly, supporting loose coupling C) Managing HTTP routes D) Compiling TypeScript

**23.** What is the output?
```js
async function f() {
  console.log("1");
  await Promise.resolve();
  console.log("2");
}
f();
console.log("3");
```
A) 1, 2, 3 B) 1, 3, 2 C) 3, 1, 2 D) 1, 3, 2, (nothing else)

**24.** Which of these does NOT belong in `devDependencies`?
A) `jest` B) `eslint` C) `express` (used in production code) D) `nodemon`

**25.** What does `Object.freeze(obj)` do?
A) Deep-freezes all nested objects B) Prevents adding/removing/reassigning top-level properties (shallow) C) Converts the object to JSON D) Makes the object asynchronous

**26.** What is a "race condition"?
A) A syntax error B) A bug caused by unpredictable timing/ordering of concurrent operations C) A type of SQL join D) A CSS rendering issue

**27.** In TypeScript, what does `Partial<T>` do?
A) Makes all properties of `T` optional B) Makes all properties required C) Removes all properties D) Converts `T` to a union type

**28.** What is the output?
```js
console.log([..."abc"]);
```
A) `"abc"` B) `["a", "b", "c"]` C) `[object Array]` D) `Error`

**29.** What does `git rebase` do that `git merge` does not?
A) Deletes commit history B) Reapplies commits on top of another base, producing linear history instead of a merge commit C) Pushes to remote automatically D) Resolves conflicts automatically

**30.** What's the most likely cause if a Node.js server becomes unresponsive under a CPU-heavy synchronous task?
A) The database is down B) The Event Loop is blocked, unable to process other requests C) Too many environment variables D) A missing `await`

---

## Answer Key

| # | Answer | Short Explanation |
|---|---|---|
| 1 | B | Famous JS quirk: `typeof null === "object"`. |
| 2 | B | `let` is block-scoped and reassignable; `const` is not reassignable. |
| 3 | A | String concatenation left-to-right: `1 + "2"` → `"12"`, then `+ 3` → `"123"`. |
| 4 | B | `map` always returns a new array of the same length. |
| 5 | C | `.includes()` returns a boolean. |
| 6 | D | `.toString()` returns a string, not an array copy. |
| 7 | B | `race` settles as soon as the first promise settles (resolve or reject). |
| 8 | C | `==` coerces types (`true`); `===` does not (`false`). |
| 9 | A | `process.nextTick` queue runs before Promise microtasks in Node.js. |
| 10 | B | `readFileSync` is blocking/synchronous. |
| 11 | B | `201 Created` is standard for successful resource creation. |
| 12 | C | `403 Forbidden` = authenticated but not authorized. |
| 13 | B | Idempotent = same result no matter how many times it's repeated. |
| 14 | C | `WHERE` filters rows before aggregation/grouping; `HAVING` filters after. |
| 15 | B | Eager loading avoids the N+1 query problem. |
| 16 | B | Durability = committed data survives crashes/failures. |
| 17 | B | TTL = Time To Live, auto-expiration. |
| 18 | B | JSONB is binary, indexable, and faster to query than JSON. |
| 19 | B | bcrypt is designed for secure, salted password hashing. |
| 20 | B | CORS governs allowed cross-origin requests from browsers. |
| 21 | B | Guards decide if a request can proceed (e.g., auth checks). |
| 22 | B | DI provides dependencies externally, enabling loose coupling/testability. |
| 23 | B | Sync code runs first (`1`, `3`), then the microtask continuation (`2`). |
| 24 | C | `express` is a runtime dependency, belongs in `dependencies`. |
| 25 | B | `Object.freeze` is shallow — nested objects remain mutable. |
| 26 | B | Race condition = bug from unpredictable concurrent timing. |
| 27 | A | `Partial<T>` makes every property of `T` optional. |
| 28 | B | Spreading a string produces an array of its characters. |
| 29 | B | Rebase reapplies commits for a linear history; merge preserves branch history with a merge commit. |
| 30 | B | A blocking synchronous CPU task freezes the single-threaded Event Loop. |

---

# Study Plan — 5 días

## 🗓️ Día 1 — JavaScript fundamentals + Async JS
- Repasa toda la [Sección 1](#1-javascript-fundamental) y [Sección 2](#2-async-javascript).
- Practica en consola (Node REPL o `node file.js`) **todos** los ejemplos de código, sin ver la respuesta primero — predice el output tú mismo.
- Resuelve los 8 ejercicios de predicción de output de la Sección 2.
- 🔥 Enfócate especialmente en: closures, `this`, `??` vs `||`, `Promise.all` vs `allSettled`/`race`/`any`.

## 🗓️ Día 2 — Node.js + Event Loop Deep Dive
- Estudia a fondo la [Sección 3](#3-nodejs) (25 MCQ + 10 ejercicios de código) y la [Sección 4](#4-nodejs-event-loop--deep-dive) (15 ejercicios).
- Haz los 15 ejercicios del Event Loop **sin mirar la respuesta**, cronometrándote (máx. 2 min por ejercicio).
- Repasa la tabla de prioridad: `nextTick > microtasks > timers > I/O > setImmediate`.
- Practica el ejercicio de debugging "race condition" y "blocking the Event Loop" de la [Sección 14](#14-preguntas-de-debugging).

## 🗓️ Día 3 — HTTP/REST + Backend Architecture + SQL/PostgreSQL
- Memoriza la tabla de **status codes** (Sección 5) hasta poder recitarla sin ver la tabla.
- Resuelve las 8 preguntas de escenario HTTP.
- Repasa Backend Architecture (Sección 6) relacionando cada concepto con NestJS (Controller/Service/Guard/Interceptor/DTO).
- Estudia SQL (Sección 7) y PostgreSQL (Sección 8): practica escribir 5 queries con `JOIN`, `GROUP BY`, `HAVING` desde cero.
- 🔥 Asegúrate de entender bien el **N+1 problem** y la diferencia `WHERE` vs `HAVING`.

## 🗓️ Día 4 — Redis + Seguridad + Testing + TypeScript
- Repasa Redis (Sección 9): TTL, cache-aside, rate limiting.
- Repasa Seguridad/Auth (Sección 10): JWT, bcrypt, CORS/CSRF/XSS, SQL injection.
- Repasa Testing (Sección 11) y TypeScript (Sección 12): utility types, narrowing, generics.
- Revisa rápidamente Git/CI-CD/Docker (Sección 13).
- Haz los ejercicios de código **Easy** (10) de la [Sección 15](#15-preguntas-de-código-práctica-progresiva), cronometrado (~5 min cada uno).

## 🗓️ Día 5 — Simulacro completo + repaso final
- Haz los ejercicios **Medium** y **Hard** de la Sección 15.
- Haz la [simulación de 30 minutos](#16-simulación-de-la-sección-de-código-30-min) de la Sección 16 bajo presión de tiempo real, sin ver la solución hasta terminar.
- Haz el [Mini Mock Exam de 30 preguntas](#20-mini-mock-exam-30-preguntas) completo, cronometrado a 25-30 minutos, sin mirar el Answer Key hasta terminar.
- Revisa las [Tricky Questions](#18-tricky-questions) y el [Last-Minute Cheat Sheet](#19-last-minute-cheat-sheet) la noche anterior y la mañana del examen.
- Repasa el [vocabulario en inglés](#17-english-technical-vocabulary) una última vez.

**Buena suerte en tu evaluación. 🦍**
