import PasswordWithValidation from '../PasswordWithValidation'
import { mountQuasar } from '../../../../unit-tests/utils'
import vuelidate from '../../../boot/vuelidate'
import { passwords } from '../passwordPolicy'

describe('mocking vuelidate', () => {
  const initial$v = {
    value: {
      $error: false,
      $invalid: true,
      $touch: jest.fn()
    }
  }

  const wrapper = mountQuasar(PasswordWithValidation, { mocks: { $v: initial$v } })
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
  const wrapper = mountQuasar(PasswordWithValidation, { boot: [vuelidate] })

  it('detects an error iif the value does not follow password policy and "repeatPassword" prop is false or unset', () => {
    const testPolicy = () => {
      Object.keys(passwords).forEach(passwordCase => {
        const password = passwords[passwordCase].password
        const isValid = passwords[passwordCase].isValid
        wrapper.setProps({ ...wrapper.props(), value: password })
        expect(wrapper.vm.$v.value.$invalid).toBe(!isValid)
      })
    }

    testPolicy()
    wrapper.setProps({ repeatPassword: false })
    testPolicy()
  })

  it('detects an error iif the value does not match the "repeatPassword" prop', () => {
    wrapper.setProps({
      repeatPassword: 'mustMatchThis',
      value: 'doesNotMatchThat'
    })
    expect(wrapper.vm.$v.value.$invalid).toBe(true)

    wrapper.setProps({
      repeatPassword: 'doesMatchThis',
      value: 'doesMatchThis'
    })
    expect(wrapper.vm.$v.value.$invalid).toBe(false)
  })
})
