<template>
  <input-with-validation
    :value="value"
    type="email"
    :label="$t('profile.email')"
    :hint="hint"
    :errorMessage="errorMessage"
    iconName="mail"
    :showError="$v.value.$error"
    :knowError="$v.value.$invalid"
    :mandatory="mandatory"
    @input="input"
    @touched="$v.value.$touch"
  />
</template>

<script>
import InputWithValidation from './InputWithValidation'
import { helpers, email } from 'vuelidate/lib/validators'

export default {
  name: 'EmailWithValidation',
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
      email
    }
  }
}
</script>
