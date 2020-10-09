/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in with an API call.
     * This allows bypassing the Magic link authentication step.
     *
     * @example cy.loginWithApi("test-user@your-analytics.org")
     */
    loginWithApi(): Chainable<Response>;
  }
}
