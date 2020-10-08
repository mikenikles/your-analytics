/// <reference path="../support/commands.d.ts" />

describe("/onboarding", () => {
  beforeEach(() => {
    cy.loginWithApi();
    cy.visit("/onboarding");
  });

  it("should load the /onboarding page", () => {
    cy.location("pathname").should("equal", "/onboarding");
  });

  it("should create a new website", () => {
    cy.get('input[name="firstname"]').type("Tester");
    cy.get('input[name="url"]').type("local-testing.com");
    cy.get('select[name="timezone"]').select("America/Toronto");
    cy.get("button[type=submit]").click();
  });
});
