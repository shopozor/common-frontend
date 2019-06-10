import CheckboxWithValidation from '../CheckboxWithValidation'
import { mountQuasar } from '../../../../unit-tests/utils'

describe('CheckboxWithValidation', () => {
  const dummyContent = 'dummy card content'
  const wrapper = mountQuasar(CheckboxWithValidation, {
    propsData: { value: false },
    slots: {
      default: dummyContent
    }
  })

  it('has a help button that displays a dialog', () => {
    expect(wrapper.vm.openDialog).toBe(false)
    const btn = wrapper.find({ name: 'QBtn' })
    btn.trigger('click')
    expect(wrapper.vm.openDialog).toBe(true)
  })

  it('has a q-dialog component which displays the default slot', () => {
    expect(wrapper.vm.$slots.default[0].text).toContain(dummyContent)
  })

  it('is aware when the checkbox has been clicked', () => {
    expect(wrapper.vm.touched).toBeFalsy()
    const checkbox = wrapper.find({ name: 'QCheckbox' })
    checkbox.trigger('click')
    expect(wrapper.vm.touched).toBeTruthy()
  })
})
