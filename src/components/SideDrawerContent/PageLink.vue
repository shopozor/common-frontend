<template>
    <q-item
      :class="{'bg-primary text-white': actualPath === path}"
      v-if="label !== undefined"
      @click.native="() => $router.push({path})">
        <q-item-main :label="$t(`links.${label}`)" />
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
