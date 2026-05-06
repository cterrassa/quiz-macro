// ============================================================
// Banco de preguntas · Quiz Macroeconomía
// ============================================================
// Cada pregunta tiene:
//   id, taller, topic, difficulty, type, prompt, options[], correct
//   o bien generate(rng) para preguntas paramétricas
// Los textos pueden incluir LaTeX inline con \( ... \) y display $$ ... $$
// ============================================================

// helper de identidad (legibilidad). Las preguntas son objetos planos.
const Q = (def) => def;

const QUESTIONS = [
  // ============================================================
  // TALLER 5 · Desempleo
  // ============================================================
  Q({
    id: "t5-c01",
    taller: 5, topic: "definiciones", difficulty: "basico", type: "mcq",
    prompt: "¿Cuál es la diferencia clave entre desempleo friccional y desempleo estructural?",
    options: [
      "El friccional surge del proceso de búsqueda y emparejamiento entre trabajadores y vacantes; el estructural se debe a rigidez salarial que mantiene el salario por encima del de equilibrio.",
      "El friccional aparece sólo en recesiones; el estructural sólo en auges.",
      "El friccional afecta a personas mayores; el estructural a jóvenes.",
      "Son sinónimos: ambos describen desempleo de largo plazo causado por información asimétrica.",
    ],
    correct: 0,
    explanation: "El friccional refleja la fricción inherente al matching laboral (información imperfecta, movilidad limitada). El estructural surge cuando el salario real está por encima de w* por salario mínimo, sindicatos o salarios de eficiencia.",
    reference: "Taller 5 · Pres. 25, secciones Búsqueda y Espera",
  }),
  Q({
    id: "t5-c02",
    taller: 5, topic: "seguro-desempleo", difficulty: "basico", type: "mcq",
    prompt: "Sobre el seguro de desempleo, ¿cuál de las siguientes afirmaciones combina correctamente un beneficio y un costo?",
    options: [
      "Beneficio: reduce la incertidumbre y mejora el matching trabajador-puesto. Costo: alarga la duración del desempleo y tiene costo fiscal.",
      "Beneficio: aumenta la productividad agregada del país. Costo: reduce el ahorro nacional.",
      "Beneficio: elimina por completo el desempleo friccional. Costo: aumenta la inflación.",
      "Beneficio: sustituye al salario mínimo. Costo: hace innecesarios los sindicatos.",
    ],
    correct: 0,
    explanation: "El SD permite buscar empleo con menos urgencia (mejora el match) pero introduce moral hazard: la tasa de enganche cae y aumenta el costo fiscal.",
    reference: "Taller 5 · Pres. 25, evidencia empírica de Katz et al. (1990)",
  }),
  Q({
    id: "t5-tf01",
    taller: 5, topic: "flujos-laborales", difficulty: "basico", type: "tf-justify",
    prompt: "En el modelo de flujos laborales en estado estacionario, la tasa natural de desempleo se calcula como u = s / (s + f), donde s es la tasa de separación y f la tasa de enganche.",
    options: [
      "Verdadero. En estado estacionario los flujos hacia el desempleo (sE) igualan los flujos hacia el empleo (fU); de allí se obtiene u = s/(s+f).",
      "Verdadero. La tasa natural se obtiene siempre como s + f.",
      "Falso. Lo correcto es u = f / (s + f).",
      "Falso. La tasa natural se calcula con la curva de Beveridge, no con flujos.",
    ],
    correct: 0,
    explanation: "Igualando sE = fU y usando E + U = L, se despeja u = U/L = s/(s+f).",
    reference: "Taller 5 · Pres. 24",
  }),

  // T5 paramétrica: estado estacionario tipo "relación sentimental" (s y f variables)
  Q({
    id: "t5-p01",
    taller: 5, topic: "estado-estacionario", difficulty: "basico", type: "numeric",
    generate(rng) {
      const sep = rng.pick([5, 8, 10, 12, 15]) / 100; // 5%-15%
      const find = rng.pick([3, 5, 8, 10]) / 100; // 3%-10%
      const u = sep / (sep + find);
      return {
        prompt: `Cada mes, una proporción $${(sep * 100).toFixed(0)}\\%$ de las personas en relación termina su relación, y una proporción $${(find * 100).toFixed(0)}\\%$ de las solteras inicia una. ¿Cuál es la fracción de personas <em>solteras</em> en estado estacionario? (escribe en porcentaje, sin signo %)`,
        correctValue: u * 100,
        unit: "%",
        tolerancePct: 0.005,
        unitsHint: "Respuesta en porcentaje (ej. 60 para 60%).",
        explanation: `En estado estacionario las salidas igualan las entradas: $s \\cdot E = f \\cdot U$. Despejando, $\\frac{U}{L} = \\frac{s}{s+f} = \\frac{${(sep).toFixed(2)}}{${(sep).toFixed(2)}+${(find).toFixed(2)}} = ${(u * 100).toFixed(2)}\\%$.`,
        reference: "Taller 5 · ejercicio relación sentimental",
      };
    },
  }),

  // T5 paramétrica: flujos en próximo mes
  Q({
    id: "t5-p02",
    taller: 5, topic: "flujos-laborales", difficulty: "intermedio", type: "numeric",
    generate(rng) {
      const E = rng.pick([2300, 2500, 1800, 4000]);
      const U = rng.pick([200, 250, 150, 400]);
      const f = rng.pick([20, 23, 25, 30]) / 100;
      const s = rng.pick([1, 2, 3]) / 100;
      const willFind = U * f;
      const willLose = E * s;
      return {
        prompt: `Una economía tiene $E = ${E}$ empleados y $U = ${U}$ desempleados. Cada mes el ${(f * 100).toFixed(0)}% de los desempleados encuentra trabajo y el ${(s * 100).toFixed(0)}% de los empleados lo pierde. ¿Cuántas personas <strong>encuentran</strong> empleo el próximo mes?`,
        correctValue: willFind,
        unit: " personas",
        tolerancePct: 0.005,
        explanation: `Encuentran empleo: $f \\cdot U = ${f} \\cdot ${U} = ${willFind.toFixed(0)}$. Perderán empleo: $s \\cdot E = ${s} \\cdot ${E} = ${willLose.toFixed(0)}$.`,
        reference: "Taller 5 · numeral 4.a",
      };
    },
  }),
  Q({
    id: "t5-p03",
    taller: 5, topic: "flujos-laborales", difficulty: "intermedio", type: "numeric",
    generate(rng) {
      const E = rng.pick([2300, 2500, 1800, 4000]);
      const U = rng.pick([200, 250, 150, 400]);
      const f = rng.pick([20, 23, 25, 30]) / 100;
      const s = rng.pick([1, 2, 3]) / 100;
      const willFind = U * f;
      const willLose = E * s;
      const Enew = E - willLose + willFind;
      const Unew = U - willFind + willLose;
      const u = Unew / (Enew + Unew);
      return {
        prompt: `Con $E = ${E}$, $U = ${U}$, tasa de enganche $f = ${(f * 100).toFixed(0)}\\%$ y tasa de separación $s = ${(s * 100).toFixed(0)}\\%$. ¿Cuál es la tasa de desempleo al inicio del mes siguiente? (en porcentaje)`,
        correctValue: u * 100,
        unit: "%",
        tolerancePct: 0.01,
        unitsHint: "Respuesta en porcentaje (sin signo %).",
        explanation: `$E_1 = ${E} - ${willLose.toFixed(0)} + ${willFind.toFixed(0)} = ${Enew.toFixed(0)}$. $U_1 = ${U} - ${willFind.toFixed(0)} + ${willLose.toFixed(0)} = ${Unew.toFixed(0)}$. $u = U_1 / L = ${(u * 100).toFixed(2)}\\%$.`,
        reference: "Taller 5 · numeral 4.b",
      };
    },
  }),
  Q({
    id: "t5-p04",
    taller: 5, topic: "tasa-natural", difficulty: "intermedio", type: "numeric",
    generate(rng) {
      const f = rng.pick([15, 20, 23, 25, 30]) / 100;
      const s = rng.pick([1, 2, 3, 4]) / 100;
      const un = s / (s + f) * 100;
      return {
        prompt: `Calcula la tasa natural de desempleo si $f = ${(f * 100).toFixed(0)}\\%$ y $s = ${(s * 100).toFixed(0)}\\%$. (en porcentaje)`,
        correctValue: un,
        unit: "%",
        tolerancePct: 0.005,
        explanation: `$u^N = \\frac{s}{s+f} = \\frac{${s}}{${s}+${f}} = ${un.toFixed(2)}\\%$.`,
        reference: "Taller 5 · numeral 4.c",
      };
    },
  }),
  Q({
    id: "t5-c03",
    taller: 5, topic: "seguro-desempleo", difficulty: "intermedio", type: "mcq",
    prompt: "Aumentar el subsidio de desempleo (SD), ceteris paribus, ¿cómo afecta las tasas de enganche f y separación s?",
    options: [
      "f baja (los desempleados son más selectivos) y s sube (los empleados arriesgan más perder el trabajo).",
      "f sube (más motivación a buscar) y s baja (menos rotación voluntaria).",
      "f y s no se ven afectadas: el SD sólo redistribuye ingresos.",
      "f y s suben proporcionalmente.",
    ],
    correct: 0,
    explanation: "El SD reduce la presión por aceptar la primera oferta (↓f) y baja el costo de la separación tanto para empleadores como empleados (↑s). Ambos efectos elevan la tasa natural u.",
    reference: "Taller 5 · numeral 4.c",
  }),

  // T5 mercado laboral con Cobb-Douglas
  Q({
    id: "t5-p05",
    taller: 5, topic: "mercado-laboral", difficulty: "intermedio", type: "numeric",
    generate(rng) {
      const K = rng.pick([1000, 800, 1200]);
      const Lstar = K; // L de equilibrio asumiendo OO=L_total y DD=PMgL
      // Y = K^(1/3) L^(2/3) ; PMgL = (2/3) K^(1/3) L^(-1/3) = w*
      // Si L* = K, w* = (2/3) K^(1/3) K^(-1/3) = 2/3
      const w_eq = 2 / 3;
      return {
        prompt: `Una economía tiene función de producción $Y = K^{1/3} L^{2/3}$, $K = L = ${K}$ trabajadores. Si el salario real ajusta para equilibrar oferta y demanda de trabajo, ¿cuál es el salario real de equilibrio $w^*$? (con 2 decimales)`,
        correctValue: w_eq,
        unit: "",
        tolerance: 0.01,
        explanation: `En equilibrio $L^* = ${K}$. La demanda de trabajo es $w = PMgL = \\frac{2}{3} K^{1/3} L^{-1/3}$. Sustituyendo: $w = \\frac{2}{3}(${K}/${K})^{1/3} = ${w_eq.toFixed(4)}$.`,
        reference: "Taller 5 · numeral 6.b",
      };
    },
  }),
  Q({
    id: "t5-p06",
    taller: 5, topic: "salario-minimo", difficulty: "avanzado", type: "numeric",
    generate(rng) {
      const K = rng.pick([1000, 800, 1200]);
      const wmin = 1; // salario mínimo
      // PMgL = (2/3) K^(1/3) L^(-1/3) = wmin -> L^(1/3) = (2/3) K^(1/3) / wmin
      const Lnew = Math.pow((2 / 3) * Math.pow(K, 1 / 3) / wmin, 3);
      return {
        prompt: `Con $K = ${K}$ y función $Y = K^{1/3} L^{2/3}$, el congreso impone un salario mínimo de $w_{min} = 1$ (mayor al salario de equilibrio $2/3$). ¿Cuántos trabajadores se emplean? (redondea al entero)`,
        correctValue: Math.round(Lnew),
        unit: " trabajadores",
        tolerance: 1,
        explanation: `$wmin = \\frac{2}{3} K^{1/3} L^{-1/3} \\Rightarrow L = \\left(\\frac{2}{3} K^{1/3}\\right)^3 = \\frac{8 K}{27} = \\frac{8 \\cdot ${K}}{27} \\approx ${Math.round(Lnew)}$.`,
        reference: "Taller 5 · numeral 6.c",
      };
    },
  }),
  Q({
    id: "t5-c04",
    taller: 5, topic: "salario-minimo", difficulty: "intermedio", type: "tf-justify",
    prompt: "Un salario mínimo por encima del salario de equilibrio en un mercado laboral competitivo aumenta los ingresos totales de los trabajadores.",
    options: [
      "Falso. El salario sube pero el empleo cae; el efecto neto sobre el ingreso laboral total es ambiguo y puede ser negativo si la elasticidad de la demanda de trabajo es alta.",
      "Verdadero. Como el salario sube en una proporción mayor que la caída del empleo, el ingreso laboral siempre aumenta.",
      "Verdadero. Los efectos de oferta y demanda de trabajo se cancelan y el ingreso laboral total queda igual.",
      "Falso. El salario mínimo no afecta el ingreso laboral porque sólo afecta a una pequeña fracción de los trabajadores.",
    ],
    correct: 0,
    explanation: "El ingreso laboral total = w * L. Si w sube y L baja, la dirección depende de la elasticidad. Con la Cobb-Douglas Y = K^(1/3) L^(2/3) la elasticidad de Y respecto a L es 2/3, lo que típicamente reduce el ingreso laboral.",
    reference: "Taller 5 · numeral 6.c",
  }),

  // ============================================================
  // TALLER 7 · Fluctuaciones y demanda agregada
  // ============================================================
  Q({
    id: "t7-c01",
    taller: 7, topic: "lp-vs-cp", difficulty: "basico", type: "mcq",
    prompt: "¿Cuál es la principal causa de las diferencias entre la economía en el largo plazo y en el corto plazo?",
    options: [
      "La flexibilidad de los precios: en LP son flexibles y restauran Y = Y*, en CP son rígidos y los choques de demanda mueven Y.",
      "La cantidad de capital, que sólo varía en el largo plazo.",
      "El tamaño de la fuerza laboral, que es endógeno en CP y exógeno en LP.",
      "La tasa de interés internacional, que sólo es relevante en LP.",
    ],
    correct: 0,
    explanation: "Es la rigidez de precios la que genera los efectos reales de los choques nominales en CP. En LP, con precios flexibles, vale la dicotomía clásica.",
    reference: "Taller 7 · 1.1",
  }),
  Q({
    id: "t7-c02",
    taller: 7, topic: "rigidez-precios", difficulty: "basico", type: "mcq",
    prompt: "¿Cuál de los siguientes NO es un motivo aceptado para la rigidez de precios en el corto plazo?",
    options: [
      "La perfecta competencia hace que las firmas no tengan poder para cambiar precios.",
      "Los costos de menú: cambiar precios tiene costos directos y reputacionales.",
      "Los contratos plurianuales de salarios e insumos.",
      "La preocupación de las firmas por la coordinación con los precios de la competencia.",
    ],
    correct: 0,
    explanation: "Justamente lo opuesto: la rigidez es típica de mercados con poder de mercado (competencia monopolística), no de competencia perfecta.",
    reference: "Taller 7 · 1.2",
  }),
  Q({
    id: "t7-c03",
    taller: 7, topic: "okun-clasico", difficulty: "intermedio", type: "tf-justify",
    prompt: "El modelo clásico es inconsistente con la Ley de Okun.",
    options: [
      "Verdadero, porque el modelo clásico tiene precios flexibles y por tanto Y = Y* siempre, sin las desviaciones cíclicas que la Ley de Okun describe.",
      "Falso, el modelo clásico predice exactamente la pendiente que Okun observó.",
      "Verdadero, porque la Ley de Okun habla de precios y el modelo clásico de cantidades.",
      "Falso, ambos modelos asumen rigidez salarial.",
    ],
    correct: 0,
    explanation: "En el modelo clásico Y siempre se ajusta a Y* y el desempleo siempre está en su nivel natural; no hay fluctuaciones que correlacionar.",
    reference: "Taller 7 · 1.3",
  }),
  Q({
    id: "t7-c04",
    taller: 7, topic: "da-oa", difficulty: "intermedio", type: "mcq",
    prompt: "En una crisis se observa que el PIB cae y los precios también caen. ¿Cuál fue el choque?",
    options: [
      "Un choque negativo de demanda agregada (DA se desplazó a la izquierda).",
      "Un choque negativo de oferta agregada (OA a la izquierda).",
      "Un choque positivo de oferta (OA a la derecha).",
      "Una combinación de ambos no permite identificarlo.",
    ],
    correct: 0,
    explanation: "Caída en DA mueve el equilibrio CP a menor Y y menor P. Una caída de OA produciría estanflación (menor Y pero mayor P).",
    reference: "Taller 7 · 1.4",
  }),
  Q({
    id: "t7-c05",
    taller: 7, topic: "demanda-dinero", difficulty: "intermedio", type: "mcq",
    prompt: "Si los bancos comerciales empiezan a pagar interés por las cuentas corrientes, ceteris paribus, la demanda de dinero y la velocidad cambian de la siguiente forma:",
    options: [
      "La demanda de dinero sube y la velocidad V cae.",
      "La demanda de dinero baja y la velocidad V sube.",
      "Ambas suben porque el dinero se vuelve más rentable.",
      "Ninguna cambia: solo se redistribuye entre efectivo y depósitos.",
    ],
    correct: 0,
    explanation: "El dinero se vuelve más atractivo (cae el costo de oportunidad). Como V = PY/M y M^d sube para un mismo PY, V cae.",
    reference: "Taller 7 · 2.a",
  }),

  // T7 paramétrica: ecuación cuantitativa básica
  Q({
    id: "t7-p01",
    taller: 7, topic: "ecuacion-cuantitativa", difficulty: "basico", type: "numeric",
    generate(rng) {
      const M = rng.pick([40, 50, 60, 80, 100]);
      const V = rng.pick([3, 4, 5]);
      const Y = rng.pick([1500, 2000, 2500, 3000]);
      const P = (M * V) / Y;
      return {
        prompt: `En una economía donde se cumple $MV = PY$, $M = ${M}$, $V = ${V}$ y $Y = ${Y}$. ¿Cuál es el nivel de precios $P$? (con 4 decimales)`,
        correctValue: P,
        tolerance: 0.001,
        explanation: `$P = \\frac{MV}{Y} = \\frac{${M} \\cdot ${V}}{${Y}} = ${P.toFixed(4)}$.`,
        reference: "Taller 7 · 3.a",
      };
    },
  }),
  Q({
    id: "t7-p02",
    taller: 7, topic: "produccion-cd", difficulty: "intermedio", type: "numeric",
    generate(rng) {
      const A = rng.pick([2, 3, 5]);
      const N = rng.pick([1000, 800, 1500]);
      const Y = A * N; // Y = A K^(1/4) L^(1/2) T^(1/4) con K=L=T=N -> Y = A * N
      return {
        prompt: `En una economía con función $Y = ${A} K^{1/4} L^{1/2} T^{1/4}$ y $K = L = T = ${N}$, ¿cuál es el producto potencial $Y^*$?`,
        correctValue: Y,
        tolerance: 1,
        explanation: `Como los exponentes suman 1, $Y = ${A} \\cdot ${N}^{1/4 + 1/2 + 1/4} = ${A} \\cdot ${N} = ${Y}$.`,
        reference: "Taller 7 · 3.a",
      };
    },
  }),
  Q({
    id: "t7-p03",
    taller: 7, topic: "ecuacion-cuantitativa", difficulty: "intermedio", type: "numeric",
    generate(rng) {
      const M = rng.pick([30, 40, 50]);
      const V = 4;
      const P = rng.pick([0.10, 0.12, 0.08]); // P pegajoso
      const Y_CP = (M * V) / P;
      return {
        prompt: `En CP los precios son rígidos en $P = ${P}$. Si $M = ${M}$ y $V = ${V}$, ¿cuánto es el producto $Y_{CP}$ (cantidad demandada)?`,
        correctValue: Y_CP,
        tolerance: 1,
        explanation: `$Y_{CP} = \\frac{MV}{P} = \\frac{${M} \\cdot ${V}}{${P}} = ${Y_CP.toFixed(0)}$.`,
        reference: "Taller 7 · 3.b CP",
      };
    },
  }),
  Q({
    id: "t7-c06",
    taller: 7, topic: "neutralidad", difficulty: "basico", type: "tf-justify",
    prompt: "El producto de largo plazo Y* depende del parámetro de velocidad V de la ecuación cuantitativa MV = PY.",
    options: [
      "Falso. Y* lo determina la dotación de factores y la tecnología; V afecta sólo a los precios en LP.",
      "Falso. Y* depende positivamente de V con elasticidad 1.",
      "Verdadero. A mayor V, mayor Y*.",
      "Verdadero, pero sólo en CP.",
    ],
    correct: 0,
    explanation: "En LP rige la dicotomía clásica: las variables nominales (M, V, P) no afectan las reales (Y, r real, w/P).",
    reference: "Taller 7 · 3.a",
  }),
  Q({
    id: "t7-p04",
    taller: 7, topic: "desempleo-shock", difficulty: "avanzado", type: "numeric",
    generate(rng) {
      const Lstar = 1000;
      const ratio = rng.pick([0.7, 0.8, 0.9]); // Y_CP/Y_LP
      // Y = 2 K^1/4 L^1/2 T^1/4, con K=T=1000 fijos -> Y prop sqrt(L)
      const L_CP = Math.pow(ratio, 2) * Lstar;
      const u = (Lstar - L_CP) / Lstar * 100;
      return {
        prompt: `En la economía con $Y = 2 K^{1/4} L^{1/2} T^{1/4}$, $K = T = L^* = 1000$ (en el LP). Si el producto de CP cae a $Y_{CP} / Y^* = ${ratio.toFixed(1)}$, ¿cuál es la tasa de desempleo? (en porcentaje, sin signo %)`,
        correctValue: u,
        tolerancePct: 0.01,
        unitsHint: "Respuesta en porcentaje (ej. 36 para 36%).",
        explanation: `Con K, T fijos, $Y \\propto L^{1/2}$. Entonces $L_{CP}/L^* = (Y_{CP}/Y^*)^2 = ${(ratio * ratio).toFixed(3)}$. $u = 1 - L_{CP}/L^* = ${u.toFixed(1)}\\%$.`,
        reference: "Taller 7 · 3.d",
      };
    },
  }),
  Q({
    id: "t7-c07",
    taller: 7, topic: "shock-oferta", difficulty: "intermedio", type: "mcq",
    prompt: "Ante un choque de oferta adverso (precios suben transitoriamente), si el BC quiere mantener Y en su nivel potencial, debería:",
    options: [
      "Aumentar M en la misma proporción del aumento de precios; pero esto convalida la inflación y puede generar espiral si el choque se repite.",
      "Mantener M constante para no acomodar la inflación; esto siempre devuelve Y a Y*.",
      "Reducir M para combatir la inflación, lo que también restaura Y.",
      "No hacer nada: Y vuelve solo a Y* sin necesidad de política monetaria.",
    ],
    correct: 0,
    explanation: "Acomodar permite mantener Y pero deja el nivel de precios más alto. No acomodar mantiene la estabilidad de precios pero deja que Y caiga en CP.",
    reference: "Taller 7 · 3.e",
  }),
  Q({
    id: "t7-tf01",
    taller: 7, topic: "neutralidad", difficulty: "basico", type: "tf",
    prompt: "En el largo plazo, una expansión monetaria (M ↑) en un modelo clásico afecta el producto real Y.",
    correct: false,
    explanation: "Neutralidad del dinero: en LP los cambios en M se traducen 1 a 1 en P, sin afectar Y.",
    reference: "Taller 7 · dicotomía clásica",
  }),
  Q({
    id: "t7-tf02",
    taller: 7, topic: "deflacion", difficulty: "intermedio", type: "tf",
    prompt: "La deflación le quita dinamismo a la economía: si los agentes esperan que los precios sigan cayendo, posponen el consumo presente.",
    correct: true,
    explanation: "Anticipación de deflación = aumento de la tasa real esperada. Posponer consumo es racional individualmente pero agregadamente deprime más la DA (problema de coordinación).",
    reference: "Taller 7 · pres. 16-17 inflación y costos",
  }),

  // ============================================================
  // TALLER 8 · IS-LM
  // ============================================================
  Q({
    id: "t8-c01",
    taller: 8, topic: "preferencia-liquidez", difficulty: "basico", type: "mcq",
    prompt: "La teoría de la preferencia por liquidez de Keynes plantea que la tasa de interés se determina por:",
    options: [
      "El equilibrio entre la oferta real de saldos (M/P) y la demanda real de saldos L(Y, r).",
      "La productividad marginal del capital, igualada a la tasa de descuento intertemporal.",
      "La tasa fijada por convenios entre bancos comerciales.",
      "El cociente entre exportaciones e importaciones.",
    ],
    correct: 0,
    explanation: "M/P (oferta) vs L(Y, r) (demanda). El cruce determina r en CP.",
    reference: "Taller 8 · 1.1",
  }),
  Q({
    id: "t8-p01",
    taller: 8, topic: "multiplicadores", difficulty: "basico", type: "numeric",
    generate(rng) {
      const c = rng.pick([0.5, 0.6, 0.65, 0.75, 0.8]);
      const mG = 1 / (1 - c);
      return {
        prompt: `Si la propensión marginal a consumir es $c = ${c}$, ¿cuál es el multiplicador del gasto público en la cruz keynesiana? (con 2 decimales)`,
        correctValue: mG,
        tolerance: 0.05,
        explanation: `<span class="step"><span class="step-num">1</span>Plantea el equilibrio en la cruz keynesiana</span>
El equilibrio de bienes ocurre cuando el ingreso $Y$ iguala el gasto planeado $E$:
<span class="formula">$Y = C + I + G$</span>
Con consumo $C = a + c(Y - T)$ y $I, G, T$ exógenos:
<span class="formula">$Y = a + c(Y - T) + I + G$</span>

<span class="step"><span class="step-num">2</span>Despeja $Y$</span>
$Y - cY = a - cT + I + G$<br/>
$Y(1 - c) = a - cT + I + G$<br/>
$Y = \\dfrac{a - cT + I + G}{1 - c}$

<span class="step"><span class="step-num">3</span>Deriva respecto a $G$</span>
<span class="formula">$\\dfrac{\\partial Y}{\\partial G} = \\dfrac{1}{1 - c}$</span>

<span class="step"><span class="step-num">4</span>Sustituye el valor</span>
Con $c = ${c}$: $1 - c = ${(1-c).toFixed(2)}$<br/>
<span class="formula">$\\dfrac{\\partial Y}{\\partial G} = \\dfrac{1}{${(1-c).toFixed(2)}} = ${mG.toFixed(2)}$</span>

<span class="intuition">Cada peso adicional de gasto público genera $${mG.toFixed(2)}$ pesos de ingreso adicional. La razón: el peso inicial se gasta, eso aumenta $Y$, los hogares consumen $c$ veces más, y así sucesivamente (serie geométrica $1 + c + c^2 + \\ldots = 1/(1-c)$).</span>`,
        reference: "Taller 8 · 1.2",
      };
    },
  }),
  Q({
    id: "t8-p02",
    taller: 8, topic: "multiplicadores", difficulty: "basico", type: "numeric",
    generate(rng) {
      const c = rng.pick([0.5, 0.6, 0.65, 0.75, 0.8]);
      const mT = -c / (1 - c);
      const mG = 1 / (1 - c);
      return {
        prompt: `Con $c = ${c}$, ¿cuál es el multiplicador de los impuestos $\\partial Y / \\partial T$ en la cruz keynesiana? (con 2 decimales, incluye el signo)`,
        correctValue: mT,
        tolerance: 0.05,
        explanation: `<span class="step"><span class="step-num">1</span>Parte del equilibrio</span>
$Y = \\dfrac{a - cT + I + G}{1 - c}$

<span class="step"><span class="step-num">2</span>Deriva respecto a $T$</span>
Solo el término $-cT$ depende de $T$:
<span class="formula">$\\dfrac{\\partial Y}{\\partial T} = \\dfrac{-c}{1 - c}$</span>

<span class="step"><span class="step-num">3</span>Sustituye</span>
<span class="formula">$\\dfrac{\\partial Y}{\\partial T} = \\dfrac{-${c}}{${(1-c).toFixed(2)}} = ${mT.toFixed(2)}$</span>

<span class="intuition">Por cada peso de impuestos adicional, $Y$ cae $${Math.abs(mT).toFixed(2)}$ pesos. En valor absoluto este multiplicador es <strong>menor</strong> que el del gasto $\\dfrac{1}{1-c} = ${mG.toFixed(2)}$. Razón: un peso de impuestos no se traduce uno a uno en menos consumo (los hogares absorben parte vía menos ahorro), mientras que un peso de gasto público sí se gasta directamente.</span>`,
        reference: "Taller 8 · 1.2",
      };
    },
  }),
  Q({
    id: "t8-p03",
    taller: 8, topic: "multiplicadores", difficulty: "intermedio", type: "numeric",
    generate(rng) {
      const c = rng.pick([0.6, 0.75, 0.8]);
      const t = rng.pick([0.10, 0.15, 0.20, 0.25]);
      const mG = 1 / (1 - c * (1 - t));
      return {
        prompt: `Con consumo $C = \\bar{C} + c(Y - T)$, $T = \\bar{T} + tY$, $c = ${c}$ y $t = ${t}$, ¿cuál es el multiplicador del gasto $\\partial Y / \\partial G$? (con 2 decimales)`,
        correctValue: mG,
        tolerance: 0.05,
        explanation: `$\\frac{\\partial Y}{\\partial G} = \\frac{1}{1 - c(1 - t)} = \\frac{1}{1 - ${c}(1 - ${t})} = ${mG.toFixed(2)}$.`,
        reference: "Taller 8 · 2.b",
      };
    },
  }),
  Q({
    id: "t8-c02",
    taller: 8, topic: "crowding-out", difficulty: "intermedio", type: "tf-justify",
    prompt: "Un aumento en G genera crowding-out de la inversión privada en el modelo de la cruz keynesiana puro (con r exógeno).",
    options: [
      "Falso. En la cruz keynesiana pura con r dado, I no cambia. El crowding-out aparece sólo cuando se añade la LM y r se vuelve endógeno.",
      "Verdadero. Como Y sube, los hogares ahorran más y eso debería reducir I.",
      "Verdadero. La identidad contable Y = C + I + G implica que si G sube, I baja.",
      "Falso. Un aumento en G siempre aumenta I por el efecto multiplicador.",
    ],
    correct: 0,
    explanation: "El crowding-out es un fenómeno IS-LM: requiere que r endogenamente suba al aumentar G. En la cruz keynesiana pura con r exógeno, I = h - br no se mueve si r no cambia.",
    reference: "Taller 8 · 1.3",
  }),

  // T8 LM paramétrica
  Q({
    id: "t8-p04",
    taller: 8, topic: "lm-equilibrium", difficulty: "intermedio", type: "numeric",
    generate(rng) {
      const M = rng.pick([800, 1000, 1200, 1500]);
      const P = rng.pick([1.5, 2, 2.5, 3]);
      const Y = rng.pick([500, 600, 700, 900]);
      const realM = M / P;
      const r = (Y - realM) / 40;
      return {
        prompt: `Con $M = ${M}$, $P = ${P}$, $Y = ${Y}$ y demanda real de saldos $L^d = Y - 40 r$, ¿cuál es la tasa de interés de equilibrio $r$? (en porcentaje, sin signo %, con 2 decimales)`,
        correctValue: r,
        tolerance: 0.05,
        explanation: `<span class="step"><span class="step-num">1</span>Plantea el equilibrio del mercado de saldos reales</span>
La oferta real de dinero debe igualar la demanda:
<span class="formula">$\\dfrac{M}{P} = L^d(Y, r)$</span>

<span class="step"><span class="step-num">2</span>Calcula la oferta real de dinero</span>
<span class="formula">$\\dfrac{M}{P} = \\dfrac{${M}}{${P}} = ${realM.toFixed(2)}$</span>

<span class="step"><span class="step-num">3</span>Sustituye en la condición de equilibrio</span>
La demanda dada es $L^d = Y - 40r$ con $Y = ${Y}$:
<span class="formula">$${realM.toFixed(2)} = ${Y} - 40 r$</span>

<span class="step"><span class="step-num">4</span>Despeja $r$</span>
$40 r = ${Y} - ${realM.toFixed(2)} = ${(Y - realM).toFixed(2)}$<br/>
<span class="formula">$r = \\dfrac{${(Y - realM).toFixed(2)}}{40} = ${r.toFixed(2)}\\%$</span>

<span class="intuition">Como $r$ está en el lado de la demanda con signo negativo, mayor $r$ baja la demanda de dinero. La tasa se ajusta hasta que la cantidad demandada iguala los saldos reales que el BC ofrece ($M/P$).</span>`,
        reference: "Taller 8 · numeral 3.a",
      };
    },
  }),
  Q({
    id: "t8-p05",
    taller: 8, topic: "lm-equilibrium", difficulty: "intermedio", type: "numeric",
    generate(rng) {
      const r_target = rng.pick([3, 5, 7, 8, 10]);
      const Y = rng.pick([500, 700, 900]);
      const P = rng.pick([1.5, 2, 2.5]);
      const Md = Y - 40 * r_target;
      const M = Md * P;
      return {
        prompt: `Con $Y = ${Y}$, $P = ${P}$ y $L^d = Y - 40 r$, ¿qué nivel de oferta nominal $M$ debe fijar el BC para llevar la tasa de interés a $r = ${r_target}\\%$?`,
        correctValue: M,
        tolerance: 1,
        explanation: `$L^d = ${Y} - 40 \\cdot ${r_target} = ${Md}$. $M = P \\cdot L^d = ${P} \\cdot ${Md} = ${M.toFixed(0)}$.`,
        reference: "Taller 8 · 3.c",
      };
    },
  }),
  Q({
    id: "t8-c03",
    taller: 8, topic: "paradoja-ahorro", difficulty: "avanzado", type: "mcq",
    prompt: "Ante una caída en el consumo autónomo $\\bar{C}$ (sociedad más ahorrativa), en la cruz keynesiana con I exógeno, ¿qué pasa con el ahorro nacional de equilibrio S*?",
    options: [
      "S* permanece igual (en equilibrio S = I, y si I no cambia, S tampoco). Esta es la paradoja del ahorro.",
      "S* aumenta proporcionalmente al cambio en C̄.",
      "S* disminuye porque cae el ingreso de equilibrio.",
      "S* aumenta más que la caída en C̄ por el efecto multiplicador.",
    ],
    correct: 0,
    explanation: "S = Y - C - G. En equilibrio Y se ajusta de modo que S iguala I exógena. Cambia el ingreso, no el ahorro.",
    reference: "Taller 8 · 4",
  }),
  Q({
    id: "t8-c04",
    taller: 8, topic: "paradoja-ahorro", difficulty: "intermedio", type: "tf-justify",
    prompt: "La paradoja del ahorro se presenta también en el modelo clásico.",
    options: [
      "Falso. En el clásico Y = Y* es fijo y r se ajusta. ↑ ahorro → ↓ r → ↑ I, así que S* sube y la paradoja desaparece.",
      "Verdadero. Aplica en cualquier modelo donde haya ahorro agregado.",
      "Verdadero, pero con efecto opuesto en el clásico.",
      "Falso. En el modelo clásico la inversión es nula.",
    ],
    correct: 0,
    explanation: "La paradoja es un fenómeno keynesiano de CP. En el clásico la flexibilidad de r convierte el aumento del ahorro en aumento de la inversión.",
    reference: "Taller 8 · 4.d",
  }),
  Q({
    id: "t8-tf01",
    taller: 8, topic: "is-lm-shape", difficulty: "intermedio", type: "tf",
    prompt: "Si la inversión NO depende de la tasa de interés, la curva IS es vertical en el plano (Y, r).",
    correct: true,
    explanation: "La pendiente de la IS es $(1-c)/(-b)$. Si $b = 0$ (I no responde a r), la pendiente es infinita: Y queda fijo en $A/(1-c)$.",
    reference: "Taller 8 · 5.a",
  }),
  Q({
    id: "t8-tf02",
    taller: 8, topic: "is-lm-shape", difficulty: "intermedio", type: "tf",
    prompt: "Si la demanda de dinero NO depende de la tasa de interés, la curva LM es vertical en el plano (Y, r).",
    correct: true,
    explanation: "Pendiente de LM: $k/\\ell$. Si $\\ell = 0$ (L^d no responde a r), la LM es vertical en $Y = (M/P - n)/k$.",
    reference: "Taller 8 · 5.b",
  }),
  Q({
    id: "t8-c05",
    taller: 8, topic: "shock-impuestos", difficulty: "avanzado", type: "mcq",
    prompt: "Aumento de T en el modelo IS-LM, ceteris paribus. En el corto plazo (precios fijos):",
    options: [
      "Y cae, r cae, I sube, C cae más que Y.",
      "Y sube, r sube, I cae, C cae.",
      "Y cae, r sube, I cae, C cae.",
      "Y cae, r cae, I cae, C sube.",
    ],
    correct: 0,
    explanation: "↑T desplaza IS a la izquierda. Sobre la LM, eso baja Y y r. Como r cae, I sube. C cae porque (Y-T) cae fuertemente.",
    reference: "Taller 8 · 6.a",
  }),

  // ============================================================
  // TALLER 9 · IS-LM y Mundell-Fleming
  // ============================================================
  Q({
    id: "t9-p01",
    taller: 9, topic: "multiplicador-islm", difficulty: "intermedio", type: "numeric",
    generate(rng) {
      const c = rng.pick([0.6, 0.65, 0.75, 0.8]);
      const b = rng.pick([30, 50, 80]);
      const k = rng.pick([0.2, 0.4, 0.5]);
      const l = rng.pick([20, 40, 60]);
      const m = 1 / ((1 - c) + b * k / l);
      const oneMinusC = (1 - c).toFixed(2);
      const bkOverEll = (b * k / l);
      const denom = (1 - c) + bkOverEll;
      const keynesMult = 1 / (1 - c);
      return {
        prompt: `En IS-LM con $c = ${c}$, $I = h - ${b} r$, $L^d = ${k} Y - ${l} r$, ¿cuál es el multiplicador del gasto $\\partial Y / \\partial G$? (con 2 decimales)`,
        correctValue: m,
        tolerance: 0.05,
        explanation: `<span class="step"><span class="step-num">1</span>Identifica la fórmula del multiplicador en IS-LM</span>
La cruz keynesiana pura ignora que al subir $G$ también sube la tasa de interés $r$, lo cual reduce la inversión (efecto <em>crowding-out</em>). El multiplicador completo en IS-LM cerrada es:
<span class="formula">$\\dfrac{\\partial Y}{\\partial G} = \\dfrac{1}{(1-c) + \\dfrac{b\\,k}{\\ell}}$</span>

<span class="step"><span class="step-num">2</span>Reconoce los parámetros del problema</span>
<ul>
<li>$c = ${c}$ — propensión marginal a consumir</li>
<li>$b = ${b}$ — sensibilidad de la inversión a $r$ (de $I = h - br$)</li>
<li>$k = ${k}$ — sensibilidad de la demanda de dinero a $Y$ (de $L^d = kY - \\ell r$)</li>
<li>$\\ell = ${l}$ — sensibilidad de la demanda de dinero a $r$</li>
</ul>

<span class="step"><span class="step-num">3</span>Calcula el denominador paso a paso</span>
Primero $1 - c = 1 - ${c} = ${oneMinusC}$.<br/>
Luego $\\dfrac{b\\,k}{\\ell} = \\dfrac{${b} \\cdot ${k}}{${l}} = \\dfrac{${(b * k).toFixed(2)}}{${l}} = ${bkOverEll.toFixed(4)}$.<br/>
Suma del denominador: $(1-c) + \\dfrac{b\\,k}{\\ell} = ${oneMinusC} + ${bkOverEll.toFixed(4)} = ${denom.toFixed(4)}$.

<span class="step"><span class="step-num">4</span>Calcula el multiplicador final</span>
<span class="formula">$\\dfrac{\\partial Y}{\\partial G} = \\dfrac{1}{${denom.toFixed(4)}} = ${m.toFixed(2)}$</span>

<span class="intuition">El multiplicador keynesiano simple sería $\\dfrac{1}{1-c} = ${keynesMult.toFixed(2)}$. En IS-LM queda más bajo (${m.toFixed(2)}) porque parte del impacto expansivo del gasto público se pierde por la caída de la inversión que provoca el alza de la tasa de interés (crowding-out parcial).</span>`,
        reference: "Taller 9 · numeral 1.c",
      };
    },
  }),
  Q({
    id: "t9-p02",
    taller: 9, topic: "is-lm-equilibrium", difficulty: "intermedio", type: "numeric",
    generate(rng) {
      const Ystar = 5000;
      const M = 1000;
      // Configuración del Taller 9: IS Y=6000-200r, LM r=Y/200-25/P, DA Y=3000+2500/P
      const G = rng.pick([800, 700, 900, 600]);
      // Recalculamos DA con G variable:
      // IS: 0.25 Y = 1500 - 50r si G=800; en general 0.25Y = (1500 + (G-800)) - 50r
      // Más simple: la DA es Y = 3000 + 2500/P + 4*(G-800) si G no es 800? Mejor usar parámetros de T9.
      // Para simplicidad, usamos los valores fijos de T9 pero con M variable:
      const Mset = rng.pick([800, 1000, 1200]);
      const denom_DA = (Mset === 1000) ? 2500 : 2500 * (Mset / 1000); // P = MV/(...)
      const P = denom_DA / (Ystar - 3000);
      return {
        prompt: `Considera el sistema del Taller 9: $IS: Y = 6000 - 200r$, $LM: r = Y/200 - 25/P$, $DA: Y = 3000 + ${denom_DA}/P$. Con $Y^* = ${Ystar}$, ¿cuál es el nivel de precios $P$ de largo plazo?`,
        correctValue: P,
        tolerancePct: 0.01,
        explanation: `$Y^* = 3000 + ${denom_DA}/P \\Rightarrow P = ${denom_DA} / (${Ystar} - 3000) = ${P.toFixed(2)}$.`,
        reference: "Taller 9 · 1.b",
      };
    },
  }),
  Q({
    id: "t9-p03",
    taller: 9, topic: "is-lm-shock", difficulty: "avanzado", type: "numeric",
    generate(rng) {
      // Recorte de G de 800 a G_new; multiplicador IS-LM es 2 en el ejercicio
      const G_new = rng.pick([550, 600, 650, 700, 750]);
      const dG = G_new - 800;
      const Y_CP = 5000 + 2 * dG;
      return {
        prompt: `En la economía del Taller 9 (multiplicador del gasto en IS-LM $= 2$), si $G$ se recorta de $800$ a $${G_new}$, ¿cuál es el producto de corto plazo $Y_{CP}$? (precios pegajosos en $P = 1.25$)`,
        correctValue: Y_CP,
        tolerance: 5,
        explanation: `$\\Delta Y = 2 \\cdot \\Delta G = 2 \\cdot (${G_new} - 800) = ${(2 * dG).toFixed(0)}$. $Y_{CP} = 5000 + ${(2 * dG).toFixed(0)} = ${Y_CP.toFixed(0)}$.`,
        reference: "Taller 9 · 1.c",
      };
    },
  }),
  Q({
    id: "t9-p04",
    taller: 9, topic: "is-lm-desempleo", difficulty: "avanzado", type: "numeric",
    generate(rng) {
      // Y = 5 K^(1/3) L^(1/3) T^(1/3) con K=T=1000 -> Y = 500 * L^(1/3)
      // u = 1 - L_CP/L*, L* = 1000
      const Y_CP = rng.pick([4000, 4200, 4500, 4700]);
      const L_CP = Math.pow(Y_CP / 500, 3);
      const u = (1000 - L_CP) / 1000 * 100;
      return {
        prompt: `En la economía del Taller 9 ($Y = 5 K^{1/3} L^{1/3} T^{1/3}$, $K = T = L^* = 1000$), si $Y_{CP} = ${Y_CP}$, ¿cuál es la tasa de desempleo? (en porcentaje, sin signo %, con 1 decimal)`,
        correctValue: u,
        tolerance: 0.5,
        explanation: `$L^{1/3} = ${Y_CP}/500 = ${(Y_CP/500).toFixed(2)}$, $L_{CP} = ${L_CP.toFixed(0)}$. $u = (1000 - ${L_CP.toFixed(0)})/1000 = ${u.toFixed(1)}\\%$.`,
        reference: "Taller 9 · 1.c",
      };
    },
  }),

  // T9 Mundell-Fleming
  Q({
    id: "t9-c01",
    taller: 9, topic: "mf-flexible", difficulty: "intermedio", type: "mcq",
    prompt: "En Mundell-Fleming con tipo de cambio flexible y movilidad perfecta de capitales, un aumento en el gasto público G provoca:",
    options: [
      "Y no cambia (LM* fija Y); el tipo de cambio se revalúa y NX cae en compensación.",
      "Y aumenta como en una economía cerrada y NX sube.",
      "Y cae porque la moneda se deprecia y aumenta la deuda externa.",
      "Y aumenta y el tipo de cambio se mantiene fijo automáticamente.",
    ],
    correct: 0,
    explanation: "La política fiscal es inefectiva sobre Y bajo MF flexible. La IS* se desplaza pero LM* es vertical y fija Y; el ajuste se da vía tipo de cambio.",
    reference: "Taller 9 · 2.d",
  }),
  Q({
    id: "t9-c02",
    taller: 9, topic: "mf-fija", difficulty: "intermedio", type: "mcq",
    prompt: "En MF con tipo de cambio fijo, una restricción a las importaciones (↑ NX0) provoca:",
    options: [
      "Y aumenta y la base monetaria M sube endógenamente para sostener el peg.",
      "Y no cambia y M tampoco; el efecto se neutraliza vía precios.",
      "Y cae y M cae con el peg.",
      "Y aumenta pero M no cambia porque el BC controla M directamente.",
    ],
    correct: 0,
    explanation: "Con peg, ε no se mueve. La IS* se desplaza a la derecha y LM* debe acomodar (M endógena) para mantener el equilibrio en (Y_LP + ΔY, ε_peg).",
    reference: "Taller 9 · 2.e",
  }),
  Q({
    id: "t9-tf01",
    taller: 9, topic: "mf-flexible", difficulty: "intermedio", type: "tf",
    prompt: "En Mundell-Fleming con tipo de cambio flexible, la política comercial (subir NX0 vía proteccionismo) NO afecta a Y en el corto plazo.",
    correct: true,
    explanation: "El aumento de NX0 desplaza IS* a la derecha pero LM* sigue fijando Y. El tipo de cambio se revalúa y NX vuelve a su nivel original.",
    reference: "Taller 9 · 2.d",
  }),
  Q({
    id: "t9-tf02",
    taller: 9, topic: "mf-flexible", difficulty: "intermedio", type: "tf",
    prompt: "En Mundell-Fleming flexible, la política monetaria (↑ M) ES efectiva: aumenta Y y deprecia la moneda.",
    correct: true,
    explanation: "↑M desplaza LM* a la derecha; nuevo cruce con IS* a mayor Y y mayor 1/ε (depreciación).",
    reference: "Taller 9 · síntesis MF",
  }),
  Q({
    id: "t9-tf03",
    taller: 9, topic: "mf-fija", difficulty: "intermedio", type: "tf",
    prompt: "En Mundell-Fleming con tipo de cambio fijo, la política monetaria (↑ M) es efectiva para aumentar Y.",
    correct: false,
    explanation: "Bajo peg, cualquier aumento de M es inmediatamente revertido por el arbitraje cambiario: el BC pierde reservas y M vuelve a su nivel inicial. La política monetaria es inefectiva.",
    reference: "Taller 9 · síntesis MF",
  }),
  Q({
    id: "t9-p05",
    taller: 9, topic: "mf-flexible", difficulty: "avanzado", type: "numeric",
    generate(rng) {
      // Vector LP del Taller 9: Y=5000, C=3250, I=500, NX=250, eps=2, P=1.25
      // Si NX0 sube de 500 a NX0_new, con TC flex Y=5000 se mantiene, NX se mantiene en 250
      // ε ajusta: NX = NX0 - 500/eps = 250 -> 500/eps = NX0 - 250 -> eps = 500/(NX0-250)
      const NX0 = rng.pick([600, 750, 900, 1000]);
      const eps_new = 500 / (NX0 - 250);
      return {
        prompt: `En MF flexible (Taller 9) con $Y = 5000$ fijo por LM*, parámetros: $NX_1 = 500$. Si $NX_0$ sube de $500$ a $${NX0}$, ¿cuál es el nuevo tipo de cambio real $\\varepsilon$? (con 2 decimales)`,
        correctValue: eps_new,
        tolerance: 0.05,
        explanation: `Y se mantiene en 5000, así que NX = 250 (porque C, I, G no cambian). $NX = ${NX0} - 500/\\varepsilon = 250 \\Rightarrow \\varepsilon = 500/(${NX0} - 250) = ${eps_new.toFixed(2)}$.`,
        reference: "Taller 9 · 2.d",
      };
    },
  }),
  Q({
    id: "t9-p06",
    taller: 9, topic: "mf-fija", difficulty: "avanzado", type: "numeric",
    generate(rng) {
      // Punto e: TC fijo en eps=2 (1/eps=0.5). Calcular Y nuevo con NX0_new
      const NX0 = rng.pick([600, 750, 900, 1000]);
      // 0.25 Y = (250 - 0.75*1000 + 750 - 50*5 + 1000 + NX0) - 500*0.5
      // = (250 - 750 + 750 - 250 + 1000 + NX0) - 250
      // = (1000 + NX0) - 250 = 750 + NX0
      // Y = (750 + NX0) / 0.25 = 4*(750 + NX0)
      const Y = 4 * (750 + NX0);
      return {
        prompt: `En MF con TC fijo en $\\varepsilon = 2$ (Taller 9). Parámetros: $C_0=250$, $C_1=0.75$, $T=1000$, $I_0=750$, $I_1=50$, $r^*=5$, $G=1000$, $NX_1=500$. Si $NX_0$ sube de $500$ a $${NX0}$, ¿cuál es el nuevo $Y_{CP}$?`,
        correctValue: Y,
        tolerance: 5,
        explanation: `$0.25 Y = (250 - 0.75 \\cdot 1000 + 750 - 50 \\cdot 5 + 1000 + ${NX0}) - 500 \\cdot 0.5 = ${750 + NX0}$. $Y = 4 \\cdot ${750 + NX0} = ${Y}$.`,
        reference: "Taller 9 · 2.e",
      };
    },
  }),
  Q({
    id: "t9-c03",
    taller: 9, topic: "trinidad", difficulty: "intermedio", type: "mcq",
    prompt: "En el contexto de la trinidad imposible, un país con flujos de capital libres y tipo de cambio fijo:",
    options: [
      "Pierde su política monetaria como herramienta doméstica (M es endógeno).",
      "Mantiene plena autonomía monetaria con baja volatilidad cambiaria.",
      "Puede usar libremente la política monetaria pero sufre de inflación.",
      "No puede comerciar con otros países.",
    ],
    correct: 0,
    explanation: "El trilema dice que sólo se pueden lograr 2 de 3: capital libre, política monetaria independiente, TC fijo. Si elegimos los dos primeros, sacrificamos el tercero.",
    reference: "Taller 9 · MF y trinidad imposible",
  }),

  // ============================================================
  // TALLER 3 · Sistema monetario (apoyo, opcional)
  // ============================================================
      
  // ============================================================
  // Preguntas adicionales tipo PIB / PNB / contabilidad nacional
  // (Taller 0/2, presentaciones 05-07)
  // ============================================================
      Q({
    id: "t7-tf04",
    taller: 7, topic: "produccion-cd", difficulty: "intermedio", type: "tf",
    prompt: "Si la función de producción tiene rendimientos constantes a escala y los factores reciben su producto marginal, todos los ingresos provenientes del producto se destinan al pago de los factores (capital y trabajo).",
    correct: true,
    explanation: "Por el teorema de Euler: si Y = F(K,L) es homogénea de grado 1 (CRS), entonces Y = F_K · K + F_L · L. Si w = F_L y r = F_K, todo Y se reparte entre L y K.",
    reference: "Pres. 08 · economía cerrada LP",
  }),

  // === Más preguntas conceptuales para completar ===
  Q({
    id: "t8-c06",
    taller: 8, topic: "lm-equilibrium", difficulty: "basico", type: "mcq",
    prompt: "Un aumento en la oferta nominal M, manteniendo P fijo, desplaza la curva LM:",
    options: [
      "A la derecha (a cada Y le corresponde una r menor).",
      "A la izquierda.",
      "No se desplaza, sólo cambia su pendiente.",
      "Se vuelve vertical.",
    ],
    correct: 0,
    explanation: "↑M sube M/P (oferta real), excede demanda a la r anterior; r baja para limpiar el mercado. En el plano (Y, r) la LM se desplaza hacia abajo/derecha.",
    reference: "Taller 8 · 3.b",
  }),
  Q({
    id: "t8-c07",
    taller: 8, topic: "is-lm-shock", difficulty: "intermedio", type: "mcq",
    prompt: "En IS-LM tradicional, una expansión fiscal (↑G) se acompaña, en CP, de:",
    options: [
      "Y ↑, r ↑, I ↓ (crowding-out parcial).",
      "Y ↑, r ↓, I ↑.",
      "Y sin cambio, r ↑, I sin cambio.",
      "Y ↓, r ↑, I sin cambio.",
    ],
    correct: 0,
    explanation: "Aumento en G desplaza IS a la derecha. Sobre la LM: Y ↑ y r ↑. La inversión cae por crowding-out parcial.",
    reference: "Taller 8 · 1.3 + Taller 9 · 1.c (sentido inverso)",
  }),
  Q({
    id: "t9-c04",
    taller: 9, topic: "estabilizacion-poole", difficulty: "avanzado", type: "mcq",
    prompt: "Según el enfoque de Poole, si la economía sufre principalmente choques reales (a la IS), ¿qué régimen cambiario estabiliza mejor el producto?",
    options: [
      "Tipo de cambio flexible: q absorbe el choque y Y queda en Y*.",
      "Tipo de cambio fijo: M absorbe el choque y Y queda en Y*.",
      "Cualquiera de los dos: la elección no importa.",
      "Tipo de cambio fijo, pero solo si hay controles de capital.",
    ],
    correct: 0,
    explanation: "Choques IS = choques reales. Con TC flex, el tipo de cambio absorbe (revalúa o devalúa) y Y queda en Y_LM. Con TC fijo, M debería ajustarse para neutralizar pero la IS sigue moviendo Y.",
    reference: "Pres. 39 · Poole",
  }),
  Q({
    id: "t9-c05",
    taller: 9, topic: "estabilizacion-poole", difficulty: "avanzado", type: "mcq",
    prompt: "Según Poole, si la economía sufre principalmente choques monetarios (a la LM), ¿qué régimen estabiliza mejor a Y?",
    options: [
      "Tipo de cambio fijo: M se vuelve endógena y absorbe el choque.",
      "Tipo de cambio flexible: q absorbe el choque y Y queda en Y*.",
      "Tipo de cambio fijo con controles de capital estrictos.",
      "Régimen híbrido con bandas cambiarias.",
    ],
    correct: 0,
    explanation: "Choques LM = monetarios. Con TC fijo, M se vuelve endógena y reabsorbe el choque (el BC compra/vende divisas). Con flexible, el choque LM mueve Y vía LM*.",
    reference: "Pres. 39 · Poole",
  }),
  Q({
    id: "t8-tf03",
    taller: 8, topic: "is-lm-shape", difficulty: "intermedio", type: "tf",
    prompt: "Una curva LM más plana (mayor sensibilidad de la demanda de dinero a r) hace que el multiplicador del gasto en IS-LM sea más grande.",
    correct: true,
    explanation: "El multiplicador es 1/[(1-c) + b k / ℓ]. Si ℓ es grande (LM plana), el segundo término del denominador cae y el multiplicador crece (menor crowding-out).",
    reference: "Taller 9 · 1.c",
  }),

  // V/F sobre Y, S, I en clásico vs keynesiano (más conceptos cruzados)
  Q({
    id: "t8-c08",
    taller: 8, topic: "paradoja-ahorro", difficulty: "basico", type: "tf-justify",
    prompt: "Cuando una sociedad se vuelve más ahorrativa (↓ C̄), en el corto plazo keynesiano el ingreso de equilibrio Y* cae con efecto multiplicador.",
    options: [
      "Verdadero. Una caída en C̄ reduce el gasto agregado y, vía multiplicador 1/(1-c), reduce Y*.",
      "Falso. Y* siempre se mantiene constante en cualquier modelo.",
      "Verdadero, pero el efecto es opuesto: Y* aumenta.",
      "Falso. La paradoja del ahorro es un mito teórico.",
    ],
    correct: 0,
    explanation: "Y* = (C̄ - cT + I + G)/(1-c). Si C̄ baja, Y* cae proporcional al multiplicador.",
    reference: "Taller 8 · 4.a",
  }),

  // ============================================================
  // T7: shock combinado y respuesta de política
  // ============================================================
  Q({
    id: "t7-p05",
    taller: 7, topic: "ecuacion-cuantitativa", difficulty: "avanzado", type: "numeric",
    generate(rng) {
      const Y_LP = rng.pick([2000, 3000, 4000]);
      const V = 4;
      const P_shock = rng.pick([1.20, 1.25, 1.30]); // 20-30% alza
      // BC quiere Y=Y_LP y P_CP=P*P_shock; calcular M nuevo
      const P_inicial = 0.10; // valor base del taller
      const P_CP = P_inicial * P_shock;
      const M_nuevo = (P_CP * Y_LP) / V;
      return {
        prompt: `En la economía del Taller 7 ($V = 4$, $Y^* = ${Y_LP}$, $P_0 = 0.10$). Si los precios suben transitoriamente a $P_{CP} = ${P_CP.toFixed(3)}$ y el BC quiere mantener $Y = Y^*$, ¿cuál es la oferta monetaria $M$ que debe fijar?`,
        correctValue: M_nuevo,
        tolerance: 0.5,
        explanation: `$MV = PY \\Rightarrow M = PY/V = ${P_CP.toFixed(3)} \\cdot ${Y_LP} / ${V} = ${M_nuevo.toFixed(2)}$.`,
        reference: "Taller 7 · 3.e",
      };
    },
  }),

  // ============================================================
  // V/F simples adicionales
  // ============================================================
  Q({
    id: "t9-tf04",
    taller: 9, topic: "mf-fija", difficulty: "intermedio", type: "tf",
    prompt: "Bajo Mundell-Fleming con tipo de cambio fijo, una expansión fiscal (↑G) sí aumenta el producto Y.",
    correct: true,
    explanation: "Con TC fijo, la IS* se desplaza a la derecha y M se acomoda endógenamente para sostener el peg, lo cual mueve LM* en la misma dirección. Y aumenta.",
    reference: "Taller 9 · síntesis MF",
  }),
  Q({
    id: "t9-tf05",
    taller: 9, topic: "mf-flexible", difficulty: "intermedio", type: "tf",
    prompt: "Bajo Mundell-Fleming flexible, un aumento en r* (tasa internacional) deprecia la moneda doméstica y aumenta Y.",
    correct: true,
    explanation: "↑r* desplaza LM* a la derecha (más Y demandada de saldos a r=r*) y también IS* (cae I); el efecto neto en MF flex es Y ↑ y q ↑ (depreciación).",
    reference: "Pres. Ecabcpdef1 p.17",
  }),
  Q({
    id: "t5-tf02",
    taller: 5, topic: "rigidez-salarial", difficulty: "basico", type: "tf",
    prompt: "Un salario mínimo por encima del salario de equilibrio (con un único mercado laboral homogéneo) genera desempleo de espera.",
    correct: true,
    explanation: "A w_min > w*, la cantidad ofrecida supera la demandada: hay un excedente de oferta laboral que no encuentra empleo (desempleo de espera o estructural).",
    reference: "Pres. 25 · diapositiva 11",
  }),
  Q({
    id: "t5-tf03",
    taller: 5, topic: "seguro-desempleo", difficulty: "basico", type: "tf",
    prompt: "Un seguro de desempleo decreciente en el tiempo y limitado en duración minimiza el riesgo moral comparado con uno indefinido.",
    correct: true,
    explanation: "Limitar el seguro mantiene incentivos a la búsqueda activa de empleo, reduciendo el efecto de moral hazard sobre la tasa de enganche.",
    reference: "Pres. 25 · diapositiva 8",
  }),

  // === Algunas más para llegar a ~80 ===
  Q({
    id: "t5-c05",
    taller: 5, topic: "definiciones", difficulty: "basico", type: "tf-justify",
    prompt: "El desempleo natural incluye únicamente al desempleo friccional, no al estructural.",
    options: [
      "Falso. El desempleo natural agrupa al friccional (búsqueda) y al estructural (espera por rigidez salarial).",
      "Verdadero. El estructural es coyuntural, no natural.",
      "Falso. La tasa natural sólo incluye al estructural.",
      "Verdadero. El friccional desaparece en el largo plazo.",
    ],
    correct: 0,
    explanation: "El desempleo natural = friccional + estructural. Es la tendencia de LP alrededor de la cual gira el desempleo observado.",
    reference: "Pres. 27 · definiciones",
  }),
  Q({
    id: "t8-p06",
    taller: 8, topic: "preferencia-liquidez", difficulty: "basico", type: "numeric",
    generate(rng) {
      const M = rng.pick([800, 1000, 1200]);
      const P = rng.pick([1, 2, 4]);
      return {
        prompt: `Si la oferta nominal de dinero es $M = ${M}$ y el nivel de precios es $P = ${P}$, ¿cuál es la oferta real de saldos $M/P$?`,
        correctValue: M / P,
        tolerance: 0.5,
        explanation: `$M/P = ${M}/${P} = ${(M / P).toFixed(2)}$.`,
        reference: "Taller 8 · 3",
      };
    },
  }),
  Q({
    id: "t9-p07",
    taller: 9, topic: "is-lm-equilibrium", difficulty: "intermedio", type: "numeric",
    generate(rng) {
      // Calcular consumo en LP del Taller 9
      const Ystar = 5000;
      const a = rng.pick([200, 250, 300]);
      const c = rng.pick([0.6, 0.7, 0.75]);
      const T = rng.pick([1000, 1200, 800]);
      const C = a + c * (Ystar - T);
      return {
        prompt: `En una economía con $Y^* = ${Ystar}$, $C = ${a} + ${c}(Y - T)$ y $T = ${T}$, ¿cuál es el consumo de equilibrio $C^*$?`,
        correctValue: C,
        tolerance: 5,
        explanation: `$C^* = ${a} + ${c} \\cdot (${Ystar} - ${T}) = ${a} + ${c} \\cdot ${Ystar - T} = ${C.toFixed(0)}$.`,
        reference: "Taller 9 · 1.b o 2.c",
      };
    },
  }),
  Q({
    id: "t9-p08",
    taller: 9, topic: "is-lm-equilibrium", difficulty: "intermedio", type: "numeric",
    generate(rng) {
      const I0 = rng.pick([750, 1000, 1250]);
      const I1 = rng.pick([50, 75, 100]);
      const r = rng.pick([3, 5, 7]);
      const I = I0 - I1 * r;
      return {
        prompt: `Si $I = ${I0} - ${I1} r$ y la tasa de interés es $r = ${r}$ (en %), ¿cuánto es la inversión $I$?`,
        correctValue: I,
        tolerance: 1,
        explanation: `$I = ${I0} - ${I1} \\cdot ${r} = ${I}$.`,
        reference: "Taller 9 · 1 o 2",
      };
    },
  }),
  Q({
    id: "t8-c09",
    taller: 8, topic: "is-lm-shape", difficulty: "basico", type: "mcq",
    prompt: "La pendiente positiva de la curva LM en el plano (Y, r) refleja:",
    options: [
      "Que a mayor Y aumenta la demanda de dinero por motivo transacciones, lo cual eleva r de equilibrio si M/P es fijo.",
      "Que la oferta de dinero aumenta cuando aumenta el ingreso.",
      "Que el banco central ajusta r al alza para combatir el crecimiento.",
      "Que la inflación es proporcional al producto.",
    ],
    correct: 0,
    explanation: "L^d = n + kY - ℓr. Si Y sube, kY sube y se genera exceso de demanda; r debe subir para que la demanda real iguale a M/P.",
    reference: "Taller 8 · 3",
  }),
  Q({
    id: "t9-c06",
    taller: 9, topic: "mf-flexible", difficulty: "avanzado", type: "tf-justify",
    prompt: "Bajo MF flexible, una caída en r* incrementa Y y aprecia la moneda doméstica.",
    options: [
      "Falso. Una caída en r* desplaza LM* a la izquierda (Y cae) y aprecia la moneda. La intuición: con r doméstica fija en r*, una caída de r* implica una salida pequeña pero la LM* se contrae.",
      "Verdadero. Y sube y la moneda se aprecia simultáneamente.",
      "Verdadero, pero solo en CP.",
      "Falso. Y cae y la moneda se deprecia.",
    ],
    correct: 3,
    explanation: "Mecánica MF flex: ↓r* desplaza LM* a la IZQUIERDA porque a menor r* la demanda de saldos sube (gente quiere más dinero); Y de equilibrio cae. Con menor r* nominal, la moneda se deprecia (1/ε ↑).",
    reference: "Pres. Ecabcpdef1 p.17",
  }),
  // ============================================================
  // Set "Punto B / Punto C" — IS-LM clasica cerrada con Fisher
  // (similar al quiz de ejemplo de Bloque Neon)
  // Y fijo en LP, ecuaciones de C, I, S=I, Fisher, MV=PY
  // ============================================================
  Q({
    id: "t9-pb-c",
    taller: 9, topic: "is-lm-equilibrium", difficulty: "basico", type: "numeric",
    generate(rng) {
      const Y = rng.pick([6000, 8000, 10000]);
      const T = rng.pick([1500, 2000, 2500]);
      const a = rng.pick([800, 1000, 1200]);
      const c = rng.pick([0.4, 0.5, 0.6, 0.75]);
      const C = a + c * (Y - T);
      return {
        prompt: `Considere una economía cerrada con producción agregada $Y = ${Y}$, impuestos $T = ${T}$ y función de consumo $C = ${a} + ${c}(Y - T)$. Calcule el <strong>Consumo (C) de equilibrio</strong>:`,
        correctValue: C,
        tolerance: 5,
        explanation: `<span class="step"><span class="step-num">1</span>Identifica la función de consumo</span>
<span class="formula">$C = a + c (Y - T)$</span>
donde:
<ul>
<li>$a = ${a}$ — consumo autónomo</li>
<li>$c = ${c}$ — propensión marginal a consumir</li>
<li>$Y - T$ — ingreso disponible</li>
</ul>

<span class="step"><span class="step-num">2</span>Calcula el ingreso disponible</span>
<span class="formula">$Y - T = ${Y} - ${T} = ${Y - T}$</span>

<span class="step"><span class="step-num">3</span>Sustituye y calcula</span>
<span class="formula">$C = ${a} + ${c} \\cdot ${Y - T} = ${a} + ${(c * (Y - T)).toFixed(0)} = ${C}$</span>

<span class="intuition">El consumo de equilibrio sólo depende del ingreso disponible (no del gasto público $G$). Por eso, en los ejercicios de política fiscal, $C$ no cambia si $T$ se mantiene constante — aunque $G$ cambie.</span>`,
        reference: "Taller 9 · numeral 1.b",
      };
    },
  }),
  Q({
    id: "t9-pb-s",
    taller: 9, topic: "is-lm-equilibrium", difficulty: "basico", type: "numeric",
    generate(rng) {
      const Y = rng.pick([6000, 8000, 10000]);
      const T = rng.pick([1500, 2000, 2500]);
      const G = rng.pick([1000, 1500, 2000]);
      const a = rng.pick([800, 1000, 1200]);
      const c = rng.pick([0.4, 0.5, 0.6]);
      const C = a + c * (Y - T);
      const S = Y - C - G;
      return {
        prompt: `En una economía cerrada con $Y = ${Y}$, $T = ${T}$, $G = ${G}$, $C = ${a} + ${c}(Y - T)$. Calcule el <strong>Ahorro Nacional (S) de equilibrio</strong>:`,
        correctValue: S,
        tolerance: 5,
        explanation: `$C = ${C}$. $S = Y - C - G = ${Y} - ${C} - ${G} = ${S}$.`,
        reference: "IS-LM cerrada · S = Y - C - G",
      };
    },
  }),
  Q({
    id: "t9-pb-i",
    taller: 9, topic: "is-lm-equilibrium", difficulty: "basico", type: "numeric",
    generate(rng) {
      const Y = rng.pick([6000, 8000, 10000]);
      const T = rng.pick([1500, 2000, 2500]);
      const G = rng.pick([1000, 1500, 2000]);
      const a = rng.pick([800, 1000, 1200]);
      const c = rng.pick([0.4, 0.5]);
      const I = Y - (a + c * (Y - T)) - G;
      return {
        prompt: `En la misma economía cerrada con $Y = ${Y}$, $T = ${T}$, $G = ${G}$, $C = ${a} + ${c}(Y - T)$. En equilibrio del mercado de fondos prestables ($S = I$), ¿cuál es la <strong>Inversión (I) de equilibrio</strong>?`,
        correctValue: I,
        tolerance: 5,
        explanation: `En equilibrio cerrado, $I = S = Y - C - G = ${I}$.`,
        reference: "IS-LM cerrada · S = I",
      };
    },
  }),
  Q({
    id: "t9-pb-r",
    taller: 9, topic: "is-lm-equilibrium", difficulty: "intermedio", type: "numeric",
    generate(rng) {
      const Y = rng.pick([6000, 8000]);
      const T = rng.pick([1500, 2000]);
      const G = rng.pick([1500, 2000]);
      const a = rng.pick([1000, 1200]);
      const c = 0.5;
      const I0 = rng.pick([2500, 3000, 3500]);
      const I1 = rng.pick([50, 100, 150]);
      const C = a + c * (Y - T);
      const I = Y - C - G;
      const r = (I0 - I) / I1;
      return {
        prompt: `Con la economía anterior y función de inversión $I = ${I0} - ${I1} r$ (donde $r$ está en porcentaje, ej. $r = 10$ significa 10%), $Y = ${Y}$, $T = ${T}$, $G = ${G}$, $C = ${a} + ${c}(Y - T)$. ¿Cuál es la <strong>tasa de interés real $r$ de equilibrio</strong>?`,
        correctValue: r,
        tolerance: 0.5,
        explanation: `<span class="step"><span class="step-num">1</span>Calcula consumo y ahorro nacional</span>
$C = ${a} + ${c}(${Y} - ${T}) = ${C}$<br/>
$S = Y - C - G = ${Y} - ${C} - ${G} = ${(Y - C - G)}$

<span class="step"><span class="step-num">2</span>Aplica el equilibrio del mercado de fondos prestables</span>
En una economía cerrada, $S = I$:
<span class="formula">$I = S = ${I}$</span>

<span class="step"><span class="step-num">3</span>Despeja $r$ de la función de inversión</span>
La función dada es $I = ${I0} - ${I1} r$. Sustituyendo $I = ${I}$:
<span class="formula">$${I0} - ${I1} r = ${I}$</span>
$${I1} r = ${I0} - ${I} = ${(I0 - I)}$<br/>
<span class="formula">$r = \\dfrac{${(I0 - I)}}{${I1}} = ${r.toFixed(1)}\\%$</span>

<span class="intuition">La tasa de interés real es el "precio" que iguala el ahorro deseado con la inversión deseada. Cuando $G$ sube (manteniendo $T$), $S$ cae (porque $S = Y - C - G$ y $Y, C$ no cambian), entonces $I$ cae también, y eso requiere una $r$ más alta.</span>`,
        reference: "Taller 9 · numeral 1.b",
      };
    },
  }),
  Q({
    id: "t9-pb-i-nominal",
    taller: 9, topic: "fisher", difficulty: "basico", type: "numeric",
    generate(rng) {
      const r_real = rng.pick([3, 5, 7, 8, 10, 12]);
      const pi = rng.pick([1, 2, 3, 4, 5]);
      const i = r_real + pi;
      return {
        prompt: `Si la tasa de interés real es $r = ${r_real}\\%$ y la inflación esperada es $\\pi = ${pi}\\%$, ¿cuál es la <strong>tasa de interés nominal $i$</strong> según la ecuación de Fisher? (sin signo %)`,
        correctValue: i,
        tolerance: 0.1,
        explanation: `Fisher: $i = r + \\pi^e = ${r_real} + ${pi} = ${i}\\%$.`,
        reference: "Fisher · pres. 16",
      };
    },
  }),
  Q({
    id: "t9-pb-p",
    taller: 9, topic: "is-lm-equilibrium", difficulty: "avanzado", type: "numeric",
    generate(rng) {
      const Y = rng.pick([6000, 8000, 10000]);
      const i = rng.pick([7, 10, 12, 15]);
      const M = rng.pick([100000, 184800, 200000, 300000]);
      // (M/P)^d = Y - 200 i; equilibrio: M/P = Y - 200i; P = M / (Y - 200i)
      const realM = Y - 200 * i;
      const P = M / realM;
      return {
        prompt: `Con $Y = ${Y}$, tasa de interés nominal $i = ${i}\\%$, oferta nominal $M = ${M}$ y demanda real de saldos $(M/P)^d = Y - 200 i$. ¿Cuál es el <strong>nivel de precios $P$ de equilibrio</strong>? (con 2 decimales)`,
        correctValue: P,
        tolerance: 0.5,
        explanation: `$(M/P)^d = ${Y} - 200 \\cdot ${i} = ${realM}$. $P = M / (M/P) = ${M} / ${realM} = ${P.toFixed(2)}$.`,
        reference: "IS-LM cerrada · LM con Fisher",
      };
    },
  }),
  Q({
    id: "t9-pb-fiscal",
    taller: 9, topic: "is-lm-shock", difficulty: "avanzado", type: "numeric",
    generate(rng) {
      const Y = 8000;
      const T = 2000;
      const G_old = rng.pick([1500, 1200]);
      const G_new = rng.pick([2000, 2500, 3000]);
      const a = 1000; const c = 0.5;
      const C = a + c * (Y - T);
      const I_old = Y - C - G_old;
      const I_new = Y - C - G_new;
      const I0 = 3000; const I1 = 100;
      const r_old = (I0 - I_old) / I1;
      const r_new = (I0 - I_new) / I1;
      return {
        prompt: `Economía cerrada con $Y = ${Y}$ (largo plazo, fijo), $T = ${T}$, $C = ${a} + ${c}(Y - T)$, $I = ${I0} - ${I1} r$. El gobierno hace política fiscal expansiva subiendo $G$ de $${G_old}$ a $${G_new}$ (manteniendo $T$). ¿Cuál es la <strong>nueva tasa de interés real $r$</strong>?`,
        correctValue: r_new,
        tolerance: 0.5,
        explanation: `<span class="step"><span class="step-num">1</span>¿Qué cambia y qué no cambia?</span>
<ul>
<li>$Y$ no cambia (está fijo en LP por la dotación de factores).</li>
<li>$T$ no cambia (sólo aumenta $G$).</li>
<li>$C$ no cambia: depende sólo de $Y - T = ${Y - T}$, que no se altera. $C = ${C}$.</li>
<li>$I$ debe cambiar: como $S = Y - C - G$ y $G$ sube, $S$ baja, y por equilibrio $S = I$, entonces $I$ baja.</li>
</ul>

<span class="step"><span class="step-num">2</span>Calcula la nueva inversión por equilibrio $S = I$</span>
<span class="formula">$I_{nueva} = Y - C - G_{nueva} = ${Y} - ${C} - ${G_new} = ${I_new}$</span>

<span class="step"><span class="step-num">3</span>Despeja $r$ de la función de inversión</span>
$I = ${I0} - ${I1} r$, sustituyendo $I = ${I_new}$:
$${I1} r = ${I0} - ${I_new} = ${(I0 - I_new)}$<br/>
<span class="formula">$r_{nueva} = \\dfrac{${(I0 - I_new)}}{${I1}} = ${r_new.toFixed(1)}\\%$</span>

<span class="step"><span class="step-num">4</span>Compara con la tasa inicial</span>
Antes: $r_{inicial} = (${I0} - ${I_old})/${I1} = ${r_old.toFixed(1)}\\%$<br/>
$\\Delta r = ${r_new.toFixed(1)} - ${r_old.toFixed(1)} = ${(r_new - r_old).toFixed(1)}$ pp.

<span class="intuition"><strong>Crowding-out total</strong> en LP: como $Y$ está fijo, todo aumento de $G$ desplaza inversión peso por peso. La tasa de interés sube exactamente lo necesario para que la inversión caiga en la misma magnitud que aumenta $G$.</span>`,
        reference: "Taller 9 · numeral 1.c (extensión)",
      };
    },
  }),

  Q({
    id: "t7-c09",
    taller: 7, topic: "estanflacion", difficulty: "basico", type: "tf-justify",
    prompt: "Una crisis caracterizada por caída del PIB combinada con aumento de precios (estanflación) es típicamente resultado de un choque adverso de oferta.",
    options: [
      "Verdadero. Un choque negativo de OA (ej. alza del precio del petróleo) sube los costos: la OA se desplaza a la izquierda y el equilibrio CP queda con menor Y y mayor P.",
      "Falso. La estanflación siempre se debe a una caída en la demanda agregada.",
      "Verdadero, pero sólo cuando hay independencia del banco central.",
      "Falso. Se debe a una expansión monetaria mal gestionada.",
    ],
    correct: 0,
    explanation: "Choque OA negativo (insumo importado caro, terremoto, etc.) sube los costos unitarios. La OA se mueve a la izquierda y el equilibrio CP combina menor producto con mayor inflación.",
    reference: "Pres. 07 · DA-OA",
  }),

  // ================================================================
  // EXPANSIÓN: 35+ preguntas adicionales (énfasis en MCQ)
  // ================================================================

  // ---- T5 · Desempleo (más MCQ y V/F) ----
  Q({
    id: "t5-c06",
    taller: 5, topic: "definiciones", difficulty: "basico", type: "mcq",
    prompt: "Un trabajador que renuncia voluntariamente para mudarse a otra ciudad y allí busca empleo durante 3 semanas se clasifica como:",
    options: [
      "Desempleo friccional (búsqueda).",
      "Desempleo estructural (espera por rigidez salarial).",
      "Desempleo cíclico.",
      "Está fuera de la fuerza laboral.",
    ],
    correct: 0,
    explanation: "El friccional surge precisamente por información imperfecta y costos de búsqueda al cambiar de empleo. La movilidad geográfica es uno de sus determinantes clásicos.",
    reference: "Pres. 25 · diapositiva 5",
  }),
  Q({
    id: "t5-c07",
    taller: 5, topic: "salarios-eficiencia", difficulty: "intermedio", type: "mcq",
    prompt: "La teoría de salarios de eficiencia explica por qué algunas firmas pagan voluntariamente por encima del salario de equilibrio. ¿Cuál NO es un mecanismo planteado por esta teoría?",
    options: [
      "Permite a la firma evadir impuestos sobre la nómina.",
      "Reduce la rotación de personal y los costos de capacitación.",
      "Mejora la calidad promedio de los aplicantes (selección).",
      "Aumenta el esfuerzo y reduce la vagancia (shirking).",
    ],
    correct: 0,
    explanation: "Los salarios de eficiencia justifican w > w* por ganancias de productividad (nutrición, rotación, esfuerzo, selección adversa). La evasión fiscal no es parte de la teoría.",
    reference: "Pres. 25 · diapositivas 22-23",
  }),
  Q({
    id: "t5-c08",
    taller: 5, topic: "sector-formal-informal", difficulty: "avanzado", type: "mcq",
    prompt: "En una economía con sectores formal e informal, un salario mínimo vinculante en el sector formal genera (asumiendo que los trabajadores excluidos pasan al sector informal):",
    options: [
      "Empleo formal cae, empleo informal sube; el salario informal cae por exceso de oferta de trabajo en ese sector.",
      "Empleo formal y empleo informal aumentan simultáneamente.",
      "Empleo formal cae y empleo informal queda igual; los desplazados quedan sin empleo.",
      "Empleo total y salario promedio aumentan en toda la economía.",
    ],
    correct: 0,
    explanation: "Los desplazados del sector formal no quedan desempleados sino que migran al informal donde no hay salario mínimo vinculante. La oferta extra de trabajo deprime el salario informal.",
    reference: "Pres. 25 · diapositivas 15-17",
  }),
  Q({
    id: "t5-c09",
    taller: 5, topic: "capacitacion", difficulty: "intermedio", type: "mcq",
    prompt: "Un programa de capacitación masivo de calidad provoca, en un mercado laboral competitivo:",
    options: [
      "Demanda de trabajo se desplaza a la derecha y oferta a la izquierda; el salario sube y el empleo es ambiguo.",
      "Demanda de trabajo se desplaza a la izquierda y oferta a la derecha; sube el desempleo.",
      "Sólo se desplaza la oferta a la derecha y el salario cae.",
      "Sólo se desplaza la demanda a la izquierda y el empleo cae.",
    ],
    correct: 0,
    explanation: "Más capacitación: más productividad (DD ↑) y mejor outside option de los trabajadores (OO ↑). Salario sube siempre; empleo depende de la magnitud relativa.",
    reference: "Pres. 25 · diapositivas 24-26",
  }),
  Q({
    id: "t5-c10",
    taller: 5, topic: "okun", difficulty: "intermedio", type: "mcq",
    prompt: "Si el coeficiente de Okun de una economía es β = 2 y el desempleo observado supera al natural en 2 puntos porcentuales, la brecha del producto es aproximadamente:",
    options: [
      "−4% (Y observado está 4% por debajo de Y*).",
      "+4% (Y observado supera a Y* en 4%).",
      "0% (no hay relación entre desempleo y producto).",
      "−1% (cualquier choque cíclico es muy pequeño).",
    ],
    correct: 0,
    explanation: "Ley de Okun: u_obs − u_nat = − brecha / β. Si u_obs − u_nat = +2 y β = 2, entonces brecha = −2·β = −4%.",
    reference: "Pres. 27 · Okun",
  }),
  Q({
    id: "t5-tf04",
    taller: 5, topic: "definiciones", difficulty: "basico", type: "tf",
    prompt: "Una persona que está sin empleo pero no busca activamente trabajo se cuenta como desempleada en las estadísticas oficiales.",
    correct: false,
    explanation: "Para ser desempleado oficialmente la persona debe estar sin empleo Y buscando activamente. Los desanimados quedan fuera de la fuerza laboral.",
    reference: "Pres. 23 · definiciones",
  }),
  Q({
    id: "t5-tf05",
    taller: 5, topic: "sindicalizacion", difficulty: "intermedio", type: "tf",
    prompt: "La sindicalización tiende a reducir el desempleo agregado porque mejora la negociación salarial.",
    correct: false,
    explanation: "Al subir el salario por encima del equilibrio, los sindicatos reducen el empleo formal y crean desempleo de espera (efecto insider-outsider).",
    reference: "Pres. 25 · diapositivas 18-20",
  }),
  Q({
    id: "t5-c11",
    taller: 5, topic: "tasa-natural", difficulty: "intermedio", type: "tf-justify",
    prompt: "Si la tasa de separación s aumenta y la tasa de enganche f se mantiene constante, la tasa natural de desempleo aumenta.",
    options: [
      "Verdadero. u = s/(s+f). ∂u/∂s = f/(s+f)² > 0.",
      "Falso. La tasa natural sólo depende de f.",
      "Falso. Subir s reduce la rotación y baja el desempleo.",
      "Verdadero, pero sólo si f también sube.",
    ],
    correct: 0,
    explanation: "Diferenciando u = s/(s+f) respecto a s, la derivada es positiva: más separaciones aumentan el stock estable de desempleados.",
    reference: "Pres. 24 · flujos",
  }),

  // ---- T7 · DA-OA y dinero ----
  Q({
    id: "t7-c10",
    taller: 7, topic: "neutralidad", difficulty: "basico", type: "mcq",
    prompt: "La 'neutralidad del dinero' significa que en el largo plazo:",
    options: [
      "Cambios en M afectan únicamente variables nominales (P, salarios nominales) y dejan invariantes las reales (Y, w/P, r real).",
      "El dinero deja de tener valor.",
      "Los precios y la cantidad de dinero son siempre iguales.",
      "El banco central no puede afectar la inflación.",
    ],
    correct: 0,
    explanation: "Neutralidad: en LP la economía vuelve a Y* y los cambios nominales sólo se reflejan en P. Las variables reales son determinadas por la economía real (factores, tecnología).",
    reference: "Pres. 14-15 · neutralidad",
  }),
  Q({
    id: "t7-c11",
    taller: 7, topic: "demanda-dinero", difficulty: "intermedio", type: "mcq",
    prompt: "La demanda de saldos reales L(Y, r) responde positivamente a Y y negativamente a r porque:",
    options: [
      "Mayor Y aumenta el motivo transacción; mayor r aumenta el costo de oportunidad de tener dinero en lugar de bonos.",
      "Mayor Y reduce la riqueza disponible; mayor r aumenta los precios.",
      "Mayor Y baja la velocidad; mayor r sube el ahorro.",
      "Las dos relaciones son meramente empíricas, sin justificación teórica.",
    ],
    correct: 0,
    explanation: "L(Y, r) = motivo transacción (kY) menos motivo especulativo (ℓr). El primer término crece con Y; el segundo refleja el trade-off liquidez-rendimiento.",
    reference: "Pres. 14, 32 · LM",
  }),
  Q({
    id: "t7-c12",
    taller: 7, topic: "shock-petroleo", difficulty: "intermedio", type: "mcq",
    prompt: "Ante un choque transitorio que sube los precios del petróleo, si el banco central decide acomodar (subir M para mantener Y), las consecuencias de largo plazo son:",
    options: [
      "Y vuelve a Y* pero P queda permanentemente más alto; riesgo de espiral inflacionaria si el choque se repite.",
      "Y queda permanentemente más bajo; los precios bajan automáticamente.",
      "Sin consecuencias: la política es neutral en LP.",
      "El BC pierde reservas internacionales.",
    ],
    correct: 0,
    explanation: "Acomodar valida el alza de precios: cuando el choque pasa, M está más alto y por neutralidad P queda más alto. Si los choques son repetidos hay riesgo de espiral.",
    reference: "Taller 7 · 3.e",
  }),
  Q({
    id: "t7-c13",
    taller: 7, topic: "da-oa", difficulty: "basico", type: "mcq",
    prompt: "Una expansión monetaria (↑M) en el modelo DA-OA con OA de pendiente positiva (corto plazo) provoca:",
    options: [
      "DA se desplaza a la derecha; tanto Y como P aumentan en CP.",
      "DA se desplaza a la izquierda; Y y P caen.",
      "OA se desplaza a la derecha y los precios bajan.",
      "Nada cambia: la política monetaria sólo afecta r.",
    ],
    correct: 0,
    explanation: "↑M baja r vía LM, lo que estimula I y desplaza la DA a la derecha. Con OA inclinada (CP), el nuevo equilibrio tiene mayor Y y mayor P.",
    reference: "Pres. 07 · DA-OA",
  }),
  Q({
    id: "t7-c14",
    taller: 7, topic: "rigidez-precios", difficulty: "basico", type: "mcq",
    prompt: "El supuesto de 'precios rígidos' en el corto plazo se usa para:",
    options: [
      "Justificar que cambios en la demanda agregada afecten al producto Y antes de transmitirse a los precios.",
      "Demostrar que la oferta agregada es vertical en el corto plazo.",
      "Probar que el dinero es neutral en cualquier horizonte.",
      "Reducir el modelo macro a la cruz keynesiana original.",
    ],
    correct: 0,
    explanation: "La rigidez justifica la pendiente positiva (no vertical) de la OA en CP, lo que permite que choques de DA muevan Y. En LP los precios se vuelven flexibles y Y vuelve a Y*.",
    reference: "Pres. 07 · DA-OA",
  }),
  Q({
    id: "t7-tf05",
    taller: 7, topic: "neutralidad", difficulty: "basico", type: "tf",
    prompt: "Una caída transitoria en la velocidad del dinero V (ej. por innovación financiera que aumenta la demanda de saldos) puede ser totalmente neutralizada por el BC aumentando M en la misma proporción.",
    correct: true,
    explanation: "MV = PY. Si V cae a αV y M sube a M/α, MV permanece igual y ni P ni Y se ven afectados. Política perfectamente compensatoria.",
    reference: "Taller 7 · 2.c-d",
  }),
  Q({
    id: "t7-tf06",
    taller: 7, topic: "da-oa", difficulty: "intermedio", type: "tf",
    prompt: "En el modelo DA-OA, un aumento simultáneo de DA y OA con la misma magnitud relativa lleva a un aumento de Y sin cambio en P.",
    correct: true,
    explanation: "Si DA se desplaza a la derecha y OA a la derecha en proporción equivalente, los precios pueden quedar iguales mientras Y aumenta (ej. crecimiento económico balanceado con baja inflación).",
    reference: "Pres. 07 · DA-OA",
  }),
  Q({
    id: "t7-c15",
    taller: 7, topic: "lp-vs-cp", difficulty: "basico", type: "mcq",
    prompt: "¿Cuál de las siguientes afirmaciones es verdadera respecto a la dicotomía clásica?",
    options: [
      "En el largo plazo, las variables reales (Y, r real) están determinadas por factores reales y son independientes de las variables nominales (M, P).",
      "Las variables reales y nominales siempre evolucionan en paralelo, sin importar el horizonte.",
      "La dicotomía clásica se rompe en el largo plazo y sólo aplica al corto plazo.",
      "Es un supuesto exclusivo del modelo IS-LM.",
    ],
    correct: 0,
    explanation: "La dicotomía clásica (separabilidad real-nominal) es una propiedad del LP. En CP, con precios rígidos, los choques nominales sí afectan variables reales.",
    reference: "Pres. 14-15 · neutralidad",
  }),

  // ---- T8 · IS-LM (más MCQ) ----
  Q({
    id: "t8-c10",
    taller: 8, topic: "trampa-liquidez", difficulty: "avanzado", type: "mcq",
    prompt: "La 'trampa de liquidez' se caracteriza por:",
    options: [
      "Tasa de interés cerca de cero, demanda de dinero infinitamente elástica y política monetaria inefectiva para estimular la economía.",
      "Tasa de interés muy alta y demanda de dinero rígida.",
      "Trampa cambiaria: el BC no puede defender el peg.",
      "Hiperinflación causada por exceso de oferta monetaria.",
    ],
    correct: 0,
    explanation: "Cuando r toca su cota inferior (≈0), aumentar M no baja más r, así que I no se estimula y la LM se vuelve horizontal en ese tramo. La política monetaria pierde tracción.",
    reference: "IS-LM extendido · ZLB",
  }),
  Q({
    id: "t8-c11",
    taller: 8, topic: "is-lm-shock", difficulty: "intermedio", type: "mcq",
    prompt: "Una contracción monetaria (↓M) en IS-LM, con precios fijos en CP:",
    options: [
      "LM se desplaza a la izquierda; r sube, Y cae, I cae, C cae.",
      "LM se desplaza a la derecha; r baja, Y sube.",
      "IS se desplaza a la izquierda; Y baja pero r no cambia.",
      "Sólo cambia P, no Y ni r.",
    ],
    correct: 0,
    explanation: "↓M sube r de equilibrio (la LM se desplaza arriba/izquierda en plano (Y, r)). r más alto reduce I y por multiplicador reduce Y; C también cae con Y.",
    reference: "IS-LM · choque monetario contractivo",
  }),
  Q({
    id: "t8-c12",
    taller: 8, topic: "preferencia-liquidez", difficulty: "intermedio", type: "mcq",
    prompt: "En el mercado de saldos reales, si la oferta nominal M no cambia pero el nivel de precios P cae:",
    options: [
      "M/P aumenta, la oferta real se mueve a la derecha, y la tasa de interés r de equilibrio cae.",
      "M/P cae, la oferta se contrae y r sube.",
      "Nada cambia: M/P es fija por definición.",
      "Sólo cambia el ingreso Y.",
    ],
    correct: 0,
    explanation: "Saldos reales = M/P. Si P baja con M constante, M/P sube; con demanda de saldos sin cambio, r de equilibrio cae.",
    reference: "Taller 8 · 3.b",
  }),
  Q({
    id: "t8-c13",
    taller: 8, topic: "multiplicadores", difficulty: "intermedio", type: "mcq",
    prompt: "El multiplicador del gasto en la cruz keynesiana 1/(1−c) es siempre mayor que el multiplicador del gasto en IS-LM, porque:",
    options: [
      "En IS-LM la subida de r al expandir G provoca crowding-out parcial: la inversión cae y el efecto neto sobre Y es menor.",
      "En IS-LM se incluyen las exportaciones netas, que reducen el multiplicador.",
      "La cruz keynesiana ignora los impuestos, por eso da más alto.",
      "El multiplicador IS-LM es siempre mayor que el de la cruz keynesiana.",
    ],
    correct: 0,
    explanation: "En la cruz keynesiana r es exógeno; al cerrar el modelo monetario, r endógenamente sube ante ↑G y eso reduce I. El multiplicador en IS-LM = 1/[(1−c) + bk/ℓ] < 1/(1−c).",
    reference: "Taller 9 · 1.c",
  }),
  Q({
    id: "t8-c14",
    taller: 8, topic: "is-lm-shape", difficulty: "intermedio", type: "mcq",
    prompt: "Si la inversión es muy sensible a la tasa de interés (b grande), la curva IS es:",
    options: [
      "Más plana (pendiente menos vertical en plano (Y, r)).",
      "Más vertical.",
      "Vertical (no depende de Y).",
      "Horizontal en cualquier tramo.",
    ],
    correct: 0,
    explanation: "Pendiente IS: dr/dY = (1−c)/(−b). A mayor b, denominador mayor, pendiente menos vertical (más plana). Pequeños cambios de r generan grandes cambios de Y.",
    reference: "Taller 8 · 5.a",
  }),
  Q({
    id: "t8-c15",
    taller: 8, topic: "ingreso-disponible", difficulty: "basico", type: "mcq",
    prompt: "Cuando aumenta T en un solo peso, el ingreso disponible disminuye un peso, pero el consumo cae sólo c·1. Por eso el multiplicador de impuestos −c/(1−c):",
    options: [
      "Es menor (en valor absoluto) que el multiplicador del gasto 1/(1−c).",
      "Es mayor (en valor absoluto) que el multiplicador del gasto.",
      "Coincide exactamente con el multiplicador del gasto.",
      "Es negativo y mayor en magnitud que el del gasto.",
    ],
    correct: 0,
    explanation: "|−c/(1−c)| = c/(1−c) < 1/(1−c) = |multiplicador del gasto|. Razón: parte del cambio en T se absorbe en menor ahorro privado, no en menor consumo.",
    reference: "Taller 8 · 1.2",
  }),
  Q({
    id: "t8-tf04",
    taller: 8, topic: "is-lm-shape", difficulty: "intermedio", type: "tf",
    prompt: "Una curva IS más plana hace al producto Y más sensible a la política monetaria.",
    correct: true,
    explanation: "IS plana = inversión muy sensible a r. Una pequeña baja de r vía ↑M genera un gran aumento de I y por tanto de Y.",
    reference: "Taller 8 · 5.a",
  }),
  Q({
    id: "t8-tf05",
    taller: 8, topic: "paradoja-ahorro", difficulty: "intermedio", type: "tf",
    prompt: "En el modelo IS-LM (con I dependiendo de r y r endógeno), una caída del consumo autónomo C̄ baja Y pero sube I (porque r cae).",
    correct: true,
    explanation: "↓C̄ desplaza IS a la izquierda; r de equilibrio cae sobre la LM. La caída de r estimula I. Y total cae menos que en cruz keynesiana pura porque I parcialmente compensa.",
    reference: "Taller 8 · 4 + IS-LM",
  }),
  Q({
    id: "t8-c16",
    taller: 8, topic: "estabilizacion", difficulty: "intermedio", type: "mcq",
    prompt: "Frente a un choque negativo de demanda autónoma (↓ C̄), ¿cuál política aislada es más efectiva para estabilizar Y en CP?",
    options: [
      "Política monetaria expansiva: ↑M baja r, sube I y compensa la caída de C.",
      "Política fiscal contractiva: ↓G amplifica la caída.",
      "No hacer nada: en CP la economía vuelve sola a Y*.",
      "Subir T para reducir el ingreso disponible.",
    ],
    correct: 0,
    explanation: "Cuando IS cae a la izquierda, ↑M desplaza LM a la derecha; el efecto compuesto puede mantener Y estable a una r más baja. Es la política contracíclica clásica.",
    reference: "IS-LM · estabilización",
  }),

  // ---- T9 · IS-LM y MF (más MCQ) ----
  Q({
    id: "t9-c07",
    taller: 9, topic: "mf-flexible", difficulty: "intermedio", type: "mcq",
    prompt: "Bajo Mundell-Fleming flexible, la efectividad relativa de las políticas fiscal, monetaria y comercial es:",
    options: [
      "Sólo la política monetaria es efectiva sobre Y; las políticas fiscal y comercial son inefectivas (q absorbe).",
      "Sólo la política fiscal es efectiva.",
      "Las tres son igualmente efectivas como en una economía cerrada.",
      "Todas son inefectivas: el tipo de cambio absorbe cualquier choque.",
    ],
    correct: 0,
    explanation: "Con LM* vertical fijando Y, sólo desplazamientos de la LM* (vía ↑M) afectan Y. Cualquier desplazamiento de IS* (G, T, BM) sólo mueve q.",
    reference: "Pres. 39 · síntesis MF",
  }),
  Q({
    id: "t9-c08",
    taller: 9, topic: "mf-fija", difficulty: "intermedio", type: "mcq",
    prompt: "Bajo Mundell-Fleming con tipo de cambio fijo, la efectividad relativa es:",
    options: [
      "Política fiscal y comercial efectivas; política monetaria inefectiva (M es endógeno).",
      "Política monetaria efectiva; política fiscal inefectiva.",
      "Todas inefectivas en el corto plazo.",
      "Todas efectivas con la misma magnitud.",
    ],
    correct: 0,
    explanation: "Con peg, la oferta monetaria M se vuelve endógena: cualquier intento de cambiarla se neutraliza vía arbitraje. La fiscal y comercial sí mueven Y porque la LM* se acomoda.",
    reference: "Pres. 39 · síntesis MF",
  }),
  Q({
    id: "t9-c09",
    taller: 9, topic: "trinidad", difficulty: "intermedio", type: "mcq",
    prompt: "El trilema de Mundell (trinidad imposible) plantea que un país puede elegir SÓLO 2 DE 3 entre:",
    options: [
      "Tipo de cambio fijo, libre movilidad de capitales y política monetaria independiente.",
      "Crecimiento alto, baja inflación y bajo desempleo.",
      "Política fiscal expansiva, presupuesto balanceado y deuda baja.",
      "Inflación baja, exportaciones altas e importaciones bajas.",
    ],
    correct: 0,
    explanation: "Hay tres lados del triángulo: TC fijo, capital libre, política monetaria autónoma. Una vez se eligen 2, el tercero queda automáticamente determinado.",
    reference: "Pres. 39 · trinidad imposible",
  }),
  Q({
    id: "t9-c10",
    taller: 9, topic: "trinidad", difficulty: "intermedio", type: "mcq",
    prompt: "Hong Kong ha mantenido históricamente: capital libre, tipo de cambio fijo al dólar y... (¿qué SACRIFICA?)",
    options: [
      "Sacrifica la política monetaria independiente: las tasas de interés siguen a la Fed estadounidense.",
      "Sacrifica el comercio internacional.",
      "Sacrifica el tipo de cambio fijo en momentos de crisis.",
      "No sacrifica ninguna: tiene los tres a la vez.",
    ],
    correct: 0,
    explanation: "El sistema de currency board de Hong Kong implica monetaria endógena: la base monetaria varía según las divisas que entran y salen.",
    reference: "Pres. 39 · trinidad imposible",
  }),
  Q({
    id: "t9-c11",
    taller: 9, topic: "estabilizacion-poole", difficulty: "avanzado", type: "mcq",
    prompt: "Si una economía enfrenta principalmente choques reales (a la IS), el régimen óptimo según Poole es:",
    options: [
      "Tipo de cambio flexible (ε absorbe el choque y Y queda estable).",
      "Tipo de cambio fijo (M absorbe el choque).",
      "Régimen de banda cambiaria.",
      "Dolarización completa.",
    ],
    correct: 0,
    explanation: "Choques IS bajo flexible: la IS* se desplaza pero LM* fija Y. Toda la fluctuación se absorbe en q. Y queda en Y*.",
    reference: "Pres. 39 · enfoque de Poole",
  }),
  Q({
    id: "t9-c12",
    taller: 9, topic: "is-lm-shock", difficulty: "intermedio", type: "mcq",
    prompt: "En IS-LM cerrada, una expansión monetaria (↑M) tiene mayor efecto sobre Y cuando:",
    options: [
      "La IS es más plana (inversión muy sensible a r) y la LM es más empinada (demanda de dinero poco sensible a r).",
      "La IS es vertical y la LM es horizontal.",
      "Ambas curvas son verticales.",
      "Ambas curvas son horizontales.",
    ],
    correct: 0,
    explanation: "↑M desplaza la LM a la derecha. El efecto sobre Y depende de cuán rápido cae r (LM empinada = caída más fuerte) y cuánto reacciona I (IS plana = mucha respuesta de Y).",
    reference: "IS-LM · sensibilidad",
  }),
  Q({
    id: "t9-tf06",
    taller: 9, topic: "mf-fija", difficulty: "intermedio", type: "tf",
    prompt: "Bajo Mundell-Fleming con TC fijo, una devaluación (revaluación al alza del peg) actúa como una política expansiva sobre Y.",
    correct: true,
    explanation: "Devaluar = subir ε oficial. Aumenta XN (más exportaciones competitivas) y desplaza IS* a la derecha; con LM* acomodando vía ↑M, Y aumenta. Es equivalente a una política comercial expansiva.",
    reference: "Pres. 39 · MF fijo",
  }),
  Q({
    id: "t9-tf07",
    taller: 9, topic: "mf-flexible", difficulty: "avanzado", type: "tf",
    prompt: "Una expansión fiscal coordinada simultáneamente entre todos los países grandes del mundo es más efectiva que la misma expansión hecha por un solo país pequeño con TC flexible.",
    correct: true,
    explanation: "En un país pequeño con TC flex, la expansión fiscal sube q y el efecto se neutraliza vía caída de XN. Si TODOS expanden, q relativo no cambia y los efectos sobre Y se materializan plenamente. Coordinación G20.",
    reference: "MF en economía grande · síntesis",
  }),
  Q({
    id: "t9-c13",
    taller: 9, topic: "is-lm-equilibrium", difficulty: "intermedio", type: "mcq",
    prompt: "En el modelo del Taller 9 (cerrada con Y* fijo), el ahorro nacional S y la inversión I de equilibrio coinciden porque:",
    options: [
      "En equilibrio del mercado de fondos prestables, oferta (S) = demanda (I); además, en una economía cerrada XN = 0.",
      "Por convención contable.",
      "Sólo cuando la tasa de interés es exactamente cero.",
      "Es una coincidencia que no siempre se cumple.",
    ],
    correct: 0,
    explanation: "En cerrada: Y = C + I + G ⇒ I = Y − C − G = S. La igualdad S = I es el equilibrio del mercado financiero, donde r se ajusta para limpiarlo.",
    reference: "Taller 9 · 1.b",
  }),
  Q({
    id: "t9-c14",
    taller: 9, topic: "fisher", difficulty: "basico", type: "mcq",
    prompt: "La ecuación de Fisher i = r + π distingue:",
    options: [
      "Tasa de interés nominal (i) y tasa de interés real (r), conectadas por la inflación esperada (π).",
      "Tasa nominal y tasa de cambio.",
      "Tasa real y tasa internacional.",
      "Tasa de impuestos y tasa de subsidio.",
    ],
    correct: 0,
    explanation: "i mide poder adquisitivo de bonos en pesos; r mide poder adquisitivo en bienes. La inflación π es el 'puente'.",
    reference: "Pres. 16 · Fisher",
  }),
  Q({
    id: "t9-c15",
    taller: 9, topic: "mf-flexible", difficulty: "avanzado", type: "mcq",
    prompt: "En MF flexible, si el banco central impone un control de capitales que limita los movimientos de capital, ¿qué pasa con la efectividad de la política fiscal?",
    options: [
      "Recupera efectividad porque r doméstica se desconecta de r* y se comporta como en una economía cerrada IS-LM.",
      "Pierde toda efectividad.",
      "Se vuelve idéntica a la política comercial.",
      "Genera automáticamente hiperinflación.",
    ],
    correct: 0,
    explanation: "Con controles de capital, r no es dictada por r*. La política fiscal vuelve a tener efecto sobre Y vía la subida de r doméstica (IS-LM cerrada). Es uno de los lados del trilema.",
    reference: "Pres. 39 · trinidad imposible",
  }),

  // ---- T3 · Sistema monetario (más preguntas) ----
          
  // ---- Mezcla / casos cross-tema ----
  Q({
    id: "t9-c16",
    taller: 9, topic: "mf-flexible", difficulty: "intermedio", type: "tf-justify",
    prompt: "Si Estados Unidos sube su tasa de interés r*, una economía pequeña abierta con TC flexible enfrenta presión a la depreciación de su moneda.",
    options: [
      "Verdadero. ↑r* atrae capitales fuera del país pequeño; la moneda doméstica se deprecia (1/ε ↑) y aumenta XN.",
      "Falso. ↑r* aprecia automáticamente todas las monedas.",
      "Verdadero, pero sólo en países desarrollados.",
      "Falso. La tasa internacional no afecta a economías pequeñas.",
    ],
    correct: 0,
    explanation: "Movilidad perfecta de capitales: ↑r* genera salida de capitales del país pequeño hasta que su tasa también iguala r*. Eso requiere depreciación de la moneda y ↑XN.",
    reference: "Ecabcpdef1 p.17",
  }),
  Q({
    id: "t8-c17",
    taller: 8, topic: "is-lm-shock", difficulty: "intermedio", type: "tf-justify",
    prompt: "El 'crowding-out completo' ocurre en IS-LM cuando la curva LM es vertical (demanda de dinero perfectamente inelástica a r).",
    options: [
      "Verdadero. Con LM vertical, cualquier ↑G no cambia Y pero sí r; toda la expansión fiscal se neutraliza vía caída de I.",
      "Falso. El crowding-out completo nunca ocurre en IS-LM.",
      "Verdadero, pero sólo en economías cerradas pequeñas.",
      "Falso. Con LM vertical el efecto es máximo, no cero.",
    ],
    correct: 0,
    explanation: "Si ℓ = 0, LM es vertical. ↑G desplaza IS pero el equilibrio se mantiene en el mismo Y; sólo r sube e I cae 1 a 1 con G. Crowding-out total.",
    reference: "Taller 8 · 5.b",
  }),
  Q({
    id: "t9-tf08",
    taller: 9, topic: "mf-flexible", difficulty: "intermedio", type: "tf",
    prompt: "Bajo Mundell-Fleming flexible, una caída de la confianza del consumidor (↓ C̄) reduce el producto Y.",
    correct: false,
    explanation: "Bajo MF flex, LM* fija Y. ↓C̄ desplaza IS* a la izquierda y q se deprecia (sube 1/ε), lo que aumenta XN y compensa exactamente la caída del consumo. Y queda igual.",
    reference: "Pres. 39 · MF flex inefectividad fiscal",
  }),
  Q({
    id: "t7-c16",
    taller: 7, topic: "okun", difficulty: "intermedio", type: "mcq",
    prompt: "Si la Ley de Okun de un país tiene coeficiente β = 2 y el PIB observado está 6% por encima del potencial:",
    options: [
      "El desempleo observado está 3 puntos porcentuales por debajo del natural.",
      "El desempleo observado supera al natural en 3 pp.",
      "El desempleo se mantiene en el natural.",
      "No es posible determinar sin más información.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>Recuerda la Ley de Okun</span>
La Ley de Okun relaciona la brecha del producto con la brecha de desempleo:
<span class="formula">$u - u^N = -\\dfrac{1}{\\beta}\\,\\dfrac{Y - Y^*}{Y^*}$</span>
donde $\\beta$ es el coeficiente de Okun (cuánto cambia $Y$ por cada punto extra de desempleo).

<span class="step"><span class="step-num">2</span>Sustituye los datos</span>
$\\beta = 2$, brecha del producto $= +6\\%$ (observado por encima del potencial).

<span class="step"><span class="step-num">3</span>Calcula la brecha de desempleo</span>
<span class="formula">$u - u^N = -\\dfrac{6}{2} = -3\\text{ pp}$</span>

<span class="intuition">Si la economía está "sobrecalentada" (produce más de lo potencial), las firmas contratan más, así que el desempleo cae <em>por debajo</em> del natural. El signo negativo refleja la relación inversa entre producto y desempleo.</span>`,
    reference: "Pres. 27 · Okun",
  }),

  // ---- BATCH NUEVO · T5 (Solow / Cobb-Douglas) ----
  Q({
    id: "t5-p07",
    taller: 5, topic: "solow-ss", difficulty: "intermedio", type: "open-numeric",
    prompt: "Considera el modelo de Solow con producción $y = k^{\\alpha}$, $\\alpha = 1/3$, tasa de ahorro $s = 0{,}30$, depreciación $\\delta = 0{,}05$ y crecimiento poblacional $n = 0{,}01$. Calcula el capital por trabajador en estado estacionario $k^*$ (a 2 decimales).",
    correct: 11.18,
    tolerance: 0.1,
    explanation: `<span class="step"><span class="step-num">1</span>Condición de estado estacionario en Solow</span>
En el estado estacionario, la inversión por trabajador iguala la depreciación efectiva más la dilución poblacional:
<span class="formula">$s\\,f(k^*) = (\\delta + n)\\,k^*$</span>
Con $f(k) = k^{\\alpha}$:
<span class="formula">$s\\,(k^*)^{\\alpha} = (\\delta + n)\\,k^*$</span>

<span class="step"><span class="step-num">2</span>Despeja $k^*$</span>
Divide ambos lados por $(k^*)^{\\alpha}$:
<span class="formula">$s = (\\delta + n)\\,(k^*)^{1-\\alpha} \\;\\;\\Rightarrow\\;\\; k^* = \\left(\\dfrac{s}{\\delta + n}\\right)^{\\frac{1}{1-\\alpha}}$</span>

<span class="step"><span class="step-num">3</span>Sustituye valores</span>
<ul>
<li>$\\dfrac{s}{\\delta+n} = \\dfrac{0{,}30}{0{,}05 + 0{,}01} = \\dfrac{0{,}30}{0{,}06} = 5$</li>
<li>$\\dfrac{1}{1-\\alpha} = \\dfrac{1}{1 - 1/3} = \\dfrac{1}{2/3} = \\dfrac{3}{2} = 1{,}5$</li>
</ul>

<span class="step"><span class="step-num">4</span>Calcula el resultado</span>
<span class="formula">$k^* = 5^{1{,}5} = 5 \\cdot \\sqrt{5} \\approx 5 \\cdot 2{,}236 \\approx 11{,}18$</span>

<span class="intuition">A mayor $s$, mayor $k^*$ (se ahorra más, se acumula más capital). A mayor $\\delta + n$, menor $k^*$ (el capital se deprecia o se diluye más rápido entre nuevos trabajadores). En equilibrio, lo ahorrado tiene que cubrir exactamente la "fuga" de capital por depreciación + nuevos trabajadores.</span>`,
    reference: "Pres. 21-22 · Solow",
  }),
  Q({
    id: "t5-c12",
    taller: 5, topic: "solow-regla-oro", difficulty: "intermedio", type: "mcq",
    prompt: "En el modelo de Solow, la 'regla de oro' del capital ($k^{**}$) corresponde al nivel de capital por trabajador que:",
    options: [
      "Maximiza el consumo por trabajador en estado estacionario.",
      "Maximiza la producción por trabajador en estado estacionario.",
      "Minimiza la depreciación.",
      "Garantiza inversión nula.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>Define $c^*$ en estado estacionario</span>
El consumo por trabajador en estado estacionario es lo que queda de la producción tras descontar la inversión que repone capital:
<span class="formula">$c^* = f(k^*) - (\\delta + n)\\,k^*$</span>

<span class="step"><span class="step-num">2</span>Maximiza $c^*$ con respecto a $k^*$</span>
Tomamos derivada e igualamos a cero:
<span class="formula">$f'(k^{**}) = \\delta + n$</span>
Esa es la <strong>regla de oro</strong>: el producto marginal del capital iguala la tasa de depreciación efectiva.

<span class="step"><span class="step-num">3</span>¿Por qué no maximizar $f(k)$?</span>
Si solo acumularas capital sin tope, podrías llevar $k^*$ muy alto y producir mucho, pero todo iría a reponer capital depreciado: el consumo terminaría cayendo. Hay un <em>punto óptimo</em> donde el consumo es máximo.

<span class="intuition">Ahorrar más siempre aumenta $k^*$ y $y^*$, pero NO siempre aumenta $c^*$. Pasada la regla de oro, ahorrar más solo financia más depreciación. Lo que importa para el bienestar es el consumo, no la producción bruta.</span>`,
    reference: "Pres. 22 · regla de oro",
  }),
  Q({
    id: "t5-c13",
    taller: 5, topic: "cobb-douglas", difficulty: "basico", type: "mcq",
    prompt: "Una función Cobb-Douglas $Y = A\\,K^{\\alpha} L^{1-\\alpha}$ tiene rendimientos constantes a escala porque:",
    options: [
      "Los exponentes de $K$ y $L$ suman 1.",
      "$A$ es una constante.",
      "$\\alpha < 1$ siempre.",
      "Los factores se pueden sustituir.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>Definición de rendimientos constantes a escala (RCE)</span>
Una función $F(K,L)$ tiene RCE si al multiplicar todos los factores por $\\lambda > 0$, el producto se multiplica por $\\lambda$:
<span class="formula">$F(\\lambda K, \\lambda L) = \\lambda\\,F(K,L)$</span>

<span class="step"><span class="step-num">2</span>Aplica a Cobb-Douglas</span>
<span class="formula">$A(\\lambda K)^{\\alpha} (\\lambda L)^{1-\\alpha} = A\\,\\lambda^{\\alpha}\\,\\lambda^{1-\\alpha}\\,K^{\\alpha} L^{1-\\alpha} = \\lambda^{\\alpha + (1-\\alpha)}\\,Y = \\lambda\\,Y$</span>
Funciona <em>únicamente</em> porque los exponentes suman 1.

<span class="step"><span class="step-num">3</span>¿Qué pasaría si sumaran &lt; 1 o &gt; 1?</span>
<ul>
<li>Si $\\alpha + \\beta &lt; 1$: rendimientos <em>decrecientes</em> (duplicar factores menos que duplica $Y$).</li>
<li>Si $\\alpha + \\beta &gt; 1$: rendimientos <em>crecientes</em> (duplicar factores más que duplica $Y$).</li>
</ul>

<span class="intuition">RCE es la base del Solow estándar: permite escribir todo en términos per cápita ($y = f(k)$) sin perder información, porque al dividir por $L$ los exponentes se cancelan limpiamente.</span>`,
    reference: "Pres. 19 · Cobb-Douglas",
  }),
  Q({
    id: "t5-tf06",
    taller: 5, topic: "solow-ss", difficulty: "intermedio", type: "tf-justify",
    prompt: "En Solow con tecnología constante, un aumento permanente de la tasa de ahorro $s$ eleva la tasa de crecimiento del producto en el largo plazo.",
    options: [
      "Falso. Eleva el nivel de $k^*$ y $y^*$, pero no la tasa de crecimiento de largo plazo.",
      "Verdadero. Más ahorro implica crecimiento permanente más alto.",
      "Falso. El aumento de $s$ no afecta el producto.",
      "Verdadero, pero solo si $s &gt; \\delta$.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>Distinción clave: nivel vs tasa de crecimiento</span>
En Solow sin progreso técnico, la economía converge a un estado estacionario donde $k$ y $y$ son <em>constantes</em> en el largo plazo. La tasa de crecimiento de $y$ por trabajador es <strong>cero</strong> en el SS, sin importar cuál sea $s$.

<span class="step"><span class="step-num">2</span>Efecto de subir $s$</span>
Recordemos $k^* = (s/(\\delta+n))^{1/(1-\\alpha)}$. Subir $s$ eleva $k^*$ y por tanto $y^*$, pero el sistema vuelve a converger a un nuevo SS donde la tasa de crecimiento per cápita vuelve a ser 0.

<span class="step"><span class="step-num">3</span>Durante la transición sí hay crecimiento</span>
Mientras la economía pasa del SS viejo al nuevo, $y$ crece. Pero ese crecimiento es transitorio y va decayendo conforme $k$ se acerca al nuevo $k^*$.

<span class="intuition">Solow básico no genera crecimiento sostenido a partir del ahorro. Para crecimiento sostenido se necesita progreso técnico ($g_A &gt; 0$). Por eso los modelos endógenos (AK, Romer) modifican supuestos: para que el ahorro tenga efectos permanentes en la tasa de crecimiento, hace falta evitar los rendimientos decrecientes del capital.</span>`,
    reference: "Pres. 22-23 · Solow propiedades",
  }),

  // ---- BATCH NUEVO · T7 (Inflación, dinero, desempleo) ----
  Q({
    id: "t7-c17",
    taller: 7, topic: "ecuacion-cuantitativa", difficulty: "basico", type: "mcq",
    prompt: "La ecuación cuantitativa del dinero es $M\\,V = P\\,Y$. Si $V$ es constante y $Y$ crece a 3% anual, ¿qué crecimiento de $M$ es compatible con inflación de 2%?",
    options: [
      "5%",
      "1%",
      "6%",
      "−1%",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>Toma logaritmos y diferencia la ecuación cuantitativa</span>
Partiendo de $M\\,V = P\\,Y$ y aplicando log y derivada temporal:
<span class="formula">$\\hat{M} + \\hat{V} = \\hat{P} + \\hat{Y}$</span>
donde $\\hat{X}$ denota la tasa de crecimiento de $X$.

<span class="step"><span class="step-num">2</span>Aplica el supuesto $V$ constante</span>
$\\hat{V} = 0$, así que:
<span class="formula">$\\hat{M} = \\hat{P} + \\hat{Y} = \\pi + g_Y$</span>

<span class="step"><span class="step-num">3</span>Sustituye los datos</span>
<ul>
<li>$\\pi = 2\\%$ (inflación)</li>
<li>$g_Y = 3\\%$ (crecimiento del producto real)</li>
</ul>
<span class="formula">$\\hat{M} = 2\\% + 3\\% = 5\\%$</span>

<span class="intuition">Esta es la "regla del banquero": para mantener inflación estable, la cantidad de dinero debe crecer al ritmo de la economía real más la inflación deseada. Si $M$ crece más rápido, hay exceso de dinero persiguiendo bienes y la inflación sube.</span>`,
    reference: "Pres. 24 · ecuación cuantitativa",
  }),
  Q({
    id: "t7-p06",
    taller: 7, topic: "fisher", difficulty: "basico", type: "open-numeric",
    prompt: "La tasa de interés nominal anual es 8% y la inflación esperada es 5%. Aproxima la tasa de interés real $r$ usando la identidad de Fisher (en %, sin signo).",
    correct: 3,
    tolerance: 0.05,
    explanation: `<span class="step"><span class="step-num">1</span>Identidad de Fisher (aproximación lineal)</span>
<span class="formula">$i \\approx r + \\pi^e$</span>
donde $i$ es la tasa nominal, $r$ la real y $\\pi^e$ la inflación esperada.

<span class="step"><span class="step-num">2</span>Despeja $r$</span>
<span class="formula">$r \\approx i - \\pi^e$</span>

<span class="step"><span class="step-num">3</span>Sustituye</span>
<span class="formula">$r \\approx 8\\% - 5\\% = 3\\%$</span>

<span class="step"><span class="step-num">4</span>Versión exacta (referencia)</span>
La identidad exacta es $1 + i = (1 + r)(1 + \\pi^e)$, que da $r = (1{,}08/1{,}05) - 1 \\approx 2{,}857\\%$. La aproximación lineal es válida para tasas pequeñas.

<span class="intuition">La tasa real es lo que de verdad gana el ahorrador: el interés nominal menos el desgaste por inflación. Si $\\pi^e &gt; i$, $r$ es negativa: prestar pierde poder de compra.</span>`,
    reference: "Pres. 25 · Fisher",
  }),
  Q({
    id: "t7-c18",
    taller: 7, topic: "tipos-desempleo", difficulty: "basico", type: "mcq",
    prompt: "El desempleo <em>friccional</em> se refiere a:",
    options: [
      "Trabajadores que están temporalmente entre empleos por procesos normales de búsqueda y emparejamiento.",
      "Personas que pierden el empleo por un cambio estructural permanente en la economía.",
      "Personas que no buscan trabajo activamente.",
      "Trabajadores despedidos por una recesión cíclica.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>Tres tipos clásicos de desempleo</span>
<ul>
<li><strong>Friccional</strong>: tiempo natural que toma encontrar un nuevo empleo (cambio de carrera, mudanza, búsqueda).</li>
<li><strong>Estructural</strong>: desajuste entre habilidades del trabajador y vacantes existentes (cambio tecnológico, sectores en declive).</li>
<li><strong>Cíclico</strong>: por fluctuaciones de la demanda agregada en recesiones.</li>
</ul>

<span class="step"><span class="step-num">2</span>El desempleo natural $u^N$</span>
Por convención, $u^N = $ friccional + estructural. El desempleo cíclico es la <em>brecha</em> $u - u^N$.

<span class="step"><span class="step-num">3</span>Modelo de flujos</span>
En el modelo $u^N = s/(s+f)$, donde $s$ es la tasa de separación y $f$ la de búsqueda exitosa, el desempleo en estado estacionario es siempre positivo: <strong>siempre hay algo de desempleo friccional</strong> incluso en pleno empleo.

<span class="intuition">El desempleo natural NO es cero. Una economía sana tiene 4-6% de desempleo "natural" porque es saludable que la gente se mueva entre empleos. Solo se preocupa cuando $u &gt; u^N$ (brecha cíclica).</span>`,
    reference: "Pres. 26 · tipos de desempleo",
  }),
  Q({
    id: "t7-tf07",
    taller: 7, topic: "fisher", difficulty: "intermedio", type: "tf-justify",
    prompt: "Si la inflación esperada $\\pi^e$ sube en 2 pp y el banco central no ajusta la tasa nominal $i$, la tasa real $r$ <em>cae</em> en aproximadamente 2 pp.",
    options: [
      "Verdadero. Por Fisher $r = i - \\pi^e$, si $i$ no cambia y $\\pi^e \\uparrow$, entonces $r \\downarrow$.",
      "Falso. La tasa real depende solo del crecimiento.",
      "Falso. La tasa real subiría.",
      "Verdadero, pero solo si la economía está en recesión.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>Identidad de Fisher</span>
<span class="formula">$r = i - \\pi^e$</span>

<span class="step"><span class="step-num">2</span>Diferencia totales</span>
$\\Delta r = \\Delta i - \\Delta \\pi^e$. Con $\\Delta i = 0$ y $\\Delta \\pi^e = +2$ pp:
<span class="formula">$\\Delta r = 0 - 2 = -2\\text{ pp}$</span>

<span class="step"><span class="step-num">3</span>¿Es deseable?</span>
Si la economía está sobrecalentada, dejar caer $r$ es procíclico (estimula aún más). Por eso el banco central suele aplicar la <em>regla de Taylor</em> y subir $i$ en respuesta a $\\pi^e \\uparrow$, manteniendo $r$ estable o subiendo.

<span class="intuition">Cuando el banco central "no hace nada" frente a expectativas inflacionarias, está implícitamente <em>estimulando</em> la economía: el costo real de pedir prestado cae. Por eso la regla de Taylor pide reaccionar con un coeficiente $&gt; 1$ a la inflación.</span>`,
    reference: "Pres. 25-30 · Fisher / Taylor",
  }),
  Q({
    id: "t7-c19",
    taller: 7, topic: "deflactor", difficulty: "intermedio", type: "mcq",
    prompt: "El <em>deflactor del PIB</em> en un año dado se calcula como:",
    options: [
      "$\\dfrac{\\text{PIB nominal}}{\\text{PIB real}} \\times 100$",
      "$\\dfrac{\\text{PIB real}}{\\text{PIB nominal}} \\times 100$",
      "El IPC dividido por la tasa de inflación.",
      "La diferencia entre PIB y PNB.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>Definición</span>
<span class="formula">$\\text{Deflactor} = \\dfrac{\\text{PIB nominal}}{\\text{PIB real}} \\times 100$</span>
El PIB nominal usa precios corrientes; el PIB real usa precios de un año base. La razón mide cómo subieron los precios en promedio.

<span class="step"><span class="step-num">2</span>Diferencia con el IPC</span>
El IPC mide el costo de una canasta fija de consumo. El deflactor incluye <em>todo</em> lo que se produce internamente (consumo, inversión, gobierno, exportaciones), con ponderaciones que cambian año a año.

<span class="step"><span class="step-num">3</span>Inflación implícita</span>
La tasa de variación del deflactor año a año es una medida amplia de inflación.

<span class="intuition">Si en el año base PIB nominal = PIB real → deflactor = 100. Si en años siguientes los precios suben, el numerador crece más rápido que el denominador y el deflactor sube por encima de 100.</span>`,
    reference: "Pres. 23 · medición de precios",
  }),

  // ---- BATCH NUEVO · T8 (IS-LM, política fiscal y monetaria) ----
  Q({
    id: "t8-p07",
    taller: 8, topic: "is-lm", difficulty: "intermedio", type: "open-numeric",
    prompt: "En IS-LM, la curva IS es $Y = 1000 - 50\\,r$ y la curva LM es $Y = 600 + 50\\,r$ (con $r$ en %). Calcula la tasa de interés de equilibrio $r^*$ (en %, sin signo).",
    correct: 4,
    tolerance: 0.05,
    explanation: `<span class="step"><span class="step-num">1</span>Igualar IS y LM</span>
En equilibrio simultáneo de bienes y dinero, el producto $Y$ y la tasa $r$ son iguales en ambas curvas:
<span class="formula">$1000 - 50r = 600 + 50r$</span>

<span class="step"><span class="step-num">2</span>Despeja $r$</span>
<span class="formula">$1000 - 600 = 50r + 50r \\;\\;\\Rightarrow\\;\\; 400 = 100r \\;\\;\\Rightarrow\\;\\; r = 4$</span>

<span class="step"><span class="step-num">3</span>Verifica con $Y$</span>
$Y = 1000 - 50(4) = 800$. También $Y = 600 + 50(4) = 800$. Coincide. ✓

<span class="intuition">La IS pendiente negativa: a mayor $r$, menor inversión y menor demanda → menor $Y$. La LM pendiente positiva: a mayor $r$, menor demanda de dinero, así que se requiere más $Y$ para que la demanda se mantenga igual a la oferta de dinero. Donde se cruzan, el mercado de bienes y el de dinero están simultáneamente en equilibrio.</span>`,
    reference: "Pres. 32 · IS-LM equilibrio",
  }),
  Q({
    id: "t8-c18",
    taller: 8, topic: "is-lm-shock", difficulty: "intermedio", type: "mcq",
    prompt: "En IS-LM con LM convencional (no horizontal ni vertical), una expansión monetaria ($\\uparrow M^s$) produce:",
    options: [
      "$\\uparrow Y$ y $\\downarrow r$.",
      "$\\uparrow Y$ y $\\uparrow r$.",
      "$\\downarrow Y$ y $\\downarrow r$.",
      "$Y$ y $r$ no cambian.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>¿Qué hace $\\uparrow M^s$ en LM?</span>
Recordemos LM: $\\dfrac{M}{P} = k\\,Y - \\ell\\,r$ (demanda real de dinero $= $ oferta real). Si $M^s$ sube y $P$ está fijo (corto plazo), aparece exceso de oferta de dinero: la gente quiere deshacerse de los saldos extra. Esto desplaza LM hacia la <em>derecha</em> (a la misma $r$, $Y$ tiene que ser mayor para absorber el dinero extra).

<span class="step"><span class="step-num">2</span>Movimiento sobre IS</span>
Con LM hacia la derecha y IS fija, el equilibrio se mueve a lo largo de IS hacia abajo y a la derecha: $\\downarrow r$, $\\uparrow Y$.

<span class="step"><span class="step-num">3</span>Mecanismo económico</span>
Más dinero → la tasa de interés cae → la inversión $I = \\bar{I} - b\\,r$ sube → la demanda agregada sube → $Y$ sube.

<span class="intuition">Política monetaria expansiva en IS-LM clásica: baja $r$, sube $Y$. Política monetaria contractiva: lo contrario. Esta es la lógica básica del banco central manejando la tasa de política.</span>`,
    reference: "Pres. 33 · política monetaria",
  }),
  Q({
    id: "t8-c19",
    taller: 8, topic: "trampa-liquidez", difficulty: "avanzado", type: "mcq",
    prompt: "En la <em>trampa de liquidez</em> (LM horizontal a $r$ = piso), un aumento de la oferta monetaria $\\uparrow M^s$:",
    options: [
      "No tiene efecto sobre $Y$ ni sobre $r$.",
      "Tiene un efecto máximo sobre $Y$.",
      "Reduce $Y$ porque eleva $r$.",
      "Sólo es efectiva con expectativas adaptativas.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>¿Qué es la trampa de liquidez?</span>
Cuando $r$ ya está cerca de cero (límite inferior efectivo, ZLB) y la sensibilidad de la demanda de dinero a $r$ se hace infinita ($\\ell \\to \\infty$), la curva LM se vuelve <em>horizontal</em>.

<span class="step"><span class="step-num">2</span>Efecto de $\\uparrow M^s$</span>
Aumentar $M^s$ desplaza LM hacia la derecha, pero como LM es horizontal en el tramo relevante, el desplazamiento se "absorbe" en el tramo plano sin cambiar la posición del equilibrio: $r$ no baja (ya está en piso) y $Y$ no sube.

<span class="step"><span class="step-num">3</span>¿Por qué no funciona?</span>
La gente atesora el dinero adicional: están dispuestos a quedarse con saldos a la tasa que ya hay, porque no esperan ganancias por prestar. La política monetaria estándar pierde tracción.

<span class="step"><span class="step-num">4</span>¿Qué sí funciona?</span>
<ul>
<li>Política fiscal (en trampa de liquidez es <strong>máximamente efectiva</strong>: no hay crowding-out).</li>
<li>Forward guidance / política no convencional (QE, compras de activos).</li>
<li>Aumentar $\\pi^e$ para reducir $r = i - \\pi^e$.</li>
</ul>

<span class="intuition">La trampa de liquidez es la pesadilla de un banco central: imprimir dinero deja de funcionar. Por eso en 2008-2020 la FED, BCE y BOJ recurrieron a QE: comprar bonos largos para bajar tasas de plazos largos cuando la corta ya estaba en cero.</span>`,
    reference: "Pres. 34 · trampa de liquidez",
  }),
  Q({
    id: "t8-c20",
    taller: 8, topic: "is-lm-pendiente", difficulty: "intermedio", type: "mcq",
    prompt: "La pendiente de la curva IS en el espacio $(Y, r)$ es <em>menos pronunciada</em> (más plana) cuando:",
    options: [
      "La inversión es muy sensible a $r$ (alto $b$) y la propensión a consumir $c$ es alta.",
      "La inversión es poco sensible a $r$ (bajo $b$).",
      "El gasto público es alto.",
      "La oferta monetaria es baja.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>Forma reducida de la IS</span>
A partir de $Y = c(Y - T) + I(r) + G$ con $I(r) = \\bar{I} - b\\,r$ y simplificando:
<span class="formula">$Y = \\dfrac{1}{1-c}\\big[\\bar{C} + \\bar{I} + G - cT - b\\,r\\big]$</span>
Pendiente: $\\dfrac{\\partial r}{\\partial Y} = -\\dfrac{1-c}{b}$.

<span class="step"><span class="step-num">2</span>¿Cuándo es más plana?</span>
"Más plana" significa $|\\partial r/\\partial Y|$ pequeño:
<ul>
<li>$b$ grande (inversión muy sensible a $r$): cualquier movimiento pequeño de $r$ provoca un gran cambio en $I$ y por tanto en $Y$ vía multiplicador.</li>
<li>$c$ grande ($1-c$ pequeño): multiplicador $1/(1-c)$ grande, así que pequeños cambios de $r$ generan grandes cambios de $Y$.</li>
</ul>

<span class="step"><span class="step-num">3</span>Implicaciones</span>
IS plana ⇒ política monetaria <strong>muy efectiva</strong> (mover $r$ mueve mucho $Y$); política fiscal <em>menos</em> efectiva (mucho crowding-out).
IS empinada (lo opuesto) ⇒ política fiscal muy efectiva; monetaria poco efectiva.

<span class="intuition">$b$ y $c$ son los "amplificadores" del lado real. Si la economía es sensible a la tasa de interés y propensa a consumir, la curva IS responde mucho a $r$.</span>`,
    reference: "Pres. 31 · pendiente IS",
  }),
  Q({
    id: "t8-tf07",
    taller: 8, topic: "trampa-liquidez", difficulty: "intermedio", type: "tf-justify",
    prompt: "Cuando la economía está en trampa de liquidez, una expansión fiscal ($\\uparrow G$) tiene efecto multiplicador <em>mayor</em> al multiplicador convencional de IS-LM.",
    options: [
      "Verdadero. Sin crowding-out, el efecto es el multiplicador keynesiano puro $1/(1-c)$.",
      "Falso. La política fiscal nunca funciona en trampa de liquidez.",
      "Verdadero, pero solo en economías cerradas grandes.",
      "Falso. El multiplicador es siempre el mismo.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>Multiplicador convencional IS-LM</span>
<span class="formula">$\\dfrac{\\partial Y}{\\partial G} = \\dfrac{1}{(1-c) + \\dfrac{b\\,k}{\\ell}}$</span>
El término $bk/\\ell$ es el "ajuste por LM": cuando $G$ sube, $Y$ sube, lo que sube la demanda de dinero, lo que sube $r$, lo que reduce $I$ (crowding-out parcial).

<span class="step"><span class="step-num">2</span>En trampa de liquidez $\\ell \\to \\infty$</span>
$bk/\\ell \\to 0$, así que el multiplicador colapsa a:
<span class="formula">$\\dfrac{\\partial Y}{\\partial G} = \\dfrac{1}{1-c}$</span>
que es el multiplicador <strong>keynesiano puro</strong> de la cruz keynesiana, sin crowding-out.

<span class="step"><span class="step-num">3</span>Intuición</span>
Como $r$ no se mueve (LM horizontal), no hay caída de $I$ que neutralice el aumento de $G$. Todo el estímulo fiscal pasa íntegro al producto.

<span class="intuition">Por eso en 2008-2009 muchos macroeconomistas (Krugman, DeLong, Eichengreen) defendieron estímulos fiscales agresivos: con tasas en cero, el multiplicador era máximo. Es la situación opuesta a una economía sobrecalentada con LM vertical, donde el crowding-out es total.</span>`,
    reference: "Pres. 34 · efectividad de política",
  }),

  // ---- BATCH NUEVO · T9 (Mundell-Fleming, economía abierta) ----
  Q({
    id: "t9-c17",
    taller: 9, topic: "mf-flexible", difficulty: "intermedio", type: "mcq",
    prompt: "En Mundell-Fleming con tipo de cambio <em>flexible</em> y movilidad perfecta de capitales, una expansión fiscal ($\\uparrow G$) produce:",
    options: [
      "Apreciación de la moneda doméstica y $Y$ no cambia.",
      "Depreciación y aumento de $Y$.",
      "Apreciación y aumento de $Y$.",
      "Depreciación y caída de $Y$.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>Las tres curvas de MF</span>
<ul>
<li>IS$^*$: $Y = c(Y-T) + I(r^*) + G + NX(\\varepsilon)$</li>
<li>LM$^*$: $\\dfrac{M}{P} = k\\,Y - \\ell\\,r^*$</li>
<li>$r = r^*$ (movilidad perfecta de capitales)</li>
</ul>
LM$^*$ con $r = r^*$ fijo se vuelve <strong>vertical en $Y$</strong> en el espacio $(Y, \\varepsilon)$.

<span class="step"><span class="step-num">2</span>Efecto de $\\uparrow G$</span>
$\\uparrow G$ desplaza IS$^*$ hacia la derecha. Pero LM$^*$ es vertical y no se mueve. Entonces $Y$ no cambia. ¿Cómo se ajusta?

<span class="step"><span class="step-num">3</span>Mecanismo del tipo de cambio</span>
Con IS$^*$ desplazada, a $Y$ original se requeriría $r$ mayor. Pero $r$ no puede subir porque $r = r^*$. Entran capitales atraídos por la prima implícita, lo que <em>aprecia</em> la moneda ($\\varepsilon \\uparrow$), lo que reduce las exportaciones netas $NX$, lo que devuelve IS$^*$ a su posición original. Resultado: $G \\uparrow$, $NX \\downarrow$, $Y$ igual.

<span class="step"><span class="step-num">4</span>Conclusión clave</span>
<strong>Inefectividad fiscal con TC flex y movilidad perfecta.</strong> El estímulo fiscal solo cambia la composición del producto (más $G$, menos $NX$), no el nivel.

<span class="intuition">Esto es lo opuesto al caso de TC fijo (donde la fiscal es muy efectiva). La regla mnemotécnica: TC flex ⇒ monetaria efectiva, fiscal inefectiva. TC fijo ⇒ fiscal efectiva, monetaria inefectiva. Es el "trilema" en acción.</span>`,
    reference: "Pres. 38 · MF flex",
  }),
  Q({
    id: "t9-c18",
    taller: 9, topic: "mf-fijo", difficulty: "intermedio", type: "mcq",
    prompt: "En Mundell-Fleming con tipo de cambio <em>fijo</em> y movilidad perfecta de capitales, una expansión monetaria ($\\uparrow M$) produce:",
    options: [
      "$Y$ no cambia; el banco central pierde reservas y $M$ vuelve a su nivel inicial.",
      "$Y$ aumenta y la moneda se deprecia.",
      "$Y$ aumenta y la moneda se aprecia.",
      "Inflación inmediata sin cambio en $Y$.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>$\\uparrow M$ desplazaría LM$^*$ a la derecha</span>
A primera instancia, más dinero ofrecido tendería a bajar $r$ por debajo de $r^*$.

<span class="step"><span class="step-num">2</span>Pero el TC está fijo</span>
Con $r &lt; r^*$ los capitales <em>salen</em> del país. La presión sobre la moneda es a la depreciación, pero el banco central se compromete a mantener $\\varepsilon$ fijo. ¿Cómo? Vendiendo reservas internacionales y comprando moneda doméstica.

<span class="step"><span class="step-num">3</span>Esta intervención reduce $M^s$</span>
Cada compra de moneda doméstica retira dinero de la economía. El banco central pierde reservas y $M^s$ se revierte hasta volver a su nivel inicial, donde $r = r^*$.

<span class="step"><span class="step-num">4</span>Conclusión</span>
$Y$ no cambia. La política monetaria queda <strong>endógenamente determinada</strong> por la defensa del TC. El BC pierde soberanía monetaria.

<span class="intuition">Otro vértice del trilema: si fijas el TC y permites movilidad perfecta de capitales, sacrificas la independencia de la política monetaria. Es lo que enfrenta Hong Kong (peg con USD) o, en su momento, Argentina con la convertibilidad 1991-2001.</span>`,
    reference: "Pres. 38 · MF fijo / trinidad imposible",
  }),
  Q({
    id: "t9-p07b",
    taller: 9, topic: "mf-flexible", difficulty: "intermedio", type: "open-numeric",
    prompt: "En MF flex, $LM^*$: $\\dfrac{M}{P} = 0{,}5\\,Y - 100\\,r^*$, con $M/P = 200$ y $r^* = 4\\%$. Calcula el producto de equilibrio $Y$.",
    correct: 1200,
    tolerance: 1,
    explanation: `<span class="step"><span class="step-num">1</span>Despeja $Y$ de LM$^*$</span>
<span class="formula">$\\dfrac{M}{P} = k\\,Y - \\ell\\,r^* \\;\\;\\Rightarrow\\;\\; Y = \\dfrac{1}{k}\\left(\\dfrac{M}{P} + \\ell\\,r^*\\right)$</span>

<span class="step"><span class="step-num">2</span>Sustituye los datos</span>
<ul>
<li>$k = 0{,}5$</li>
<li>$\\ell = 100$</li>
<li>$M/P = 200$</li>
<li>$r^* = 4 = 0{,}04$ (en este problema $r$ se ingresa en %, por lo que $r^* = 4$)</li>
</ul>
<span class="formula">$Y = \\dfrac{1}{0{,}5}(200 + 100 \\cdot 4) = 2 \\cdot (200 + 400) = 2 \\cdot 600 = 1200$</span>

<span class="step"><span class="step-num">3</span>Interpretación</span>
En MF flex con movilidad perfecta, $LM^*$ por sí sola fija $Y$ (porque $r = r^*$ está dado). Cualquier shock de IS$^*$ (cambios en $G$, $T$, $C̄$, $\\bar{I}$) se absorbe vía el tipo de cambio, no vía $Y$.

<span class="intuition">Es por eso que LM$^*$ vertical en $(Y, \\varepsilon)$: una vez fijos $M/P$ y $r^*$, $Y$ queda determinado. Si quieres mover $Y$ en MF flex, lo único que funciona es mover $M$ (política monetaria) o cambiar el régimen.</span>`,
    reference: "Pres. 38 · MF flex equilibrio",
  }),
  Q({
    id: "t9-c19",
    taller: 9, topic: "trinidad", difficulty: "basico", type: "mcq",
    prompt: "La <em>trinidad imposible</em> de Mundell establece que un país no puede tener simultáneamente:",
    options: [
      "TC fijo, movilidad perfecta de capitales y política monetaria autónoma.",
      "Inflación baja, desempleo bajo y crecimiento alto.",
      "Superávit fiscal, superávit comercial y baja inflación.",
      "Mercados libres, regulación financiera y democracia.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>Las tres aspiraciones</span>
<ol>
<li><strong>TC fijo</strong>: estabilidad cambiaria.</li>
<li><strong>Movilidad perfecta de capitales</strong>: cuenta de capital abierta.</li>
<li><strong>Política monetaria autónoma</strong>: el BC fija $i$ (o $M$) según los objetivos domésticos.</li>
</ol>

<span class="step"><span class="step-num">2</span>¿Por qué son incompatibles?</span>
<ul>
<li>Si fijas TC y abres capitales (1+2): para defender el TC el BC debe seguir $r^*$, perdiendo (3).</li>
<li>Si abres capitales y mantienes monetaria autónoma (2+3): el TC tiene que flotar, perdiendo (1).</li>
<li>Si fijas TC y quieres monetaria autónoma (1+3): debes restringir movimientos de capital, perdiendo (2).</li>
</ul>

<span class="step"><span class="step-num">3</span>Ejemplos reales</span>
<ul>
<li>USA: 2+3 (TC flex).</li>
<li>Eurozona: 1+2 dentro del euro (sin política monetaria nacional).</li>
<li>China histórica: 1+3 (con controles de capital).</li>
</ul>

<span class="intuition">Cualquier país tiene que elegir 2 de 3 vértices. La elección refleja prioridades de política. Colombia, por ejemplo, está en (2+3): TC flex, capitales abiertos, BanRep autónomo.</span>`,
    reference: "Pres. 39 · trinidad imposible",
  }),
  Q({
    id: "t9-c20",
    taller: 9, topic: "marshall-lerner", difficulty: "avanzado", type: "mcq",
    prompt: "La condición de <em>Marshall-Lerner</em> para que una depreciación mejore la balanza comercial requiere que:",
    options: [
      "La suma de las elasticidades-precio de exportaciones e importaciones (en valor absoluto) sea mayor que 1.",
      "El TC nominal sea fijo.",
      "Las exportaciones sean iguales a las importaciones.",
      "La elasticidad ingreso de las importaciones sea menor que 1.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>Efecto de una depreciación sobre $NX$</span>
Una depreciación ($\\varepsilon \\uparrow$, en notación TC peso/USD por ejemplo) abarata las exportaciones para extranjeros y encarece las importaciones para residentes.
<ul>
<li>Volumen de exportaciones $X$: sube si los extranjeros responden mucho a precios (elasticidad $\\eta_X$ alta).</li>
<li>Valor de importaciones $M$: depende de cuánto cae el volumen vs cuánto sube el precio en moneda doméstica.</li>
</ul>

<span class="step"><span class="step-num">2</span>Condición de Marshall-Lerner</span>
Bajo el supuesto de balanza inicial equilibrada, la depreciación mejora $NX$ si y solo si:
<span class="formula">$|\\eta_X| + |\\eta_M| &gt; 1$</span>

<span class="step"><span class="step-num">3</span>¿Por qué? Curva J</span>
En el corto plazo las elasticidades son bajas (los contratos están firmados, los volúmenes no cambian rápido). La balanza puede <em>empeorar</em> al inicio (curva J) y mejorar conforme las elasticidades de largo plazo se manifiestan.

<span class="intuition">Si los bienes son muy específicos y los compradores tienen poca flexibilidad ($\\eta &lt; 0{,}5$), una devaluación puede empeorar las cuentas comerciales. Por eso devaluaciones grandes a veces no funcionan: depende de qué tan elástica es tu canasta de comercio.</span>`,
    reference: "Pres. 37 · Marshall-Lerner",
  }),
  Q({
    id: "t9-tf09",
    taller: 9, topic: "trinidad", difficulty: "intermedio", type: "tf-justify",
    prompt: "Bajo TC fijo y movilidad perfecta de capitales, el banco central <em>elige libremente</em> la tasa de interés doméstica para fines de estabilización.",
    options: [
      "Falso. La tasa doméstica queda atada a $r^*$; el BC pierde autonomía monetaria.",
      "Verdadero. El BC siempre puede fijar $i$.",
      "Falso. El BC fija $r$, pero no $i$.",
      "Verdadero, pero solo si hay control de capitales.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>Trinidad imposible: TC fijo + capitales abiertos</span>
Con $r &lt; r^*$, sale capital, presiona la moneda a depreciarse, y el BC debe vender reservas (que reduce $M^s$ hasta restablecer $r = r^*$). Con $r &gt; r^*$, entra capital, presiona a apreciarse, y el BC compra reservas (que aumenta $M^s$ hasta restablecer $r = r^*$).

<span class="step"><span class="step-num">2</span>Conclusión</span>
La política monetaria queda <em>determinada endógenamente</em> por la defensa del TC fijo. El BC pierde la herramienta de tasa para fines de estabilización doméstica.

<span class="step"><span class="step-num">3</span>¿Cómo recuperarla?</span>
<ul>
<li>Romper el peg (TC flexible).</li>
<li>Imponer controles de capital (cerrar la cuenta de capital).</li>
</ul>

<span class="intuition">Argentina 2001: cuando la convertibilidad 1:1 colapsó, recuperaron política monetaria al precio de una devaluación enorme. China: mantiene autonomía monetaria con controles selectivos al capital.</span>`,
    reference: "Pres. 39 · trinidad",
  }),
  Q({
    id: "t9-c21",
    taller: 9, topic: "tc-real-nominal", difficulty: "intermedio", type: "mcq",
    prompt: "El tipo de cambio real $q$ se define como $q = \\dfrac{\\varepsilon \\, P^*}{P}$. Si la economía local tiene inflación 8% y el extranjero 2%, manteniendo $\\varepsilon$ constante, entonces $q$:",
    options: [
      "Cae aproximadamente 6% (apreciación real).",
      "Sube aproximadamente 6% (depreciación real).",
      "No cambia.",
      "Sube 10%.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>Toma logaritmos y diferencia</span>
$\\ln q = \\ln \\varepsilon + \\ln P^* - \\ln P$. Diferenciando en el tiempo:
<span class="formula">$\\hat{q} = \\hat{\\varepsilon} + \\pi^* - \\pi$</span>

<span class="step"><span class="step-num">2</span>Sustituye los datos</span>
<ul>
<li>$\\hat{\\varepsilon} = 0$ (TC nominal constante)</li>
<li>$\\pi^* = 2\\%$</li>
<li>$\\pi = 8\\%$</li>
</ul>
<span class="formula">$\\hat{q} = 0 + 2\\% - 8\\% = -6\\%$</span>

<span class="step"><span class="step-num">3</span>Interpretación</span>
$q$ cae ⇒ <strong>apreciación real</strong>. Los bienes locales se hacen relativamente más caros frente a los extranjeros. Esto erosiona la competitividad de las exportaciones locales.

<span class="intuition">Aunque el TC nominal no se mueva, si la inflación local supera a la externa, en términos reales tu moneda <em>se aprecia</em>. Es lo que vivieron varios países latinoamericanos en los 90 con anclas cambiarias e inflación persistente: TC nominal estable pero competitividad cayendo. La famosa "enfermedad holandesa" cambiaria.</span>`,
    reference: "Pres. 36 · TC real",
  }),
  Q({
    id: "t9-c22",
    taller: 9, topic: "mf-fijo", difficulty: "intermedio", type: "mcq",
    prompt: "En MF con TC fijo y movilidad perfecta, una expansión fiscal ($\\uparrow G$) produce:",
    options: [
      "Aumento de $Y$, sin cambio en $r$, y aumento de las reservas internacionales.",
      "Aumento de $Y$ y depreciación de la moneda.",
      "Sin cambio en $Y$, apreciación.",
      "Caída de $Y$ por crowding-out total.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>$\\uparrow G$ desplaza IS$^*$ a la derecha</span>
A nivel de equilibrio inicial, $r$ tendería a subir.

<span class="step"><span class="step-num">2</span>Pero $r$ no puede subir bajo movilidad perfecta</span>
Entran capitales (atraídos por $r &gt; r^*$ implícito), presionando a la moneda a apreciarse.

<span class="step"><span class="step-num">3</span>El BC defiende el peg</span>
Para evitar la apreciación, el BC <em>compra reservas</em> (vende moneda doméstica). Esto expande $M^s$, lo que desplaza LM$^*$ a la derecha hasta restablecer $r = r^*$ con $Y$ mayor.

<span class="step"><span class="step-num">4</span>Resultado final</span>
<ul>
<li>$Y$ aumenta (efecto multiplicador máximo, sin crowding-out vía $r$).</li>
<li>$r$ vuelve a $r^*$.</li>
<li>Reservas suben.</li>
<li>$M^s$ sube endógenamente.</li>
</ul>

<span class="intuition">TC fijo "amplifica" la política fiscal: el BC se ve forzado a acomodar monetariamente para mantener el peg. Es por eso que en regímenes de TC fijo la disciplina fiscal es CRÍTICA: el déficit se monetiza automáticamente.</span>`,
    reference: "Pres. 38 · MF fijo fiscal",
  }),
  Q({
    id: "t9-tf10",
    taller: 9, topic: "mf-flexible", difficulty: "avanzado", type: "tf-justify",
    prompt: "Bajo MF flex, una contracción monetaria del país extranjero ($\\downarrow M^*$, lo que sube $r^*$) genera depreciación de la moneda doméstica y aumenta $Y$.",
    options: [
      "Verdadero. ↑r* hace que $r &lt; r^*$, sale capital, la moneda se deprecia, $NX \\uparrow$, IS$^*$ se desplaza a la derecha y $Y \\uparrow$.",
      "Falso. ↑r* aprecia automáticamente la moneda doméstica.",
      "Verdadero, pero solo en países desarrollados.",
      "Falso. La tasa internacional no afecta a economías pequeñas.",
    ],
    correct: 0,
    explanation: `<span class="step"><span class="step-num">1</span>Efecto inicial de $\\uparrow r^*$</span>
La condición $r = r^*$ ya no se cumple inicialmente: $r$ doméstico (digamos 4%) queda por debajo de $r^*$ (digamos 6%). Salen capitales hacia el exterior.

<span class="step"><span class="step-num">2</span>Ajuste del TC</span>
La salida de capitales presiona la moneda doméstica a <em>depreciarse</em> ($\\varepsilon \\uparrow$). Eso abarata las exportaciones y encarece las importaciones, así que $NX \\uparrow$.

<span class="step"><span class="step-num">3</span>Efecto sobre IS$^*$ y $Y$</span>
$NX \\uparrow$ desplaza IS$^*$ a la derecha. En LM$^*$ (vertical en $Y$ con $r = r^*$), el equilibrio se mueve a la derecha: $Y \\uparrow$.

<span class="step"><span class="step-num">4</span>Caso real</span>
Cuando la FED sube tasas, países emergentes con TC flex (Colombia, Brasil, México) suelen ver depreciaciones. Pero el efecto sobre $Y$ depende de qué tan elásticas sean sus exportaciones (Marshall-Lerner). En el corto plazo, la depreciación puede generar inflación importada antes de impulsar $NX$.

<span class="intuition">Bajo MF flex el TC actúa como amortiguador: shocks externos se absorben en el precio del cambio, no en cantidades. Es la gran ventaja del régimen flexible vs fijo.</span>`,
    reference: "Pres. 38-39 · shocks externos MF",
  }),
  Q({
    id: "t9-p09",
    taller: 9, topic: "mf-flexible", difficulty: "avanzado", type: "open-numeric",
    prompt: "En MF flex, supongamos $C = 100 + 0{,}75(Y - T)$, $I = 200 - 25\\,r$, $G = 100$, $T = 100$, $NX = 150 - 50\\,q$, $r^* = 4$. Calcula el tipo de cambio real de equilibrio $q$ (a 2 decimales), dado que LM$^*$ fija $Y = 1000$.",
    correct: 2.5,
    tolerance: 0.05,
    explanation: `<span class="step"><span class="step-num">1</span>Plantea IS$^*$</span>
$Y = C + I + G + NX$
<span class="formula">$Y = [100 + 0{,}75(Y - 100)] + [200 - 25\\,r^*] + 100 + [150 - 50\\,q]$</span>

<span class="step"><span class="step-num">2</span>Sustituye $r^* = 4$ y $Y = 1000$</span>
<ul>
<li>$C = 100 + 0{,}75 \\cdot 900 = 100 + 675 = 775$</li>
<li>$I = 200 - 25 \\cdot 4 = 200 - 100 = 100$</li>
<li>$G = 100$</li>
<li>$NX = 150 - 50q$</li>
</ul>
<span class="formula">$1000 = 775 + 100 + 100 + (150 - 50q) = 1125 - 50q$</span>

<span class="step"><span class="step-num">3</span>Despeja $q$</span>
<span class="formula">$50q = 1125 - 1000 = 125 \\;\\;\\Rightarrow\\;\\; q = 2{,}5$</span>

<em>Nota: La respuesta esperada $q \\approx 2{,}5$ representa un TC real depreciado. Si en tu cálculo te da otro valor, revisa los signos de $NX$.</em>

<span class="intuition">El TC real $q$ es la variable que se ajusta endógenamente para que la cantidad demandada agregada sea consistente con el $Y$ que LM$^*$ fija. Si IS$^*$ y LM$^*$ no se cruzan al $q$ inicial, el TC real se mueve hasta que sí.</span>`,
    reference: "Pres. 38 · MF flex equilibrio",
  }),
];

if (typeof module !== "undefined" && module.exports) module.exports = QUESTIONS;
