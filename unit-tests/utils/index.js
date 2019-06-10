// this is mapped in jest.config.js to resolve @vue/test-utils
import { createLocalVue, mount, shallowMount } from 'test-utils'
import Vuex from 'vuex'
import Quasar, { Cookies } from 'quasar'

import { createStore } from './store'
import { initRouter } from './router'

const mockSsrContext = () => {
  return {
    req: {
      headers: {}
    },
    res: {
      setHeader: () => undefined
    }
  }
}

// https://eddyerburgh.me/mock-vuex-in-vue-unit-tests
export const mountQuasar = (component, options = {}) => {
  const localVue = createLocalVue()
  const app = {}

  localVue.use(Vuex)
  localVue.use(Quasar)
  const store = createStore(options)
  const router = initRouter(localVue, options)

  // mock vue-i18n
  const $t = t => t
  const $tc = tc => tc
  const $n = n => n
  const $d = d => d
  let mocks = { $t, $tc, $n, $d }

  if (options) {
    const ssrContext = options.ssr ? mockSsrContext() : null

    if (options.cookies) {
      const cookieStorage = ssrContext ? Cookies.parseSSR(ssrContext) : Cookies
      const cookies = options.cookies
      Object.keys(cookies).forEach(key => {
        cookieStorage.set(key, cookies[key])
      })
    }

    if (options.boot) {
      options.boot.forEach(plugin => {
        plugin({ app, store, router, Vue: localVue, ssrContext })
      })
    }

    if (options.mocks) {
      mocks = {...mocks, ...options.mocks}
    }
  }

  const mountOptions = {
    localVue: localVue,
    store,
    router,
    mocks,
    propsData: options.propsData,
    slots: options.slots,

    // Injections for Components with a QPage root Element
    provide: {
      pageContainer: true,
      layout: {
        header: {},
        right: {},
        footer: {},
        left: {}
      }
    }
  }

  if (options.shallow) {
    return shallowMount(component, mountOptions)
  } else {
    return mount(component, mountOptions)
  }
}
