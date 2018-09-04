describe("My First Test", function() {
  it("Visits the Dashboard", function() {
    cy.visit("http://localhost:3000/dashboard");
  });
  it("Title Is Correct", function() {
    cy.title().should("include", "The");
  });
  it("Site has Welcome", function() {
    cy.contains("Welcome");
  });
  it("Add button workss", function() {
    cy.visit("http://localhost:3000/dashboard");
    cy.contains("Add").click();
  });
  it("Add your expenses works", function() {
    cy.visit("http://localhost:3000/dashboard");
    cy.contains("Add").click();
    cy.contains("Add your expenses")
      .click()
      .get("input")
      .first()
      .type("A really cool name");
  });
});
