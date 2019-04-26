<template>
  <q-layout view="HHH Lpr lFf">
    <q-header>
      <q-toolbar
        color="primary"
      >
        <q-btn
          class="burger-menu"
          flat
          dense
          round
          @click="drawerOpen = !drawerOpen"
          aria-label="Menu"
          :disable="disableNavigation"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          {{$t('shop')}} - {{$t(subtitle)}}
        </q-toolbar-title>
        <language-select />
      </q-toolbar>
    </q-header>
    <q-drawer
      id="sideDrawer"
      v-model="drawerOpen"
      content-class="bg-sideDrawer">
      <side-drawer-content
        :email="email"
        :drawerOpen="drawerOpen"
        :orderedLinks="orderedLinks"
        :accessRules="accessRules"
        :permissions="permissions"
      />
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import SideDrawerContent from '../components/SideDrawerContent/SideDrawerContent'
import LanguageSelect from '../components/I18n/LanguageSelect'

export default {
  name: 'Layout',
  data () {
    return {
      drawerOpen: this.$q.platform.is.desktop && !this.disableNavigation
    }
  },
  props: {
    email: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    disableNavigation: {
      type: Boolean,
      default: false
    },
    orderedLinks: {
      type: Object,
      required: true
    },
    accessRules: {
      type: Object,
      required: true
    },
    permissions: {
      type: Array,
      required: true
    }
  },
  components: { SideDrawerContent, LanguageSelect }
}
</script>

<style>
</style>
