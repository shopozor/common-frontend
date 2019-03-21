<template>
  <q-list
    no-border
    link
    inset-delimiter
  >
  <q-list-header>
    {{ user }}
  </q-list-header>
    <page-link
      v-for="value in userManagementLinks"
      :key="pages[value].path"
      :path="pages[value].path"
      :label="value" />
    <q-item-separator />
    <page-link
      v-for="value in navigationLinks"
      :key="pages[value].path"
      :path="pages[value].path"
      :label="value" />
  </q-list>
</template>

<script>
import {mapGetters} from 'vuex'
import access from '../../../../src/router/access'
import pages from '../../../../src/router/pages'
import types from '../../types'
import PageLink from './PageLink'

export default {
  name: 'SideDrawerContent',
  data () {
    return {
      pages,
      separator: types.links.SEPARATOR,
      labels: types.links,
      orderedLinks: {
        userManagement: [
          types.links.SIGNUP,
          types.links.LOGIN,
          types.links.PROFILE,
          types.links.LOGOUT
        ],
        navigation: [
          types.links.HOME,
          types.links.FAKE_SHOP,
          types.links.MAP,
          types.links.CALENDAR,
          types.links.ORDERS,
          types.links.PRODUCTS,
          types.links.MY_SHOP,
          types.links.MANAGE_SHOPS,
          types.links.MANAGE_SITE
        ]
      }
    }
  },
  props: { drawerOpen: Boolean },
  computed: {
    ...mapGetters(['email', 'permissions', 'isAuthorized']),
    userManagementLinks: function () {
      return this.filterAccessibleLinks(this.orderedLinks.userManagement)
    },
    navigationLinks () {
      return this.filterAccessibleLinks(this.orderedLinks.navigation)
    },
    user () {
      if (this.isAuthorized) return this.email
      else return this.$t('layout.notConnected')
    }
  },
  methods: {
    filterAccessibleLinks (filterKeys) {
      const accessList = access(this.permissions)
      const accessibleLinks = filterKeys.filter(key => {
        return accessList[key]
      })
      return accessibleLinks
    }
  },
  components: {
    PageLink
  }
}
</script>
