import types from '../types'

/**
 * To add a new page:
 *  1) add its type to types/links.js.
 *     It must match the component file name : ConfirmationEmailSent.js -> confirmationEmailSent)
 *  2) create link and access rules in router/links.js
 *  3) If the page must be reachable from the burger menu,
 *     write its name in router/links.js > orderedLinks
 **/

export const generatePath = ({ link }) => {
  if (link === types.links.HOME) return '/'
  else return `/${link}`
}

const checkIfLinkIsAccessible = ({ link, accessRules, permissions }) => {
  return permissions.some(permission => {
    const validity = accessRules[permission][link]
    return validity
  })
}

const firstUpperCase = string => string.charAt(0).toUpperCase() + string.slice(1)

const generatePermissions = ({ link, accessRules }) => {
  return Object.keys(accessRules).reduce((permissions, permission) => {
    if (accessRules[permission][link]) permissions.push(permission)
    return permissions
  }, [])
}

const generatePage = ({ link, accessRules, permissions }) => {
  return {
    name: link,
    path: generatePath({ link }),
    component: () => import(`pages/${firstUpperCase(link)}.vue`),
    meta: { permissions: generatePermissions({ link, accessRules }) }
    // beforeEnter: generateBeforeEnter({ link, accessRules, permissions })
  }
}

const generatePages = ({ links, accessRules, permissions }) => {
  return links.map(link => generatePage({ link, accessRules, permissions }))
}

export const filterAccessibleLinks = ({ links, accessRules, permissions }) => {
  return links.filter(link => checkIfLinkIsAccessible({ link, accessRules, permissions }))
}

export const generateRoutes = ({ links, accessRules, permissions }) => {
  const pages = generatePages({ links, accessRules, permissions })
  const routes = [
    {
      path: '/',
      component: () => import('layouts/layout.vue'),
      children: pages
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

const checkIfOneMatch = (array1, array2) => {
  return array1.some(el1 => {
    return array2.some(el2 => {
      return el1 === el2
    })
  })
}

export const checkIfUserCanAccess = ({ to, permissions }) => {
  const pagePermissions = to.meta.permissions
  const pageExists = pagePermissions !== undefined
  if (pageExists) return checkIfOneMatch(pagePermissions, permissions)
  else return false
}
