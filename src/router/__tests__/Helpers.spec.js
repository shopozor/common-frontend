import { generatePath, filterAccessibleLinks, generateRoutes, checkIfUserCanAccess } from '../Helpers'
import types from '../../../types'

describe('router helpers', () => {
  test('function "generatePath" returns expected pathes', () => {
    const cases = {
      dummyPath: '/dummyPath',
      [types.links.HOME]: '/',
      [types.links.ACTIVATE]: '/activate/:id/:token',
      [types.links.RESET_PASSWORD]: '/resetPassword/:id/:token'
    }

    Object.entries(cases).forEach(testCase => {
      expect(generatePath({ link: testCase[0] })).toBe(testCase[1])
    })
  })

  const links = ['link1', 'link2', 'link3']
  const accessRules = {
    permission1: {
      link1: true
    },
    permission2: {
      link1: true,
      link2: true
    }
  }

  test('function "filterAccessibleLinks" returns an array of all links for which a matching permission is given', () => {
    var permissions = ['permission1']
    var expectedAccessibleLinks = ['link1']
    var receivedAccessibleLinks = filterAccessibleLinks({ links, accessRules, permissions })
    expect(receivedAccessibleLinks).toEqual(expectedAccessibleLinks)

    permissions = ['permission2']
    expectedAccessibleLinks = ['link1', 'link2']
    receivedAccessibleLinks = filterAccessibleLinks({ links, accessRules, permissions })
    expect(receivedAccessibleLinks).toEqual(expectedAccessibleLinks)

    permissions = ['permission1', 'permission2']
    expectedAccessibleLinks = ['link1', 'link2']
    receivedAccessibleLinks = filterAccessibleLinks({ links, accessRules, permissions })
    expect(receivedAccessibleLinks).toEqual(expectedAccessibleLinks)
  })

  const routes = generateRoutes({ links, accessRules })
  test('function "generateRoutes" returns a data structure that can initialize the router and start with the "/" path', () => {
    expect(routes[0].path).toBe('/')
  })
  test('function "generateRoutes" returns a data structure that can initialize the router and each children of "/" stores the permissions that grant access to it in the metadata', () => {
    const children = routes[0].children
    const expectChildren = (num, path, permissions) => {
      expect(children[num].path).toBe(path)
      expect(children[num].meta.permissions).toEqual(permissions)
    }
    expectChildren(0, '/link1', ['permission1', 'permission2'])
    expectChildren(1, '/link2', ['permission2'])
    expectChildren(2, '/link3', [])
  })
  test('function "generateRoutes" returns a data structure that can initialize the router and ends with the Error404 page', () => {
    expect(routes.slice(-1)[0].path).toEqual('*')
  })

  test('function "checkIfUserCanAccess" returns true if at least one permission in the given page metadata matches one given permission', () => {
    const to = {
      meta: {
        permissions: [
          'permission1'
        ]
      }
    }
    expect(checkIfUserCanAccess({ to, permissions: ['permission1'] })).toBeTruthy()
    expect(checkIfUserCanAccess({ to, permissions: ['permission2'] })).toBeFalsy()
  })
})
