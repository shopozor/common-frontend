<template>
  <q-list
    no-border
    link
    inset-delimiter
  >
  <q-item-label header>
    {{ user }}
  </q-item-label>
    <page-link
      v-for="link in userManagementLinks"
      :key="userManagementPathes[link]"
      :path="userManagementPathes[link]"
      :label="link" />
    <q-separator color="grey-5" inset />
    <page-link
      v-for="link in navigationLinks"
      :key="navigationPathes[link]"
      :path="navigationPathes[link]"
      :label="link" />
  </q-list>
</template>

<script>
import types from '../../types'
import { filterAccessibleLinks, generatePath } from '../../router/Helpers'
import PageLink from './PageLink'

export default {
  name: 'SideDrawerContent',
  data () {
    return {
      separator: types.links.SEPARATOR,
      labels: types.links
    }
  },
  props: {
    email: {
      type: String,
      required: true
    },
    drawerOpen: {
      type: Boolean,
      required: true
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
  computed: {
    user () {
      const isConnected = this.permissions.every(permission => permission !== types.permissions.NOT_CONNECTED)
      if (isConnected) return this.email
      else return this.$t('layout.notConnected')
    },
    userManagementLinks () {
      return filterAccessibleLinks({
        links: this.orderedLinks.userManagement,
        accessRules: this.accessRules,
        permissions: this.permissions
      })
    },
    navigationLinks () {
      return filterAccessibleLinks({
        links: this.orderedLinks.navigation,
        accessRules: this.accessRules,
        permissions: this.permissions
      })
    },
    userManagementPathes () {
      return this.generatePathes(this.userManagementLinks)
    },
    navigationPathes () {
      return this.generatePathes(this.navigationLinks)
    }
  },
  methods: {
    generatePathes (links) {
      return links.reduce((path, link) => {
        path[link] = generatePath({ link })
        return path
      }, {})
    }
  },
  components: {
    PageLink
  }
}
</script>
