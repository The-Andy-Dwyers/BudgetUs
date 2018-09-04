// Tim's cypress

describe('On Page Init', () => {
  beforeEach(() => cy.visit('http://localhost:3000/dashboard'));

  it('Successfully loads', () => {});
  it('Shows header', () => {
    cy.get('.dashboard').find('header');
  });
  it('Test Inputs', () => {
    cy.visit('http://localhost:3000/settings');
    cy.get('input')
      .first()
      .type('Testing input!');
  });
  it('Does navbar contain images', () => {
    cy.get('.navbar').find('img');
  });

  it('Test homepage link', () => {
    cy.get('.expenses_link')
      .first()
      .trigger('mousedown');
  });
});
