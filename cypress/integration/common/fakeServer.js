export const injectResponseFixtureIfFaked = fixture => {
  cy.fakeGraphqlResponseWithFixture(fixture)
}