import resetPassword from '../ResetPassword.vue'
import { mountQuasar } from '../../../unit-tests/utils'
import vuelidate from '../../../../src/boot/vuelidate'

describe('Reset password', () => {
  const wrapper = mountQuasar(resetPassword, {
    boot: [vuelidate],
    store: {
      actions: {
        resetPassword: [
          {
            resolve: {}
          }
        ]
      }
    },
    mocks: {
      $router: {
        back: jest.fn()
      }
    }
  })

  afterEach(() => {
    wrapper.vm.email = ''
    wrapper.vm.isValid = false
    jest.restoreAllMocks()
    jest.resetAllMocks()
  })

  describe('when the email has not been submitted', () => {
    beforeEach(() => {
      wrapper.vm.emailSent = false
    })

    it('has an "EmailWithValidation" field', () => {
      const email = wrapper.find({ name: 'EmailWithValidation' })
      expect(email.exists()).toBeTruthy()
    })

    it('has a cancel button which pushes the user back when clicked', () => {
      const cancel = wrapper.find('#cancel')
      cancel.trigger('click')
      expect(wrapper.vm.$router.back).toHaveBeenCalled()
    })

    it('has "ShakingBtn" to submit email which is disabled when "email" is invalid', () => {
      jest.spyOn(wrapper.vm.$store, 'dispatch')
      wrapper.vm.email = 'invalidMail'
      const email = wrapper.find({ name: 'EmailWithValidation' })
      email.vm.$emit('validity-check', false)
      const submit = wrapper.find('#submit')
      submit.trigger('click')
      expect(wrapper.vm.$store.dispatch).not.toHaveBeenCalled()
    })

    it('has "ShakingBtn" to submit email that dispatches "resetPassword" action, then sets "emailSent" to true', done => {
      jest.spyOn(wrapper.vm.$store, 'dispatch')
      const validMail = 'test@mail.com'
      wrapper.vm.email = validMail
      const email = wrapper.find({ name: 'EmailWithValidation' })
      email.vm.$emit('validity-check', true)
      const submit = wrapper.find('#submit')
      submit.trigger('click')
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith(
        'resetPassword',
        { email: validMail }
      )
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.emailSent).toBeTruthy()
        done()
      })
    })
  })

  describe('when the email has been submitted', () => {
    beforeEach(() => {
      wrapper.vm.emailSent = true
    })

    it('has a "goBack" button that pushes the user back when clicked', () => {
      const goBack = wrapper.find('#goBack')
      goBack.trigger('click')
      expect(wrapper.vm.$router.back).toHaveBeenCalled()
    })
  })
})
