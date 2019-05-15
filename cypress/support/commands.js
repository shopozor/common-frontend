import { responseStub } from './stubHelpers'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const isGraphQL = (path, method) => path.includes('/graphql/') && method === 'POST'

Cypress.Commands.add('fakeGraphqlResponse', (response, isFake = Cypress.env('fakeGraphql')) => {
  cy.on('window:before:load', (win) => {
    const originalFunction = win.fetch

    function fetch (path, { body, method }) {
      if (isFake && isGraphQL(path, method)) {
        return responseStub(response)
      }
      return originalFunction.apply(this, arguments)
    }

    cy.stub(win, 'fetch', fetch).as('graphql')
  })
})

Cypress.Commands.add('fakeGraphqlResponseWithFixture', fixture => {
  cy.fixture(fixture)
    .then(json => {
      cy.fakeGraphqlResponse(json)
    })
})
