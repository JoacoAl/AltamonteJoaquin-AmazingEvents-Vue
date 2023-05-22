const url = "https://mindhub-xj03.onrender.com/api/amazing";

const { createApp } = Vue;

const app = createApp({
  //propiedades reactivas
  data() {
    return {
      eventos: [],
      textoIngresado: "",
      filtroPorTexto: [],
      categoriasSinDuplicar: [],
      checkboxChecked: [],
      eventosFiltrados: [],
      eventosPast: [],
    };
  },

  created() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const arrayEventos = data;
        this.eventos = arrayEventos.events;
        this.eventosPast = this.eventos.filter(
          (evento) => evento.date < arrayEventos.currentDate
        );
        console.log(this.eventosPast);
        let categorias = this.eventos.map((e) => e.category);
        this.categoriasSinDuplicar = [...new Set(categorias)];
      })
      .catch((err) => console.log(err));
  },

  methods: {},

  computed: {
    filtroCombinados() {
      let aux = (this.eventosFiltrados = this.eventosPast.filter((evento) =>
        evento.name.toLowerCase().includes(this.textoIngresado.toLowerCase())
      ));

      this.eventosFiltrados = aux.filter(
        (e) =>
          this.checkboxChecked.includes(e.category) ||
          this.checkboxChecked.length == 0
      );
    },
  },
});

app.mount("#app");

/*
let sectionCards = document.getElementById("section-cards-dom");

let inputSearchBar = document.getElementById("buscarPorTexto");
let divContenedorChecks = document.getElementById("contenedorCheckbox");
let checkboxInput = document.querySelectorAll("input[type='checkbox']");

let arrayEventos;
let eventos;
let arrayFiltroEventos;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((data) => data.json())
  .then((res) => {
    arrayEventos = res;
    eventos = arrayEventos.events;
    let categorias = eventos.map((e) => e.category);
    let categoriasSinDuplicar = [...new Set(categorias)];
    arrayFiltroEventos = filtroPorFecha(eventos, arrayEventos.currentDate);
    imprimirCheckbox(categoriasSinDuplicar, divContenedorChecks);
    bucleCards(arrayFiltroEventos, sectionCards);
  })
  .catch((err) => console.log(err));

function maquetaDeCards(objeto) {
  return `<div class="card" style="width: 18rem">
<img
  src="${objeto.image}"
  class="card-img-top img-cards"
  alt="cine"
/>
<div class="card-body">
  <h5 class="card-title">${objeto.name}</h5>
  <p class="card-text">
    ${objeto.description}
  </p>
</div>
<div class="divPrice card-body d-flex justify-content-between text-center align-items-center">
  <p class="my-2">Price: $${objeto.price}</p>
  <a href="../pages/details.html?id=${objeto._id}" class="card-link">
    <button
      type="button"
      class="btn seeMore"
      style="background-color: #ddc2ff"
    >
      Show More
    </button>
  </a>
</div>
</div>`;
}

function filtroPorFecha(arrayEventos, fecha) {
  const eventosFiltro = [];
  for (let objetoEvento of arrayEventos) {
    if (objetoEvento.date < fecha) {
      eventosFiltro.push(objetoEvento);
    }
  }
  return eventosFiltro;
}
//Guardar el array que esta dentro de la funcio, en una variable fuera de la funcion

function bucleCards(infoEvento, lugarDondeImprimoCards) {
  let template = "";
  for (let cardinfo of infoEvento) {
    template += maquetaDeCards(cardinfo);
  }
  lugarDondeImprimoCards.innerHTML += template;
}

inputSearchBar.addEventListener("input", (e) => {
  const checkboxActivados = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  ).map((check) => check.value);
  let cardsFiltradas = filtrarCards(arrayFiltroEventos, checkboxActivados);
  sectionCards.innerHTML = "";
  let aux = filtrarTitulo(cardsFiltradas, inputSearchBar.value);
  /*   bucleCards(aux, sectionCards); 
  imprimirCardsFiltradas(aux, sectionCards);
});

divContenedorChecks.addEventListener("change", () => {
  const checkboxActivados = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  ).map((check) => check.value);
  let cardsFiltradas = filtrarCards(arrayFiltroEventos, checkboxActivados);
  sectionCards.innerHTML = "";
  let aux = filtrarTitulo(cardsFiltradas, inputSearchBar.value);
  /* bucleCards(aux, sectionCards); 
  imprimirCardsFiltradas(aux, sectionCards);
});

function filtrarTitulo(arrayData, busquedaDelUsuario) {
  return arrayData.filter((e) =>
    e.name.toLowerCase().includes(busquedaDelUsuario.toLowerCase())
  );
}
function imprimirCardsFiltradas(arrayFiltradoPorTexto, lugarCards) {
  if (arrayFiltradoPorTexto.length === 0) {
    lugarCards.innerHTML = `<h3 class="h3-noresults">No results found for your search</h3>`;
  } else {
    const mostrarEnPantalla = arrayFiltradoPorTexto
      .map((e) => maquetaDeCards(e))
      .join("");
    lugarCards.innerHTML = mostrarEnPantalla;
  }
}

function maquetaDeCheckbox(categoriasSinDuplicar) {
  return `<div class="form-check d-flex align-items-start mx-1">
  <input
    class="form-check-input"
    type="checkbox"
    value="${categoriasSinDuplicar}"
    id="${categoriasSinDuplicar}-id"
  />
  <label class="form-check-label label-checks text-light" for="${categoriasSinDuplicar}-id">
    ${categoriasSinDuplicar}
  </label>
</div>
`;
}

function imprimirCheckbox(arrayCategorias, dondeImprimirChecks) {
  let template = "";
  for (const objetoCategorias of arrayCategorias) {
    template += maquetaDeCheckbox(objetoCategorias);
  }
  dondeImprimirChecks.innerHTML += template;
}

function filtrarCards(arrayData, categorias) {
  if (categorias.length == 0) {
    return arrayData;
  } else {
    return arrayData.filter((e) => {
      return categorias.includes(e.category);
    });
  }
}
 */
