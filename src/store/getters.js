const getters = {
  uid: state => state.user.uid,
  username: state => state.user.username,
  avatar: state => state.user.avatar,
  roleId: state => state.user.roleId,
  create_time: state => state.user.create_time,
  name: state => state.user.name,
  sex: state => state.user.sex,
  deptId: state => state.user.deptId,
  dept: state => state.user.dept,
  majorId: state => state.user.majorId,
  major: state => state.user.major,
  clazz: state => state.user.clazz,
  teacherId: state => state.user.teacherId,
  teacher: state => state.user.teacher,
  birth: state => state.user.birth,
  nation: state => state.user.nation,
  position: state => state.user.position,
  area: state => state.user.area,
  address: state => state.user.address,
  notice_total: state => state.user.notice_total,
  tabs: state => state.tools.tabs,
  breadcrumb: state => state.tools.breadcrumb,
  routes: state => state.tools.routes,
  menus: state => state.tools.menus
}

export default getters