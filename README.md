# Quiz aleatorio · Macroeconomía

Aplicación web estática que genera quizes aleatorios de selección múltiple
basados en los Talleres del curso de **Introducción a la Macroeconomía**
(Maestría en Economía Aplicada · Universidad de los Andes).

Cada quiz mezcla preguntas de varios talleres, con orden y opciones
aleatorizados, y los problemas numéricos generan valores nuevos en cada
intento — así puedes practicar la misma estructura con distintos números.

## Talleres incluidos

| # | Tema | Preguntas |
|---|---|---|
| 3 | Sistema monetario e inflación (apoyo) | 3 |
| 5 | Desempleo · flujos · sector formal-informal | 14 |
| 7 | Fluctuaciones y demanda agregada · DA-OA | 18 |
| 8 | IS-LM · cruz keynesiana · paradoja del ahorro | 18 |
| 9 | IS-LM · Mundell-Fleming · trinidad imposible | 26 |
| | **Total** | **79** |

## Tipos de pregunta

- **MCQ (4 opciones)**: selección múltiple clásica con 4 alternativas.
- **V/F con justificación**: 4 opciones que combinan Verdadero/Falso con la
  razón correcta (estilo Bloque Neón Uniandes).
- **V/F simple**: 2 opciones (Verdadero / Falso).
- **Numérica**: campo abierto para escribir un número. Acepta tolerancias
  por porcentaje o absoluta.

## Características

- **Aleatorización determinista** con semilla opcional (Mulberry32 + Fisher-Yates).
- **Selección de fuentes**: marca/desmarca talleres y dificultades antes de empezar.
- **Tipos filtrables**: puedes pedir sólo MCQ, sólo numéricas, etc.
- **Timer opcional** (90 s por pregunta).
- **Persistencia** en `localStorage`: historial de aciertos por pregunta y
  última configuración usada.
- **Repaso de preguntas falladas** al final, con explicación y referencia
  al taller de origen.
- **Renderizado de LaTeX** con KaTeX (CDN, sin instalación).
- **Sin frameworks, sin build step** — HTML + CSS + JS vanilla puro.
- **Sin datos reales** de ninguna economía: todo teórico/normalizado.

## Estructura

```
quiz-macro/
├── index.html      # punto de entrada
├── app.js          # motor del quiz
├── bank.js         # banco de preguntas (79+)
├── styles.css      # tema visual
└── README.md
```

No hay build, no hay backend. Es un sitio estático puro.

## Correr localmente

Cualquier servidor HTTP estático sirve:

```bash
python -m http.server 4174
```

Luego abre `http://127.0.0.1:4174/` en el navegador.

## Cómo agregar preguntas

Edita `bank.js`. Cada pregunta es un objeto con esta forma básica:

```js
{
  id: "t8-c10",                  // identificador único
  taller: 8,                      // 3, 5, 7, 8 o 9
  topic: "lm-equilibrium",        // categoría libre
  difficulty: "intermedio",       // basico | intermedio | avanzado
  type: "mcq",                    // mcq | tf-justify | tf | numeric
  prompt: "¿Pregunta?",           // puede tener LaTeX con \\( ... \\) o $$ ... $$
  options: ["A", "B", "C", "D"],  // (no aplica para tf simple ni numeric)
  correct: 0,                     // índice 0-based de la correcta (mcq, tf-justify)
                                  //   o true/false (tf simple)
                                  //   o no aplica (numeric: ver correctValue)
  explanation: "...",             // se muestra tras responder
  reference: "Taller 8 · 3.a"     // de dónde sale
}
```

Para preguntas numéricas paramétricas:

```js
{
  id: "t8-p10",
  taller: 8, topic: "...", difficulty: "intermedio", type: "numeric",
  generate(rng) {
    const M = rng.pick([800, 1000, 1200]);
    return {
      prompt: `Con M = ${M} ...`,
      correctValue: M / 2,
      tolerance: 0.5,            // o tolerancePct: 0.01
      unit: "%",                 // opcional, sólo para mostrar
      explanation: `M/2 = ${M/2}`,
    };
  }
}
```

`rng.pick`, `rng.int`, `rng.range` y `rng.shuffle` están disponibles dentro
de `generate`.

## Despliegue

Es un sitio estático: GitHub Pages, Render, Netlify, Cloudflare Pages, Vercel
funcionan sin configuración adicional.

## App hermana

[Laboratorio interactivo de modelos macroeconómicos](https://cterrassa.github.io/modelos-macro/)
— simulador visual con 18 modelos del curso. La presente app de quiz es
complementaria: te permite practicar los mismos conceptos con preguntas
aleatorizadas.

## Licencia

Material académico para uso educativo. Las preguntas y soluciones provienen
de los talleres del curso de Macroeconomía del prof. Hernán Vallejo.
