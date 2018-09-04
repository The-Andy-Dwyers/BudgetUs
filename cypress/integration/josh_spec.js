describe('Test Pages', function() {
  it('should go to calendar', () => {
    cy.visit('http://localhost:3000/expenses');
    cy.get('.calendar_link').click();
  });
  it('name should exist', () => {
    cy.visit('http://localhost:3000/expenses');
    cy.get('.expensesinfo_map1_total').find('p');
  });
  it('should go to settings', () => {
    cy.visit('http://localhost:3000/expenses');
    cy.get('.settings_link').click();
  });
  it('submit a goal', () => {
    cy.visit('http://localhost:3000/settings');
    cy.get('.modal').click();
  });
  it('should logout', () => {
    cy.visit('http://localhost:3000/expenses');
    cy.get('.logout_link').click();
  });
});
