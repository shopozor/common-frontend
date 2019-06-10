import sideDrawerContent from '../SideDrawerContent'
import { mountQuasar } from '../../../../unit-tests/utils'
import { generatePath } from '../../../router/Helpers'
import types from '../../../../types'

describe('SideDrawerContent', () => {
  const wrapper = mountQuasar(sideDrawerContent, {
    shallow: true,
    propsData: {
      email: 'test@mail.com',
      drawerOpen: false,
      orderedLinks: {
        userManagement: [
          'link1',
          'link2',
          types.links.ACTIVATE
        ],
        navigation: [
          'link4',
          'link5',
          types.links.HOME
        ]
      },
      accessRules: {
        permission1: {
          link1: true,
          link2: false,
          [types.links.ACTIVATE]: false,
          link4: true,
          link5: false,
          [types.links.HOME]: false
        },
        permission2: {
          link1: true,
          link2: true,
          [types.links.ACTIVATE]: false,
          link4: true,
          link5: true,
          [types.links.HOME]: false
        },
        permission3: {
          link1: false,
          link2: false,
          [types.links.ACTIVATE]: true,
          link4: false,
          link5: false,
          [types.links.HOME]: true
        }
      },
      permissions: []
    }
  })

  it('displays a PageLink for any link if any permission corresponds to an accessRule that has value "true" for the key "link" ', () => {
    wrapper.setProps({ permissions: ['permission1'] })
    const pageLinksWithPermission1 = wrapper.findAll({ name: 'PageLink' })
    expect(pageLinksWithPermission1.length).toBe(2)
    wrapper.setProps({ permissions: ['permission1', 'permission2'] })
    const pageLinksWithPermission1And2 = wrapper.findAll({ name: 'PageLink' })
    expect(pageLinksWithPermission1And2.length).toBe(4)
    wrapper.setProps({ permissions: ['permission1', 'permission2', 'permission3'] })
    const pageLinksWithPermission12And3 = wrapper.findAll({ name: 'PageLink' })
    expect(pageLinksWithPermission12And3.length).toBe(6)
  })

  it('generates a path for each pageLink following the rules set in common/src/router/helpers[generatePath]', () => {
    wrapper.setProps({ permissions: ['permission1'] })
    const pageLinksWithPermission1 = wrapper.findAll({ name: 'PageLink' })
    expect(pageLinksWithPermission1.wrappers[0].vm.path).toBe(generatePath({ link: 'link1' }))
    expect(pageLinksWithPermission1.wrappers[1].vm.path).toBe(generatePath({ link: 'link4' }))
    wrapper.setProps({ permissions: ['permission3'] })
    const pageLinksWithPermission3 = wrapper.findAll({ name: 'PageLink' })
    expect(pageLinksWithPermission3.wrappers[0].vm.path).toBe(generatePath({ link: types.links.ACTIVATE }))
    expect(pageLinksWithPermission3.wrappers[1].vm.path).toBe(generatePath({ link: types.links.HOME }))
  })

  it('displays userManagement links first, and navigation links second, according to their order', () => {
    wrapper.setProps({ permissions: ['permission1', 'permission2', 'permission3'] })
    const pageLinks = wrapper.findAll({ name: 'PageLink' })
    const expectLabelOfNum = (num, label) => {
      expect(pageLinks.wrappers[num].vm.label).toBe(label)
    }
    expectLabelOfNum(0, 'link1')
    expectLabelOfNum(1, 'link2')
    expectLabelOfNum(2, types.links.ACTIVATE)
    expectLabelOfNum(3, 'link4')
    expectLabelOfNum(4, 'link5')
    expectLabelOfNum(5, types.links.HOME)
  })
})
