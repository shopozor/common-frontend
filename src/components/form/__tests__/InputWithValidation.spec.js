import InputWithValidation from '../InputWithValidation'
import { mountQuasar } from '../../../../unit-tests/utils'

describe('InputWithValidation', () => {
  const wrapper = mountQuasar(InputWithValidation)

  it('shows choosen icon before input', () => {
    wrapper.setProps({ iconName: 'mail' })
    const icon = wrapper.find('.q-field__before > i')
    expect(icon.text()).toBe('mail')
  })

  it('shows a validityIcon after form (only error icon tested)', () => {
    wrapper.setProps({ mandatory: true, knowError: true, showError: true })
    const after = wrapper.find('.q-field__append')
    expect(after.contains('i')).toBe(true)
  })

  it('has class "q-field--error" if knowError=true and showError=true', () => {
    wrapper.setProps({ knowError: true, showError: true })
    expect(wrapper.classes()).toContain('q-field--error')
  })

  it('has not class "q-field--error" if knowError=false or showError=false', () => {
    wrapper.setProps({ knowError: false, showError: true })
    expect(wrapper.classes()).not.toContain('q-field--error')
    wrapper.setProps({ knowError: false, showError: false })
    expect(wrapper.classes()).not.toContain('q-field--error')
    wrapper.setProps({ knowError: true, showError: false })
    expect(wrapper.classes()).not.toContain('q-field--error')
  })

  it('emits the event "touched" when q-input emits "blur"', () => {
    wrapper.vm.$children[0].$emit('blur')
    expect(wrapper.emitted().touched).toBeTruthy()
  })
})
