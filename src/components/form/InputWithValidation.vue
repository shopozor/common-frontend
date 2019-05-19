<template>
  <q-input
    v-model="value"
    :type="type"
    :float-label="floatLabel"
    :label="label"
    :hint="hint"
    :error-message="errorMessage"
    @input="$emit('input', $event)"
    :error="showError && knowError"
    no-error-icon>
    <template v-slot:before>
      <q-icon :name="iconName" />
    </template>
    <template v-slot:append>
      <validity-icon
        :knowError="knowError"
        :showError="showError"
        :mandatory="mandatory" />
    </template>
  </q-input>
</template>

<script>
import ValidityIcon from './ValidityIcon'

export default {
  name: 'InputWithValidation',
  data () {
    return {
      value: ''
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    floatLabel: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    },
    iconName: {
      type: String,
      default: 'edit'
    },
    showError: {
      type: Boolean,
      default: false
    },
    knowError: {
      type: Boolean,
      default: true
    },
    mandatory: {
      type: Boolean,
      default: false
    }
  },
  components: { ValidityIcon }
}
</script>
