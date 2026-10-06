[⬅ Volver al README principal](../README.md)

# 18. 🔥 Node.js — Fundamentos clave

*Los temas de Node.js que con más frecuencia se piden explicar en voz alta durante una entrevista — cada uno apunta a la sección donde está desarrollado en profundidad.*

| Tema | Idea central | Sección |
|---|---|---|
| **Qué es Node.js** | Runtime de JS sobre V8, fuera del navegador | [3.1](03-nodejs.md#31-qué-es-nodejs--v8-libuv-event-driven-non-blocking-io) |
| **Event Loop** | Call Stack → nextTick → microtasks → macrotasks, en ese orden | [2.5](02-javascript-asincronia.md#25-event-loop) |
| **¿Node es realmente single-threaded?** | Tu JS sí; el I/O se delega a libuv/OS, que sí es paralelo | [3.1](03-nodejs.md#31-qué-es-nodejs--v8-libuv-event-driven-non-blocking-io) |
| **libuv y Thread Pool** | Da a Node el Event Loop, I/O no bloqueante y 4 hilos internos por defecto | [3.2](03-nodejs.md#32-single-thread-thread-pool-worker-threads-cluster) |
| **CPU-bound vs I/O-bound** | Cómputo pesado bloquea el hilo; esperar una respuesta externa no | [3.2](03-nodejs.md#32-single-thread-thread-pool-worker-threads-cluster) |
| **Cómo funcionan las Promises** | Objeto con estado `pending/fulfilled/rejected`, encadenable | [2.2](02-javascript-asincronia.md#22-promises) |
| **Microtasks vs Macrotasks** | Microtasks (Promises) siempre se agotan antes de la siguiente macrotask | [2.5](02-javascript-asincronia.md#25-event-loop) |
| **Qué ocurre con `await`** | Pausa la función `async` y la reanuda como microtask cuando la Promise se asienta | [2.1](02-javascript-asincronia.md#21-síncrono-vs-asíncrono) |
| **`Promise.all` vs `Promise.allSettled`** | `all` falla rápido ante cualquier rechazo; `allSettled` nunca rechaza | [2.2](02-javascript-asincronia.md#22-promises) |
| **Closures** | Una función recuerda el scope léxico en que fue creada | [1.5](01-javascript-fundamentos.md#15-closures) |
| **Hoisting y Scope** | Declaraciones procesadas antes de ejecutar; distintos tipos de scope | [1.1](01-javascript-fundamentos.md#11-variables-y-scope) |
| **`this`** | Depende de cómo se llama la función, no de dónde se define | [1.7](01-javascript-fundamentos.md#17-this-call-apply-bind) |
| **`var`/`let`/`const`** | Scope de función vs bloque, TDZ | [1.1](01-javascript-fundamentos.md#11-variables-y-scope) |
| **`==` vs `===`** | Coerción de tipos vs comparación estricta | [1.3](01-javascript-fundamentos.md#13-igualdad---vs-) |
| **CommonJS vs ESM** | Síncrono + `require` vs análisis estático + `import` | [1.9](01-javascript-fundamentos.md#19-módulos-commonjs-vs-es-modules) |
| **Streams** | Procesan datos por chunks, memoria constante | [3.3](03-nodejs.md#33-streams-y-buffers) |
| **Buffers** | Datos binarios crudos | [3.3](03-nodejs.md#33-streams-y-buffers) |
| **Manejo de errores** | `uncaughtException`/`unhandledRejection`, graceful shutdown | [3.6](03-nodejs.md#36-manejo-de-errores-uncaught-exceptions-y-unhandled-rejections) |
| **No bloquear el Event Loop** | Delegar cómputo pesado a `worker_threads` o dividirlo en chunks asíncronos | [3.2](03-nodejs.md#32-single-thread-thread-pool-worker-threads-cluster) |
| **Memory Leaks** | Referencias vivas innecesarias — closures, listeners, caches sin límite | [1.11](01-javascript-fundamentos.md#111-garbage-collection-y-memory-management) |

---

---

[⬅ Volver al README principal](../README.md)
