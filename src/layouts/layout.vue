<template>
  <q-layout view="HHH Lpr lFf">
    <q-layout-header>
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
          :disable="!isAuthorized"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          {{$t('shop')}} - {{$t('management')}}
        </q-toolbar-title>
        <language-select />
        <q-btn icon="cancel" size="sm" label="clear server" color="negative" @click="clear" class="no-shadow" />
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer
        v-model="drawerOpen"
        :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <side-drawer-content />
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import SideDrawerContent from '../components/SideDrawerContent/SideDrawerContent'
import LanguageSelect from '../components/I18n/LanguageSelect'

export default {
  name: 'Layout',
  data () {
    return {
      drawerOpen: this.$q.platform.is.desktop
    }
  },
  components: {SideDrawerContent, LanguageSelect},
  computed: {
    ...mapGetters(['isAuthorized'])
  },
  methods: {
    clear () {
      window.localStorage.clear()
      this.$router.push('/')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  },
  created () {
    this.drawerOpen = this.drawerOpen && this.isAuthorized
  }
}
</script>

<style>
</style>
