<template>
    <q-item
      :id="`pageLink->${label}`"
      :class="{'bg-primary text-white': actualPath === path}"
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
    actualPath () {
      return this.$route.path
    }
  }
}
</script>
