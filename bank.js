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
        explanation: `$\\frac{\\partial Y}{\\partial G} = \\frac{1}{1-c} = \\frac{1}{${(1-c).toFixed(2)}} = ${mG.toFixed(2)}$.`,
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
      return {
        prompt: `Con $c = ${c}$, ¿cuál es el multiplicador de los impuestos $\\partial Y / \\partial T$ en la cruz keynesiana? (con 2 decimales, incluye el signo)`,
        correctValue: mT,
        tolerance: 0.05,
        explanation: `$\\frac{\\partial Y}{\\partial T} = \\frac{-c}{1-c} = \\frac{-${c}}{${(1-c).toFixed(2)}} = ${mT.toFixed(2)}$.`,
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
        explanation: `$\\frac{M}{P} = ${realM.toFixed(2)}$. Igualando: $${Y} - 40 r = ${realM.toFixed(2)} \\Rightarrow r = ${r.toFixed(2)}\\%$.`,
        reference: "Taller 8 · 3.a",
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
      return {
        prompt: `En IS-LM con $c = ${c}$, $I = h - ${b} r$, $L^d = ${k} Y - ${l} r$, ¿cuál es el multiplicador del gasto $\\partial Y / \\partial G$? (con 2 decimales)`,
        correctValue: m,
        tolerance: 0.05,
        explanation: `$\\partial Y / \\partial G = 1 / [(1-c) + b k / \\ell] = 1/[${(1 - c).toFixed(2)} + ${b} \\cdot ${k} / ${l}] = ${m.toFixed(2)}$.`,
        reference: "Taller 9 · 1.c",
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
  Q({
    id: "t3-p01",
    taller: 3, topic: "multiplicador-bancario", difficulty: "basico", type: "numeric",
    generate(rng) {
      const cr = rng.pick([0.3, 0.4, 0.5, 0.6]);
      const rr = rng.pick([0.10, 0.15, 0.20, 0.25]);
      const m = (cr + 1) / (cr + rr);
      return {
        prompt: `Si la proporción de efectivo a depósitos es $cr = ${cr}$ y el coeficiente de reservas obligatorias es $rr = ${rr}$, ¿cuál es el multiplicador monetario $m = (cr + 1) / (cr + rr)$? (con 2 decimales)`,
        correctValue: m,
        tolerance: 0.05,
        explanation: `$m = \\frac{cr + 1}{cr + rr} = \\frac{${cr} + 1}{${cr} + ${rr}} = \\frac{${(cr + 1).toFixed(2)}}{${(cr + rr).toFixed(2)}} = ${m.toFixed(2)}$.`,
        reference: "Pres. 12-14 · sistema monetario",
      };
    },
  }),
  Q({
    id: "t3-p02",
    taller: 3, topic: "oferta-monetaria", difficulty: "basico", type: "numeric",
    generate(rng) {
      const B = rng.pick([2000, 3000, 4000, 5000]);
      const cr = rng.pick([0.4, 0.5, 0.6]);
      const rr = rng.pick([0.15, 0.20, 0.25]);
      const m = (cr + 1) / (cr + rr);
      const M = m * B;
      return {
        prompt: `Con base monetaria $B = ${B}$, $cr = ${cr}$ y $rr = ${rr}$, ¿cuál es la oferta monetaria $M = m \\cdot B$? (redondeado al entero)`,
        correctValue: Math.round(M),
        tolerance: 5,
        explanation: `$m = ${m.toFixed(2)}$. $M = m \\cdot B = ${m.toFixed(2)} \\cdot ${B} = ${M.toFixed(0)}$.`,
        reference: "Pres. 12-14 · sistema monetario",
      };
    },
  }),
  Q({
    id: "t3-c01",
    taller: 3, topic: "hiperinflacion", difficulty: "intermedio", type: "tf-justify",
    prompt: "La causa fundamental de la mayoría de los procesos de hiperinflación es que el banco central decide imprimir mucho dinero de forma autónoma, sin relación con la política fiscal.",
    options: [
      "Falso. El banco central suele imprimir mucho dinero para financiar gasto público y déficit fiscal cuando otras fuentes de financiamiento se agotan.",
      "Verdadero. El BC en todos los países es independiente y nunca se fija en la política fiscal.",
      "Verdadero. El BC tiene incentivos para imprimir y obtener utilidades.",
      "Falso. La hiperinflación se debe únicamente a choques de oferta.",
    ],
    correct: 0,
    explanation: "Históricamente la hiperinflación nace cuando el BC pierde independencia y monetiza déficit fiscales (Alemania 1923, Hungría 1946, Zimbabue 2008, Venezuela 2017+).",
    reference: "Pres. 18 BR · independencia",
  }),

  // ============================================================
  // Preguntas adicionales tipo PIB / PNB / contabilidad nacional
  // (Taller 0/2, presentaciones 05-07)
  // ============================================================
  Q({
    id: "t7-c08",
    taller: 7, topic: "pib-pnb", difficulty: "basico", type: "mcq",
    prompt: "Cuando un turista extranjero paga una comida en un restaurante nacional, ¿qué pasa con el Producto Nacional Bruto (PNB) del país?",
    options: [
      "Aumenta. Si bien la actividad ocurre dentro del país, el ingreso lo recibe un residente nacional (el dueño del restaurante).",
      "No cambia. El gasto del turista es gasto exterior y no afecta al PNB.",
      "Disminuye porque el dinero entra y sale del país.",
      "Es incierto, necesitamos más información.",
    ],
    correct: 0,
    explanation: "El PNB mide ingreso de los nacionales independientemente del territorio donde se genere. Como el restaurante es nacional, sus utilidades suben y el PNB sube.",
    reference: "Pres. 05-07 · contabilidad nacional",
  }),
  Q({
    id: "t7-tf03",
    taller: 7, topic: "pib-pnb", difficulty: "basico", type: "tf",
    prompt: "Si una persona compra un automóvil usado en un concesionario, el valor total del automóvil se suma al PIB del año en curso.",
    correct: false,
    explanation: "El PIB mide producción del año en curso. El auto usado ya se contó cuando fue producido. Sólo se suma el margen de comercialización del concesionario, que es un servicio nuevo.",
    reference: "Pres. 05-07 · contabilidad nacional",
  }),
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
        explanation: `$C = ${a} + ${c}(${Y} - ${T}) = ${a} + ${c} \\cdot ${Y - T} = ${C}$.`,
        reference: "IS-LM cerrada · cálculo de C",
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
        explanation: `$C = ${C}$, $I = S = ${I}$. Despejando $r$: $${I0} - ${I1} r = ${I} \\Rightarrow r = (${I0} - ${I})/${I1} = ${r.toFixed(1)}\\%$.`,
        reference: "IS-LM cerrada · r despejado de I = S",
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
      // Política fiscal expansiva: G sube manteniendo T y Y fijos.
      // Y, T, C no cambian (porque C depende de Y-T, no de G).
      // I baja porque I = Y - C - G, con G mayor → I menor → r sube
      const Y = 8000;
      const T = 2000;
      const G_old = rng.pick([1500, 1200]);
      const G_new = rng.pick([2000, 2500, 3000]);
      const a = 1000; const c = 0.5;
      const C = a + c * (Y - T);
      const I_new = Y - C - G_new;
      const I0 = 3000; const I1 = 100;
      const r_new = (I0 - I_new) / I1;
      return {
        prompt: `Economía cerrada con $Y = ${Y}$, $T = ${T}$, $C = ${a} + ${c}(Y - T)$, $I = ${I0} - ${I1} r$. El gobierno hace política fiscal expansiva subiendo $G$ de $${G_old}$ a $${G_new}$ (manteniendo $T$). ¿Cuál es la <strong>nueva tasa de interés real $r$</strong>?`,
        correctValue: r_new,
        tolerance: 0.5,
        explanation: `$C = ${C}$ (no cambia con G). $I_{new} = Y - C - G_{new} = ${Y} - ${C} - ${G_new} = ${I_new}$. $r_{new} = (${I0} - ${I_new}) / ${I1} = ${r_new.toFixed(1)}\\%$. Crowding-out: ↑G ⇒ ↓I ⇒ ↑r.`,
        reference: "IS-LM cerrada · choque fiscal · estilo Punto C",
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
];

if (typeof module !== "undefined" && module.exports) module.exports = QUESTIONS;
