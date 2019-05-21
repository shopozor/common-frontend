<template>
  <input-with-validation
    :value="value"
    type="password"
    :label="$t('profile.password')"
    :hint="hint"
    :errorMessage="errorMessage"
    iconName="vpn_lock"
    :showError="$v.value.$error"
    :knowError="$v.value.$invalid"
    :mandatory="mandatory"
    @input="input"
    @touched="$v.value.$touch"
  />
</template>

<script>
import InputWithValidation from './InputWithValidation'
import { helpers } from 'vuelidate/lib/validators'
import validate from './passwordPolicy'

export default {
  name: 'PasswordWithValidation',
  props: {
    value: {
      required: true
    },
    mandatory: {
      type: Boolean,
      default: () => true
    },
    hint: {
      type: String,
      default: () => ''
    },
    errorMessage: {
      type: String,
      default: () => ''
    },
    repeatPassword: {
      type: String
    }
  },
  methods: {
    input (event) {
      this.$emit('validity-check', !this.$v.value.$invalid)
      this.$emit('input', event)
    }
  },
  components: { InputWithValidation },
  validations: {
    value: {
      required: function (value) {
        if (this.mandatory) return helpers.req(value)
        else return true
      },
      correct: function (value) {
        if (this.repeatPassword) {
          return value === this.repeatPassword
        } else {
          return validate(value)
        }
      }
    }
  }
}
</script>
