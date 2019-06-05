<template>
  <q-item>

    <q-item-section side>
      <q-btn round flat size="1em" icon="help" color="primary" @click="toggleDialog" />
    </q-item-section>

    <q-item-section>
      <q-checkbox
        id="acceptCookies"
        :value="value"
        @input="input"
        :label="label" />
    </q-item-section>

    <q-item-section side>
      <validity-icon
        :knowError="!value || !mandatory"
        :showError="!value && touched && mandatory"
        :mandatory="mandatory" />
    </q-item-section>

    <q-dialog v-model="openDialog">
      <q-card>
        <q-card-section>
          <slot />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" @click="toggleDialog">{{ $t('actions.close') }}</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-item>
</template>

<script>
import ValidityIcon from './ValidityIcon'

export default {
  name: 'CheckBoxWithValidation',
  data () {
    return {
      openDialog: false,
      touched: false
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    label: {
      type: String,
      default: () => ''
    },
    mandatory: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    input (event) {
      this.touched = true
      this.$emit('input', event)
    },
    toggleDialog () {
      this.openDialog = !this.openDialog
    }
  },
  components: { ValidityIcon }
}
</script>
