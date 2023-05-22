const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      eventoQueCoincidePorID: [],
      eventos: [],
    };
  },
  created() {
    const url = "https://mindhub-xj03.onrender.com/api/amazing";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.arrayEventos = data.events;
        this.eventos = this.arrayEventos;
        const parametros = new URLSearchParams(location.search); //te devuelve los parametros de la url
        console.log(parametros);
        let paramterosId = parametros.get("id");
        this.eventoQueCoincidePorID = this.eventos.find(
          (e) => e._id == paramterosId
        );
      })
      .catch((error) => console.log(error));
  },

  computed: {},
});

app.mount("#app");
