import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along'
import user from './modules/user'
import tools from './modules/tools'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    tools,
  },
  getters,
  plugins: [createVuexAlong()]
})

export default store