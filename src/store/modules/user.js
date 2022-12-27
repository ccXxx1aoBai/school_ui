const user = {
  state: {
    uid: '',
    username: '',
    avatar: '',
    notice_total: 0
  },

  mutations: {
    SET_UID: (state, data) => {
      state.uid = data
    },
    SET_USERNAME: (state, data) => {
      state.username = data
    },
    SET_AVATAR: (state, data) => {
      state.avatar = data
    },
    SET_NOTICE_TOTAL: (state, data) => {
      state.notice_total += data
    },
  },

  actions: {
    GetUserInfo: ({commit}, {id: uid, username, avatar}) => {
      commit('SET_UID', uid)
      commit('SET_USERNAME', username)
      commit('SET_AVATAR', avatar)
      localStorage.setItem('username', username)
      localStorage.setItem('avatar', avatar)
    },
    NOTICE_TOTAL: ({commit}, count) => {
      commit("SET_NOTICE_TOTAL", count)
    }
  }
}

export default user