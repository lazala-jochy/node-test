[⬅ Volver al README principal](../README.md)

# 13. Testing

*Cómo se valida que el código backend funciona, tanto en aislamiento como integrado.*

## 13.1 Niveles de Testing

| Tipo | Qué prueba | Velocidad |
|---|---|---|
| **Unit Testing** | Una función/clase en aislamiento, sin dependencias externas | Muy rápida |
| **Integration Testing** | Varias piezas trabajando juntas (ej. service + DB real) | Media |
| **End-to-End (E2E) Testing** | El flujo completo, como lo viviría un usuario real | Lenta |

## 13.2 Mocks, Spies, Stubs

| Concepto | Qué hace |
|---|---|
| **Test Double** | Término general para cualquier objeto que reemplaza una dependencia real en un test |
| **Mock** | Reemplaza una dependencia y verifica *cómo* fue llamada (con qué argumentos, cuántas veces) |
| **Stub** | Reemplaza una dependencia devolviendo respuestas predefinidas, sin verificar interacción |
| **Spy** | Envuelve una función real, registrando sus llamadas sin alterar su comportamiento |

```javascript
// Jest — ejemplo de Arrange / Act / Assert
test('calcula el total con descuento', () => {
  // Arrange
  const items = [{ price: 100 }, { price: 50 }];
  // Act
  const total = calculateTotal(items, { discount: 0.1 });
  // Assert
  expect(total).toBe(135);
});
```

**Arrange / Act / Assert:** estructura estándar de un test — preparar el estado, ejecutar la acción, verificar el resultado.

**🔥🔥🔥🔥**

## 13.3 Test Coverage, Contract Testing, Test Isolation

- **Test Coverage:** % de código ejecutado por los tests — útil como señal, pero 100% de cobertura no implica ausencia de bugs.
- **Contract Testing:** verifica que un servicio cumple el "contrato" (formato de request/response) esperado por sus consumidores, sin necesitar un entorno integrado completo — muy usado entre microservicios.
- **Test Isolation:** cada test debe poder correr independientemente, sin depender del estado dejado por otro test.

**🔥🔥🔥**

---

---

[⬅ Volver al README principal](../README.md)
