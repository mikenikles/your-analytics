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
    const websiteUrl = "local-testing.com";
    cy.get('input[id="firstName"]').type("Tester");
    cy.get("button[type=button]").click();
    cy.get('input[id="url"]').type(websiteUrl);
    cy.get('select[name="timezone"]').select("America/Toronto");
    cy.get("button[type=button]").click();
    cy.get("#script").should("contain.value", `data-domain="${websiteUrl}"`);
    cy.get(`a[href="https://${websiteUrl}"]`).contains(websiteUrl);
  });
});
