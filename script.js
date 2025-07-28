const data = [
  {
    semestre: "I SEMESTRE",
    ramos: [
      { nombre: "Química", id: "quimica" },
      { nombre: "Biología Celular", id: "biocel" },
      { nombre: "Matemática General", id: "matematica" },
      { nombre: "Taller de Comunicación Oral y Escrita", id: "comunicacion" },
      { nombre: "Introducción a la Medicina Veterinaria", id: "introvet" }
    ]
  },
  {
    semestre: "II SEMESTRE",
    ramos: [
      { nombre: "Anatomía del Canino", id: "anatomia_canino" },
      { nombre: "Histoembriología", id: "histo" },
      { nombre: "Inglés I", id: "ingles1" },
      { nombre: "Bioquímica", id: "bioquimica", prereq: ["quimica"] },
      { nombre: "Bioestadística", id: "bioestadistica", prereq: ["matematica"] }
    ]
  },
  {
    semestre: "III SEMESTRE",
    ramos: [
      { nombre: "Anatomía Comparada", id: "anatomia_comp", prereq: ["anatomia_canino"] },
      { nombre: "Zoología", id: "zoologia", prereq: ["histo", "biocel"] },
      { nombre: "Inglés II", id: "ingles2", prereq: ["ingles1"] },
      { nombre: "Medio Ambiente y Gestión Ambiental", id: "medioambiente", prereq: ["biocel"] },
      { nombre: "Práctica Básica", id: "practica_basica", prereq: ["introvet", "anatomia_canino"] }
    ]
  },
  {
    semestre: "IV SEMESTRE",
    ramos: [
      { nombre: "Administración y Emprendimiento Veterinario", id: "admin" },
      { nombre: "Fisiología Animal", id: "fisiologia", prereq: ["bioquimica", "anatomia_canino"] },
      { nombre: "Enfermedades Parasitarias", id: "parasitos", prereq: ["zoologia"] },
      { nombre: "Microbiología General y Veterinaria", id: "microbio", prereq: ["biocel"] },
      { nombre: "Genética", id: "genetica", prereq: ["bioestadistica"] }
    ]
  },
  {
    semestre: "V SEMESTRE",
    ramos: [
      { nombre: "Reproducción e Inseminación Artificial", id: "repro", prereq: ["fisiologia"] },
      { nombre: "Fisiopatología", id: "fisio_pat", prereq: ["histo", "fisiologia"] },
      { nombre: "Inmunología", id: "inmuno", prereq: ["microbio"] },
      { nombre: "Nutrición y Alimentación Animal", id: "nutricion", prereq: ["bioquimica"] },
      { nombre: "Tecnología de los Alimentos", id: "tec_alimentos", prereq: ["microbio"] },
      { nombre: "Etología y Bienestar Animal", id: "etologia", prereq: ["zoologia"] }
    ]
  },
  {
    semestre: "VI SEMESTRE",
    ramos: [
      { nombre: "Ginecología y Obstetricia", id: "gineco", prereq: ["repro"] },
      { nombre: "Control de Calidad de los Alimentos", id: "control_calidad", prereq: ["parasitos", "tec_alimentos"] },
      { nombre: "Producción Avícola", id: "avicola", prereq: ["nutricion"] },
      { nombre: "Farmacología y Toxicología", id: "farmaco", prereq: ["fisiologia"] },
      { nombre: "Enfermedades Infecciosas", id: "infecciosas", prereq: ["inmuno"] },
      { nombre: "Patología de Sistemas", id: "patsis", prereq: ["fisio_pat"] }
    ]
  },
  {
    semestre: "VII SEMESTRE",
    ramos: [
      { nombre: "Laboratorio Clínico", id: "labclinico", prereq: ["patsis"] },
      { nombre: "Producción Ovinos y Caprinos", id: "ovinos", prereq: ["genetica"] },
      { nombre: "Producción Porcina", id: "porcina", prereq: ["repro", "medioambiente"] },
      { nombre: "Epidemiología Veterinaria", id: "epidemio", prereq: ["infecciosas"] },
      { nombre: "Semiología", id: "semiologia", prereq: ["farmaco", "fisio_pat", "anatomia_comp"] },
      { nombre: "Práctica Intermedia", id: "practica_inter", prereq: ["farmaco", "infecciosas"] }
    ]
  },
  {
    semestre: "VIII SEMESTRE",
    ramos: [
      { nombre: "Medicina Animales Mayores", id: "med_mayores", prereq: ["labclinico", "semiologia"] },
      { nombre: "Medicina de Caninos", id: "med_caninos", prereq: ["labclinico", "semiologia"] },
      { nombre: "Medicina de Felinos", id: "med_felinos", prereq: ["labclinico", "semiologia"] },
      { nombre: "Medicina de Animales Exóticos", id: "med_exoticos", prereq: ["labclinico", "semiologia"] },
      { nombre: "Cirugía General", id: "cirugia", prereq: ["semiologia"] }
    ]
  },
  {
    semestre: "IX SEMESTRE",
    ramos: [
      { nombre: "Formulación y Evaluación de Proyectos Agropecuarios", id: "proyectos", prereq: ["admin"] },
      { nombre: "Patología Quirúrgica", id: "patquir", prereq: ["cirugia"] },
      { nombre: "Diagnóstico por Imágenes", id: "imagenes", prereq: ["patsis"] },
      { nombre: "Producción Acuícola", id: "acuicola", prereq: ["nutricion"] },
      { nombre: "Producción Bovinos: Carne y Leche", id: "bovinos", prereq: ["gineco"] },
      { nombre: "Metodología de la Investigación", id: "metodo", prereq: ["epidemio"] },
      { nombre: "Práctica Final", id: "practica_final", prereq: ["practica_inter"] }
    ]
  },
  {
    semestre: "X SEMESTRE",
    ramos: [
      { nombre: "Farmacología Aplicada", id: "farmaco_aplicada", prereq: ["med_caninos", "med_mayores"] },
      { nombre: "Salud Pública", id: "salud_pub", prereq: ["control_calidad", "epidemio"] },
      { nombre: "Trabajo de Titulación", id: "titulo", prereq: ["metodo"] },
      { nombre: "Clínica de Animales Mayores", id: "clinica_mayores", prereq: ["med_mayores"] },
      { nombre: "Clínica de Animales Menores", id: "clinica_menores", prereq: ["med_caninos", "imagenes"] }
    ]
  }
];

const grid = document.querySelector('.grid');
const state = JSON.parse(localStorage.getItem('aprobadas')) || {};

function createGrid() {
  data.forEach(sem => {
    const semDiv = document.createElement('div');
    semDiv.className = 'semester';
    const title = document.createElement('h2');
    title.textContent = sem.semestre;
    semDiv.appendChild(title);

    sem.ramos.forEach(ramo => {
      const div = document.createElement('div');
      div.textContent = ramo.nombre;
      div.className = 'subject';
      div.dataset.id = ramo.id;
      if (state[ramo.id]) div.classList.add('completed');
      else if (ramo.prereq) div.classList.add('locked');
      semDiv.appendChild(div);
    });

    grid.appendChild(semDiv);
  });
}

function updateSubjects() {
  document.querySelectorAll('.subject').forEach(el => {
    const id = el.dataset.id;
    const ramo = findSubjectById(id);
    if (el.classList.contains('completed')) return;
    if (!ramo.prereq || ramo.prereq.every(r => state[r])) {
      el.classList.remove('locked');
    } else {
      el.classList.add('locked');
    }
  });
}

function findSubjectById(id) {
  for (let sem of data) {
    for (let ramo of sem.ramos) {
      if (ramo.id === id) return ramo;
    }
  }
  return null;
}

grid.addEventListener('click', e => {
  if (e.target.classList.contains('subject') && !e.target.classList.contains('locked')) {
    const id = e.target.dataset.id;
    if (state[id]) {
      delete state[id];
      e.target.classList.remove('completed');
    } else {
      state[id] = true;
      e.target.classList.add('completed');
    }
    localStorage.setItem('aprobadas', JSON.stringify(state));
    updateSubjects();
  }
});

createGrid();
updateSubjects();
