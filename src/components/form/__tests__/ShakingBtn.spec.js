import shakingBtn from '../ShakingBtn'
import { mountQuasar } from '../../../../unit-tests/utils'

describe('Shaking button', () => {
  const wrapper = mountQuasar(shakingBtn)

  test('the q-btn has color "ghost" and prop "unelevated" when "disable" is true', () => {
    wrapper.setProps({ disable: true })
    const qbtn = wrapper.find({ name: 'QBtn' })
    expect(qbtn.classes()).toContain('bg-ghost')
    expect(qbtn.vm.unelevated).toBeTruthy()
  })

  test('the button shakes if clicked when "disable" is true, and "action" is not called', () => {
    wrapper.setProps({
      disable: true,
      action: jest.fn()
    })
    const qbtn = wrapper.find({ name: 'QBtn' })
    qbtn.trigger('click')
    expect(wrapper.classes()).toContain('animated')
    expect(wrapper.classes()).toContain('shake')
    expect(wrapper.vm.action).not.toHaveBeenCalled()
  })

  test('"action" is called if clicked when "disable" is false', () => {
    wrapper.setProps({
      disable: false,
      action: jest.fn()
    })
    const qbtn = wrapper.find({ name: 'QBtn' })
    qbtn.trigger('click')
    expect(wrapper.vm.action).toHaveBeenCalled()
  })
})
