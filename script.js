const data = [
  {
    semestre: "1° Semestre",
    ramos: [
      { nombre: "Química", id: "quimica" },
      { nombre: "Biología Celular", id: "biocel" },
      { nombre: "Matemática General", id: "matematica" },
      { nombre: "Taller de Comunicación Oral y Escrita", id: "comunicacion" },
      { nombre: "Introducción a la Medicina Veterinaria", id: "introvet" },
    ]
  },
  {
    semestre: "2° Semestre",
    ramos: [
      { nombre: "Anatomía del Canino", id: "anatomia_canino" },
      { nombre: "Histoembriología", id: "histo" },
      { nombre: "Inglés I", id: "ingles1" },
      { nombre: "Bioquímica", id: "bioquimica", prereq: ["quimica"] },
      { nombre: "Bioestadística", id: "bioestadistica", prereq: ["matematica"] },
    ]
  },
  {
    semestre: "3° Semestre",
    ramos: [
      { nombre: "Anatomía Comparada", id: "anatomia_comp", prereq: ["anatomia_canino"] },
      { nombre: "Zoología", id: "zoologia", prereq: ["histo", "biocel"] },
      { nombre: "Inglés II", id: "ingles2", prereq: ["ingles1"] },
      { nombre: "Medio Ambiente y Gestión Ambiental", id: "medioambiente", prereq: ["biocel"] },
      { nombre: "Práctica Básica", id: "practica_basica", prereq: ["introvet", "anatomia_canino"] },
    ]
  },
  {
    semestre: "4° Semestre",
    ramos: [
      { nombre: "Administración y Emprendimiento Veterinario", id: "admin" },
      { nombre: "Fisiología Animal", id: "fisiologia", prereq: ["bioquimica", "anatomia_canino"] },
      { nombre: "Enfermedades Parasitarias", id: "parasitos", prereq: ["zoologia"] },
      { nombre: "Microbiología General y Veterinaria", id: "microbio", prereq: ["biocel"] },
      { nombre: "Genética", id: "genetica", prereq: ["bioestadistica"] },
    ]
  },
  {
    semestre: "5° Semestre",
    ramos: [
      { nombre: "Reproducción e Inseminación Artificial", id: "repro", prereq: ["fisiologia"] },
      { nombre: "Fisiopatología", id: "fisiopato", prereq: ["histo", "fisiología"] },
      { nombre: "Inmunología", id: "inmuno", prereq: ["microbio"] },
      { nombre: "Nutrición y Alimentación Animal", id: "nutri", prereq: ["bioquimica"] },
      { nombre: "Tecnología de los Alimentos", id: "tecno", prereq: ["microbio"] },
      { nombre: "Etología y Bienestar Animal", id: "eto", prereq: ["zoologia"] },
    ]
  },
  {
    semestre: "6° Semestre",
    ramos: [
      { nombre: "Ginecología y Obstetricia", id: "gine", prereq: ["repro"] },
      { nombre: "Control de Calidad de los Alimentos", id: "control", prereq: ["parasitos", "tecno"] },
      { nombre: "Producción Avícola", id: "prodavi", prereq: ["nutri"] },
      { nombre: "Farmacología y Toxicología", id: "farmato", prereq: ["fisiologia"] },
      { nombre: "Enfermedades Infecciosas", id: "infe", prereq: ["inmuno"] },
      { nombre: "Patología de Sistemas", id: "pato", prereq: ["fisiopato"] },
    ]
  },
  {
    semestre: "7° Semestre",
    ramos: [
      { nombre: "Laboratorio Clínico", id: "lab", prereq: ["pato"] },
      { nombre: "Producción Ovinos y Caprinos", id: "prodov", prereq: ["genetica"] },
      { nombre: "Producción Porcina", id: "prodpor", prereq: ["repro", "medioambiente"] },
      { nombre: "Epidemiología Veterinaria", id: "epi", prereq: ["infe"] },
      { nombre: "Semiología", id: "semio", prereq: ["farmato", "fisiopato", "anatomia_comp"] },
      { nombre: "Práctica Intermedia", id: "p_inter", prereq: ["farmato", "infe"] },
    ]
  },
  {
    semestre: "8° Semestre",
    ramos: [
      { nombre: "Medicina Animales Mayores", id: "med_mayor", prereq: ["lab", "semio"] },
      { nombre: "Medicina de Caninos", id: "med_can", prereq: ["lab", "semio"] },
      { nombre: "Medicina de Felinos", id: "med_fel", prereq: ["lab", "semio"] },
      { nombre: "Medicina de Animales Exóticos", id: "med_exo", prereq: ["lab", "semio"] },
      { nombre: "Cirugía General", id: "cirugia", prereq: ["semio"] },
    ]
  },
  {
    semestre: "9° Semestre",
    ramos: [
      { nombre: "Formulación y Evaluación de Proyectos Agropecuarios", id: "form", prereq: ["admin"] },
      { nombre: "Patología Quirúrgica", id: "patoqui", prereq: ["cirugia"] },
      { nombre: "Diagnóstico por Imágenes", id: "diagnos", prereq: ["pato"] },
      { nombre: "Producción Acuícola", id: "prodacui", prereq: ["nutri"] },
      { nombre: "Producción Bovinos: Carne y Leche", id: "prodbov", prereq: ["gine"] },
      { nombre: "Metodología de la Investigación", id: "metodolo", prereq: ["epi"] },
      { nombre: "Práctica Final", id: "p_final", prereq: ["p_inter"] },
    ]
  },
  {
    semestre: "10° Semestre",
    ramos: [
      { nombre: "Farmacología Aplicada", id: "farmaco", prereq: ["med_can", "med_mayor"] },
      { nombre: "Salud Pública", id: "salud", prereq: ["control", "epi"] },
      { nombre: "Trabajo de Titulación", id: "trabtit", prereq: ["metodolo"] },
      { nombre: "Clínica de Animales Mayores", id: "cl_mayor", prereq: ["med_mayor"] },
      { nombre: "Clínica de Animales Menores", id: "cl_menor", prereq: ["med_can", "diagnos"] },
];

const grid = document.querySelector('.grid');
const state = {}; // Guarda materias aprobadas

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
      if (ramo.prereq) {
        div.classList.add('locked');
      }
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
    state[id] = true;
    e.target.classList.add('completed');
    updateSubjects();
  }
});

createGrid();
updateSubjects();
