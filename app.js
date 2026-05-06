// ============================================================
// Quiz aleatorio · Macroeconomía
// ============================================================
// Motor de quiz con random determinista, 4 tipos de pregunta,
// persistencia en localStorage y rendering de LaTeX con KaTeX.
// ============================================================

const APP_VERSION = "1.0.0";
const STORAGE_KEY = "quiz-macro:v1";

// ---- Utilidades de aleatoriedad determinista ----
function mulberry32(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function makeRng(seed) {
  const r = mulberry32(seed || (Date.now() & 0xFFFFFFFF));
  return {
    rand: r,
    range: (a, b) => a + (b - a) * r(),
    int: (a, b) => Math.floor(a + (b - a + 1) * r()),
    pick: (arr) => arr[Math.floor(r() * arr.length)],
    shuffle: (arr) => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
  };
}

const fmt = (v, digits = 2) => {
  if (typeof v !== "number" || !Number.isFinite(v)) return String(v);
  const abs = Math.abs(v);
  const d = (abs >= 100 || Number.isInteger(v)) ? Math.min(digits, 1) : digits;
  return v.toLocaleString("es-CO", { maximumFractionDigits: d, minimumFractionDigits: d });
};

const esc = (v) => String(v)
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;").replaceAll('"', "&quot;");

// ---- Persistencia ----
function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (_) {
    return {};
  }
}
function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {}
}
function trackAnswer(questionId, correct) {
  const state = loadState();
  state.history = state.history || {};
  const h = state.history[questionId] || { seen: 0, ok: 0 };
  h.seen += 1;
  if (correct) h.ok += 1;
  state.history[questionId] = h;
  saveState(state);
}

// ---- Pool de preguntas ----
// QUESTIONS viene de bank.js como array de definiciones.
// Cada pregunta puede ser estática o tener un método generate(rng).
function makeQuestionInstance(def, rng) {
  if (typeof def.generate === "function") {
    const inst = def.generate(rng);
    return {
      id: def.id,
      taller: def.taller,
      topic: def.topic,
      difficulty: def.difficulty,
      type: inst.type || def.type,
      ...inst,
    };
  }
  // Estática: clonamos para no mutar
  return JSON.parse(JSON.stringify(def));
}

function filterPool(allQuestions, config) {
  return allQuestions.filter((q) => {
    if (config.talleres.length && !config.talleres.includes(q.taller)) return false;
    if (config.topics && config.topics.length && !config.topics.includes(q.topic)) return false;
    if (config.difficulties.length && !config.difficulties.includes(q.difficulty)) return false;
    if (config.types && config.types.length && !config.types.includes(q.type)) return false;
    return true;
  });
}

// ---- Renderizado de pregunta ----
function renderTags(q) {
  const labels = {
    3: "Taller 3 · Sistema monetario",
    5: "Taller 5 · Desempleo",
    7: "Taller 7 · DA-OA",
    8: "Taller 8 · IS-LM",
    9: "Taller 9 · IS-LM y MF",
  };
  const tipoLbl = { mcq: "Selección múltiple", "tf-justify": "V/F con justificación", tf: "Verdadero / Falso", numeric: "Numérica" };
  return `<div class="tag-row">
    <span class="tag tag-taller">${esc(labels[q.taller] || `Taller ${q.taller}`)}</span>
    <span class="tag tag-difficulty ${esc(q.difficulty)}">${esc(q.difficulty)}</span>
    <span class="tag">${esc(tipoLbl[q.type] || q.type)}</span>
  </div>`;
}

function renderOptions(q, state) {
  if (q.type === "numeric") {
    const cls = state.locked ? (state.correct ? "correct locked" : "incorrect locked") : "";
    return `<div class="numeric-input ${cls}">
      <input type="number" inputmode="decimal" step="any" id="numeric-input"
             ${state.locked ? "disabled" : ""}
             value="${state.locked && state.userValue !== undefined ? esc(state.userValue) : ""}"
             placeholder="Escribe tu respuesta numérica" />
      ${q.unitsHint ? `<p class="numeric-help">${esc(q.unitsHint)}</p>` : ""}
    </div>`;
  }
  return `<div class="qoptions">${q.options.map((opt, i) => {
    const letter = String.fromCharCode(65 + i);
    let cls = "qoption";
    if (state.locked) {
      if (i === state.correctIdx) cls += " correct locked";
      else if (i === state.userIdx) cls += " incorrect locked";
      else cls += " locked";
    } else if (state.userIdx === i) {
      cls += " selected";
    }
    return `<div class="${cls}" data-opt="${i}">
      <span class="marker">${letter}</span>
      <span class="qoption-text">${esc(opt)}</span>
    </div>`;
  }).join("")}</div>`;
}

function renderFeedback(q, state) {
  if (!state.locked) return "";
  const cls = state.correct ? "correct" : "incorrect";
  const correctLabel = q.type === "numeric"
    ? `Respuesta correcta: <strong>${fmt(q.correctValue, 4)}${q.unit || ""}</strong>`
    : `Respuesta correcta: <strong>${esc(String.fromCharCode(65 + state.correctIdx))}</strong> · ${esc(q.options[state.correctIdx])}`;
  return `<div class="feedback ${cls}">
    <strong>${state.correct ? "✓ ¡Correcto!" : "✗ Incorrecto."}</strong>
    ${state.correct ? "" : `<br/>${correctLabel}`}
    <p style="margin: 6px 0 0">${esc(q.explanation || "")}</p>
    ${q.reference ? `<span class="ref">${esc(q.reference)}</span>` : ""}
  </div>`;
}

// ---- Renderizado de pantallas ----
const app = document.getElementById("app");

function renderSetup() {
  const state = loadState();
  const cfg = state.lastConfig || {
    talleres: [5, 7, 8, 9],
    difficulties: ["basico", "intermedio", "avanzado"],
    types: ["mcq", "tf-justify", "tf", "numeric"],
    count: 20,
    timer: 0, // segundos por pregunta, 0 = sin timer
    seed: 0,
  };
  const tallerOptions = [
    { id: 3, label: "Taller 3 · Sistema monetario e inflación (apoyo)" },
    { id: 5, label: "Taller 5 · Desempleo" },
    { id: 7, label: "Taller 7 · Fluctuaciones y demanda agregada" },
    { id: 8, label: "Taller 8 · IS-LM" },
    { id: 9, label: "Taller 9 · IS-LM y Mundell-Fleming" },
  ];
  const diffs = ["basico", "intermedio", "avanzado"];
  const types = [
    { id: "mcq", label: "MCQ (4 opciones)" },
    { id: "tf-justify", label: "V/F con justificación" },
    { id: "tf", label: "V/F simple" },
    { id: "numeric", label: "Numérica" },
  ];

  const totalDisp = QUESTIONS.length;
  const filtered = filterPool(QUESTIONS, cfg).length;

  app.innerHTML = `<div class="app">
    <header class="brand">
      <p class="brand-kicker">Universidad de los Andes · Macroeconomía aplicada</p>
      <h1 class="brand-title">Quiz aleatorio de Macroeconomía</h1>
      <p class="brand-note">Practica con preguntas tomadas de los talleres del curso. Cada quiz es aleatorio: orden, opciones y valores numéricos cambian en cada intento.</p>
    </header>

    <section class="card">
      <h2>1. ¿Qué talleres incluir?</h2>
      <p class="help">Marca los talleres que quieras como fuente de preguntas. Mezclar varios da quizes más variados.</p>
      <div class="choices">
        ${tallerOptions.map((t) => `<label class="choice">
          <input type="checkbox" data-taller="${t.id}" ${cfg.talleres.includes(t.id) ? "checked" : ""}/>
          ${esc(t.label)}
        </label>`).join("")}
      </div>
    </section>

    <section class="card">
      <h2>2. Dificultad</h2>
      <p class="help">Las preguntas básicas son conceptuales o de aplicación directa; las avanzadas requieren combinar varios resultados del taller.</p>
      <div class="choices">
        ${diffs.map((d) => `<label class="choice">
          <input type="checkbox" data-diff="${d}" ${cfg.difficulties.includes(d) ? "checked" : ""}/>
          ${esc(d.charAt(0).toUpperCase() + d.slice(1))}
        </label>`).join("")}
      </div>
    </section>

    <section class="card">
      <h2>3. Tipos de pregunta</h2>
      <div class="choices">
        ${types.map((t) => `<label class="choice">
          <input type="checkbox" data-type="${t.id}" ${cfg.types.includes(t.id) ? "checked" : ""}/>
          ${esc(t.label)}
        </label>`).join("")}
      </div>
    </section>

    <section class="card">
      <h2>4. Configuración del quiz</h2>
      <label class="field" for="count">Número de preguntas</label>
      <select id="count">
        ${[5, 10, 15, 20, 25, 30, 40].map((n) =>
          `<option value="${n}" ${cfg.count === n ? "selected" : ""}>${n} preguntas${n === 20 ? " (recomendado)" : ""}</option>`).join("")}
        <option value="9999" ${cfg.count === 9999 ? "selected" : ""}>Todas las disponibles</option>
      </select>
      <div class="toggles">
        <label class="toggle">
          <input type="checkbox" id="timer-on" ${cfg.timer > 0 ? "checked" : ""}/>
          Timer (90 s por pregunta)
        </label>
      </div>
      <label class="field" for="seed">Semilla (opcional, para reproducir un quiz)</label>
      <input type="text" id="seed" placeholder="ej. 1234"
             value="${cfg.seed ? cfg.seed : ""}" style="padding:9px 11px;border:1.5px solid var(--line);border-radius:10px;width:200px;" />
      <p class="help">Disponibles con tu selección actual: <strong id="filter-count">${filtered}</strong> de ${totalDisp} preguntas.</p>
      <div class="actions">
        <button class="btn btn-primary" id="start">Iniciar quiz</button>
        <button class="btn btn-secondary" id="show-history">Ver historial</button>
        <button class="btn btn-danger" id="clear-history" type="button" style="margin-left:auto;">Limpiar historial</button>
      </div>
    </section>

    <section class="card" id="history-card" style="display:none;">
      <h2>Historial</h2>
      <div id="history-list"></div>
    </section>

    <footer class="app-footer">
      <p>v${APP_VERSION} · Material académico · Talleres del prof. H. Vallejo · Sin datos reales</p>
      <p>App hermana: <a href="https://cterrassa.github.io/modelos-macro/" target="_blank" rel="noopener">simulador de modelos macroeconómicos</a></p>
    </footer>
  </div>`;

  const updateFilterCount = () => {
    const liveCfg = readSetupCfg();
    const n = filterPool(QUESTIONS, liveCfg).length;
    document.getElementById("filter-count").textContent = n;
    document.getElementById("start").disabled = n === 0;
  };

  document.querySelectorAll('input[type="checkbox"]').forEach((el) =>
    el.addEventListener("change", updateFilterCount));
  updateFilterCount();

  document.getElementById("start").addEventListener("click", () => {
    const cfgNow = readSetupCfg();
    const sst = loadState();
    sst.lastConfig = cfgNow;
    saveState(sst);
    startQuiz(cfgNow);
  });
  document.getElementById("show-history").addEventListener("click", showHistory);
  document.getElementById("clear-history").addEventListener("click", () => {
    if (confirm("¿Borrar todo el historial de respuestas?")) {
      saveState({ lastConfig: cfg });
      showHistory();
    }
  });

  if (window.renderMathInElement) {
    window.renderMathInElement(app, { delimiters: katexDelims, throwOnError: false });
  }
}

function readSetupCfg() {
  return {
    talleres: Array.from(document.querySelectorAll('[data-taller]')).filter((c) => c.checked).map((c) => Number(c.dataset.taller)),
    difficulties: Array.from(document.querySelectorAll('[data-diff]')).filter((c) => c.checked).map((c) => c.dataset.diff),
    types: Array.from(document.querySelectorAll('[data-type]')).filter((c) => c.checked).map((c) => c.dataset.type),
    count: Number(document.getElementById("count").value || 10),
    timer: document.getElementById("timer-on").checked ? 90 : 0,
    seed: Number(document.getElementById("seed").value) || 0,
  };
}

function showHistory() {
  const card = document.getElementById("history-card");
  const list = document.getElementById("history-list");
  if (card.style.display === "none") {
    const state = loadState();
    const h = state.history || {};
    const ids = Object.keys(h);
    if (!ids.length) {
      list.innerHTML = `<p class="help">No hay historial todavía. Empieza un quiz para acumular estadísticas por pregunta.</p>`;
    } else {
      const totalSeen = ids.reduce((s, id) => s + h[id].seen, 0);
      const totalOk = ids.reduce((s, id) => s + h[id].ok, 0);
      const accuracy = totalSeen > 0 ? Math.round((totalOk / totalSeen) * 100) : 0;
      const rows = ids.map((id) => {
        const acc = h[id].seen > 0 ? Math.round((h[id].ok / h[id].seen) * 100) : 0;
        return `<div class="history-row"><span>${esc(id)}</span><span>${h[id].ok} / ${h[id].seen}  ·  ${acc}%</span></div>`;
      });
      list.innerHTML = `<div class="summary-stats">
        <div class="stat"><p class="stat-num">${ids.length}</p><p class="stat-lbl">preguntas vistas</p></div>
        <div class="stat"><p class="stat-num">${totalSeen}</p><p class="stat-lbl">respuestas dadas</p></div>
        <div class="stat"><p class="stat-num">${accuracy}%</p><p class="stat-lbl">tasa de acierto</p></div>
      </div>
      <div style="margin-top:14px;">
        <div class="history-row heading"><span>ID</span><span>Aciertos / vistas</span></div>
        ${rows.join("")}
      </div>`;
    }
    card.style.display = "";
  } else {
    card.style.display = "none";
  }
}

// ---- Estado activo del quiz ----
let quizState = null;

function startQuiz(cfg) {
  const seed = cfg.seed || (Date.now() & 0xFFFFFFFF);
  const rng = makeRng(seed);
  const filtered = filterPool(QUESTIONS, cfg);
  const ordered = rng.shuffle(filtered);
  const count = Math.min(cfg.count, ordered.length);
  const slice = ordered.slice(0, count);

  // Materializamos cada pregunta (resolviendo paramétricas y barajando opciones)
  const items = slice.map((def) => {
    const inst = makeQuestionInstance(def, rng);
    if (inst.type === "mcq" || inst.type === "tf-justify") {
      // Barajar opciones
      const idxs = rng.shuffle(inst.options.map((_, i) => i));
      const newOptions = idxs.map((i) => inst.options[i]);
      const newCorrect = idxs.indexOf(inst.correct);
      inst.options = newOptions;
      inst.correctIdx = newCorrect;
    } else if (inst.type === "tf") {
      // Estructura fija: ["Verdadero", "Falso"]
      inst.options = ["Verdadero", "Falso"];
      inst.correctIdx = inst.correct === true || inst.correct === "Verdadero" || inst.correct === 0 ? 0 : 1;
    } else if (inst.type === "numeric") {
      // No hace falta barajar
    }
    return inst;
  });

  quizState = {
    cfg,
    seed,
    items,
    index: 0,
    answers: items.map(() => ({ locked: false })),
    startedAt: Date.now(),
    timerRemaining: cfg.timer,
  };
  renderQuestion();
}

function renderQuestion() {
  const { items, index, answers, cfg } = quizState;
  const q = items[index];
  const ans = answers[index];

  app.innerHTML = `<div class="app">
    <header class="brand">
      <p class="brand-kicker">Quiz en curso</p>
      <h1 class="brand-title" style="font-size:1.4rem">Pregunta ${index + 1} de ${items.length}</h1>
    </header>
    <div class="progress">
      <div class="progress-bar"><div style="width:${((index) / items.length) * 100}%"></div></div>
      <span>${index + 1}/${items.length}</span>
      ${cfg.timer ? `<span class="timer" id="timer">${formatTimer(quizState.timerRemaining)}</span>` : ""}
    </div>
    <section class="card">
      ${renderTags(q)}
      <div class="qprompt">${q.prompt}</div>
      ${renderOptions(q, { ...ans, correctIdx: q.correctIdx, locked: ans.locked, userIdx: ans.userIdx, userValue: ans.userValue, correct: ans.correct })}
      ${renderFeedback(q, { ...ans, correctIdx: q.correctIdx, locked: ans.locked, userIdx: ans.userIdx, userValue: ans.userValue, correct: ans.correct })}
      <div class="actions">
        ${index > 0 ? `<button class="btn btn-secondary" id="prev">← Anterior</button>` : ""}
        ${ans.locked
          ? (index < items.length - 1
              ? `<button class="btn btn-primary" id="next">Siguiente →</button>`
              : `<button class="btn btn-primary" id="finish">Ver resultados</button>`)
          : `<button class="btn btn-primary" id="answer">Responder</button>`}
        <button class="btn btn-secondary" id="abort" style="margin-left:auto;">Salir</button>
      </div>
    </section>
  </div>`;

  // Click en opciones (no numéricas)
  if (q.type !== "numeric" && !ans.locked) {
    document.querySelectorAll(".qoption").forEach((el) => {
      el.addEventListener("click", () => {
        const idx = Number(el.dataset.opt);
        ans.userIdx = idx;
        renderQuestion();
      });
    });
  }

  // Botones
  const onAnswer = () => {
    if (q.type === "numeric") {
      const inp = document.getElementById("numeric-input");
      const val = parseFloat(inp.value);
      if (!Number.isFinite(val)) {
        inp.focus();
        return;
      }
      ans.userValue = val;
      const tol = Math.max(q.tolerance || 0, Math.abs(q.correctValue) * (q.tolerancePct || 0.005));
      ans.correct = Math.abs(val - q.correctValue) <= (tol || 1e-9);
    } else {
      if (ans.userIdx === undefined) return;
      ans.correct = ans.userIdx === q.correctIdx;
    }
    ans.locked = true;
    trackAnswer(q.id, ans.correct);
    renderQuestion();
  };
  const onNext = () => {
    quizState.index += 1;
    renderQuestion();
  };
  const onPrev = () => {
    quizState.index -= 1;
    renderQuestion();
  };
  const onFinish = () => renderResults();

  if (document.getElementById("answer")) document.getElementById("answer").addEventListener("click", onAnswer);
  if (document.getElementById("next")) document.getElementById("next").addEventListener("click", onNext);
  if (document.getElementById("prev")) document.getElementById("prev").addEventListener("click", onPrev);
  if (document.getElementById("finish")) document.getElementById("finish").addEventListener("click", onFinish);
  if (document.getElementById("abort")) document.getElementById("abort").addEventListener("click", () => {
    if (confirm("¿Salir del quiz? El progreso se perderá.")) renderSetup();
  });

  // Numeric: enter -> responder
  if (q.type === "numeric" && !ans.locked) {
    const inp = document.getElementById("numeric-input");
    inp.focus();
    inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); onAnswer(); }
    });
  }
  // Keyboard navigation
  document.addEventListener("keydown", keyHandler, { once: true });

  // Timer
  if (cfg.timer && !ans.locked) {
    if (quizState._timer) clearInterval(quizState._timer);
    quizState.timerRemaining = cfg.timer;
    quizState._timer = setInterval(() => {
      quizState.timerRemaining -= 1;
      const t = document.getElementById("timer");
      if (t) {
        t.textContent = formatTimer(quizState.timerRemaining);
        t.className = "timer" + (quizState.timerRemaining <= 10 ? " timer-bad" : quizState.timerRemaining <= 30 ? " timer-warn" : "");
      }
      if (quizState.timerRemaining <= 0) {
        clearInterval(quizState._timer);
        if (q.type === "numeric") {
          const inp = document.getElementById("numeric-input");
          if (inp && !inp.value) inp.value = "0";
        }
        onAnswer();
      }
    }, 1000);
  } else if (quizState._timer) {
    clearInterval(quizState._timer);
  }

  if (window.renderMathInElement) {
    window.renderMathInElement(app, { delimiters: katexDelims, throwOnError: false });
  }
}

function keyHandler(e) {
  if (!quizState) return;
  if (e.key === "Enter") {
    const a = document.getElementById("answer") || document.getElementById("next") || document.getElementById("finish");
    if (a) a.click();
  }
}

function formatTimer(s) {
  if (s < 0) s = 0;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

function renderResults() {
  if (quizState._timer) clearInterval(quizState._timer);
  const { items, answers, startedAt, cfg, seed } = quizState;
  const total = items.length;
  const correct = answers.filter((a) => a.correct).length;
  const incorrect = total - correct;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const elapsed = Math.floor((Date.now() - startedAt) / 1000);

  const review = items.map((q, i) => {
    const a = answers[i];
    let userTxt = "";
    let correctTxt = "";
    if (q.type === "numeric") {
      userTxt = a.userValue !== undefined ? fmt(a.userValue, 4) + (q.unit || "") : "(sin respuesta)";
      correctTxt = fmt(q.correctValue, 4) + (q.unit || "");
    } else {
      userTxt = a.userIdx !== undefined ? `${String.fromCharCode(65 + a.userIdx)}. ${q.options[a.userIdx]}` : "(sin respuesta)";
      correctTxt = `${String.fromCharCode(65 + q.correctIdx)}. ${q.options[q.correctIdx]}`;
    }
    const givenColor = a.correct ? "var(--green)" : "var(--coral)";
    return `<div class="review-item ${a.correct ? "right" : "wrong"}">
      <div class="review-meta">
        <strong>${i + 1}. </strong>
        <span class="tag tag-taller">T${q.taller}</span>
        <span class="tag tag-difficulty ${esc(q.difficulty)}">${esc(q.difficulty)}</span>
        <span style="margin-left:auto;">${a.correct ? "✓ Correcta" : "✗ Incorrecta"}</span>
      </div>
      <div class="review-q">${q.prompt}</div>
      <p style="color:${givenColor};margin:4px 0 0;font-size:0.9rem;"><strong>Tu respuesta:</strong> ${esc(userTxt)}</p>
      <p class="review-correct" style="color:var(--green);"><strong>Respuesta correcta:</strong> ${esc(correctTxt)}</p>
      <p style="margin:6px 0 0;color:var(--muted);font-size:0.88rem">${q.explanation || ""}</p>
      ${q.reference ? `<p style="margin:4px 0 0;color:var(--muted);font-size:0.8rem;font-style:italic;">${esc(q.reference)}</p>` : ""}
    </div>`;
  }).join("");

  const wrongIds = items.filter((q, i) => !answers[i].correct).map((q) => q.id);

  app.innerHTML = `<div class="app">
    <header class="brand">
      <p class="brand-kicker">Resultados</p>
      <h1 class="brand-title">${pct >= 80 ? "¡Excelente!" : pct >= 60 ? "Buen trabajo" : "Sigue practicando"}</h1>
      <p class="brand-note">Quiz completado en ${formatTimer(elapsed)}. Semilla del quiz: ${seed}.</p>
    </header>

    <section class="card">
      <h2>Puntuación</h2>
      <div class="summary-stats">
        <div class="stat"><p class="stat-num">${correct} / ${total}</p><p class="stat-lbl">Aciertos</p></div>
        <div class="stat"><p class="stat-num">${pct}%</p><p class="stat-lbl">Calificación</p></div>
        <div class="stat"><p class="stat-num">${incorrect}</p><p class="stat-lbl">Errores</p></div>
        <div class="stat"><p class="stat-num">${formatTimer(elapsed)}</p><p class="stat-lbl">Tiempo</p></div>
      </div>
      <div class="actions">
        <button class="btn btn-primary" id="back">Nuevo quiz</button>
        ${wrongIds.length ? `<button class="btn btn-secondary" id="redo-wrong">Repetir solo las falladas (${wrongIds.length})</button>` : ""}
        <button class="btn btn-secondary" id="redo-same">Repetir mismo quiz (otra aleatorización)</button>
      </div>
    </section>

    <section class="card">
      <h2>Repaso pregunta por pregunta</h2>
      <div class="review">${review}</div>
    </section>
  </div>`;

  document.getElementById("back").addEventListener("click", renderSetup);
  if (document.getElementById("redo-wrong")) {
    document.getElementById("redo-wrong").addEventListener("click", () => {
      const subset = QUESTIONS.filter((q) => wrongIds.includes(q.id));
      const cfgNow = { ...cfg, count: subset.length, _override: subset };
      // Nuevo seed para nuevas variantes paramétricas
      cfgNow.seed = (Date.now() & 0xFFFFFFFF);
      const rng2 = makeRng(cfgNow.seed);
      const items2 = rng2.shuffle(subset).map((def) => {
        const inst = makeQuestionInstance(def, rng2);
        if (inst.type === "mcq" || inst.type === "tf-justify") {
          const idxs = rng2.shuffle(inst.options.map((_, i) => i));
          const newOpts = idxs.map((i) => inst.options[i]);
          inst.correctIdx = idxs.indexOf(inst.correct);
          inst.options = newOpts;
        } else if (inst.type === "tf") {
          inst.options = ["Verdadero", "Falso"];
          inst.correctIdx = inst.correct === true || inst.correct === "Verdadero" || inst.correct === 0 ? 0 : 1;
        }
        return inst;
      });
      quizState = {
        cfg: cfgNow, seed: cfgNow.seed, items: items2,
        index: 0, answers: items2.map(() => ({ locked: false })),
        startedAt: Date.now(), timerRemaining: cfg.timer,
      };
      renderQuestion();
    });
  }
  document.getElementById("redo-same").addEventListener("click", () => startQuiz({ ...cfg, seed: 0 }));

  if (window.renderMathInElement) {
    window.renderMathInElement(app, { delimiters: katexDelims, throwOnError: false });
  }
}

const katexDelims = [
  { left: "$$", right: "$$", display: true },
  { left: "\\(", right: "\\)", display: false },
  { left: "\\[", right: "\\]", display: true },
  { left: "$", right: "$", display: false },
];

// ---- Bootstrap ----
window.addEventListener("DOMContentLoaded", () => {
  if (typeof QUESTIONS === "undefined" || !Array.isArray(QUESTIONS) || QUESTIONS.length === 0) {
    app.innerHTML = `<div class="app"><div class="card"><h2>Error</h2><p>No se encontró el banco de preguntas.</p></div></div>`;
    return;
  }
  renderSetup();
});
