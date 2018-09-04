
    //   describe('The Home Page', function() {
    //     beforeEach(() => cy.visit('http://localhost:3000'));
    //       it('successfully loads', function() {
    //       cy.visit('/')
    //     })
    //   })

    describe('On Page Init', () => {
        beforeEach(() => cy.visit('http://localhost:3000/dashboard'));
      
      
        it('Successfully loads', () => {});
        it("Shows a placeholder", () => {
            // cy.visit("/dashbaord");
            cy.get(".profile_setup_homepage")
              .should("have.text", 'Welcome');
          });
      });