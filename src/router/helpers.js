import store from '../../../src/store'

export const generateLinks = pages => {
  return Object.keys(pages).map(key => {
    return {
      path: pages[key].path,
      component: pages[key].component,
      beforeEnter: pages[key].beforeEnter
    }
  })
}

export const generateRoutes = pages => {
  return [
    {
      path: '/',
      component: () => import('../layouts/layout.vue'),
      children: generateLinks(pages)
    }
  ]
}

export const generatePage = (link, access) => {
  return {
    path: `/${link}`,
    component: () => import(`pages/${firstUpperCase(link)}.vue`),
    beforeEnter: (to, from, next) => {
      if (userCanAccess(link, access)) {
        next()
      } else {
        next(from)
      }
    }
  }
}

export const firstUpperCase = string => string.charAt(0).toUpperCase() + string.slice(1)

function userCanAccess (link, access) {
  return access(store.getters.permissions)[link]
}
