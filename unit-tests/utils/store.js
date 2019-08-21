import Vuex from 'vuex'
import sinon from 'sinon'

/**
 * if the action <actionName> is dispatched
 * with argument <arg1Name> = <arg1Value1>
 * and argument <arg2Name> = <arg2Value1>
 * it resolves with response <responseValue1>
 *
 * if the action <actionName> is dispatched
 * with argument <arg1Name> = <arg1Value2>
 * it rejects with error <errorMessage>
 *
 * if the action <actionName> is dispatched
 * without argument
 * it resolves with response <responseValue2>
 *
 * store: {
    getters: {
      getterName: value
    },
    actions: {
        actionName: [
          {
            args: {
              arg1Name: arg1Value1,
              arg2Name: arg2Value1
            },
            resolve: responseValue1
          },
          {
            args: {
              arg1Name: arg1Value2
            },
            reject: errorMessage
          },
          {
            resolve: responseValue2
          }
        ]
      }
    }
 */

function createState (state) {
  return state
}

function createGetters (getters) {
  return Object.entries(getters).reduce((builtGetters, getter) => {
    builtGetters[getter[0]] = () => {
      return getter[1]
    }
    return builtGetters
  }, {})
}

function createMutations (mutations) {
  return mutations
}

function createActions (actions) {
  return Object.entries(actions).reduce((builtActions, actionStates) => {
    var stub = sinon.stub()
    const name = actionStates[0]
    const states = actionStates[1]
    for (var i = 0; i < states.length; i++) {
      if (states[i].args) {
        if (states[i].resolve) {
          stub.withArgs(sinon.match(Object), sinon.match(states[i].args)).resolves(states[i].resolve)
        } else if (states[i].reject) {
          stub.withArgs(sinon.match(Object), sinon.match(states[i].args)).rejects(states[i].reject)
        } else console.error('Action format error')
      } else {
        if (states[i].resolve) {
          stub.resolves(states[i].resolve)
        } else if (states[i].reject) {
          stub.rejects(states[i].reject)
        } else console.error('Action format error')
      }
    }
    builtActions = { ...builtActions, [name]: stub }
    return builtActions
  }, {})
}

export function createStore (options) {
  let storeOptions = {}
  if (options.store) {
    if (options.store.state) {
      storeOptions = { ...storeOptions, state: createState(options.store.state) }
    }
    if (options.store.getters) {
      storeOptions = { ...storeOptions, getters: createGetters(options.store.getters) }
    }
    if (options.store.mutations) {
      storeOptions = { ...storeOptions, mutations: createMutations(options.store.mutations) }
    }
    if (options.store.actions) {
      storeOptions = { ...storeOptions, actions: createActions(options.store.actions) }
    }
  }
  return new Vuex.Store(storeOptions)
}
