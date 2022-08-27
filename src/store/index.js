import Vue from 'vue'
import Vuex from 'vuex'
import VuexAlong from 'vuex-along'
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
  // plugins: [VuexAlong({
  //   name: 'along',
  //   local: false,
  //   session: {list: [], isFilter: true}
  // })]
})

export default store