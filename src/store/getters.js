const getters = {
  uid: state => state.user.uid,
  username: state => state.user.username,
  avatar: state => state.user.avatar,
  notice_total: state => state.user.notice_total,
  tabs: state => state.tools.tabs,
  breadcrumb: state => state.tools.breadcrumb,
  routes: state => state.tools.routes,
  menus: state => state.tools.menus
}

export default getters