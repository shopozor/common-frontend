<template>
  <q-item>
    <q-item-section>
      <input-with-validation
        :value="value"
        type="email"
        :label="$t('profile.email')"
        :hint="hint"
        :errorMessage="errorMessage"
        iconName="mail"
        :showError="showError"
        :knowError="knowError"
        :mandatory="mandatory"
        @input="input"
        @touched="$v.value.$touch"
      />
    </q-item-section>
  </q-item>
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
  computed: {
    showError () {
      return this.$v.value.$error
    },
    /**
     * Suboptimal code
     * I use computed properties to emit the validity-check event
     * when $v.value.$invalid changes.
     * There must be some cleaner way to do that.
     */
    knowError () {
      this.$emit('validity-check', !this.$v.value.$invalid)
      return this.$v.value.$invalid
    }
  },
  methods: {
    input (event) {
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
