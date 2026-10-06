[⬅ Volver al README principal](../README.md)

# 20. Tablas Comparativas

<details>
<summary><b>Ver las 17 comparaciones clave — clic para expandir</b></summary>

| Comparación | Diferencia clave |
|---|---|
| `==` vs `===` | `==` coerciona tipos antes de comparar; `===` no |
| `var` vs `let` vs `const` | Scope de función + redeclarable vs scope de bloque reasignable vs scope de bloque fijo |
| Promise vs Callback | Promise es encadenable y maneja errores con `.catch()`; callback anida (`callback hell`) y maneja errores manualmente en cada nivel |
| `async/await` vs Promises | `async/await` es azúcar sintáctico sobre Promises — mismo mecanismo, sintaxis más legible |
| Microtask vs Macrotask | Microtasks (Promises) se agotan completamente antes de procesar la siguiente macrotask |
| REST vs gRPC | REST: HTTP/JSON, legible; gRPC: HTTP/2 + Protobuf binario, mayor rendimiento |
| Monolito vs Microservicios | Un solo deploy simple vs servicios independientes con mayor complejidad operativa |
| SQL vs NoSQL | Esquema fijo + ACID fuerte vs esquema flexible + escalado horizontal |
| Authentication vs Authorization | Quién eres vs qué puedes hacer |
| PUT vs PATCH | `PUT` reemplaza el recurso completo; `PATCH` actualiza solo los campos enviados |
| Session vs JWT | Session: estado en el servidor, requiere lookup; JWT: estado autocontenido en el token, sin lookup pero más difícil de revocar |
| RabbitMQ vs Kafka | Colas punto a punto vs log distribuido con múltiples consumer groups |
| Synchronous vs Asynchronous | Bloquea hasta terminar vs permite continuar mientras se espera el resultado |
| Optimistic vs Pessimistic Locking | No bloquea, reintenta si hubo conflicto vs bloquea la fila de inmediato |
| Horizontal vs Vertical Scaling | Agregar más máquinas vs agregar más recursos a una misma máquina |
| Unit vs Integration vs E2E Testing | Una pieza aislada vs varias piezas juntas vs el flujo completo como usuario real |
| Choreography vs Orchestration | Eventos descentralizados sin coordinador vs un orquestador central explícito |

</details>

---

---

[⬅ Volver al README principal](../README.md)
