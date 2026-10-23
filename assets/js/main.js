const STORAGE_KEY = 'repaso-js-progress-v1';
const EXERCISE_IDS = [
  "ejercicio-contador-de-vocales",
  "ejercicio-generador-de-cajas",
  "ejercicio-filtro-de-precios",
  "ejercicio-modo-oscuro-modular",
  "ejercicio-palindromo-checker",
  "ejercicio-fizzbuzz-visual",
  "ejercicio-calculadora-basica-con-select",
  "ejercicio-inversor-de-nombres",
  "ejercicio-tabla-de-multiplicar-dinamica",
  "ejercicio-capitalizador-de-palabras",
  "ejercicio-11",
  "ejercicio-12",
  "ejercicio-13",
  "ejercicio-14",
  "ejercicio-15",
  "ejercicio-16",
  "ejercicio-17",
  "ejercicio-18",
  "ejercicio-19",
  "ejercicio-20",
  "juego-de-la-vida"
];
const DEFAULT_STATES = Object.fromEntries(EXERCISE_IDS.map((id) => [id, false]));

let storageAvailable = true;

function readStates() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return { ...DEFAULT_STATES };
    }

    const parsed = JSON.parse(saved);

    if (!parsed || typeof parsed !== 'object' || !parsed.states || typeof parsed.states !== 'object') {
      return { ...DEFAULT_STATES };
    }

    return EXERCISE_IDS.reduce((states, id) => {
      states[id] = typeof parsed.states[id] === 'boolean' ? parsed.states[id] : false;
      return states;
    }, {});
  } catch {
    storageAvailable = false;
    return { ...DEFAULT_STATES };
  }
}

let states = readStates();

function showStorageStatus() {
  document.querySelectorAll('[data-storage-status]').forEach((element) => {
    element.textContent = storageAvailable
      ? 'El progreso se guarda en este navegador.'
      : 'El almacenamiento local no está disponible; los cambios no se conservarán al salir de esta página.';
  });
}

function saveStates() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, states }));
    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }

  showStorageStatus();
}

function renderStates() {
  document.querySelectorAll('[data-exercise-card]').forEach((card) => {
    const resolved = states[card.dataset.exerciseId] === true;
    const status = card.querySelector('[data-exercise-status]');

    if (status) {
      status.textContent = resolved ? 'Resuelto' : 'Pendiente';
      status.dataset.state = resolved ? 'done' : 'pending';
    }
  });

  const exerciseId = document.querySelector('[data-exercise-id]')?.dataset.exerciseId;
  const toggle = document.querySelector('[data-progress-toggle]');
  const currentStatus = document.querySelector('[data-current-status]');

  if (exerciseId && toggle) {
    const resolved = states[exerciseId] === true;
    toggle.checked = resolved;

    if (currentStatus) {
      currentStatus.textContent = resolved ? 'Resuelto' : 'Pendiente';
      currentStatus.dataset.state = resolved ? 'done' : 'pending';
    }
  }

  showStorageStatus();
}

function setProgressMessage(message) {
  const element = document.querySelector('[data-progress-message]');

  if (element) {
    element.textContent = message;
  }
}

function exportProgress() {
  const payload = JSON.stringify({ version: 1, states }, null, 2);
  const file = new Blob([payload], { type: 'application/json' });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'progreso-repaso-js.json';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
  setProgressMessage('Progreso exportado.');
}

function validateImportedProgress(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data) || data.version !== 1) {
    return null;
  }

  if (!data.states || typeof data.states !== 'object' || Array.isArray(data.states)) {
    return null;
  }

  const importedIds = Object.keys(data.states);
  const hasAllIds = EXERCISE_IDS.every((id) => importedIds.includes(id));
  const hasOnlyKnownIds = importedIds.every((id) => EXERCISE_IDS.includes(id));
  const hasBooleanValues = EXERCISE_IDS.every((id) => typeof data.states[id] === 'boolean');

  if (!hasAllIds || !hasOnlyKnownIds || !hasBooleanValues) {
    return null;
  }

  return Object.fromEntries(EXERCISE_IDS.map((id) => [id, data.states[id]]));
}

async function importProgress(file) {
  try {
    const data = JSON.parse(await file.text());
    const importedStates = validateImportedProgress(data);

    if (!importedStates) {
      setProgressMessage('El JSON no tiene un formato válido para este proyecto. No se modificó el progreso.');
      return;
    }

    states = importedStates;
    saveStates();
    renderStates();
    setProgressMessage('Progreso importado.');
  } catch {
    setProgressMessage('No se pudo leer el archivo JSON. No se modificó el progreso.');
  }
}

document.querySelectorAll('[data-progress-toggle]').forEach((toggle) => {
  toggle.addEventListener('change', () => {
    const exerciseId = document.querySelector('[data-exercise-id]')?.dataset.exerciseId;

    if (!exerciseId || !Object.hasOwn(states, exerciseId)) {
      return;
    }

    states[exerciseId] = toggle.checked;
    saveStates();
    renderStates();
  });
});

document.querySelector('[data-export-progress]')?.addEventListener('click', exportProgress);

document.querySelector('[data-import-progress]')?.addEventListener('change', (event) => {
  const file = event.currentTarget.files?.[0];

  if (file) {
    void importProgress(file);
    event.currentTarget.value = '';
  }
});

renderStates();
