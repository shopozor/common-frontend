import CheckboxWithValidation from '../CheckboxWithValidation'
import { mountQuasar } from '../../../../../test/jest/utils'

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
    const btn = wrapper.find({ name: 'QBtn' })
    btn.trigger('click')
    const dialog = wrapper.find({ name: 'QDialog' })
    console.log(dialog.vm.$children)
    // expect(dialog.contains(dummyContent)).toBeTruthy()
  })
})
