<template>
    <q-item
      :id="`pageLink->${label}`"
      :class="{'bg-primary text-white': isActive}"
      v-if="label !== undefined"
      clickable
      @click="() => $router.push({path})">
        <q-item-section>{{ $t(`links.${label}`) }}</q-item-section>
    </q-item>
</template>

<script>
export default {
  name: 'pageLink',
  props: {
    path: String,
    label: String
  },
  computed: {
    isActive () {
      return this.$route.path === this.path
    }
  }
}
</script>
