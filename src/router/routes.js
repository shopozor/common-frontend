import pages from '../../../src/router/pages'
import { generateRoutes } from './helpers'

const routes = generateRoutes(pages)

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
