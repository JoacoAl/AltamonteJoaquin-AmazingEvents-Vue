const url = "https://mindhub-xj03.onrender.com/api/amazing";

const { createApp } = Vue;

const app = createApp({
  //propiedades reactivas
  data() {
    return {
      eventos: [],
      eventosPasados: [],
      eventosFuturos: [],
      arrayAsistenciaOrdenado: [],
      arrayAsistenciaOrdenado2: [],
      tablaPast: [],
      tablaUpco: [],
      porcentajeMayor: [],
      porcentajeMenor: [],
      capacidadMayor: [],
    };
  },

  created() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const arrayEventos = data;
        this.eventos = arrayEventos.events;
        this.eventosPasados = this.eventos.filter(
          (e) => e.date < arrayEventos.currentDate
        );
        this.eventosFuturos = this.eventos.filter(
          (e) => e.date > arrayEventos.currentDate
        );
        this.arrayAsistenciaOrdenado = [...this.eventosPasados].sort(
          (a, b) =>
            this.porcentaje(a.capacity, a.assistance) -
            this.porcentaje(b.capacity, b.assistance)
        );
        this.arrayAsistenciaOrdenado2 = [...this.eventosPasados].sort(
          (a, b) =>
            this.porcentaje(a.assistance, a.capacity) -
            this.porcentaje(b.assistance, b.capacity)
        );
        /* tabla 1 */
        this.porcentajeMayor = this.porcenMAYOR();
        this.porcentajeMenor = this.porcenMENOR();
        this.capacidadMayor = this.capacidadMAYOR();
        /* tablas 2 y 3 */
        this.tablaPast = this.estadisticasTablaPast();
        this.tablaUpco = this.estadisticasTablaUpcoming();
      })
      .catch((err) => console.log(err));
  },

  methods: {
    porcentaje(asistencia, capacidad) {
      return asistencia / (capacidad / 100);
    },
    porcenMAYOR() {
      let eventoMayorPorcentaje = this.arrayAsistenciaOrdenado[0];
      let porcentajeMayor = this.porcentaje(
        eventoMayorPorcentaje.assistance,
        eventoMayorPorcentaje.capacity
      ).toFixed(2);
      return `${eventoMayorPorcentaje.name} ${porcentajeMayor}%`;
    },
    porcenMENOR() {
      let eventoMenorPorcentaje = this.arrayAsistenciaOrdenado2[0];
      let porcentajeMenor = this.porcentaje(
        eventoMenorPorcentaje.assistance,
        eventoMenorPorcentaje.capacity
      ).toFixed(2);
      return `${eventoMenorPorcentaje.name} ${porcentajeMenor}%`;
    },
    capacidadMAYOR() {
      let arrayCapacidadOrdenado = [...this.eventos].sort(
        (a, b) => b.capacity - a.capacity
      );
      let eventoMayorCapacidad = arrayCapacidadOrdenado[0];
      return `${eventoMayorCapacidad.name} ${eventoMayorCapacidad.capacity}`;
    },
    estadisticasTablaPast() {
      let categorias = this.eventosPasados.map((e) => e.category);
      let categoriasPast = [...new Set(categorias)];
      // objeto donde va a estar guardado la categoria, el ingreso, y el %asistencia
      this.tablaPast = estadisticasObjeto = {};
      let template = "";
      //bucle de bucle para poder sacar
      for (let categoria of categoriasPast) {
        let ingresos = 0;
        let asistencia = 0;
        let capacidad = 0;
        for (let evento of this.eventosPasados) {
          if (evento.category == categoria) {
            ingresos += evento.assistance * evento.price;
            asistencia += evento.assistance;
            capacidad += evento.capacity;
          }
        }
        let porcentajeTotalAsistencia = asistencia / (capacidad / 100);

        estadisticasObjeto[categoria] = {
          categoria: categoria,
          ingresos: ingresos.toLocaleString(),
          porcentajeTotalAsistencia: porcentajeTotalAsistencia.toFixed(2),
        };
      }
      return estadisticasObjeto;
    },
    estadisticasTablaUpcoming() {
      let categorias = this.eventosFuturos.map((e) => e.category);
      let categoriasUpco = [...new Set(categorias)];
      let estadisticasObjeto = {};
      let template = "";

      for (let categoria of categoriasUpco) {
        let ingresos = 0;
        let asistencia = 0;
        let capacidad = 0;
        for (let evento of this.eventosFuturos) {
          if (evento.category == categoria) {
            ingresos += evento.estimate * evento.price;
            asistencia += evento.estimate;
            capacidad += evento.capacity;
          }
        }
        let porcentajeTotalAsistencia = asistencia / (capacidad / 100);

        // objeto nuevo con la info que quiero imprimir
        estadisticasObjeto[categoria] = {
          categoria: categoria,
          ingresos: ingresos.toLocaleString(),
          porcentajeTotalAsistencia: porcentajeTotalAsistencia.toFixed(2),
        };
      }
      console.log(estadisticasObjeto);
      return estadisticasObjeto;
    },
  },
});

app.mount("#app");
