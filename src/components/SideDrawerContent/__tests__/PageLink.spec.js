import PageLink from '../PageLink'
import { mountQuasar } from '../../../../unit-tests/utils'
import sinon from 'sinon'

describe('PageLink', () => {
  const wrapper = mountQuasar(PageLink, {
    propsData: {
      label: '',
      path: ''
    },
    mocks: {
      $route: {
        path: 'actualPath'
      },
      $router: {
        push: sinon.spy()
      }
    }
  })

  it('sets computed property "isActive" to true when prop path matches actual path', () => {
    wrapper.setProps({
      path: 'actualPath'
    })
    expect(wrapper.vm.isActive).toBe(true)
  })

  it('has class "isActive" when computed property "isActive" is true', () => {
    wrapper.isActive = true
    expect(wrapper.classes()).toContain('isActive')
  })

  it('sets computed property "isActive" to false when prop path does not matche actual path', () => {
    wrapper.setProps({
      path: 'otherPath'
    })
    expect(wrapper.vm.isActive).toBe(false)
  })

  it('does not have class "isActive" when computed property "isActive" is false', () => {
    wrapper.isActive = false
    expect(wrapper.classes()).not.toContain('isActive')
  })

  it('pushes router to "/path" when clicked', () => {
    wrapper.setProps({
      path: 'targetPath'
    })
    const link = wrapper.find('.q-item')
    link.trigger('click')
    expect(wrapper.vm.$router.push.called).toBe(true)
  })
})
