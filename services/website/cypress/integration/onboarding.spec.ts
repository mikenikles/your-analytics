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
    const websiteUrl = "dev-test.com";
    cy.findByLabelText("What's your first name?").type("Tester");
    cy.findByText("Next: Configure your website").click();
    cy.findByLabelText("What's your website URL?").type(websiteUrl);
    cy.findByLabelText("What's your preferred reporting timezone?").select(
      "America/Toronto"
    );
    cy.findByText("Let's go").click();

    cy.get("#script").should("contain.value", `data-domain="${websiteUrl}"`);
    cy.get(`a[href="https://${websiteUrl}"]`).contains(websiteUrl);
  });
});
