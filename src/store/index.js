import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Datos:[],
  },
  mutations: {
    addDatos (state, datos) {
        state.Datos.push(datos)
    }
  },

  getters: {
    Datos: state => state.Datos,
  }
})
