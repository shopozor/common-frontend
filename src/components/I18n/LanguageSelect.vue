<template>
  <div class="locale-changer">
    <q-select v-model="$i18n.locale" :options="langs" dark />
  </div>
</template>

<script>
export default {
  name: 'LanguageSelect',
  data () {
    return {
      langs: [
        {
          label: 'fr',
          value: 'fr'
        },
        {
          label: 'en',
          value: 'en'
        }
      ]
    }
  }
}
</script>
