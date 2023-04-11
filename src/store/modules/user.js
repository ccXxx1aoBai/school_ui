const user = {
  state: {
    uid: '',
    avatar: '',
    username: '',
    name: '',
    create_time: '',
    roleId: '',
    sex: '',
    deptId: '',
    dept: '',
    majorId: '',
    major: '',
    clazz: '',
    teacherId: '',
    teacher: '',
    birth: '',
    nation: '',
    position: '',
    area: '',
    address: '',
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
    SET_NAME: (state, data) => {
      state.name = data
    },
    SET_CREATETIME: (state, data) => {
      state.create_time = data
    },
    SET_ROLEID: (state, data) => {
      state.roleId = data
    },
    SET_SEX: (state, data) => {
      state.sex = data
    },
    SET_DEPTID: (state, data) => {
      state.deptId = data
    },
    SET_DEPT: (state, data) => {
      state.dept = data
    },
    SET_MAJORID: (state, data) => {
      state.majorId = data
    },
    SET_MAJOR: (state, data) => {
      state.major = data
    },
    SET_CLAZZ: (state, data) => {
      state.clazz = data
    },
    SET_TEACHERID: (state, data) => {
      state.teacherId = data
    },
    SET_TEACHER: (state, data) => {
      state.teacher = data
    },
    SET_BIRTH: (state, data) => {
      state.birth = data
    },
    SET_NATION: (state, data) => {
      state.nation = data
    },
    SET_POSITION: (state, data) => {
      state.position = data
    },
    SET_AREA: (state, data) => {
      state.area = data
    },
    SET_ADDRESS: (state, data) => {
      state.address = data
    },
    SET_NOTICE_TOTAL: (state, data) => {
      state.notice_total += data
    },
  },

  actions: {
    GetUserInfo: ({ commit }, data) => {
      console.log(data);
      const { 
        id: uid,
        username,
        role_id: roleId,
        create_time,
        avatar,
        name,
        sex,
        dept_id: deptId,
        dept,
        major_id: majorId,
        major,
        clazz,
        teacher_id: teacherId,
        teacher,
        birth,
        nation,
        position,
        area,
        address
      } = data
      commit('SET_UID', uid)
      commit('SET_USERNAME', username)
      commit('SET_AVATAR', avatar)
      commit('SET_NAME', name)
      commit('SET_ROLEID', roleId)
      commit('SET_CREATETIME', create_time)
      commit('SET_SEX', sex)
      commit('SET_DEPTID', deptId)
      commit('SET_DEPT', dept)
      commit('SET_MAJORID', majorId)
      commit('SET_MAJOR', major)
      commit('SET_CLAZZ', clazz)
      commit('SET_TEACHERID', teacherId)
      commit('SET_TEACHER', teacher)
      commit('SET_BIRTH', birth)
      commit('SET_NATION', nation)
      commit('SET_POSITION', position)
      commit('SET_AREA', area)
      commit('SET_ADDRESS', address)
    },
    NOTICE_TOTAL: ({ commit }, count) => {
      commit("SET_NOTICE_TOTAL", count)
    }
  }
}

export default user