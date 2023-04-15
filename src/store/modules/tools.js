import {getRoutes} from '@/api/menu'
import store from '@/store'

const tools = {
  state: {
    tabs: [],
    breadcrumb: [],
    routes: [],
    menus: [],
    token: ''
  },

  mutations: {
    SET_BREADCRUMB: (state, data) => {

    },
    SET_TABS: (state, data) => {

    },
    SET_ROUTES: (state, data) => {
      state.routes = data
    },
    SET_MENU: (state, data) => {
      state.menus = data
    },
    SET_TOKEN: (state, data) => {
      state.token = data
    }
  },

  actions: {
    ChangeBreadcrumb: ({commit}, data) => {

    },
    ChangeTabs: ({commit}, data) => {

    },
    storeToken: ({ commit }, data) => {
      commit('SET_TOKEN', data)
    },
    GetRoutes: ({commit, dispatch}, data) => {
      return new Promise(resolve => {
        getRoutes(store.getters.uid).then(res => {
          const menus = formatRoutes(res.data.data)
          commit('SET_MENU', menus)
          const routes = []
          menus.map(route => {
            route.component && routes.push(route)
            route.children && routes.push(...route.children)
          })
          commit('SET_ROUTES', routes)
          resolve(routes)
        })
      })
    },
  }
}

const formatRoutes = (routes) => {
  routes.map(item => {
    item.component = loadComponent(item.component)
    if(item.children != null && item.children && item.children.length) {
      formatRoutes(item.children)
    }
  })
  return routes
}

const loadComponent = (component) => {
  return component ? require(`@/${component}`).default : ''
}

export default tools