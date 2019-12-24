import Cookie from 'js-cookie'
export default {
  state: {
    isCollapse: false,
    currentMenu: null,
    menu: [],
    tabsList: [{
      path: '/',
      name: 'home',
      label: '首页',
      icon: 'home'
    }]
  },
  mutations: {
    setMenu(state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    clearMenu(state) {
      state.menu = []
      // state.tabsList = [{
      //   path: '/',
      //   name: 'home',
      //   label: '首页',
      //   icon: 'home'
      // }];
      Cookie.remove('menu')
      Cookie.remove('tagList');
    },
    addMenu(state, router) {
      if (!Cookie.get('menu')) {
        return
      }
      let menu = JSON.parse(Cookie.get('menu'))

      state.menu = menu
      let currentMenu = [{
        path: '/',
        component: () => import(`@/views/Main`),
        children: []
      }]

      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`)
            return item
          })
          currentMenu[0].children.push(...item.children)
        } else {
          item.component = () => import(`@/views/${item.url}`)
          currentMenu[0].children.push(item)
        }
      })
      router.addRoutes(currentMenu)
    },
    selectMenu(state, val) {
      if (val.name !== 'home') {
        state.currentMenu = val
        let result = state.tabsList.findIndex(item => item.name === val.name)
        result === -1 ? state.tabsList.push(val) : ''
        Cookie.set('tagList', JSON.stringify(state.tabsList))
      } else {
        state.currentMenu = null
      }
    },
    getMenu(state) {
      if (Cookie.get('tagList')) {
        let tagList = JSON.parse(Cookie.get('tagList'))
        state.tabsList = tagList
      }
    },
    closeTab(state, val) {
      let result = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(result, 1)
      Cookie.set('tagList', JSON.stringify(state.tabsList))
    },
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}