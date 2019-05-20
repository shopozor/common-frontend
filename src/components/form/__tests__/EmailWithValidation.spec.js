import EmailWithValidation from '../EmailWithValidation'
import { mountQuasar } from '../../../../../test/jest/utils'
import vuelidate from '../../../../../src/boot/vuelidate'

describe('EmailWithValidation', () => {
  const initial$v = {
    value: {
      $error: false,
      $invalid: true,
      $touch: () => jest.fn
    }
  }

  const wrapper = mountQuasar(EmailWithValidation, { mocks: { $v: initial$v } })

  const clear = () => {
    wrapper.vm.$v = initial$v
    wrapper.setProps({ value: '' })
  }

  beforeEach(clear)

  it('sets InputWithValidation "showError" prop to $v.value.$error', () => {
    const testShowError = value => {
      wrapper.vm.$v.value.$error = value
      const InputWithValidation = wrapper.vm.$children[0]
      expect(InputWithValidation.$props.showError).toBe(value)
    }
    testShowError(false)
    testShowError(true)
  })

  it('sets InputWithValidation "knowError" prop to $v.value.$invalid', () => {
    const testKnowError = value => {
      wrapper.vm.$v.value.$invalid = value
      const InputWithValidation = wrapper.vm.$children[0]
      expect(InputWithValidation.$props.knowError).toBe(value)
    }
    testKnowError(false)
    testKnowError(true)
  })

  it('sets InputWithValidation "mandatory" prop to its own "mandatory" prop', () => {
    const testMandatory = value => {
      wrapper.setProps({ mandatory: value })
      const InputWithValidation = wrapper.vm.$children[0]
      expect(InputWithValidation.$props.mandatory).toBe(value)
    }
    testMandatory(true)
    testMandatory(false)
  })

  it('detects an error if the value is not an email', () => {
    const values = {
      'missing.arobas.com': false,
      'missing@toplevel': false,
      'correct@email.com': true
    }

    const wrapperWithValidator = mountQuasar(EmailWithValidation, { boot: [vuelidate] })

    const testValue = value => {
      wrapperWithValidator.setProps({ value })
      expect({[value]: !wrapperWithValidator.vm.$v.value.$invalid}).toEqual({[value]: values[value]})
    }

    Object.keys(values).forEach(key => testValue(key))
  })
})
