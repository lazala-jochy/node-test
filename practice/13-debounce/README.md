# 13 — debounce

**Dificultad:** Medium · **Tiempo sugerido:** 15 min

## Enunciado

Escribe una función `debounce(fn, delay)` que retorne una versión "debounced" de `fn`: solo se ejecuta después de que pase `delay` ms sin que se la vuelva a llamar. Cada nueva llamada reinicia el temporizador.

## Firma

```ts
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void;
```

## Ejemplos

```ts
let callCount = 0;
const debounced = debounce(() => callCount++, 100);

debounced();
debounced();
debounced();
// callCount sigue siendo 0 inmediatamente despues

await delay(150);
// callCount es 1 (solo se ejecuto una vez, con los argumentos de la ULTIMA llamada)
```

## Edge cases a considerar

- Llamadas rápidas consecutivas deben colapsar en una sola ejecución (la del último call).
- Debe pasar los argumentos de la última invocación a `fn`.
- No ejecutar nada si nunca pasa el tiempo de `delay` sin llamadas nuevas.

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/13-debounce/solution.test.ts`
