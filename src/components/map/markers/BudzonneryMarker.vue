<template>
  <l-marker :lat-lng="latLng" :icon="icon" />
</template>

<script>
import Budzi from './budzi_shadow.png'
import Crown from './crown.png'
import L from 'leaflet'

export default {
  name: 'BudzonneryIcon',
  props: {
    latLng: {
      type: Array,
      required: true
    },
    marked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    icon () {
      const iconUrl = Budzi
      const iconSize = [72, 63]
      const iconAnchor = [22, 59]
      const popupAnchor = [-3, -76]
      const shadowUrl = Crown
      const shadowSize = [51, 28]
      const shadowAnchor = [25, 76]

      const blankProps = { iconUrl, iconSize, iconAnchor, popupAnchor }
      const markedProps = { ...blankProps, shadowUrl, shadowSize, shadowAnchor }
      if (this.marked) return L.icon(markedProps)
      else return L.icon(blankProps)
    }
  }
}
</script>
