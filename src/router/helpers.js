import types from '../types'

/**
 * To add a new page:
 *  1) add its type to types/links.js.
 *     It must match the component file name : ConfirmationEmailSent.js -> confirmationEmailSent)
 *  2) create link and access rules in router/links.js
 *  3) If the page must be reachable from the burger menu,
 *     write its name in router/links.js > orderedLinks
 **/

const verify = ({ link, accessRules, permissions }) => {
  const linkIsHome = link === '/'
  const linkIsAccessible = permissions.some(permission => accessRules[permission][link])
  return linkIsHome || linkIsAccessible
}

const firstUpperCase = string => string.charAt(0).toUpperCase() + string.slice(1)

export const generatePath = ({ link }) => {
  if (link === types.HOME) return '/'
  else return `/${link}`
}

const generateBeforeEnter = ({ link, accessRules, permissions }) => {
  return (to, from, next) => {
    if (verify({ link, accessRules, permissions })) next()
    else next(from)
  }
}

const generatePage = ({ link, accessRules, permissions }) => {
  return {
    path: generatePath({ link }),
    component: () => import(`pages/${firstUpperCase(link)}.vue`),
    beforeEnter: generateBeforeEnter({ link, accessRules, permissions })
  }
}

const generatePages = ({ links, accessRules, permissions }) => {
  return links.reduce((pages, link) => {
    pages[link] = generatePage({ link, accessRules, permissions })
    return pages
  }, {})
}

const generateLinks = ({ links, accessRules, permissions }) => {
  const pages = generatePages({ links, accessRules, permissions })
  return Object.keys(pages).map(key => {
    return {
      path: pages[key].path,
      component: pages[key].component,
      beforeEnter: pages[key].beforeEnter
    }
  })
}

export const filterAccessibleLinks = ({ links, accessRules, permissions }) => {
  return links.filter(link => verify({ link, accessRules, permissions }))
}

export const generateRoutes = ({ links, accessRules, permissions }) => {
  const routes = [
    {
      path: '/',
      component: () => import('layouts/layout.vue'),
      children: generateLinks({ links, accessRules, permissions })
    }
  ]

  // Always leave this as last one
  if (process.env.MODE !== 'ssr') {
    routes.push({
      path: '*',
      component: () => import('pages/Error404.vue')
    })
  }

  return routes
}
