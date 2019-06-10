<template>
    <q-item
      :id="`pageLink->${label}`"
      :class="{'bg-primary text-white': isActive, isActive}"
      v-if="label !== undefined"
      clickable
      @click="() => $router.push({path})">
        <q-item-section>{{ $t(`links.${label}`) }}</q-item-section>
    </q-item>
</template>

<script>
export default {
  name: 'PageLink',
  props: {
    path: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    isActive () {
      return this.$route.path === this.path
    }
  }
}
</script>
