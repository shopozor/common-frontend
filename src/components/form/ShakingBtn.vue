<template>
  <q-btn
    class="q-ma-md"
    :class="{'animated shake': isShaking, enabled: !disable}"
    :color="disable ? 'ghost' : 'primary'"
    :unelevated="disable"
    :label="label"
    @click="tryAction">
    <slot />
  </q-btn>
</template>

<script>
export default {
  name: 'SchakingBtn',
  data () {
    return {
      isShaking: false
    }
  },
  props: {
    label: {
      type: String,
      default: () => ''
    },
    action: {
      type: Function,
      default: () => () => {}
    },
    disable: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    tryAction () {
      if (!this.disable) {
        this.action()
      } else {
        this.$emit('error')
        if (!this.isShaking) {
          this.isShaking = true
          const vm = this
          setTimeout(() => { vm.isShaking = false }, 500)
        }
      }
    }
  }
}
</script>
