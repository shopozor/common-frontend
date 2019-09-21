import resetPassword from '../ResetPassword.vue'
import { mountQuasar } from '../../../unit-tests/utils'
import vuelidate from '../../boot/vuelidate'
import types from '../../../types'
import { generatePath } from '../../router/Helpers'
import { denodeify } from 'q'

describe('Reset password', () => {
  const valid = {
    password: 'Val!dPa55word',
    encodedId: 'validId',
    oneTimeToken: 'validToken'
  }

  const invalid = {
    password: 'invalidpassword',
    encodedId: 'invalidId',
    oneTimeToken: 'invalidToken'
  }

  const wrapper = mountQuasar(resetPassword, {
    boot: [vuelidate],
    store: {
      actions: {
        changePassword: [
          {
            args: valid,
            resolve: {}
          },
          {
            args: invalid,
            reject: 'ERROR_TOKEN_EXPIRED'
          }
        ]
      }
    },
    mocks: {
      $router: {
        push: jest.fn()
      },
      $route: {
        params: {
          id: valid.encodedId,
          token: valid.oneTimeToken
        }
      }
    }
  })

  afterEach(() => {
    wrapper.vm.password = {
      value: '',
      isValid: false
    }
    wrapper.vm.repeatPassword = {
      value: '',
      isValid: false
    }
    wrapper.vm.state = 'fillForm'
    jest.restoreAllMocks()
    jest.resetAllMocks()
  })

  describe('when the new password has not been submitted', () => {
    it('has two "PasswordWithValidation" field', () => {
      const fields = wrapper.findAll({ name: 'PasswordWithValidation' })
      expect(fields.length).toBe(2)
    })

    it('has a "ShakingBtn" to submit password which is disabled when the password is invalid', done => {
      jest.spyOn(wrapper.vm.$store, 'dispatch')

      wrapper.vm.password.value = invalid.password
      const passwordField = wrapper.find('#password')
      passwordField.vm.$emit('validity-check', false)

      wrapper.vm.repeatPassword.value = invalid.password
      const repeatPasswordField = wrapper.find('#repeatPassword')
      repeatPasswordField.vm.$emit('validity-check', true)

      wrapper.vm.$nextTick(() => {
        const submit = wrapper.find('#submit')
        submit.trigger('click')
        expect(wrapper.vm.$store.dispatch).not.toHaveBeenCalled()
        done()
      })
    })

    it('has a "ShakingBtn" to submit password which is disabled when the two passwords do not match', done => {
      jest.spyOn(wrapper.vm.$store, 'dispatch')

      wrapper.vm.password.value = valid.password
      const passwordField = wrapper.find('#password')
      passwordField.vm.$emit('validity-check', true)

      wrapper.vm.repeatPassword.value = invalid.password
      const repeatPasswordField = wrapper.find('#repeatPassword')
      repeatPasswordField.vm.$emit('validity-check', false)

      wrapper.vm.$nextTick(() => {
        const submit = wrapper.find('#submit')
        submit.trigger('click')
        expect(wrapper.vm.$store.dispatch).not.toHaveBeenCalled()
        done()
      })
    })

    it('has a "ShakingBtn" to submit email that dispatches "changePassword" action and sets state to "pending"', done => {
      wrapper.vm.$route = {
        params: {
          id: valid.encodedId,
          token: valid.oneTimeToken
        }
      }

      jest.spyOn(wrapper.vm.$store, 'dispatch')

      wrapper.vm.password.value = valid.password
      const passwordField = wrapper.find('#password')
      passwordField.vm.$emit('validity-check', true)

      wrapper.vm.repeatPassword.value = valid.password
      const repeatPasswordField = wrapper.find('#repeatPassword')
      repeatPasswordField.vm.$emit('validity-check', true)

      wrapper.vm.$nextTick(() => {
        const submit = wrapper.find('#submit')
        submit.trigger('click')
        expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('changePassword', valid)
        expect(wrapper.vm.state).toBe('pending')
        done()
      })
    })

    describe('when action fails', () => {
      beforeEach(done => {
        wrapper.vm.$route = {
          params: {
            id: invalid.encodedId,
            token: invalid.oneTimeToken
          }
        }
        wrapper.vm.password.value = invalid.password
        wrapper.vm.ok()
        wrapper.vm.$nextTick(() => {
          done()
        })
      })

      it('has a "goBack" button that pushes the user to "forgotPassword" page when clicked', () => {
        const goBack = wrapper.find('#goBack')
        goBack.trigger('click')
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith(generatePath({ link: types.links.FORGOT_PASSWORD }))
      })
    })

    describe('when action succeeds', () => {
      beforeEach(done => {
        wrapper.vm.$route = {
          params: {
            id: valid.encodedId,
            token: valid.oneTimeToken
          }
        }
        wrapper.vm.password.value = valid.password
        wrapper.vm.ok()
        wrapper.vm.$nextTick(() => {
          done()
        })
      })

      it('has a "connect" button that pushes the user to "login" page when clicked', () => {
        const goBack = wrapper.find('#connect')
        goBack.trigger('click')
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith(generatePath({ link: types.links.LOGIN }))
      })
    })
  })
})
