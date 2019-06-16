import types from '../../types'
import { atLeastOneMatch } from '../Helpers.js'

/**
 * To add a new page:
 *  1) add its type to common/types/links.js.
 *     It must match the component file name : ConfirmationEmailSent.js -> confirmationEmailSent)
 *  2) create link and access rules in src/router/links.js
 *  3) If the page must be reachable from the burger menu,
 *     write its name in src/router/links.js > orderedLinks
 **/

export const generatePath = ({ link }) => {
  if (link === types.links.HOME) return '/'
  else if (link === types.links.ACTIVATE) return '/activate/:id/:token'
  else return `/${link}`
}

const checkIfLinkIsAccessible = ({ link, accessRules, permissions }) => {
  return permissions.some(permission => {
    const validity = accessRules[permission][link]
    return validity
  })
}

const generatePermissions = ({ link, accessRules }) => {
  return Object.keys(accessRules).reduce((permissions, permission) => {
    if (accessRules[permission][link]) permissions.push(permission)
    return permissions
  }, [])
}

const generatePage = ({ link, accessRules }) => {
  return {
    name: link,
    path: generatePath({ link }),
    component: () => import(`pages/${firstUpperCase(link)}.vue`),
    meta: { permissions: generatePermissions({ link, accessRules }) }
  }
}

const generatePages = ({ links, accessRules }) => {
  return links.map(link => generatePage({ link, accessRules }))
}

export const filterAccessibleLinks = ({ links, accessRules, permissions }) => {
  return links.filter(link => checkIfLinkIsAccessible({ link, accessRules, permissions }))
}

export const generateRoutes = ({ links, accessRules }) => {
  const pages = generatePages({ links, accessRules })
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

export const checkIfUserCanAccess = ({ to, permissions }) => {
  const pagePermissions = to.meta.permissions
  const pageExists = pagePermissions !== undefined
  if (pageExists) return atLeastOneMatch(pagePermissions, permissions)
  else return false
}

// BUG: webpack n'arrive pas à importer firstUpperCase, alors que atLeastOneMatch fonctionne
export const firstUpperCase = string => string.charAt(0).toUpperCase() + string.slice(1)
