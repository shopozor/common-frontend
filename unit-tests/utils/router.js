import VueRouter from 'vue-router'

export function initRouter (localVue, options) {
  if (options.mocks && (options.mocks.$route || options.mocks.$router)) {
    return {}
  } else {
    localVue.use(VueRouter)
    return new VueRouter()
  }
}
