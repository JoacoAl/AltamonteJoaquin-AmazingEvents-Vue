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
    };
  },

  created() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const arrayEventos = data;
        this.eventos = arrayEventos.events;
        let categorias = this.eventos.map((e) => e.category);
        this.categoriasSinDuplicar = [...new Set(categorias)];
      })
      .catch((err) => console.log(err));
  },

  methods: {},

  computed: {
    filtroCombinados() {
      let aux = (this.eventosFiltrados = this.eventos.filter((evento) =>
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
