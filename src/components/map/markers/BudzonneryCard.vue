<template>
  <q-card flat style="width: 200px">
    <img :src="image" :alt="`Image: ${name}`" />
    <q-card-section>
      {{ name }}
    </q-card-section>
    <q-card-actions align="around">
      <q-btn round color="red" icon="favorite" />
      <q-btn round color="teal" icon="local_grocery_store" />
      <q-btn round color="primary" icon="info" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'BudzonneryCard',
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: undefined
    }
  }
}
</script>
