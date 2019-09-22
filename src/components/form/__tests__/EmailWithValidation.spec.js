import EmailWithValidation from '../EmailWithValidation'
import { mountQuasar } from '../../../../unit-tests/utils'
import vuelidate from '../../../boot/vuelidate'

describe('mocking vuelidate', () => {
  const initial$v = {
    value: {
      $error: false,
      $invalid: true,
      $touch: jest.fn()
    }
  }

  const wrapper = mountQuasar(EmailWithValidation, { mocks: { $v: initial$v } })
  const InputWithValidation = wrapper.find({ name: 'InputWithValidation' })

  const clear = () => {
    wrapper.vm.$v = initial$v
    wrapper.setProps({ value: '' })
  }

  beforeEach(clear)

  it('sets InputWithValidation "showError" prop to $v.value.$error', () => {
    const testShowError = value => {
      wrapper.vm.$v.value.$error = value
      expect(InputWithValidation.props().showError).toBe(value)
    }
    testShowError(false)
    testShowError(true)
  })

  it('sets InputWithValidation "knowError" prop to $v.value.$invalid', () => {
    const testKnowError = value => {
      wrapper.vm.$v.value.$invalid = value
      expect(InputWithValidation.props().knowError).toBe(value)
    }
    testKnowError(false)
    testKnowError(true)
  })

  it('sets InputWithValidation "mandatory" prop to its own "mandatory" prop', () => {
    const testMandatory = value => {
      wrapper.setProps({ mandatory: value })
      expect(InputWithValidation.props().mandatory).toBe(value)
    }
    testMandatory(true)
    testMandatory(false)
  })

  it('calls "$v.value.$touch()" function when InputWithValidation emits "touched" event', () => {
    InputWithValidation.vm.$emit('touched')
    expect(wrapper.vm.$v.value.$touch).toHaveBeenCalled()
  })

  it('emits "input" and "validity-check" event when InputVithValidation emits "input"', () => {
    InputWithValidation.vm.$emit('input')
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted()['validity-check']).toBeTruthy()
  })
})

describe('using vuelidate', () => {
  const wrapper = mountQuasar(EmailWithValidation, { boot: [vuelidate] })

  it('detects an error if the value is not an email', () => {
    const values = {
      'missing.arobas.com': false,
      'missing@toplevel': false,
      'correct@email.com': true
    }

    const testValue = value => {
      wrapper.setProps({ value })
      expect({[value]: !wrapper.vm.$v.value.$invalid}).toEqual({[value]: values[value]})
    }

    Object.keys(values).forEach(key => testValue(key))
  })
})
