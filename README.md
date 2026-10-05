# 🦍 Guía de Estudio — Backend Node.js (Entrevista Técnica / TestGorilla)

> Guía orientada 100% a aprobar una prueba técnica de **Backend Developer Node.js** y a poder defender tus respuestas en una entrevista. No contiene preguntas reales filtradas de ninguna plataforma — está construida a partir de los temas con mayor probabilidad de aparecer en este tipo de evaluaciones.

**Estructura de la prueba:**

| # | Sección | Preguntas | Tiempo |
|---|---|---|---|
| 1 | Node & JavaScript | 15 | 22 min |
| 2 | Conceptos generales de Node.js | 7 | 11 min |
| 3 | SQL | 5 | 11 min |
| 4 | Microservicios | — | — |

**Cómo leer cada concepto:**

| Campo | Qué significa |
|---|---|
| **Qué es** | Explicación directa, sin rodeos |
| **Por qué importa en una entrevista** | Qué está evaluando realmente el entrevistador/la prueba |
| **Ejemplo** | Código real para fijar el concepto |
| **Pregunta típica** | Cómo suele formularse en una prueba tipo TestGorilla |
| **Trampa común** | El error que casi todos cometen |
| **Nivel de importancia** | 🔥🔥🔥🔥🔥 imprescindible → 🔥 complementario |

---

## Tabla de Contenidos

1. [Node & JavaScript](#1-node--javascript)
2. [Conceptos generales de Node.js](#2-conceptos-generales-de-nodejs)
3. [SQL](#3-sql)
4. [Microservicios](#4-microservicios)
5. [Respuestas y Explicaciones (preguntas de práctica)](#respuestas-y-explicaciones)
6. [Simulacro de Entrevista Backend Node.js](#simulacro-de-entrevista-backend-nodejs)
7. [Soluciones del Simulacro](#soluciones-del-simulacro)
8. [Top 50 Conceptos que Debo Dominar](#top-50-conceptos-que-debo-dominar)
9. [Plan de Estudio — 7 días](#plan-de-estudio--7-días)

---

# 1. NODE & JAVASCRIPT

## 1.1 JavaScript fundamental

### `var` vs `let` vs `const`

**Qué es:** tres formas de declarar variables, con distinto *scope* y comportamiento de reasignación.

**Por qué importa en una entrevista:** es la base de casi todas las preguntas de "qué imprime esto" — si no dominas esto, fallas cascadas de preguntas de closures, loops y hoisting.

**Ejemplo:**
```javascript
var a = 1;    // scope de función, se puede redeclarar y reasignar
let b = 2;    // scope de bloque, se puede reasignar, NO redeclarar
const c = 3;  // scope de bloque, NO se puede reasignar (el binding, no el contenido)

const obj = { x: 1 };
obj.x = 2; // ✅ válido — const protege la referencia, no el contenido
```

**Pregunta típica de entrevista:**
> ¿Qué imprime este código?
> ```javascript
> for (var i = 0; i < 3; i++) {
>   setTimeout(() => console.log(i), 0);
> }
> ```

**Respuesta correcta:** `3, 3, 3` — con `var` todas las funciones comparten la misma variable `i`, que termina en `3` cuando corren los `setTimeout`. Si fuera `let`, imprimiría `0, 1, 2` porque cada iteración crea un nuevo binding de bloque.

**Trampa común:** asumir que `let`/`const` y `var` se comportan igual dentro de loops con callbacks asíncronos.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

| Concepto | Diferencia | Cuándo utilizar |
|---|---|---|
| `var` | Scope de función, hoisting a `undefined`, redeclarable | Evitarlo en código moderno |
| `let` | Scope de bloque, reasignable, TDZ | Variables que cambian de valor (contadores, acumuladores) |
| `const` | Scope de bloque, no reasignable, TDZ | Default recomendado — todo lo que no necesites reasignar |

---

### Scope, Hoisting y Temporal Dead Zone (TDZ)

**Qué es:** el *scope* determina dónde es visible una variable (global, de función, de bloque). El *hoisting* es el comportamiento donde las declaraciones se procesan antes de ejecutar el código línea a línea. La *TDZ* es el período entre el inicio del scope y la línea donde `let`/`const` se declaran, durante el cual la variable existe pero no se puede usar.

**Por qué importa en una entrevista:** es la pregunta "trampa" más repetida en pruebas de JS — predecir si algo imprime `undefined` o lanza `ReferenceError`.

**Ejemplo:**
```javascript
console.log(typeof foo); // "function" — las function declarations se hoistean completas
function foo() {}

console.log(bar); // undefined — var se hoistea con valor undefined
var bar = 1;

console.log(baz); // ReferenceError — TDZ, let/const se hoistean pero no son accesibles antes de su línea
let baz = 2;
```

**Pregunta típica de entrevista:**
> ¿Qué sucede al ejecutar `console.log(a); let a = 10;`?

**Respuesta correcta:** `ReferenceError: Cannot access 'a' before initialization` — `a` está en la TDZ.

**Trampa común:** creer que `let` imprime `undefined` como `var`.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

### Tipos primitivos vs tipos de referencia

**Qué es:** JavaScript tiene 7 tipos primitivos (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) que se copian **por valor**, y tipos de referencia (`object`, `array`, `function`) que se copian **por referencia** (la variable guarda un puntero a la misma ubicación en memoria).

**Por qué importa en una entrevista:** explica por qué mutar un objeto "compartido" afecta a otras variables, y es la base de shallow vs deep copy.

**Ejemplo:**
```javascript
let a = 5;
let b = a;
b = 10;
console.log(a); // 5 — tipo primitivo, copia por valor

let obj1 = { x: 1 };
let obj2 = obj1;
obj2.x = 99;
console.log(obj1.x); // 99 — misma referencia en memoria
```

**Pregunta típica de entrevista:**
> ¿Por qué `obj1.x` cambia si solo modifiqué `obj2`?

**Respuesta correcta:** porque `obj2 = obj1` no copia el objeto, copia la **referencia** — ambas variables apuntan al mismo objeto en memoria.

**Trampa común:** pensar que `=` siempre "copia" el valor, sin distinguir primitivos de objetos.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

### `null`, `undefined`, `NaN` y truthy/falsy

**Qué es:**
- `undefined`: una variable fue declarada pero no se le asignó valor (o un parámetro no fue pasado).
- `null`: ausencia de valor asignada **intencionalmente** por el programador.
- `NaN` ("Not a Number"): resultado de una operación numérica inválida; de tipo `number`.
- Valores *falsy*: `false, 0, -0, 0n, "", null, undefined, NaN`. Todo lo demás es *truthy* (incluyendo `[]`, `{}`, `"0"`).

**Por qué importa en una entrevista:** los tipos "raros" de JS (`typeof null === "object"`, `NaN !== NaN`) son trampas clásicas de selección múltiple.

**Ejemplo:**
```javascript
console.log(typeof null);      // "object" — bug histórico de JS, nunca corregido
console.log(typeof undefined); // "undefined"
console.log(NaN === NaN);      // false — usar Number.isNaN(x) para verificar
console.log(Boolean([]));      // true — un array vacío es truthy
console.log(Boolean("0"));     // true — un string no vacío es truthy
```

**Pregunta típica de entrevista:**
> ¿Cuál de estos valores es *falsy*? `[]`, `"0"`, `0n`, `"false"`

**Respuesta correcta:** `0n` (BigInt cero). Los otros tres son truthy aunque "parezcan" vacíos o cero.

**Trampa común:** asumir que `[]` o `"0"` son falsy porque "se ven vacíos".

**Nivel de importancia:** 🔥🔥🔥🔥

---

### `==` vs `===`

**Qué es:** `==` compara con **coerción de tipos** (convierte los operandos a un tipo común antes de comparar); `===` compara **tipo y valor** sin conversión.

**Por qué importa en una entrevista:** es la pregunta de igualdad más repetida, y la excepción `null == undefined` es una trampa frecuente.

**Ejemplo:**
```javascript
console.log(1 == "1");          // true  (coerción: "1" → 1)
console.log(1 === "1");         // false (tipos distintos)
console.log(null == undefined); // true  (única excepción "especial")
console.log(null === undefined);// false
console.log('0' == false);      // true  (ambos se convierten a 0)
```

**Pregunta típica de entrevista:**
> ¿Qué retorna `null == undefined`?

**Respuesta correcta:** `true` — es la única comparación "cruzada" que la especificación de JS trata como igual sin ser el mismo tipo.

**Trampa común:** pensar que `null == undefined` es `false` porque son "diferentes".

**Nivel de importancia:** 🔥🔥🔥🔥🔥

| Concepto | Diferencia | Cuándo utilizar |
|---|---|---|
| `==` | Compara con coerción de tipos | Prácticamente nunca en código de producción |
| `===` | Compara tipo y valor, sin coerción | Siempre — es el default recomendado en linters (`eslint-config-airbnb`, etc.) |

---

### Optional chaining (`?.`) y Nullish coalescing (`??`)

**Qué es:** `?.` evita errores al acceder a propiedades de un objeto que podría ser `null`/`undefined`, cortando la evaluación y devolviendo `undefined`. `??` devuelve el valor derecho **solo** si el izquierdo es `null` o `undefined` (a diferencia de `||`, que cae ante cualquier falsy).

**Por qué importa en una entrevista:** confundir `??` con `||` es el error número uno al validar valores por defecto cuando `0` o `""` son valores legítimos.

**Ejemplo:**
```javascript
const user = { profile: null };
console.log(user.profile?.name); // undefined, no lanza error
console.log(user.profile.name);  // TypeError

const count = 0;
console.log(count || 10); // 10 — ❌ bug si 0 es un valor válido
console.log(count ?? 10); // 0  — ✅ correcto, 0 no es null/undefined
```

**Pregunta típica de entrevista:**
> ¿Qué imprime `console.log(obj.a?.b.c)` si `obj = {}`?

**Respuesta correcta:** `undefined` — `obj.a` es `undefined`, `?.` corta la cadena ahí sin evaluar `.c`. (⚠️ `?.` solo protege el eslabón donde se aplica, no evalúa `.c` porque nunca llega a intentarlo).

**Trampa común:** usar `||` para valores por defecto cuando `0`, `""` o `false` son resultados válidos.

**Nivel de importancia:** 🔥🔥🔥🔥

---

### Destructuring, Spread, Rest y Template literals

**Qué es:** *destructuring* extrae valores de arrays/objetos a variables; *spread* (`...`) expande un iterable; *rest* (`...`) agrupa argumentos/elementos restantes; *template literals* permiten interpolar variables en strings con backticks.

**Ejemplo:**
```javascript
const { a, b = 10, ...rest } = { a: 1, c: 2, d: 3 };
console.log(a, b, rest); // 1 10 { c: 2, d: 3 }

function sum(...nums) { return nums.reduce((acc, n) => acc + n, 0); } // rest
const merged = [...[1, 2], ...[3, 4]]; // spread

const name = "Node";
console.log(`Hola, ${name}!`); // template literal
```

**Pregunta típica de entrevista:**
> ¿Qué imprime este código?
> ```javascript
> const { x: renamed } = { x: 5 };
> console.log(x);
> ```

**Respuesta correcta:** `ReferenceError: x is not defined` — al renombrar con `x: renamed`, la única variable disponible es `renamed`.

**Trampa común:** olvidar que al renombrar en destructuring, el nombre original deja de existir.

**Nivel de importancia:** 🔥🔥🔥🔥

---

## 1.2 Funciones

### Function declaration vs function expression vs arrow function

**Qué es:** tres formas de crear funciones, con diferencias en hoisting y en el manejo de `this`.

| Tipo | Hoisting | `this` propio | Uso recomendado |
|---|---|---|---|
| Function declaration (`function foo(){}`) | Se hoistea completa (se puede llamar antes de su definición) | Sí (dinámico, según cómo se llame) | Funciones de nivel superior |
| Function expression (`const foo = function(){}`) | Solo la variable se hoistea (no la asignación) | Sí | Cuando necesitas asignarla condicionalmente |
| Arrow function (`const foo = () => {}`) | Solo la variable se hoistea | No — hereda `this` del scope léxico | Callbacks, métodos que necesitan `this` del exterior |

**Ejemplo:**
```javascript
saluda(); // ✅ funciona — function declaration se hoistea completa
function saluda() { console.log("hola"); }

saludaExpr(); // ❌ TypeError: saludaExpr is not a function
var saludaExpr = function () { console.log("hola"); };
```

**Pregunta típica de entrevista:**
> ¿Por qué `saludaExpr()` falla si `saluda()` funciona antes de su declaración?

**Respuesta correcta:** `function saluda(){}` se hoistea completa (declaración + definición). `var saludaExpr` solo hoistea la variable con valor `undefined`; la asignación de la función ocurre en tiempo de ejecución, en esa línea.

**Trampa común:** asumir que toda función se puede llamar "antes" de su línea de código, sin distinguir el tipo de declaración.

**Nivel de importancia:** 🔥🔥🔥🔥

---

### Closures

**Qué es:** una función "recuerda" el entorno léxico (las variables) en el que fue creada, incluso después de que ese entorno haya terminado de ejecutarse.

**Por qué importa en una entrevista:** es probablemente el concepto de JavaScript más preguntado en entrevistas backend — se usa para contadores, memoización, módulos privados y el bug clásico de `var` en loops.

**Ejemplo:**
```javascript
function createCounter() {
  let count = 0;           // "atrapada" en el closure
  return function () {
    return ++count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2 — recuerda el estado entre llamadas
```

**Pregunta típica de entrevista:**
> ¿Qué imprime este código?
> ```javascript
> function createFns() {
>   const result = [];
>   for (var i = 0; i < 3; i++) {
>     result.push(() => i);
>   }
>   return result;
> }
> console.log(createFns().map(fn => fn()));
> ```

**Respuesta correcta:** `[3, 3, 3]` — con `var`, las tres funciones comparten el mismo closure sobre la misma `i`, que termina en `3`. Con `let` sería `[0, 1, 2]`, porque cada iteración crea un binding de bloque nuevo.

**Trampa común:** no darse cuenta de que todas las funciones de un loop con `var` comparten la **misma** variable, no una copia por iteración.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

### Funciones de orden superior, funciones puras y side effects

**Qué es:** una función de orden superior recibe y/o retorna otra función (ej. `map`, `filter`, middlewares). Una función pura, dado el mismo input, siempre retorna el mismo output y **no modifica nada fuera de su propio scope** (sin side effects: no muta parámetros, no hace I/O, no depende de variables externas mutables).

**Por qué importa en una entrevista:** las funciones puras son más fáciles de testear y predecir — es un criterio que se evalúa en preguntas de "buenas prácticas" y revisión de código.

**Ejemplo:**
```javascript
// ❌ Impura: muta el array recibido (side effect) y depende de Date.now()
function addTimestamp(arr) {
  arr.push(Date.now());
  return arr;
}

// ✅ Pura: no muta el input, resultado depende solo de los argumentos
function addItem(arr, item) {
  return [...arr, item];
}
```

**Pregunta típica de entrevista:**
> ¿Por qué se prefieren funciones puras en lógica de negocio?

**Respuesta correcta:** son más fáciles de testear (sin mocks de estado externo), predecibles, y seguras de ejecutar en paralelo (sin condiciones de carrera por estado compartido).

**Trampa común:** escribir una función que "parece pura" pero muta uno de sus parámetros por referencia (arrays/objetos).

**Nivel de importancia:** 🔥🔥🔥

---

### IIFE (Immediately Invoked Function Expression)

**Qué es:** una función que se define y ejecuta inmediatamente, creando un scope aislado.

**Ejemplo:**
```javascript
(function () {
  const privado = "no accesible fuera";
  console.log(privado);
})();
```

**Pregunta típica de entrevista:**
> ¿Para qué se usaba un IIFE antes de que existieran los módulos de ES / `let`/`const`?

**Respuesta correcta:** para evitar contaminar el scope global — todas las variables `var` quedaban encapsuladas dentro de la función.

**Trampa común:** confundirlo con una simple declaración de función (la clave es que se **invoca inmediatamente** con `()` al final).

**Nivel de importancia:** 🔥🔥

---

## 1.3 Arrays

| Método | Retorna | Muta el original | Uso típico |
|---|---|---|---|
| `map` | Nuevo array, misma longitud | No | Transformar cada elemento |
| `filter` | Nuevo array, longitud ≤ original | No | Seleccionar elementos |
| `reduce` | Un valor acumulado (de cualquier tipo) | No | Totales, agrupaciones, transformar array → objeto |
| `find` | Primer elemento que cumple, o `undefined` | No | Buscar un elemento |
| `findIndex` | Índice del primer match, o `-1` | No | Buscar una posición |
| `some` | `boolean` | No | ¿Al menos uno cumple? |
| `every` | `boolean` | No | ¿Todos cumplen? |
| `includes` | `boolean` | No | ¿Existe este valor exacto? |
| `sort` | El mismo array, ordenado | **Sí** | Ordenar — ⚠️ sin comparador, ordena como strings |
| `forEach` | `undefined` | No (pero puede mutar vía callback) | Iterar con side effects, sin crear array nuevo |
| `flat(n)` | Nuevo array aplanado `n` niveles | No | Aplanar arrays anidados |
| `flatMap` | `map` + `flat(1)` en un solo paso | No | Transformar y aplanar a la vez |

### `reduce` a fondo

**Qué es:** acumula los elementos de un array en un único valor, aplicando una función `(acumulador, elementoActual) => nuevoAcumulador`.

**Ejemplo:**
```javascript
const nums = [1, 2, 3, 4];
console.log(nums.reduce((acc, n) => acc + n, 0)); // 10

// reduce sin valor inicial: usa el primer elemento como acumulador inicial
console.log([1, 2, 3].reduce((acc, n) => acc + n)); // 6

// ⚠️ array vacío sin valor inicial → TypeError
[].reduce((acc, n) => acc + n); // TypeError: Reduce of empty array with no initial value
```

**Pregunta típica de entrevista:**
> ¿Qué sucede si llamas `[].reduce((acc, n) => acc + n)` sin valor inicial?

**Respuesta correcta:** lanza `TypeError`. Siempre pasar un valor inicial cuando el array podría estar vacío.

**Trampa común:** olvidar el valor inicial de `reduce` y asumir que simplemente retorna `undefined` o `0`.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

### `sort()` sin comparador

**Pregunta típica de entrevista:**
> ¿Qué imprime `console.log([10, 2, 1].sort())`?

**Respuesta correcta:** `[1, 10, 2]` — por defecto, `.sort()` convierte los elementos a **string** y ordena lexicográficamente ("10" viene antes que "2"). Para orden numérico: `arr.sort((a, b) => a - b)`.

**Trampa común:** asumir que `.sort()` ordena numéricamente por defecto.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

### Mutación vs inmutabilidad en arrays

**Qué es:** algunos métodos (`push`, `pop`, `splice`, `sort`, `reverse`) **mutan** el array original; otros (`map`, `filter`, `slice`, spread) retornan uno **nuevo**.

**Por qué importa en una entrevista:** mutar datos compartidos (ej. el estado de una request, un array pasado por parámetro) es una fuente común de bugs difíciles de rastrear.

**Trampa común:** usar `sort()` o `splice()` pensando que no afectan al array original (el que llamó a la función también ve el cambio, por ser una referencia compartida).

**Nivel de importancia:** 🔥🔥🔥🔥

---

## 1.4 Objetos

### Referencias, shallow copy y deep copy

**Qué es:** copiar un objeto con spread (`{...obj}`) u `Object.assign` solo copia el **primer nivel** de propiedades (*shallow copy*); los objetos anidados siguen siendo la misma referencia. Una *deep copy* copia recursivamente todos los niveles.

**Por qué importa en una entrevista:** es, junto con closures, de los bugs más comunes en código real — "modifiqué una copia, pero el original también cambió".

**Ejemplo:**
```javascript
const original = { a: 1, nested: { b: 2 } };
const shallow = { ...original };
shallow.nested.b = 99;
console.log(original.nested.b); // 99 — el spread solo copió el primer nivel

const deep = structuredClone(original); // deep copy nativo (Node 17+)
deep.nested.b = 1;
console.log(original.nested.b); // sigue en 99, no afectado
```

**Pregunta típica de entrevista:**
> ¿Cómo harías una copia profunda (deep copy) de un objeto con datos anidados?

**Respuesta correcta:** `structuredClone(obj)` (nativo, soporta `Date`, `Map`, `Set`, etc.) o, como alternativa legacy, `JSON.parse(JSON.stringify(obj))` (pierde funciones, `undefined`, `Date` se convierte a string).

**Trampa común:** creer que `{...obj}` o `Object.assign({}, obj)` hacen una copia completa/profunda.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

### `Object.keys` / `values` / `entries` / `assign`

```javascript
const user = { id: 1, name: "Ana" };
Object.keys(user);    // ["id", "name"]
Object.values(user);  // [1, "Ana"]
Object.entries(user); // [["id", 1], ["name", "Ana"]]
Object.assign({}, user, { name: "Luis" }); // { id: 1, name: "Luis" } — shallow merge
```

**Nivel de importancia:** 🔥🔥🔥

### Prototype, prototype chain y herencia

**Qué es:** cada objeto en JS tiene un enlace interno `[[Prototype]]` hacia otro objeto, del cual "hereda" propiedades y métodos. Cuando accedes a una propiedad que no existe en el objeto, el motor la busca subiendo por la cadena de prototipos hasta `null`.

**Ejemplo:**
```javascript
function Animal(name) { this.name = name; }
Animal.prototype.speak = function () { return `${this.name} hace un sonido`; };

const dog = new Animal("Rex");
console.log(dog.speak()); // "Rex hace un sonido" — el método vive en el prototipo, no en la instancia
console.log(dog.__proto__ === Animal.prototype); // true
```

**Pregunta típica de entrevista:**
> ¿Dónde se almacena el método `speak`, en cada instancia o en un solo lugar compartido?

**Respuesta correcta:** en `Animal.prototype` — un solo objeto compartido por todas las instancias, no se duplica en memoria por cada `new Animal()`.

**Trampa común:** pensar que las `class` de ES6 son un sistema de herencia distinto — son azúcar sintáctico sobre el mismo sistema de prototipos.

**Nivel de importancia:** 🔥🔥🔥

---

## 1.5 Asincronía (sección de alta prioridad)

### Síncrono vs asíncrono, Callbacks, Promises, async/await

**Qué es:** código **síncrono** bloquea la ejecución hasta terminar; código **asíncrono** permite que el programa siga mientras una operación (I/O, timer, red) se completa en segundo plano. La evolución en JS fue: **callbacks** → **Promises** (objetos que representan un valor futuro, con estados `pending`/`fulfilled`/`rejected`) → **async/await** (azúcar sintáctico sobre Promises, que permite escribir código asíncrono con apariencia síncrona).

**Ejemplo:**
```javascript
// Callback (estilo Node: error-first)
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});

// Promise
fetchUser(1).then(user => console.log(user)).catch(err => console.error(err));

// async/await — mismo comportamiento, más legible
async function run() {
  try {
    const user = await fetchUser(1);
    console.log(user);
  } catch (err) {
    console.error(err);
  }
}
```

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

### Promise combinators: `all`, `allSettled`, `race`, `any`

| Método | Resuelve con | Rechaza cuando | Cuándo usar |
|---|---|---|---|
| `Promise.all` | Array con todos los valores | **Cualquiera** rechaza (fail-fast) | Necesitas TODOS los resultados y un fallo invalida todo |
| `Promise.allSettled` | Array de `{status, value/reason}` por cada una | Nunca rechaza | Necesitas el resultado de todas, aunque algunas fallen |
| `Promise.race` | El primero en resolver **o** rechazar | — | Necesitas la más rápida (ej. timeout vs request) |
| `Promise.any` | El primero en **resolver** (ignora rechazos) | Solo si **todas** rechazan (`AggregateError`) | Necesitas la primera que tenga éxito, de varias fuentes redundantes |

**Ejemplo:**
```javascript
const p1 = Promise.resolve(1);
const p2 = new Promise((_, rej) => setTimeout(() => rej("fail"), 10));
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).catch(e => console.log("all:", e));             // "all: fail"
Promise.allSettled([p1, p2, p3]).then(r => console.log(r.map(x => x.status)));
// ['fulfilled', 'rejected', 'fulfilled']
Promise.race([p1, p2, p3]).then(v => console.log("race:", v));            // "race: 1"
Promise.any([p1, p2, p3]).then(v => console.log("any:", v));              // "any: 1"
```

**Pregunta típica de entrevista:**
> Si todas las promesas pasadas a `Promise.any` rechazan, ¿qué sucede?

**Respuesta correcta:** rechaza con un `AggregateError` que contiene todos los errores individuales.

**Trampa común:** confundir `race` (primero en asentarse, sea éxito o error) con `any` (primero en tener éxito, ignorando errores).

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

### Ejecución secuencial vs paralela ⚠️

**Qué es:** usar `await` uno tras otro ejecuta operaciones **en serie** (el tiempo total se suma); usar `Promise.all` las lanza **en paralelo** (el tiempo total es el de la más lenta).

**Por qué importa en una entrevista:** es un error de rendimiento real y muy común en código de producción, no solo trivia — detectar este patrón demuestra criterio de ingeniería senior.

**Ejemplo:**
```javascript
// ❌ SECUENCIAL — ~2 segundos si cada fetch tarda 1s, y son independientes entre sí
async function sequential() {
  const a = await fetchA();
  const b = await fetchB();
  return [a, b];
}

// ✅ PARALELO — ~1 segundo, ambas inician al mismo tiempo
async function parallel() {
  const [a, b] = await Promise.all([fetchA(), fetchB()]);
  return [a, b];
}
```

**Pregunta típica de entrevista:**
> Si `fetchA` y `fetchB` tardan 1 segundo cada una y son independientes, ¿cuánto tarda `sequential()` vs `parallel()`?

**Respuesta correcta:** `sequential()` ≈ 2s, `parallel()` ≈ 1s.

**Trampa común:** usar `await` dentro de un `for`/`forEach` cuando las operaciones no dependen entre sí.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

### `forEach` con `async`/`await` — error clásico

**Ejemplo:**
```javascript
async function getUserOrders(userId) {
  const orders = [];
  const ids = await getOrderIds(userId);
  ids.forEach(async (id) => {
    const order = await getOrderById(id);
    orders.push(order);
  });
  return orders; // ❌ siempre vacío
}
```

**Pregunta típica de entrevista:**
> ¿Por qué `orders` siempre está vacío al retornar?

**Respuesta correcta:** `forEach` **no espera** callbacks `async` — dispara las N llamadas sin esperarlas y continúa inmediatamente a `return orders`, que corre antes de que cualquier `getOrderById` resuelva.

**Solución:**
```javascript
const orders = await Promise.all(ids.map(id => getOrderById(id)));
```

**Trampa común:** usar `forEach` esperando que se comporte como un `for...of` secuencial.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

### Manejo de errores: `try/catch` con async/await

**Ejemplo:**
```javascript
async function run() {
  try {
    Promise.reject(new Error("boom")); // ❌ sin await
  } catch (e) {
    console.log("caught"); // nunca se ejecuta
  }
}
```

**Pregunta típica de entrevista:**
> ¿Qué pasa si olvidas el `await` antes de una promesa rechazada dentro de un `try/catch`?

**Respuesta correcta:** el `catch` **no la atrapa** — `try/catch` solo captura rechazos de promesas que son `await`-adas (o encadenadas con `.catch()`) dentro del bloque. El resultado es un `UnhandledPromiseRejection`.

**Trampa común:** olvidar el `await` y asumir que el `try/catch` protege de todas formas.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

## 1.6 Event Loop (alta prioridad)

**Qué es:** el mecanismo que permite a JavaScript (single-threaded) manejar operaciones asíncronas. El **Call Stack** ejecuta código síncrono. Las operaciones asíncronas (timers, I/O, requests) se delegan a **Web APIs**/libuv, y sus callbacks se encolan: los de Promises en la **Microtask Queue**, y los de `setTimeout`/I/O/`setImmediate` en la **Macrotask (Callback) Queue**. `process.nextTick` (específico de Node) tiene su propia cola, con la **mayor prioridad de todas**.

**Regla de oro:** después de cada tarea síncrona, el Event Loop vacía **toda** la cola de `nextTick`, luego **toda** la cola de microtasks, antes de procesar la siguiente macrotask.

```
Call Stack → process.nextTick queue (se agota completo)
           → Promise microtask queue (se agota completo)
           → siguiente macrotask (Timers → I/O → setImmediate)
```

**Ejemplo:**
```javascript
console.log("A");
setTimeout(() => console.log("B"), 0);      // macrotask
process.nextTick(() => console.log("C"));   // máxima prioridad
Promise.resolve().then(() => console.log("D")); // microtask
console.log("E");
// Orden: A, E, C, D, B
```

**Pregunta típica de entrevista:**
> ¿Cuál es el orden de ejecución de `console.log`, `setTimeout`, `process.nextTick` y `Promise.then` combinados?

**Respuesta correcta:** código síncrono → `process.nextTick` → microtasks de Promise → macrotasks (`setTimeout`/`setImmediate`).

**Trampa común:** olvidar que `process.nextTick` va **antes** que las microtasks de Promise (a diferencia del navegador, donde no existe `nextTick`).

**Nivel de importancia:** 🔥🔥🔥🔥🔥

### Ejercicios de predicción de orden

**Ejercicio 1**
```javascript
setImmediate(() => console.log('immediate'));
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));
console.log('sync');
```
**Respuesta:** `sync, nextTick, promise, immediate`. `setImmediate` siempre es macrotask (fase *check*), corre al final.

**Ejercicio 2**
```javascript
const fs = require('fs');
fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
});
```
**Respuesta:** `immediate` siempre antes que `timeout` — dentro de un callback de I/O (fase *poll*), la fase *check* (`setImmediate`) ocurre inmediatamente después, antes de volver a *timers*.

**Ejercicio 3**
```javascript
console.log('A');
new Promise((resolve) => {
  console.log('B');
  resolve();
}).then(() => console.log('C'));
console.log('D');
```
**Respuesta:** `A, B, D, C` — ⚠️ el *executor* de una Promise (`(resolve) => {...}`) corre **síncronamente** en el momento de su creación; solo `.then()` es asíncrono.

**Ejercicio 4**
```javascript
async function foo() { return 1; }
foo().then(console.log);
console.log('sync');
```
**Respuesta:** `sync, 1` — una función `async` siempre retorna una Promise (incluso sin `await`), así que su `.then()` siempre se agenda como microtask.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

## 1.7 JavaScript avanzado

### `this`, `call`, `apply`, `bind`

**Qué es:** el valor de `this` depende de **cómo se llama una función**, no de dónde se define (excepto en arrow functions, que heredan `this` léxicamente). `call`/`apply`/`bind` permiten fijar explícitamente el valor de `this`.

| Método | Ejecuta inmediatamente | Argumentos | Retorna |
|---|---|---|---|
| `fn.call(thisArg, a, b)` | Sí | Separados por comas | El resultado de `fn` |
| `fn.apply(thisArg, [a, b])` | Sí | Como array | El resultado de `fn` |
| `fn.bind(thisArg, a, b)` | No | Separados por comas | Una **nueva función** con `this` fijo |

**Ejemplo:**
```javascript
const obj = {
  name: "Node",
  regular: function () { return this.name; },
  arrow: () => { return this.name; },
};
console.log(obj.regular()); // "Node"
console.log(obj.arrow());   // undefined — hereda el this del módulo, no de obj

function greet() { return `Hola, ${this.name}`; }
const user = { name: "Ana" };
console.log(greet.call(user));  // "Hola, Ana"
const boundGreet = greet.bind(user);
console.log(boundGreet());      // "Hola, Ana"
```

**Pregunta típica de entrevista:**
> ¿Por qué `obj.arrow()` retorna `undefined` en vez de `"Node"`?

**Respuesta correcta:** las arrow functions no tienen su propio `this` — heredan el del contexto léxico donde se definieron (el módulo), no el de `obj`.

**Trampa común:** usar arrow functions como métodos de un objeto esperando que `this` apunte al objeto.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

### Clases, constructor, métodos estáticos, getters/setters

**Ejemplo:**
```javascript
class Counter {
  static count = 0; // compartido por todas las instancias, vive en la clase
  #value = 0;       // campo privado

  constructor() { Counter.count++; }

  increment() { this.#value++; return this; }

  get value() { return this.#value; } // getter
}

const c1 = new Counter();
const c2 = new Counter();
console.log(Counter.count); // 2
```

**Pregunta típica de entrevista:**
> ¿Dónde "viven" los campos `static`: en cada instancia o en la clase?

**Respuesta correcta:** en la clase — se comparten entre todas las instancias, no se duplican.

**Nivel de importancia:** 🔥🔥🔥

### Garbage Collection y memory leaks

**Qué es:** JS libera automáticamente la memoria de objetos que ya no son alcanzables (sin ninguna referencia activa). Un *memory leak* ocurre cuando, sin querer, mantienes referencias vivas a objetos que ya no necesitas (closures que atrapan datos grandes, listeners nunca removidos, caches sin límite).

**Ejemplo (leak real en un servidor Node):**
```javascript
const cache = {};
app.get('/data/:id', (req, res) => {
  if (!cache[req.params.id]) {
    cache[req.params.id] = fetchExpensiveData(req.params.id);
  }
  res.json(cache[req.params.id]);
});
// cache crece indefinidamente — nunca se libera memoria
```

**Pregunta típica de entrevista:**
> ¿Qué causa comúnmente un memory leak en un servidor Node.js de larga duración?

**Respuesta correcta:** timers/intervals no limpiados, event listeners acumulados, o caches en memoria sin TTL/límite de tamaño.

**Trampa común:** usar un objeto plano como "cache" sin ningún mecanismo de expiración.

**Nivel de importancia:** 🔥🔥🔥🔥

---

## 1.8 Errores comunes

### `try/catch`, `throw`, errores síncronos vs asíncronos, custom errors

**Qué es:** `throw` lanza una excepción; `try/catch` la captura **solo si ocurre dentro del bloque `try` de forma síncrona, o en una promesa `await`-ada**. Los *custom errors* extienden `Error` para dar contexto específico (ej. `ValidationError`, `NotFoundError`).

**Ejemplo:**
```javascript
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

async function getUser(id) {
  const user = await db.findUser(id);
  if (!user) throw new NotFoundError(`Usuario ${id} no encontrado`);
  return user;
}

// Propagación de errores — un error no capturado sube hasta el próximo catch
async function main() {
  throw new Error("fail");
}
main(); // sin await/.catch() → UnhandledPromiseRejection
console.log("after"); // se imprime ANTES, porque main() es asíncrono
```

**Pregunta típica de entrevista:**
> ¿Qué sucede con un error lanzado dentro de una función `async` que nunca es `await`-ada ni tiene `.catch()`?

**Respuesta correcta:** se convierte en un `UnhandledPromiseRejection` — el código síncrono posterior igual se ejecuta primero.

**Trampa común:** olvidar que las funciones `async` convierten cualquier `throw` en un *rejection* de la Promise que retornan, no en una excepción síncrona inmediata.

**Nivel de importancia:** 🔥🔥🔥🔥

---

## Preguntas tipo TestGorilla — Node & JavaScript (15 preguntas)

**1.** ¿Qué imprime este código?
```javascript
console.log(typeof null);
```
A) `"null"` B) `"object"` C) `"undefined"` D) `"boolean"`

**2.** ¿Qué palabra clave crea una variable con scope de bloque y reasignable?
A) `var` B) `let` C) `const` D) `function`

**3.** ¿Qué imprime este código?
```javascript
console.log(1 + "2" + 3);
```
A) `"123"` B) `6` C) `"15"` D) `NaN`

**4.** ¿Qué retorna `Array.prototype.map`?
A) Un booleano B) Un nuevo array de la misma longitud C) Un único valor acumulado D) El array original, mutado

**5.** ¿Qué imprime este código?
```javascript
function createFns() {
  const result = [];
  for (let i = 0; i < 3; i++) {
    result.push(() => i);
  }
  return result;
}
console.log(createFns().map(fn => fn()));
```
A) `[0, 1, 2]` B) `[3, 3, 3]` C) `[undefined, undefined, undefined]` D) `[2, 2, 2]`

**6.** ¿Qué hace `Promise.race([p1, p2])`?
A) Espera a que ambas resuelvan B) Se asienta en cuanto la primera resuelve o rechaza C) Siempre retorna `p1` D) Las ejecuta en secuencia

**7.** ¿Qué imprime este código?
```javascript
console.log("5" == 5);
console.log("5" === 5);
```
A) `true true` B) `false false` C) `true false` D) `false true`

**8.** ¿Qué tiene mayor prioridad en Node.js: `process.nextTick` o `.then()` de una Promise?
A) `process.nextTick` B) `.then()` C) Igual prioridad D) Depende de la versión de Node

**9.** ¿Qué problema tiene este código?
```javascript
const results = [];
[1, 2, 3].forEach(async (n) => {
  results.push(await processAsync(n));
});
console.log(results);
```
A) No tiene ningún problema B) `results` siempre está vacío al hacer el `console.log` C) Lanza una excepción D) Solo procesa el primer elemento

**10.** ¿Cuál es el resultado de `[10, 2, 1].sort()`?
A) `[1, 2, 10]` B) `[1, 10, 2]` C) `[10, 2, 1]` D) Error

**11.** ¿Qué imprime este código?
```javascript
const obj1 = { x: 1 };
const obj2 = { ...obj1, y: { z: 1 } };
const obj3 = { ...obj2 };
obj3.y.z = 99;
console.log(obj2.y.z);
```
A) `1` B) `99` C) `undefined` D) `TypeError`

**12.** ¿Cuál es la diferencia principal entre `Promise.all` y `Promise.allSettled`?
A) No hay diferencia B) `all` falla si una rechaza; `allSettled` siempre resuelve con el estado de cada una C) `allSettled` es más lento D) `all` solo acepta 2 promesas

**13.** ¿Qué imprime este código?
```javascript
async function foo() {
  console.log(1);
  await null;
  console.log(2);
}
console.log(3);
foo();
console.log(4);
```
A) 1, 2, 3, 4 B) 3, 1, 4, 2 C) 3, 1, 2, 4 D) 1, 3, 4, 2

**14.** ¿Qué es un closure?
A) Un error de sintaxis B) Una función que recuerda el scope léxico en el que fue creada C) Un tipo de bucle D) Un método de array

**15.** ¿Qué problema de rendimiento tiene este código?
```javascript
async function processOrders(orders) {
  const results = [];
  for (const order of orders) {
    const result = await chargePayment(order); // independiente entre órdenes
    results.push(result);
  }
  return results;
}
```
A) Ninguno, es la forma correcta B) Procesa las órdenes en serie cuando podrían procesarse en paralelo con `Promise.all` C) `for...of` no funciona con `await` D) Debería usar `forEach`

---

# 2. CONCEPTOS GENERALES DE NODE.JS

## 2.1 Arquitectura de Node.js

### Qué es Node.js, V8, libuv y el modelo de concurrencia

**Qué es:** Node.js es un runtime de JavaScript construido sobre el motor **V8** de Google (el mismo que usa Chrome), que permite ejecutar JS fuera del navegador. **libuv** es la librería en C++ que le da a Node su **Event Loop**, operaciones de I/O no bloqueantes, y un **thread pool** interno (por defecto 4 hilos) para ciertas tareas.

**Por qué importa en una entrevista:** es LA pregunta de arquitectura más común en entrevistas de Node — entender esto bien te permite razonar sobre cualquier problema de rendimiento.

**La pregunta clásica — "Si Node es single-threaded, ¿cómo maneja miles de conexiones simultáneas?"**

**Respuesta correcta:** Node ejecuta **tu código JavaScript** en un solo hilo (el Event Loop), pero las operaciones de I/O (red, disco, DNS, algunas de `crypto`/`zlib`) se delegan al sistema operativo o al **thread pool de libuv**, que trabaja en paralelo. Cuando esa operación termina, su callback se encola de vuelta al Event Loop. Por eso Node puede manejar miles de conexiones concurrentes con un solo hilo de JS: casi todo el tiempo ese hilo está **esperando I/O**, no computando.

**Ejemplo — CPU-bound vs I/O-bound:**
```javascript
// I/O-bound — no bloquea el Event Loop, otras requests se siguen atendiendo
app.get('/user/:id', async (req, res) => {
  const user = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
  res.json(user);
});

// ❌ CPU-bound síncrono — bloquea el Event Loop, TODAS las requests se congelan
app.get('/report', (req, res) => {
  const result = generateHugeReportSync(data); // cálculo pesado, síncrono
  res.json(result);
});
```

**Trampa común:** confundir "single-threaded" con "no puede manejar concurrencia" — Node maneja concurrencia de I/O excelentemente, pero **no** paraleliza cómputo por sí solo (para eso existen `worker_threads` o `cluster`).

**Nivel de importancia:** 🔥🔥🔥🔥🔥

| Concepto | Qué es |
|---|---|
| CPU-bound | Tarea limitada por poder de cómputo (cálculos matemáticos pesados, procesamiento de imágenes) — bloquea el hilo principal si es síncrona |
| I/O-bound | Tarea limitada por esperar una respuesta externa (disco, red, DB) — no bloquea, se delega |
| `cluster` | Bifurca múltiples **procesos** Node (memoria separada) para usar varios núcleos de CPU |
| `worker_threads` | Crea hilos dentro del **mismo proceso**, pueden compartir memoria — ideal para CPU-bound sin perder el modelo de un solo proceso |

---

## 2.2 Módulos: CommonJS vs ES Modules

| Concepto | CommonJS | ES Modules (ESM) |
|---|---|---|
| Sintaxis | `require()` / `module.exports` | `import` / `export` |
| Carga | Síncrona | Soporta carga asíncrona, análisis estático |
| Activación | Por defecto en `.js` (Node clásico) | Requiere `"type": "module"` en `package.json`, o extensión `.mjs` |
| `this` en el módulo | `module.exports` | `undefined` |

**Ejemplo — error típico de CommonJS:**
```javascript
exports = { hello: () => "hi" };      // ❌ rompe la referencia a module.exports — NO se exporta
module.exports.world = () => "world"; // ✅ correcto
```

**Pregunta típica de entrevista:**
> ¿Qué diferencia hay entre reasignar `exports` y modificar `module.exports`?

**Respuesta correcta:** `exports` es solo una referencia a `module.exports`; si la **reasignas** (`exports = {...}`), rompes esa conexión y Node sigue exportando el `module.exports` original (vacío o lo que tuviera antes).

**Nivel de importancia:** 🔥🔥🔥🔥

---

## 2.3 NPM

**Qué es:** `package.json` describe el proyecto y sus dependencias; `package-lock.json` fija las versiones **exactas** instaladas (reproducibilidad). `dependencies` son paquetes necesarios en producción; `devDependencies` solo para desarrollo (testing, linters, build tools).

**Semantic Versioning (`MAJOR.MINOR.PATCH`):**
- `^1.2.3` → acepta actualizaciones de `MINOR` y `PATCH` (hasta `<2.0.0`).
- `~1.2.3` → acepta solo actualizaciones de `PATCH` (hasta `<1.3.0`).

**`npm install` vs `npm ci`:**

| | `npm install` | `npm ci` |
|---|---|---|
| Lee | `package.json` (puede actualizar el lockfile) | Solo `package-lock.json` |
| `node_modules` previo | Lo actualiza incrementalmente | Lo borra primero, instala limpio |
| Uso recomendado | Desarrollo local | Pipelines de CI/CD — instala exactamente lo del lockfile |

**Pregunta típica de entrevista:**
> ¿Por qué se recomienda `npm ci` en lugar de `npm install` en un pipeline de CI?

**Respuesta correcta:** `npm ci` garantiza una instalación reproducible y más rápida, exactamente según el `package-lock.json`, sin modificar versiones.

**Nivel de importancia:** 🔥🔥🔥

---

## 2.4 HTTP

**Anatomía de una request/response:** método + URL (con *path parameters* como `/users/:id` y *query parameters* como `?page=2`) + headers + body (en POST/PUT/PATCH) → el servidor responde con un status code + headers + body.

### Status codes — tabla completa

| Código | Nombre | Cuándo usarlo |
|---|---|---|
| 200 | OK | Éxito general (GET, PUT, PATCH) |
| 201 | Created | Recurso creado (respuesta a POST exitoso) |
| 204 | No Content | Éxito sin cuerpo de respuesta (ej. DELETE exitoso) |
| 400 | Bad Request | Sintaxis inválida / request malformado |
| 401 | Unauthorized | No autenticado |
| 403 | Forbidden | Autenticado, pero sin permisos |
| 404 | Not Found | El recurso no existe |
| 409 | Conflict | Conflicto de estado (duplicado, versión desactualizada) |
| 422 | Unprocessable Entity | Sintaxis válida, datos semánticamente inválidos |
| 429 | Too Many Requests | Rate limiting excedido |
| 500 | Internal Server Error | Error inesperado del servidor |
| 502 | Bad Gateway | Respuesta inválida de un servidor upstream |
| 503 | Service Unavailable | Servidor sobrecargado o en mantenimiento |

| Comparación | Diferencia |
|---|---|
| `401` vs `403` | `401` = no sabemos quién eres (falta/token inválido). `403` = sabemos quién eres, pero no tienes permiso. |
| `400` vs `422` | `400` = el request está mal formado (JSON inválido). `422` = el request es válido sintácticamente, pero los datos no pasan validación (ej. email con formato incorrecto). |

**Pregunta típica de entrevista:**
> Un cliente envía un JWT válido pero intenta acceder a datos de otro usuario. ¿Qué código corresponde?

**Respuesta correcta:** `403 Forbidden` — está autenticado, pero no autorizado para ese recurso.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

## 2.5 APIs REST

**Qué es:** un estilo arquitectónico donde los recursos se exponen vía URLs y se manipulan con verbos HTTP estándar.

| Método | Idempotente | Uso |
|---|---|---|
| GET | ✅ | Leer |
| POST | ❌ | Crear |
| PUT | ✅ | Reemplazar completo |
| PATCH | ⚠️ No garantizado | Actualización parcial |
| DELETE | ✅ | Eliminar |

**Idempotencia:** repetir la misma request N veces produce el mismo estado final que hacerla una vez.
**Stateless:** cada request debe contener toda la información necesaria; el servidor no guarda sesión entre requests.

| Concepto | Diferencia |
|---|---|
| PUT vs PATCH | `PUT` reemplaza el recurso completo (hay que enviar todos los campos); `PATCH` actualiza solo los campos enviados |

**Paginación, filtros, sorting, versionado** (se profundiza en la sección SQL para paginación en base de datos): a nivel de API, se exponen como query params (`?page=2&limit=20&sort=-createdAt&status=active`) y el versionado se maneja típicamente vía la URL (`/v1/users`) o un header (`Accept-Version`).

**Pregunta típica de entrevista:**
> Un `PUT /users/5` crea un recurso que no existía antes (en vez de actualizar uno existente). ¿Qué status code corresponde?

**Respuesta correcta:** `201 Created` — aplica cuando se **crea** un recurso, sin importar el verbo HTTP usado.

**Nivel de importancia:** 🔥🔥🔥🔥

---

## 2.6 Seguridad

### Autenticación vs Autorización

| Concepto | Diferencia |
|---|---|
| Authentication (AuthN) | ¿Quién eres? Verificar identidad (login) |
| Authorization (AuthZ) | ¿Qué puedes hacer? Verificar permisos/roles |

### JWT (JSON Web Token)

**Qué es:** estructura `header.payload.signature` codificada en Base64URL. **El payload NO está encriptado, solo firmado** — cualquiera puede decodificarlo y leerlo, por eso nunca debe contener datos sensibles.

- **Access token:** vida corta, se envía en cada request (`Authorization: Bearer <token>`).
- **Refresh token:** vida larga, se usa solo para obtener un nuevo access token sin pedir credenciales de nuevo.

**Pregunta típica de entrevista:**
> ¿Por qué un JWT no debería contener una contraseña en texto plano en su payload?

**Respuesta correcta:** el payload solo está codificado en Base64, no encriptado — cualquiera con el token puede decodificarlo y leer su contenido.

### Password hashing — bcrypt

**Qué es:** nunca se almacenan contraseñas en texto plano. `bcrypt` aplica un **salt** único por contraseña y es intencionalmente lento (configurable con "rounds"), dificultando ataques de fuerza bruta — a diferencia de hashes rápidos como MD5/SHA-256.

```javascript
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(password, 10); // 10 = salt rounds
const isValid = await bcrypt.compare(password, hash);
```

### CORS, CSRF, XSS, SQL Injection

| Ataque/Mecanismo | Qué es | Mitigación |
|---|---|---|
| **CORS** | Mecanismo del navegador que restringe requests cross-origin | Configurar `Access-Control-Allow-Origin` correctamente, no usar `*` con credenciales |
| **CSRF** | Un sitio malicioso induce al navegador a enviar requests autenticadas (con cookies) sin consentimiento | Tokens CSRF, cookies `SameSite=Strict/Lax` |
| **XSS** | Inyección de scripts maliciosos ejecutados en el navegador de otro usuario | Sanitizar/escapar input y output, Content-Security-Policy |
| **SQL Injection** | Inyectar SQL malicioso vía input no sanitizado | Queries parametrizadas / prepared statements, ORMs |

### Rate limiting, validación/sanitización, secretos, HTTPS

- **Rate limiting:** limita cuántas requests puede hacer un cliente en una ventana de tiempo (`429 Too Many Requests`), típicamente con Redis (`INCR` + `EXPIRE`).
- **Validación de entrada:** siempre validar en el servidor, nunca confiar solo en validación del cliente.
- **Secretos/variables de entorno:** nunca hardcodear API keys o contraseñas en el código; usar `process.env` + un secrets manager, nunca commitear `.env`.
- **HTTPS:** cifra el tráfico en tránsito; sin él, cualquier dato (incluidos tokens) viaja en texto plano.

**Nivel de importancia:** 🔥🔥🔥🔥🔥 (toda la sección de seguridad)

---

## 2.7 Rendimiento

- **Memory leaks:** caches sin límite, timers no limpiados, listeners acumulados (ver sección 1.7).
- **Blocking operations / CPU-bound:** cálculos síncronos pesados en el hilo principal bloquean todas las requests — usar `worker_threads` o dividir el trabajo.
- **Caching (Redis):** guardar resultados costosos de calcular/consultar, con TTL, para evitar recalcular en cada request.
- **Connection pooling:** reutilizar conexiones a la base de datos en vez de abrir/cerrar una por request (costoso).
- **Streams:** procesar datos por partes (chunks) en vez de cargar todo en memoria — crítico para archivos grandes.
- **Paginación:** nunca devolver datasets completos sin límite.
- **Compresión (gzip/brotli):** reduce el tamaño de las respuestas HTTP.

**Pregunta típica de entrevista:**
> Un endpoint hace `fs.readFileSync()` dentro del handler. ¿Qué problema de rendimiento genera?

**Respuesta correcta:** bloquea el Event Loop durante la lectura — **todas** las requests concurrentes quedan congeladas hasta que termine, aunque sean de otros usuarios.

**Nivel de importancia:** 🔥🔥🔥🔥

---

## 2.8 Streams y Buffers

**Qué es:** un `Buffer` almacena datos binarios crudos. Los *streams* permiten procesar datos **por partes** en vez de cargarlos completos en memoria.

| Tipo de stream | Qué hace |
|---|---|
| `Readable` | Fuente de datos (ej. leer un archivo) |
| `Writable` | Destino de datos (ej. escribir a un archivo o response HTTP) |
| `Duplex` | Ambos (ej. un socket TCP) |
| `Transform` | Duplex que modifica los datos al pasar (ej. compresión) |

**Backpressure:** cuando el destino (`Writable`) no puede procesar datos tan rápido como la fuente (`Readable`) los produce, el stream pausa automáticamente la lectura hasta que el destino esté listo — evita saturar la memoria.

**Pregunta típica de entrevista:**
> ¿Por qué usar streams para servir un archivo grande en vez de `fs.readFileSync` + `res.send()`?

**Respuesta correcta:** streams procesan el archivo por chunks, con uso de memoria constante; `readFileSync` carga el archivo **completo** en memoria antes de enviarlo, lo cual no escala con archivos grandes o muchas requests concurrentes.

**Nivel de importancia:** 🔥🔥🔥

---

## 2.9 Conceptos de Express / NestJS

> No es un tutorial de NestJS — solo los conceptos que suelen preguntarse en entrevistas backend.

| Concepto | Qué hace | Express | NestJS |
|---|---|---|---|
| **Middleware** | Código que corre antes del handler final (auth, logging, parsing) | `app.use(fn)` | `implements NestMiddleware` |
| **Controller** | Recibe la request HTTP, delega a un service, retorna la respuesta | Función de ruta | `@Controller()` + decoradores `@Get()`/`@Post()` |
| **Service** | Contiene la lógica de negocio | Clase/módulo plano | `@Injectable()` |
| **Dependency Injection** | Las dependencias se "inyectan" en vez de crearse manualmente dentro de la clase | Manual (requiere librerías) | Nativo, vía constructor |
| **Guard** | Decide si una request puede proceder (auth/roles) | Middleware custom | `implements CanActivate`, `@UseGuards()` |
| **Interceptor** | Transforma request/response, logging, caching | Middleware custom | `implements NestInterceptor` |
| **Pipe** | Transforma/valida datos de entrada | Middleware/validación manual | `ValidationPipe`, `ParseIntPipe` |
| **Exception filter** | Captura errores y formatea la respuesta de error | Middleware de error (`(err, req, res, next)`) | `@Catch()` |
| **DTO** | Define la forma y reglas de validación de los datos de entrada/salida | Objeto plano + librería de validación | Clase con decoradores de `class-validator` |

**Pregunta típica de entrevista:**
> ¿Por qué separar la lógica de negocio en un Service en vez de escribirla directamente en el Controller?

**Respuesta correcta:** separación de responsabilidades — el Controller solo debe manejar la capa HTTP (parsear input, devolver status/response); la lógica en un Service es más fácil de testear, reutilizar y mantener.

**Nivel de importancia:** 🔥🔥🔥🔥

---

## Preguntas tipo TestGorilla — Conceptos generales de Node.js (7 preguntas)

**1.** Si Node.js es single-threaded, ¿cómo puede manejar miles de conexiones concurrentes?
A) Crea un hilo nuevo por cada conexión B) El hilo principal de JS delega I/O al sistema operativo/thread pool de libuv y continúa procesando otras tareas mientras espera C) Node no es realmente single-threaded D) Usa múltiples procesos automáticamente

**2.** ¿Cuál es la diferencia principal entre `cluster` y `worker_threads`?
A) Son idénticos B) `cluster` bifurca procesos separados (memoria aislada); `worker_threads` corren en el mismo proceso y pueden compartir memoria C) `worker_threads` solo funcionan en el navegador D) `cluster` está obsoleto

**3.** ¿Qué hace `npm ci` de forma diferente a `npm install`?
A) Nada, son iguales B) Instala exactamente las versiones del lockfile, borrando `node_modules` primero — ideal para CI C) Solo instala `devDependencies` D) Publica el paquete

**4.** Un cliente envía una request con JSON mal formado (sintaxis inválida). ¿Qué código corresponde?
A) 422 B) 400 C) 500 D) 409

**5.** ¿Qué es "idempotencia" en el contexto de métodos HTTP?
A) Que la request sea siempre rápida B) Que repetir la misma request produzca el mismo resultado/estado final C) Que la request no pueda fallar D) Que requiera autenticación

**6.** ¿Por qué nunca se debe guardar una contraseña en texto plano en una base de datos?
A) Ocupa más espacio B) Si la base de datos es comprometida, las contraseñas quedan expuestas directamente; se debe usar un hash con salt (bcrypt) C) Las bases de datos no permiten strings largos D) Rompe las validaciones de SQL

**7.** En una arquitectura en capas (Controller → Service → Repository), ¿quién debería contener las queries SQL/ORM?
A) El Controller B) El Repository C) El DTO D) El Middleware

---

# 3. SQL

## 3.1 SQL fundamental

**Qué es:** el lenguaje estándar para consultar y manipular bases de datos relacionales.

```sql
SELECT id, name FROM users WHERE active = true ORDER BY created_at DESC LIMIT 10 OFFSET 20;

INSERT INTO users (name, email) VALUES ('Ana', 'ana@mail.com');

UPDATE users SET active = false WHERE id = 5;

DELETE FROM users WHERE id = 5;

SELECT DISTINCT country FROM users;

SELECT user_id, COUNT(*) AS total FROM orders GROUP BY user_id HAVING COUNT(*) > 5;
```

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

## 3.2 Joins

**Qué es:** combinan filas de dos o más tablas según una condición de relación.

```
INNER JOIN            LEFT JOIN              RIGHT JOIN             FULL OUTER JOIN
  A ∩ B                A + (A ∩ B)            B + (A ∩ B)            A ∪ B
 ┌───┬───┐            ┌───┬───┐              ┌───┬───┐              ┌───┬───┐
 │ A │ B │            │ A │ A∩B│             │A∩B│ B │              │ A │ A∩B│ B │
 └───┴───┘            └───┴───┘              └───┴───┘              └───┴───┴───┘
 Solo coincidencias    Todo A + match de B    Todo B + match de A    Todo A y todo B
                       (NULL si no hay)       (NULL si no hay)       (NULL donde no hay match)
```

```sql
-- INNER JOIN: solo usuarios que SÍ tienen al menos una orden
SELECT u.name, o.id FROM users u INNER JOIN orders o ON o.user_id = u.id;

-- LEFT JOIN: todos los usuarios, con NULL en o.id si no tienen órdenes
SELECT u.name, o.id FROM users u LEFT JOIN orders o ON o.user_id = u.id;

-- CROSS JOIN: producto cartesiano (todas las combinaciones posibles)
SELECT colors.name, sizes.name FROM colors CROSS JOIN sizes;
```

**Pregunta típica de entrevista:**
> ¿Por qué esta query no se comporta como un LEFT JOIN real?
> ```sql
> SELECT * FROM users u
> LEFT JOIN orders o ON u.id = o.user_id
> WHERE o.status = 'completed';
> ```

**Respuesta correcta:** filtrar en el `WHERE` sobre una columna de la tabla derecha **elimina las filas sin match** (donde `o.status` es `NULL`), convirtiendo efectivamente el `LEFT JOIN` en un `INNER JOIN`. El filtro debería ir en el `ON`.

**Trampa común:** poner condiciones de la tabla "opcional" en `WHERE` en vez de en `ON`.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

## 3.3 Agregaciones: `WHERE` vs `HAVING`

| Función | Qué hace |
|---|---|
| `COUNT` | Cuenta filas |
| `SUM` | Suma valores |
| `AVG` | Promedio |
| `MIN` / `MAX` | Valor mínimo/máximo |

| Concepto | Diferencia |
|---|---|
| `WHERE` | Filtra **filas individuales**, antes de agrupar — no puede usar funciones de agregación |
| `HAVING` | Filtra **grupos**, después de `GROUP BY`/agregación — sí puede usar `COUNT`, `SUM`, etc. |

```sql
-- usuarios con más de 5 órdenes
SELECT user_id, COUNT(*) AS total
FROM orders
WHERE status = 'completed'  -- filtra filas antes de agrupar
GROUP BY user_id
HAVING COUNT(*) > 5;        -- filtra grupos después de agregar
```

**Pregunta típica de entrevista:**
> ¿Por qué `WHERE COUNT(*) > 5` lanza un error de sintaxis?

**Respuesta correcta:** `WHERE` se evalúa **antes** de que existan los grupos agregados — en ese punto `COUNT(*)` todavía no existe como valor por fila. Para filtrar sobre una agregación hay que usar `HAVING`.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

## 3.4 Relaciones

| Concepto | Qué es |
|---|---|
| **Primary key (PK)** | Identifica únicamente cada fila; no permite `NULL` |
| **Foreign key (FK)** | Referencia a la PK de otra tabla; mantiene integridad referencial |
| **UNIQUE** | Garantiza que no haya valores repetidos en esa columna |
| **NOT NULL** | La columna no puede quedar vacía |
| **One-to-one** | Un registro de A se relaciona con exactamente un registro de B (ej. `users` ↔ `user_profiles`) |
| **One-to-many** | Un registro de A se relaciona con varios de B (ej. un `user` tiene muchas `orders`) |
| **Many-to-many** | Requiere una tabla intermedia (ej. `students` ↔ `courses` vía `enrollments`) |

**Nivel de importancia:** 🔥🔥🔥🔥

---

## 3.5 Índices

**Qué es:** una estructura de datos (típicamente un B-tree) que acelera las búsquedas, a costa de más espacio en disco y escrituras más lentas (cada `INSERT`/`UPDATE` también debe actualizar el índice).

**Cuándo usarlo:** en columnas usadas frecuentemente en `WHERE`, `JOIN`, `ORDER BY` — especialmente en tablas grandes.

**Cuándo puede perjudicar:** en tablas con muchísimas escrituras y pocas lecturas, o en columnas con **baja selectividad** (ej. una columna `boolean` con solo 2 valores posibles aporta poco como índice).

**Índices compuestos:** un índice sobre `(user_id, status)` acelera queries que filtran por ambas columnas juntas (en ese orden), pero no necesariamente ayuda si solo filtras por `status`.

```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;
-- muestra si PostgreSQL usa un Index Scan o un Seq Scan (recorrido completo, más lento)
```

**Pregunta típica de entrevista:**
> ¿Por qué no indexar absolutamente todas las columnas de una tabla?

**Respuesta correcta:** cada índice adicional ralentiza los `INSERT`/`UPDATE`/`DELETE` (hay que mantenerlo actualizado) y ocupa espacio en disco — se indexa solo lo que realmente se consulta con frecuencia.

**Nivel de importancia:** 🔥🔥🔥

---

## 3.6 Transacciones y ACID

**Qué es:** una transacción agrupa varias operaciones para que se ejecuten como una sola unidad atómica.

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT; -- o ROLLBACK si algo falla
```

| Propiedad ACID | Qué garantiza |
|---|---|
| **Atomicity** | La transacción ocurre completa o no ocurre (all-or-nothing) |
| **Consistency** | La base de datos pasa de un estado válido a otro válido |
| **Isolation** | Transacciones concurrentes no interfieren entre sí |
| **Durability** | Una vez confirmada (commit), persiste aunque el sistema falle justo después |

**Pregunta típica de entrevista:**
> Una transacción hace `COMMIT` y el servidor se cae inmediatamente después. ¿Qué pasa con esos datos?

**Respuesta correcta:** persisten — eso es exactamente lo que garantiza la **Durability**.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

## 3.7 Concurrencia: locking e isolation levels

| Concepto | Diferencia | Cuándo utilizar |
|---|---|---|
| **Optimistic locking** | No bloquea; usa una columna `version` y verifica al hacer `UPDATE` que no haya cambiado; si cambió, falla y se reintenta | Baja probabilidad de conflicto, muchas lecturas |
| **Pessimistic locking** | Bloquea la fila (`SELECT ... FOR UPDATE`), impidiendo que otra transacción la modifique hasta liberar el lock | Alta probabilidad de conflicto (ej. balances financieros) |

**Niveles de aislamiento** (de menor a mayor aislamiento, menor a mayor bloqueo): `Read Uncommitted` → `Read Committed` → `Repeatable Read` → `Serializable`.

**Race condition clásica:**
```javascript
// Dos requests leen balance=100 antes de que la primera reste su monto
let balance = 100;
async function withdraw(amount) {
  if (amount <= balance) {
    await simulateDbCall();
    balance -= amount; // ambas llamadas pasan la validación → balance termina negativo
  }
}
```
**Solución:** pessimistic locking (`SELECT ... FOR UPDATE`) o una transacción con `Serializable` isolation.

**Nivel de importancia:** 🔥🔥🔥🔥

---

## 3.8 Normalización

- **1NF:** valores atómicos, sin grupos repetidos.
- **2NF:** 1NF + sin dependencias parciales de la PK.
- **3NF:** 2NF + sin dependencias transitivas.
- **Denormalización:** duplicar datos deliberadamente (ej. guardar `total` calculado en la orden) para evitar `JOIN`s costosos en lecturas muy frecuentes — trade-off entre velocidad de lectura y riesgo de inconsistencia.

**Nivel de importancia:** 🔥🔥🔥

---

## 3.9 Consultas de entrevista

### 1. Encontrar registros duplicados

**Problema:** encontrar emails duplicados en `users`.
```sql
SELECT email, COUNT(*) AS total
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```
**Explicación:** se agrupa por el campo a verificar y se filtra con `HAVING` los grupos con más de 1 fila.
**Trampa típica:** intentar filtrar duplicados con `WHERE` en vez de `HAVING` — `WHERE` no puede usar `COUNT(*)`.

### 2. Segundo salario más alto

**Problema:** obtener el segundo salario más alto de `employees`.
```sql
SELECT MAX(salary) AS second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Alternativa con OFFSET, útil si piden el N-ésimo:
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;
```
**Explicación:** la subquery encuentra el máximo absoluto y luego buscas el máximo **excluyendo** ese valor.
**Trampa típica:** usar `LIMIT 1 OFFSET 1` sin `DISTINCT` cuando hay salarios repetidos (el "segundo" resultado podría ser un duplicado del primero).

### 3. Registros sin relación (anti-join)

**Problema:** usuarios que nunca han hecho una orden.
```sql
SELECT u.*
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL;
```
**Explicación:** un `LEFT JOIN` trae `NULL` en las columnas de `orders` cuando no hay match; filtrar por `o.id IS NULL` aísla exactamente esos casos.
**Trampa típica:** usar `INNER JOIN` (nunca mostraría usuarios sin órdenes) o filtrar `o.status IS NULL` en vez de la PK.

### 4. `COUNT` por grupo

**Problema:** cantidad de órdenes por usuario.
```sql
SELECT user_id, COUNT(*) AS total_orders
FROM orders
GROUP BY user_id;
```

### 5. `JOIN` de varias tablas

**Problema:** nombre de usuario, producto y cantidad de cada orden.
```sql
SELECT u.name, p.name AS product, oi.quantity
FROM orders o
JOIN users u ON u.id = o.user_id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id;
```
**Trampa típica:** olvidar alias de tabla en columnas ambiguas (ej. ambas tablas tienen `name`) → error de columna ambigua.

### 6. El registro más reciente por grupo

**Problema:** la orden más reciente de cada usuario.
```sql
SELECT DISTINCT ON (user_id) *
FROM orders
ORDER BY user_id, created_at DESC;

-- Alternativa portable (no específica de Postgres):
SELECT o.*
FROM orders o
WHERE o.created_at = (
  SELECT MAX(created_at) FROM orders WHERE user_id = o.user_id
);
```
**Trampa típica:** usar `GROUP BY user_id` con `MAX(created_at)` pero intentar seleccionar también otras columnas no agregadas directamente (error en SQL estricto — hay que hacer el JOIN/subquery de vuelta a la tabla).

### 7. Top N por grupo

**Problema:** los 3 productos más vendidos.
```sql
SELECT product_id, SUM(quantity) AS total_sold
FROM order_items
GROUP BY product_id
ORDER BY total_sold DESC
LIMIT 3;
```

### 8. Paginación

**Problema:** página 3 de usuarios, 20 por página.
```sql
-- Offset-based: simple, pero lento/inconsistente en tablas grandes con inserciones concurrentes
SELECT * FROM users ORDER BY id LIMIT 20 OFFSET 40;

-- Cursor-based: más eficiente y estable para listas grandes
SELECT * FROM users WHERE id > :lastSeenId ORDER BY id LIMIT 20;
```
**Trampa típica:** usar `OFFSET` grande en tablas muy grandes — el motor igual debe "recorrer" y descartar las filas anteriores.

### 9. Detectar valores `NULL`

**Problema:** usuarios sin teléfono registrado.
```sql
SELECT * FROM users WHERE phone IS NULL;
```
**Trampa típica:** usar `WHERE phone = NULL` — `NULL` nunca es "igual" a nada (ni a sí mismo), hay que usar `IS NULL` / `IS NOT NULL`.

**Nivel de importancia (toda la sección 3.9):** 🔥🔥🔥🔥🔥

---

## Preguntas tipo TestGorilla — SQL (5 preguntas)

**1.** ¿Qué hace `HAVING` que `WHERE` no puede hacer?
A) Filtrar filas antes de agrupar B) Filtrar grupos después de una agregación (`COUNT`, `SUM`, etc.) C) Hacer JOIN entre tablas D) Ordenar resultados

**2.** ¿Qué JOIN retorna todas las filas de la tabla izquierda, con `NULL` en las columnas de la derecha si no hay coincidencia?
A) INNER JOIN B) LEFT JOIN C) RIGHT JOIN D) CROSS JOIN

**3.** ¿Qué garantiza la "I" de ACID (Isolation)?
A) Que los tipos de datos se validen B) Que transacciones concurrentes no interfieran entre sí C) Que las queries usen índices automáticamente D) Que las transacciones sean rápidas

**4.** ¿Qué problema resuelve el *eager loading* (usar un `JOIN` en vez de una query por fila)?
A) SQL injection B) El problema N+1 C) Los memory leaks D) La normalización

**5.** ¿Cuál es el error en esta query?
```javascript
pool.query(`SELECT * FROM users WHERE email = '${email}'`);
```
A) Nada, está bien B) Es vulnerable a SQL injection — debería usar una query parametrizada (`$1`) C) Es demasiado lenta D) No compila

---

# 4. MICROSERVICIOS

## 4.1 Arquitectura: monolito vs microservicios

| Concepto | Qué es |
|---|---|
| **Monolito** | Una sola aplicación/deploy con toda la lógica de negocio |
| **Monolito modular** | Un solo deploy, pero con módulos internos bien separados por dominio (punto intermedio) |
| **Microservicios** | Servicios pequeños e independientes, cada uno con su propio deploy, escalado y base de datos |

| Ventajas de microservicios | Desventajas de microservicios |
|---|---|
| Escalado independiente por servicio | Mayor complejidad operativa (deploys, monitoreo, red) |
| Equipos autónomos, deploys independientes | Comunicación entre servicios añade latencia y puntos de falla |
| Fallos aislados (en teoría) | Transacciones distribuidas son difíciles (no hay `COMMIT` global) |
| Tecnología distinta por servicio si se necesita | Requiere buena observabilidad (tracing, logging centralizado) |

**Cuándo usar microservicios:** equipos grandes que necesitan desplegar independientemente, dominios de negocio bien definidos (bounded contexts), necesidad real de escalar partes específicas del sistema de forma distinta.

**Cuándo NO usarlos:** equipos pequeños, producto en etapa temprana (el dominio aún cambia mucho), sin experiencia operando sistemas distribuidos — en ese caso un monolito modular suele ser más rápido de construir y mantener.

**Pregunta típica de entrevista:**
> ¿Por qué no se recomienda empezar un producto nuevo con microservicios desde el día uno?

**Respuesta correcta:** el dominio de negocio aún no está bien entendido/estable; dividir en microservicios muy pronto suele generar los límites equivocados entre servicios, y la sobrecarga operativa (deploys, redes, observabilidad) no se justifica para un equipo/producto pequeño.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

## 4.2 Comunicación entre servicios

| Tipo | Ejemplos | Cuándo usar |
|---|---|---|
| **Síncrona** | REST, gRPC | El caller necesita la respuesta inmediata para continuar |
| **Asíncrona** | Message brokers (RabbitMQ, Kafka, SQS) | Desacoplar servicios, procesar en background, tolerar que el consumidor esté caído temporalmente |

| Concepto | Diferencia |
|---|---|
| REST vs gRPC | REST usa HTTP/JSON, legible y ampliamente soportado; gRPC usa HTTP/2 + Protocol Buffers (binario), más rápido y eficiente, pero menos "humano" de depurar — común en comunicación interna entre microservicios de alto volumen |

**Conceptos de mensajería:**
- **Producer:** publica un mensaje/evento.
- **Consumer:** procesa mensajes de una cola/tópico.
- **Queue (RabbitMQ):** cada mensaje lo procesa **un solo** consumidor (punto a punto).
- **Topic (Kafka):** los mensajes se publican a un tópico y **múltiples** consumidores pueden leerlo de forma independiente (pub/sub, con offsets propios).

⚠️ **Trampa común:** demasiada comunicación síncrona entre microservicios crea un **"distributed monolith"** — servicios acoplados que deben estar todos arriba al mismo tiempo, perdiendo el beneficio principal de la arquitectura.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

## 4.3 Consistencia

| Concepto | Diferencia |
|---|---|
| **Strong consistency** | Toda lectura ve el dato más reciente escrito, inmediatamente |
| **Eventual consistency** | Los datos replicados convergen con el tiempo, no de forma inmediata — trade-off común en sistemas distribuidos a cambio de disponibilidad |

**Saga Pattern:** maneja transacciones distribuidas como una secuencia de transacciones **locales**, cada una con una **acción compensatoria** si un paso posterior falla (en vez de un `COMMIT`/`ROLLBACK` global, que no existe entre bases de datos distintas).

**Ejemplo — flujo de una orden de e-commerce:**
1. Servicio de Órdenes: crea la orden (pendiente).
2. Servicio de Inventario: reserva el stock.
3. Servicio de Pagos: cobra al cliente.
4. Si el pago falla → se ejecuta la **compensación**: liberar el stock reservado y marcar la orden como cancelada.

**Pregunta típica de entrevista:**
> ¿Por qué no se puede usar una transacción SQL tradicional (`BEGIN`/`COMMIT`) entre el servicio de Órdenes y el de Pagos?

**Respuesta correcta:** cada microservicio tiene su propia base de datos; no existe un `COMMIT` atómico que abarque dos bases de datos distintas. El Saga Pattern resuelve esto con pasos locales + compensaciones.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

## 4.4 Resiliencia

| Patrón | Qué problema resuelve | Cuándo usarlo |
|---|---|---|
| **Timeout** | Evita esperar indefinidamente la respuesta de otro servicio | Siempre, en toda llamada de red |
| **Retry** | Reintenta una operación que falló por un error transitorio (ej. timeout de red) | Errores que probablemente sean temporales, **nunca** en operaciones no idempotentes sin cuidado |
| **Exponential backoff** | Espera creciente entre reintentos (en vez de loop inmediato), para no saturar un servicio ya degradado | Siempre que se implementen retries |
| **Circuit Breaker** | Deja de llamar a un servicio que está fallando repetidamente, evitando cascading failures | Dependencias externas que pueden degradarse (estados: Closed → Open → Half-Open) |
| **Bulkhead** | Aísla recursos (pools de conexión/threads) por dependencia, para que una lenta no agote recursos compartidos | Múltiples dependencias externas con distinta criticidad/latencia |
| **Fallback** | Devuelve una respuesta degradada pero útil cuando la dependencia real falla (ej. datos en cache, valor default) | Cuando una respuesta parcial es mejor que un error total |
| **Rate limiting** | Protege un servicio de ser saturado por demasiadas requests | Proteger APIs públicas o servicios con capacidad limitada |

**Pregunta típica de entrevista:**
> ¿Qué problema resuelve específicamente el Circuit Breaker que un simple `try/catch` con retry no resuelve?

**Respuesta correcta:** evita **seguir intentando** llamar a un servicio que ya sabemos que está caído — un retry simple seguiría generando carga adicional sobre un servicio ya degradado, empeorando la situación (cascading failure).

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

## 4.5 Observabilidad

- **Logging centralizado:** agregar logs de todos los servicios en un solo lugar (ej. ELK, Datadog).
- **Métricas:** latencia, tasa de error, throughput por servicio (ej. Prometheus + Grafana).
- **Distributed tracing + Correlation ID:** un identificador único (`trace ID`/`correlation ID`) viaja con la request a través de todos los servicios que la procesan, permitiendo reconstruir el flujo completo para debugging (ej. OpenTelemetry, Jaeger).
- **Health checks:** endpoints (ej. `/health`) que reportan si un servicio está operativo, usados por el orquestador (Kubernetes) o el load balancer para decidir si enviarle tráfico.

**Pregunta típica de entrevista:**
> Una request falla en producción y pasó por 5 microservicios distintos. ¿Cómo la rastreas?

**Respuesta correcta:** con un `correlation ID` generado al inicio de la request (normalmente en el API Gateway) y propagado en los headers a cada servicio downstream, visible en todos los logs y en el sistema de distributed tracing.

**Nivel de importancia:** 🔥🔥🔥🔥

---

## 4.6 Service Discovery y configuración

- **Service Discovery:** mecanismo para que los servicios se encuentren dinámicamente entre sí (ej. Consul, Eureka, o DNS interno de Kubernetes), necesario porque las IPs de los servicios cambian constantemente en un entorno orquestado.
- **API Gateway:** punto de entrada único que enruta, autentica y a veces agrega respuestas de varios servicios hacia el cliente.
- **Centralized configuration:** configuración (feature flags, parámetros) gestionada en un solo lugar en vez de hardcodeada por servicio.
- **Environment variables / secrets:** nunca hardcodear credenciales; usar variables de entorno + un secrets manager (ej. AWS Secrets Manager, Vault).

**Nivel de importancia:** 🔥🔥🔥

---

## 4.7 Bases de datos: database per service vs shared database

| Enfoque | Ventajas | Problemas |
|---|---|---|
| **Database per service** | Cada servicio evoluciona su esquema independientemente; evita acoplamiento fuerte | Requiere Saga/eventos para mantener consistencia entre servicios; posibles datos duplicados |
| **Shared database** | Más simple al inicio, consultas cross-dominio triviales con JOIN | Acopla fuertemente los servicios — un cambio de esquema puede romper a otro equipo; elimina el beneficio de independencia de los microservicios |

**Pregunta típica de entrevista:**
> ¿Por qué se considera un anti-patrón que dos microservicios compartan la misma base de datos?

**Respuesta correcta:** rompe la independencia — un cambio de esquema en un servicio puede romper silenciosamente a otro, y ya no hay un dueño claro de los datos (acoplamiento a nivel de datos, no solo de API).

**Nivel de importancia:** 🔥🔥🔥🔥

---

## 4.8 Idempotencia en microservicios

**Qué es:** procesar el mismo mensaje/request más de una vez no debe cambiar el resultado final. Es crítico porque los sistemas distribuidos suelen garantizar "at-least-once delivery" (un mensaje puede entregarse más de una vez por reintentos/fallos de red).

**Por qué importa en una entrevista:** es uno de los conceptos más aplicados en sistemas de pagos — un doble cobro por un reintento de red es un bug con impacto directo en el negocio.

**Ejemplo — idempotency key en un endpoint de pagos:**
```javascript
app.post('/payments', async (req, res) => {
  const { idempotencyKey, amount, userId } = req.body;

  const existing = await db.findPaymentByIdempotencyKey(idempotencyKey);
  if (existing) {
    return res.status(200).json(existing); // ya procesado, retorna el mismo resultado
  }

  const payment = await chargeCard(userId, amount);
  await db.savePayment({ idempotencyKey, ...payment });
  res.status(201).json(payment);
});
```

**Pregunta típica de entrevista:**
> Un cliente de e-commerce pierde la conexión justo después de enviar un pago y su app reintenta automáticamente. ¿Cómo evitas cobrarle dos veces?

**Respuesta correcta:** el cliente envía una **idempotency key** única por intento de compra; el servidor la guarda junto al resultado del primer procesamiento, y si recibe la misma key de nuevo, retorna el resultado guardado **sin volver a cobrar**.

**Trampa común:** confiar en que "el cliente no debería reintentar" — en sistemas distribuidos los reintentos son inevitables (timeouts, fallos de red), hay que diseñar para que sean seguros.

**Nivel de importancia:** 🔥🔥🔥🔥🔥

---

## 4.9 Patrones importantes

| Patrón | Qué problema resuelve | Cuándo usarlo |
|---|---|---|
| **API Gateway** | Evita que el cliente tenga que conocer y llamar directamente a N microservicios; centraliza auth, rate limiting, logging | Casi siempre que hay más de un servicio expuesto a clientes externos |
| **Saga** | Mantiene consistencia en transacciones que abarcan varios servicios/bases de datos, sin transacción distribuida real | Flujos de negocio multi-servicio (ej. checkout: orden → inventario → pago) |
| **Outbox Pattern** | Evita la inconsistencia entre "guardar un cambio en la DB" y "publicar el evento correspondiente" (si uno falla y el otro no) | Cuando necesitas garantizar que un evento se publique si y solo si la transacción local se confirmó (ej. orden creada → evento `OrderCreated`) |
| **CQRS** (Command Query Responsibility Segregation) | Separa el modelo de **escritura** del modelo de **lectura**, permitiendo optimizar cada uno por separado | Sistemas con patrones de lectura muy distintos a los de escritura (ej. muchas lecturas agregadas/reportes vs pocas escrituras transaccionales) |
| **Event Sourcing** | En vez de guardar solo el estado actual, guarda la secuencia completa de eventos que llevaron a ese estado | Auditoría completa, necesidad de reconstruir el estado en cualquier punto del tiempo (ej. historial de una cuenta bancaria) |
| **Circuit Breaker** | Evita cascading failures llamando repetidamente a un servicio caído (ver sección 4.4) | Dependencias externas inestables |
| **Retry (con backoff)** | Recupera automáticamente de fallos transitorios de red (ver sección 4.4) | Errores transitorios, operaciones idempotentes |
| **Strangler Fig** | Permite migrar gradualmente un monolito a microservicios, sin un "big bang" riesgoso — se redirige tráfico ruta por ruta al nuevo servicio mientras el monolito sigue sirviendo el resto | Migraciones de sistemas legacy grandes y críticos |

**Ejemplo — Outbox Pattern con una orden de e-commerce:**
```sql
BEGIN;
INSERT INTO orders (id, user_id, status) VALUES (123, 'u1', 'created');
INSERT INTO outbox (event_type, payload) VALUES ('OrderCreated', '{"orderId": 123}');
COMMIT;
-- Un proceso separado lee la tabla outbox y publica los eventos a Kafka/RabbitMQ,
-- garantizando que el evento se publique si y solo si la orden se guardó.
```

**Pregunta típica de entrevista:**
> ¿Qué problema resuelve el Outbox Pattern que no resuelve simplemente publicar el evento justo después del `COMMIT` en el código?

**Respuesta correcta:** si el proceso falla **entre** el `COMMIT` de la base de datos y la publicación del evento (crash, error de red con el broker), el evento se pierde aunque el dato ya exista — el Outbox Pattern garantiza atomicidad entre ambos, guardando el evento en la misma transacción y publicándolo de forma confiable después.

**Nivel de importancia:** 🔥🔥🔥🔥

---

## Preguntas tipo TestGorilla — Microservicios (10 preguntas)

**1.** ¿Por qué cada microservicio debería tener su propia base de datos?
A) Es más barato B) Para evitar acoplamiento fuerte y permitir evolución de esquema independiente C) Porque los ORMs lo requieren D) Para reducir el número de servidores

**2.** ¿Qué problema resuelve principalmente el Circuit Breaker?
A) Queries lentas B) Evitar llamadas repetidas a una dependencia que está fallando, previniendo cascading failures C) Memory leaks D) Duplicación de datos entre servicios

**3.** ¿Por qué dos microservicios podrían comunicarse de forma asíncrona (vía cola) en vez de con un REST call directo?
A) REST siempre es más lento B) Para desacoplar servicios, de modo que el productor no dependa de que el consumidor esté disponible en ese instante C) Las colas garantizan consistencia fuerte D) Elimina la necesidad de un API Gateway

**4.** ¿Qué es un "distributed monolith"?
A) Un monolito desplegado en varios servidores por redundancia B) Una arquitectura de microservicios tan acoplada vía llamadas síncronas que todos deben estar disponibles al mismo tiempo, perdiendo independencia C) Una base de datos replicada entre regiones D) Un servicio dividido solo a nivel de código, no de deploy

**5.** En el patrón Saga, ¿cómo se mantiene la consistencia de una transacción distribuida?
A) Con un lock global en la base de datos B) Con una secuencia de transacciones locales, cada una con una acción compensatoria si un paso posterior falla C) Deshabilitando escrituras durante toda la transacción D) Con un two-phase commit coordinado por el API Gateway

**6.** ¿Qué provee típicamente un API Gateway en microservicios?
A) Reemplaza la necesidad de bases de datos por servicio B) Un punto de entrada único que maneja ruteo, autenticación, rate limiting y a veces agregación de respuestas C) Consistencia fuerte garantizada entre servicios D) Generación automática de código para cada servicio

**7.** ¿Por qué es importante la idempotencia al consumir mensajes de una cola?
A) Hace los mensajes más pequeños B) Porque los mensajes pueden entregarse más de una vez (at-least-once delivery), y reprocesar no debe cambiar el resultado C) Lo requieren todos los message brokers D) Evita necesitar una base de datos

**8.** ¿Qué resuelve el Outbox Pattern?
A) La lentitud de las queries B) La inconsistencia entre guardar un cambio en la base de datos y publicar su evento correspondiente, si uno falla y el otro no C) El exceso de microservicios D) La necesidad de un API Gateway

**9.** ¿Cuál es un trade-off clave al adoptar microservicios en vez de un monolito?
A) Los microservicios siempre son más rápidos de desarrollar inicialmente B) Mayor complejidad operativa (deploys, monitoreo, llamadas de red) a cambio de escalado y despliegue independiente por servicio C) Los microservicios eliminan la necesidad de bases de datos D) Eliminan toda necesidad de comunicación entre servicios

**10.** Un endpoint de pagos recibe el mismo request dos veces por un reintento automático del cliente. ¿Qué técnica evita cobrar dos veces?
A) Validar que el monto sea positivo B) Usar una idempotency key: si ya se procesó esa key, retornar el resultado guardado sin volver a cobrar C) Agregar un `setTimeout` antes de procesar D) Usar `Promise.race` entre ambos requests

---

# RESPUESTAS Y EXPLICACIONES

## Node & JavaScript

| # | Respuesta | Por qué las otras opciones están mal | Concepto a recordar |
|---|---|---|---|
| 1 | B | A) `typeof null` nunca retorna `"null"`. C/D no aplican a este caso | Bug histórico de JS: `typeof null === "object"` |
| 2 | B | A) `var` no es block-scoped. C) `const` no es reasignable. D) no es una declaración de variable | `let` = block-scoped + reasignable |
| 3 | A | B/C/D asumen conversión numérica, pero la concatenación de strings ocurre de izquierda a derecha | `1 + "2"` → `"12"` (string), luego `"12" + 3` → `"123"` |
| 4 | B | A) `map` no retorna boolean (eso es `some`/`every`). C) eso es `reduce`. D) `map` no muta, retorna nuevo array | `map` siempre retorna un array de la misma longitud |
| 5 | A | B es la respuesta con `var` (closures comparten la misma variable). C/D no aplican a `let` | Con `let`, cada iteración del loop crea un nuevo binding de bloque |
| 6 | B | A) eso es `Promise.all`. C) no hay tal garantía. D) eso sería secuencial, no `race` | `race` se asienta con la primera promesa en resolver **o** rechazar |
| 7 | C | A/B/D no reflejan la coerción de `==` vs la comparación estricta de `===` | `==` coerciona tipos; `===` no |
| 8 | A | B es incorrecto — `nextTick` tiene prioridad mayor en Node. C/D no son ciertos | `process.nextTick` > microtasks de Promise, siempre, en Node |
| 9 | B | A) sí tiene un problema real. C) no lanza excepción. D) procesa los 3, pero no espera ninguno | `forEach` no espera callbacks `async` |
| 10 | B | A/C asumen orden numérico. D) no lanza error | `.sort()` sin comparador ordena como strings |
| 11 | B | A) asume que el segundo spread (`obj3 = {...obj2}`) hizo deep copy, pero sigue siendo shallow | Shallow copy: los objetos anidados siguen compartiendo referencia |
| 12 | B | A) sí hay diferencia. C/D no son ciertos ni relevantes | `all` falla rápido ante cualquier rechazo; `allSettled` nunca rechaza |
| 13 | B | A) ignora que `foo()` se pausa en el primer `await`. C/D no respetan el orden síncrono-primero | El código síncrono fuera de `foo()` corre antes de la continuación tras el `await` |
| 14 | B | A/C/D no describen closures | Una función que "recuerda" su scope léxico, incluso fuera de él |
| 15 | B | A) sí hay un problema de rendimiento real. C) `for...of` sí funciona con `await`. D) `forEach` empeoraría el problema, no lo resuelve | Operaciones independientes deben lanzarse en paralelo con `Promise.all` |

## Conceptos generales de Node.js

| # | Respuesta | Por qué las otras opciones están mal | Concepto a recordar |
|---|---|---|---|
| 1 | B | A) Node no crea un hilo por conexión. C) Node sí es single-threaded para JS. D) no es automático | El Event Loop + thread pool de libuv permiten delegar I/O sin bloquear el hilo principal |
| 2 | B | A) son distintos. C) `worker_threads` no son del navegador. D) `cluster` no está obsoleto | `cluster` = procesos separados; `worker_threads` = hilos con memoria compartible |
| 3 | B | A) sí hay diferencia real. C) instala todas las dependencias del lockfile, no solo dev. D) no publica nada | `npm ci` es determinístico, ideal para pipelines de CI |
| 4 | B | A) `422` es para datos semánticamente inválidos, no sintaxis rota. C/D no aplican | JSON malformado = `400 Bad Request` |
| 5 | B | A/C/D no definen idempotencia correctamente | Repetir la misma request produce el mismo estado final |
| 6 | B | A/C/D son irrelevantes al riesgo real | Hashear con salt (bcrypt) protege ante una brecha de datos |
| 7 | B | A) el Controller solo debe manejar HTTP. C) el DTO solo define forma/validación. D) el Middleware no accede a datos | El Repository encapsula el acceso a datos |

## SQL

| # | Respuesta | Por qué las otras opciones están mal | Concepto a recordar |
|---|---|---|---|
| 1 | B | A) eso lo hace `WHERE`. C) eso lo hace `JOIN`. D) eso lo hace `ORDER BY` | `HAVING` filtra después de la agregación |
| 2 | B | A) solo coincidencias. C) es el espejo (desde la derecha). D) producto cartesiano, sin condición de match | `LEFT JOIN` conserva todas las filas de la izquierda |
| 3 | B | A/C/D describen otras propiedades/conceptos de SQL, no Isolation | Isolation = transacciones concurrentes no interfieren entre sí |
| 4 | B | A/C/D no están relacionados con el patrón de acceso a datos descrito | El N+1 problem se resuelve con `JOIN`/eager loading |
| 5 | B | A) sí es un problema grave de seguridad. C/D no son el riesgo principal aquí | Interpolar input directamente en SQL = vulnerabilidad de inyección |

## Microservicios

| # | Respuesta | Por qué las otras opciones están mal | Concepto a recordar |
|---|---|---|---|
| 1 | B | A/C/D no son la razón arquitectónica real | Database per service evita acoplamiento entre esquemas |
| 2 | B | A/C/D no son el objetivo del Circuit Breaker | Previene cascading failures al dejar de llamar a un servicio caído |
| 3 | B | A) no siempre es cierto. C) las colas no garantizan consistencia fuerte por sí mismas. D) no elimina el Gateway | Comunicación asíncrona desacopla disponibilidad entre servicios |
| 4 | B | A/C/D no describen el anti-patrón de acoplamiento síncrono | Demasiada comunicación síncrona recrea las desventajas de un monolito |
| 5 | B | A/C/D no son cómo funciona Saga (no hay lock global ni 2PC) | Transacciones locales + compensaciones |
| 6 | B | A/C/D no son responsabilidades típicas de un Gateway | Ruteo + auth + rate limiting + agregación, centralizados |
| 7 | B | A/C/D no explican por qué importa la idempotencia | At-least-once delivery puede entregar el mismo mensaje más de una vez |
| 8 | B | A/C/D no son el problema que resuelve el patrón | Atomicidad entre guardar el dato y publicar su evento |
| 9 | B | A) no siempre es más rápido al inicio. C/D son falsos | Trade-off: independencia de despliegue a cambio de complejidad operativa |
| 10 | B | A) no previene el doble cobro. C/D no resuelven el problema real | Idempotency key = mismo resultado sin reprocesar |

---

# SIMULACRO DE ENTREVISTA BACKEND NODE.JS

> Intenta responder las 37 preguntas bajo presión de tiempo (~45 min) antes de revisar las soluciones.

### Node & JavaScript (15 preguntas)

**1.** ¿Qué imprime este código?
```javascript
let x = 1;
{
  let x = 2;
  var y = 3;
}
console.log(x, y);
```
A) `1 3` B) `2 3` C) `1 undefined` D) `ReferenceError`

**2.** ¿Qué retorna `[] + {}`?
A) `0` B) `"[object Object]"` C) `NaN` D) `TypeError`

**3.** ¿Qué imprime este código?
```javascript
console.log(0.1 + 0.2 === 0.3);
```
A) `true` B) `false`

**4.** ¿Qué hace `Object.freeze(obj)`?
A) Congela profundamente todos los objetos anidados B) Impide agregar/eliminar/reasignar propiedades de primer nivel (shallow) C) Convierte el objeto a JSON D) Lo hace asíncrono

**5.** ¿Qué imprime este código?
```javascript
console.log([..."abc"]);
```
A) `"abc"` B) `["a", "b", "c"]` C) `[object Array]` D) Error

**6.** ¿Qué devuelve `Promise.all([])` (array vacío)?
A) Rechaza B) Resuelve inmediatamente con `[]` C) Queda colgado para siempre D) `undefined`

**7.** ¿Qué imprime este código?
```javascript
async function f() {
  console.log("1");
  await Promise.resolve();
  console.log("2");
}
f();
console.log("3");
```
A) 1, 2, 3 B) 1, 3, 2 C) 3, 1, 2 D) 3, 2, 1

**8.** ¿Qué es una "race condition"?
A) Un error de sintaxis B) Un bug causado por el orden/timing impredecible de operaciones concurrentes C) Un tipo de JOIN en SQL D) Un problema de renderizado

**9.** ¿Qué imprime este código?
```javascript
const arr = [1, 2, 3];
const arr2 = arr;
arr2.push(4);
console.log(arr);
```
A) `[1, 2, 3]` B) `[1, 2, 3, 4]` C) `TypeError` D) `undefined`

**10.** ¿Qué está mal en este middleware de Express?
```javascript
app.use((req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send('Unauthorized');
  }
  next();
});
```
A) Nada, está bien B) Falta un `return` antes de `next()` — llama a `next()` incluso tras responder 401 C) `next()` nunca debería llamarse D) El status code es incorrecto

**11.** ¿Qué imprime `Buffer.from('abc').toString('hex')`?
A) `"abc"` B) `"616263"` C) `3` D) `[97, 98, 99]`

**12.** ¿Cuál es la diferencia entre una propiedad opcional (`x?: number`) y `x: number | undefined` en un tipo/interfaz?
A) Son 100% idénticas B) `x?` permite omitir la propiedad por completo; la segunda forma exige que la clave exista (aunque sea `undefined`) C) La segunda no permite `undefined` D) La primera exige la propiedad

**13.** ¿Qué devuelve `[1,2,3].reduce((acc, n) => acc + n)` sin valor inicial?
A) `6` B) Error C) `undefined` D) `[1,2,3]`

**14.** ¿Qué imprime este código?
```javascript
console.log(typeof NaN);
```
A) `"NaN"` B) `"number"` C) `"undefined"` D) `"object"`

**15.** ¿Qué problema de arquitectura tiene este handler?
```javascript
app.get('/report', (req, res) => {
  const result = generateHugeReportSync(data);
  res.json(result);
});
```
A) Ninguno B) Bloquea el Event Loop mientras calcula, congelando todas las requests concurrentes C) El JSON es demasiado grande D) Debería usar `async/await`

### Conceptos generales de Node.js (7 preguntas)

**16.** ¿Qué motor usa Node.js para ejecutar JavaScript?
A) SpiderMonkey B) V8 C) Chakra D) JavaScriptCore

**17.** ¿Qué librería provee el Event Loop y el I/O asíncrono de Node?
A) libuv B) V8 C) npm D) OpenSSL

**18.** Un cliente envía demasiadas requests en poco tiempo y el servidor quiere limitarlas. ¿Qué status code aplica?
A) 403 B) 429 C) 503 D) 400

**19.** ¿Qué diferencia hay entre `require` e `import`?
A) `require` es asíncrono, `import` es síncrono B) `require` es CommonJS y síncrono; `import` (ESM) soporta análisis estático y carga asíncrona C) Son exactamente iguales D) `import` solo funciona con JSON

**20.** Un microservicio upstream del que depende tu API devuelve una respuesta inválida. ¿Qué código debería devolver tu API Gateway?
A) 500 B) 501 C) 502 D) 503

**21.** ¿Cuál es el propósito de un refresh token?
A) Reemplazar las contraseñas por completo B) Obtener un nuevo access token sin requerir que el usuario inicie sesión de nuevo C) Encriptar el access token D) Identificar al servidor, no al usuario

**22.** ¿Qué hace `EventEmitter` si se emite un evento `'error'` sin ningún listener?
A) No pasa nada, se ignora B) Node.js lanza el error y puede tumbar el proceso C) Reintenta automáticamente D) Solo registra un warning

### SQL (5 preguntas)

**23.** Dadas las tablas `users(id, name)` y `orders(id, user_id, total)`, ¿qué query obtiene el nombre de cada usuario y su total gastado, incluyendo usuarios sin órdenes (mostrando 0)?
A) `SELECT u.name, SUM(o.total) FROM users u INNER JOIN orders o ON o.user_id = u.id GROUP BY u.name`
B) `SELECT u.name, COALESCE(SUM(o.total), 0) FROM users u LEFT JOIN orders o ON o.user_id = u.id GROUP BY u.id, u.name`
C) `SELECT u.name, SUM(o.total) FROM users u, orders o GROUP BY u.name`
D) `SELECT u.name FROM users u WHERE u.id IN (SELECT user_id FROM orders)`

**24.** ¿Qué estrategia de paginación es más eficiente en tablas muy grandes?
A) Offset-based (`LIMIT/OFFSET`) B) Cursor-based (`WHERE id > lastId`) C) Ambas son iguales D) Ninguna se usa en producción

**25.** ¿Qué tipo de locking conviene para operaciones con alta probabilidad de conflicto (ej. balances financieros)?
A) Optimistic locking B) Pessimistic locking C) No usar ningún lock D) Normalización

**26.** ¿Qué devuelve `WHERE phone = NULL`?
A) Las filas donde `phone` es `NULL` B) Ningún resultado, siempre — hay que usar `IS NULL` C) Un error de sintaxis D) Todas las filas

**27.** ¿Cuál es el principal riesgo de indexar todas las columnas de una tabla?
A) Ninguno, siempre es buena idea B) Ralentiza los `INSERT`/`UPDATE`/`DELETE` y consume más espacio en disco C) Los índices no tienen costo D) Rompe las foreign keys

### Microservicios (10 preguntas)

**28.** ¿Qué patrón evita que un cliente deba conocer y llamar directamente a N microservicios?
A) Circuit Breaker B) API Gateway C) Saga D) CQRS

**29.** ¿Qué diferencia hay entre `queue` (RabbitMQ) y `topic` (Kafka)?
A) Son lo mismo B) Una queue la procesa un solo consumidor; un topic permite múltiples consumidores independientes C) Las queues no persisten mensajes D) Los topics no soportan múltiples consumidores

**30.** ¿Qué es "eventual consistency"?
A) Los datos nunca se sincronizan B) Los datos replicados convergen con el tiempo, no de forma inmediata C) Es lo mismo que strong consistency D) Solo aplica a bases de datos SQL

**31.** ¿Qué resuelve el patrón CQRS?
A) La seguridad entre servicios B) Separar el modelo de escritura del modelo de lectura para optimizar cada uno por separado C) La comunicación síncrona D) El descubrimiento de servicios

**32.** ¿Qué es el Strangler Fig Pattern?
A) Un patrón de bases de datos B) Migrar gradualmente un monolito a microservicios, redirigiendo tráfico ruta por ruta C) Un patrón de autenticación D) Un tipo de circuit breaker

**33.** ¿Por qué un retry automático sin backoff puede empeorar un incidente?
A) No lo empeora B) Genera ráfagas de reintentos inmediatos que pueden saturar aún más un servicio ya degradado C) Los retries siempre tienen backoff por defecto D) Los retries no afectan la carga del servicio

**34.** ¿Qué es Event Sourcing?
A) Guardar solo el estado actual de una entidad B) Guardar la secuencia completa de eventos que llevaron al estado actual, permitiendo reconstruirlo en cualquier punto C) Un sistema de logging D) Un tipo de API Gateway

**35.** En el patrón Saga, si el paso de "cobrar el pago" falla después de que ya se reservó inventario, ¿qué debe ocurrir?
A) Nada, se ignora el fallo B) Se ejecuta una acción compensatoria que libera el inventario reservado C) Se bloquea la base de datos D) Se reintenta indefinidamente sin límite

**36.** ¿Qué es un "health check" en microservicios?
A) Un test unitario B) Un endpoint que reporta si el servicio está operativo, usado por el orquestador/load balancer C) Un reporte de seguridad D) Una métrica de negocio

**37.** ¿Por qué compartir una base de datos entre dos microservicios se considera un anti-patrón?
A) Es más lento siempre B) Acopla los servicios a nivel de datos — un cambio de esquema de uno puede romper al otro C) No es posible técnicamente D) Viola las reglas de SQL

---

## SOLUCIONES DEL SIMULACRO

| # | Respuesta | Explicación |
|---|---|---|
| 1 | A | El `let x = 2` interno está limitado al bloque; `var y` escapa del bloque (no tiene scope de bloque) |
| 2 | B | Ambos operandos se convierten a string (`""` y `"[object Object]"`) y se concatenan |
| 3 | B | Error de precisión de punto flotante — `0.1 + 0.2` es `0.30000000000000004` |
| 4 | B | `Object.freeze` es shallow — los objetos anidados siguen siendo mutables |
| 5 | B | Spread sobre un string produce un array de sus caracteres |
| 6 | B | `Promise.all` con un array vacío resuelve inmediatamente con `[]` (no hay nada que esperar) |
| 7 | B | Código síncrono primero (`1`, `3`), luego la continuación tras el `await` como microtask (`2`) |
| 8 | B | Bug causado por timing/orden impredecible de operaciones concurrentes |
| 9 | B | `arr2 = arr` copia la referencia; ambas variables apuntan al mismo array en memoria |
| 10 | B | Falta `return` antes de `next()` — responde 401 pero igual continúa la cadena de middlewares |
| 11 | B | Representa los códigos ASCII de a, b, c en hexadecimal |
| 12 | B | `x?` permite omitir la clave por completo; `x: number \| undefined` exige que la clave exista |
| 13 | A | Sin valor inicial, usa el primer elemento como acumulador y empieza desde el segundo |
| 14 | B | Contraintuitivo: `NaN` es técnicamente de tipo `number` |
| 15 | B | Un cálculo síncrono pesado bloquea el único hilo de JS, congelando el servidor completo |
| 16 | B | Node usa V8, el mismo motor de Chrome |
| 17 | A | libuv provee el Event Loop y las operaciones de I/O asíncronas |
| 18 | B | `429 Too Many Requests` es el código estándar para rate limiting |
| 19 | B | CommonJS es síncrono; ESM soporta análisis estático y carga asíncrona |
| 20 | C | `502 Bad Gateway` — el gateway recibió una respuesta inválida de un servidor upstream |
| 21 | B | Permite renovar el access token sin pedir credenciales de nuevo |
| 22 | B | `'error'` es un evento especial en `EventEmitter`; sin listener, Node lanza la excepción |
| 23 | B | `LEFT JOIN` + `COALESCE` incluye usuarios sin órdenes, mostrando 0 en vez de `NULL` |
| 24 | B | Cursor-based evita recorrer y descartar filas previas como hace `OFFSET` en tablas grandes |
| 25 | B | Pessimistic locking previene conflictos directamente cuando la probabilidad de colisión es alta |
| 26 | B | `NULL` nunca es "igual" a nada, ni siquiera a sí mismo — se requiere `IS NULL` |
| 27 | B | Cada índice adicional ralentiza las escrituras y consume espacio en disco |
| 28 | B | El API Gateway centraliza el punto de entrada para los clientes |
| 29 | B | Una queue es punto-a-punto (un consumidor); un topic permite múltiples consumidores independientes |
| 30 | B | Es el trade-off típico de sistemas distribuidos a cambio de mayor disponibilidad |
| 31 | B | CQRS separa y optimiza independientemente los modelos de lectura y escritura |
| 32 | B | Migración gradual redirigiendo tráfico ruta por ruta, sin un corte abrupto ("big bang") |
| 33 | B | Sin backoff, los reintentos generan ráfagas que saturan aún más un servicio ya degradado |
| 34 | B | Guarda la secuencia completa de eventos, no solo el estado final, permitiendo reconstrucción |
| 35 | B | Se ejecuta la compensación correspondiente (liberar inventario) para mantener consistencia |
| 36 | B | Reporta si el servicio está operativo, usado por el orquestador para decidir enviar tráfico |
| 37 | B | Un cambio de esquema de un servicio puede romper silenciosamente a otro — acoplamiento de datos |

---

# TOP 50 CONCEPTOS QUE DEBO DOMINAR

### 🔥🔥🔥🔥🔥 Imprescindible

1. Closures
2. Event Loop (Call Stack, microtasks, macrotasks, `process.nextTick`)
3. `var` vs `let` vs `const` + hoisting + TDZ
4. Promesas y sus combinadores (`all`, `allSettled`, `race`, `any`)
5. Ejecución secuencial vs paralela (`await` en serie vs `Promise.all`)
6. `forEach` no espera `async` — usar `for...of` o `Promise.all(map())`
7. `==` vs `===` y coerción de tipos
8. Shallow copy vs deep copy
9. Si Node es single-threaded, ¿cómo maneja concurrencia? (libuv + thread pool)
10. CPU-bound vs I/O-bound
11. HTTP status codes (`401` vs `403`, `400` vs `422`, `201`, `204`, `409`, `429`, `502`)
12. REST: idempotencia y statelessness
13. Autenticación vs Autorización
14. JWT: estructura y por qué el payload no es seguro
15. `INNER JOIN` vs `LEFT JOIN`
16. `WHERE` vs `HAVING`
17. ACID (especialmente Atomicity, Isolation, Durability)
18. N+1 query problem
19. SQL Injection y queries parametrizadas
20. Monolito vs Microservicios: ventajas, desventajas, cuándo usar cada uno
21. Comunicación síncrona vs asíncrona entre servicios
22. Circuit Breaker
23. Saga Pattern y transacciones distribuidas
24. Idempotencia (y idempotency keys en pagos)
25. CAP theorem / strong vs eventual consistency

### 🔥🔥🔥🔥 Muy importante

26. `this`, `call`, `apply`, `bind`
27. Optional chaining (`?.`) y Nullish coalescing (`??`)
28. `reduce` (con y sin valor inicial) y `sort()` sin comparador
29. Destructuring con renombrado de variables
30. Memory leaks comunes en Node.js
31. `try/catch` con `async/await` (y el error de olvidar `await`)
32. CommonJS vs ES Modules
33. `npm install` vs `npm ci`, semver (`^` vs `~`)
34. bcrypt y password hashing
35. CORS, CSRF, XSS
36. Paginación: offset vs cursor-based
37. Optimistic vs Pessimistic locking
38. Transacciones SQL (`BEGIN`/`COMMIT`/`ROLLBACK`)
39. Patrones de resiliencia: timeout, retry, exponential backoff, bulkhead
40. API Gateway
41. Database per service vs shared database
42. Outbox Pattern
43. Middleware / Controller / Service / DI (conceptos de Express/NestJS)
44. Índices en SQL (cuándo ayudan y cuándo perjudican)
45. Distributed tracing y correlation ID

### 🔥🔥🔥 Importante

46. Prototype chain y herencia en JS
47. Streams y backpressure
48. Normalización (1NF/2NF/3NF) y denormalización
49. CQRS y Event Sourcing
50. Connection pooling

---

# PLAN DE ESTUDIO — 7 días

## 🗓️ Día 1 — JavaScript fundamental + Funciones
- Estudia a fondo: `var`/`let`/`const`, hoisting, TDZ, tipos primitivos vs referencia, `==` vs `===`, truthy/falsy, destructuring, spread/rest.
- Domina closures — resuelve de memoria el ejercicio del loop con `var` vs `let`.
- Repasa function declaration vs expression vs arrow function y sus diferencias de hoisting/`this`.
- Practica: responde las secciones 1.1 y 1.2 sin ver las respuestas primero.

## 🗓️ Día 2 — Arrays, Objetos y Asincronía
- Domina la tabla de métodos de array (`map`/`filter`/`reduce`/`find`/`sort`/etc.) y el comportamiento de `reduce` sin valor inicial.
- Repasa shallow vs deep copy hasta poder explicarlo con un ejemplo propio.
- Estudia a fondo Promesas: estados, combinadores (`all`/`allSettled`/`race`/`any`), y el error de `forEach` con `async`.
- 🔥 Memoriza la diferencia entre ejecución secuencial y paralela — es el error de rendimiento más preguntado.

## 🗓️ Día 3 — Event Loop + JS avanzado
- Estudia el orden de prioridad: síncrono → `process.nextTick` → microtasks → macrotasks.
- Resuelve los 4 ejercicios de predicción de orden de la sección 1.6 sin ver la respuesta primero, cronometrándote.
- Repasa `this`/`call`/`apply`/`bind`, clases, prototype chain.
- Haz las 15 preguntas de práctica de "Node & JavaScript" cronometrado a 22 minutos.

## 🗓️ Día 4 — Conceptos generales de Node.js
- Prepara en voz alta la respuesta a: "si Node es single-threaded, ¿cómo maneja miles de conexiones?"
- Repasa CommonJS vs ESM, npm/semver, HTTP status codes (memoriza la tabla completa), REST (idempotencia, PUT vs PATCH).
- Estudia seguridad: AuthN vs AuthZ, JWT, bcrypt, CORS/CSRF/XSS, SQL injection.
- Repasa streams/buffers y los conceptos de Express/NestJS (middleware, DI, guards, DTO).
- Haz las 7 preguntas de práctica cronometrado a 11 minutos.

## 🗓️ Día 5 — SQL
- Memoriza los 4 tipos de JOIN con sus diagramas hasta poder dibujarlos de memoria.
- Domina `WHERE` vs `HAVING`, ACID, N+1 problem, optimistic vs pessimistic locking.
- Resuelve las 9 consultas de entrevista de la sección 3.9 **escribiendo el SQL tú mismo** antes de ver la solución.
- Haz las 5 preguntas de práctica cronometrado a 11 minutos.

## 🗓️ Día 6 — Microservicios
- Repasa monolito vs microservicios (ventajas/desventajas/cuándo usar cada uno).
- Domina comunicación síncrona vs asíncrona, Circuit Breaker, Saga Pattern, idempotencia con ejemplo de pagos.
- Estudia los 8 patrones de la sección 4.9 enfocándote en "qué problema resuelve cada uno", no solo la definición.
- Haz las 10 preguntas de práctica.

## 🗓️ Día 7 — Simulacro completo + repaso final
- Haz el [Simulacro de Entrevista Backend Node.js](#simulacro-de-entrevista-backend-nodejs) completo (37 preguntas), cronometrado a ~45 minutos, sin ver las soluciones hasta terminar.
- Revisa el [Top 50 Conceptos](#top-50-conceptos-que-debo-dominar) de arriba hacia abajo — para cada uno de los primeros 25, intenta explicarlo en voz alta sin leer la guía.
- Repasa específicamente las "trampas comunes" marcadas con ⚠️ en toda la guía — son los errores que la prueba está diseñada para detectar.
- Duerme bien la noche anterior a la prueba — la claridad de razonamiento importa más que memorizar una línea extra.
