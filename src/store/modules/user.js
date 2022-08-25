const user = {
  state: {
    uid: '',
    username: '',
    avatar: '',
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
    }
  },

  actions: {
    GetUserInfo: ({commit}, {id: uid, username, avatar}) => {
      console.log(uid);
      console.log(username);
      commit('SET_UID', uid)
      commit('SET_USERNAME', username)
      commit('SET_AVATAR', avatar)
    }
  }
}

export default user