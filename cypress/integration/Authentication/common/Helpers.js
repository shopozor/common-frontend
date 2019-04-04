const jwtDecode = require('jwt-decode')
import { duration } from 'moment'

import { injectResponseFixtureIfFaked } from '../../common/fakeServer'

import types from '../../../../src/types'

// import store from '../../../../src/store/index'

export function getTokenCookie () {
  return cy.getCookie(types.cookies.TOKEN)
}

export function login (persona) {
  // TODO: the following code needs to be replaced with a programmatic login
  // i.e. a direct call to store.dispatch('login', { email, password, stayLoggedIn }):
  injectResponseFixtureIfFaked(`Authentication/LogStaffIn/Responses/${persona}`)
  cy.visit('/login')
  cy.fixture(`Authentication/Credentials/${persona}`)
    .then(user => {
      cy.get('input[type=email]').clear().type(user.email)
      cy.get('input[type=password]').clear().type(user.password)
      cy.get('button[type=button]')
        .contains('se connecter')
        .click()
      // TODO: instead of the above code, we need something like
      // // TODO: I will probably need to import the action directly and provide it with the commit method
      // let stayLoggedIn = true
      // // // TODO: use the const defined in /src/types/links.js
      // email = user.email
      // password = user.password
      // store.dispatch('login', { email, password, stayLoggedIn })
    })

  cy.get('@graphql').then(() => {
    getTokenCookie().then(token => {
      expect(token).to.not.be.null
    })
  })
}

export function connectWithUserCredentialsViaGui (email, password) {
  cy.get('input[type=email]').clear().type(email)
  cy.get('input[type=password]').clear().type(password)
  cy.get('button[type=button]')
    .contains('se connecter')
    .click()
}

export function getTokenDuration (token) {
  const decodedToken = jwtDecode(token)
  return duration(decodedToken.exp - decodedToken.origIat, 'seconds')
}

function openSideDrawer () {
  cy.get('.q-layout-drawer').then(drawer => {
    const transform = drawer[0].style.transform
    const sideDrawerIsVisible = transform.includes('(0px)')
    if (!sideDrawerIsVisible) {
      cy.get('.burger-menu').click()
    }
  })
}

function clickOnPageLink (label) {
  cy.get(`[id="pageLink->${label}"]`).click()
}

export function navigateTo (label) {
  openSideDrawer()
  clickOnPageLink(label)
}
