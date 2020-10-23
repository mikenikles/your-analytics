/// <reference path="../support/commands.d.ts" />

describe("/onboarding", () => {
  beforeEach(() => {
    cy.task("db:reset");
    cy.loginWithApi();
    cy.visit("/onboarding");
  });

  it("should load the /onboarding page", () => {
    cy.location("pathname").should("equal", "/onboarding");
  });

  it("should create a new website", () => {
    cy.get('input[id="firstName"]').type("Tester");
    cy.get("button[type=button]").click();
    cy.get('input[id="url"]').type("local-testing.com");
    cy.get('select[name="timezone"]').select("America/Toronto");
    cy.get("button[type=button]").click();
  });
});
