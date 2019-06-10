<template>
  <transition mode="out-in" leave-active-class="animated flipOutY" enter-active-class="animated flipInY">
    <q-icon id="valid" key="valid" v-if="!knowError" name="check_circle" color="positive" />
    <q-icon id="error" key="error" v-else-if="showError" name="error" color="negative" />
    <q-icon id="mandatory" key="mandatory" v-else-if="mandatory" name="fiber_manual_record" color="ghost" />
  </transition>
</template>

<script>
export default {
  name: 'ValidityIcon',
  props: {
    mandatory: {
      type: Boolean,
      default: false
    },
    knowError: {
      type: Boolean,
      default: false
    },
    showError: {
      type: Boolean,
      default: false
    }
  }
}
</script>
