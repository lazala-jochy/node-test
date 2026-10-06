[⬅ Volver al README principal](../README.md)

# 16. Sistemas Distribuidos

*Las garantías y trade-offs fundamentales al construir un sistema que corre en más de una máquina.*

## 16.1 CAP Theorem

**Definición:** en presencia de una partición de red (**P**), un sistema distribuido debe elegir entre **Consistency** (toda lectura ve el dato más reciente) y **Availability** (el sistema sigue respondiendo). No se pueden garantizar las tres simultáneamente.

| Elección | Significa |
|---|---|
| **CP** (Consistency + Partition tolerance) | Prefiere rechazar requests antes que devolver datos desactualizados |
| **AP** (Availability + Partition tolerance) | Prefiere responder siempre, aunque el dato pueda estar desactualizado |

La Partition Tolerance no es realmente "opcional" en un sistema distribuido real — las particiones de red ocurren, así que en la práctica la elección real es entre **C** y **A** cuando una partición sucede.

**Ejemplo concreto:** un sistema de inventario tiene un nodo en EE.UU. y uno en Europa; la red entre ambos se cae (partición).
- **Elección CP:** el nodo de Europa rechaza ventas hasta reconectar con EE.UU., para evitar vender el mismo último producto dos veces con datos desactualizados.
- **Elección AP:** ambos nodos siguen vendiendo de forma independiente; al reconectar, puede descubrirse que se vendió de más (sobreventa) y hay que reconciliar manualmente.

**🔥🔥🔥🔥**

## 16.2 Replication y Sharding

| Concepto | Qué es |
|---|---|
| **Replication** | Copiar los mismos datos en varios nodos, para disponibilidad y lecturas distribuidas |
| **Sharding** | Dividir los datos entre varios nodos (cada uno con un subconjunto), para escalar escritura y almacenamiento |
| **Leader Election** | Mecanismo para que los nodos de un cluster acuerden cuál es el líder actual cuando el anterior falla |

```
Replication (misma data, N copias)        Sharding (data dividida, 1 copia cada parte)
┌─────────┐ ┌─────────┐ ┌─────────┐        ┌───────────┐ ┌───────────┐ ┌───────────┐
│ Nodo A  │ │ Nodo B  │ │ Nodo C  │        │ Shard 1    │ │ Shard 2    │ │ Shard 3    │
│ users   │ │ users   │ │ users   │        │ users      │ │ users      │ │ users      │
│ (todos) │ │ (todos) │ │ (todos) │        │ id 1-1000  │ │ id 1001-2k │ │ id 2001-3k │
└─────────┘ └─────────┘ └─────────┘        └───────────┘ └───────────┘ └───────────┘
 si A cae, B/C siguen sirviendo             si Shard 1 cae, solo esos usuarios son inaccesibles
 (alta disponibilidad de lectura)           (escala el volumen total de datos/escritura)
```

Es común combinar ambos: cada shard, a su vez, se replica en varios nodos para no perder disponibilidad dentro de ese shard.

## 16.3 Fallas en Sistemas Distribuidos

- **Network Partition:** parte de los nodos no puede comunicarse con el resto, aunque sigan operativos individualmente.
- **Failure Detection:** mecanismos (heartbeats, timeouts) para que el sistema note que un nodo dejó de responder.
- **Retry + Timeout + Idempotency:** la combinación estándar para tolerar fallas transitorias sin generar efectos duplicados (ver [secciones 10.6](10-microservicios.md#106-resiliencia) y [10.8](10-microservicios.md#108-idempotencia-en-microservicios)).

**🔥🔥🔥**

---

---

[⬅ Volver al README principal](../README.md)
