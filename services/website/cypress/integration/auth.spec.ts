describe("/auth", () => {
  beforeEach(() => {
    cy.visit("/auth");
  });

  it("should redirect unauthenticated users to the /auth page", () => {
    cy.visit("/dashboard");
    cy.location("pathname").should("equal", "/auth");
  });

  /**
   * Skip until test users are available as per https://twitter.com/ikscodes/status/1313637273498337281
   */
  it.skip("should authenticate and redirect to the /onboarding page", () => {
    cy.get('input[name="email"]').type(
      "hello+ya-automated-tests@mikenikles.com"
    );
    cy.get("button[type=submit]").click();
    cy.location("pathname", {
      timeout: 1000 * 60, // Time to manually click the auth link in the email
    }).should("equal", "/onboarding");
  });
});
