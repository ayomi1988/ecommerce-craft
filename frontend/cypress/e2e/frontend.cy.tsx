describe('Client view', () => {  
  beforeEach(() => {
    cy.visit('http://localhost:3000/crafts');
  })

   it('Successfully creating an user account', () => {  
    cy.visit('http://localhost:3000/crafts/signup');
    cy.get("#first_name").type("cypresstes")
    cy.get("#user_name").type("lastname")
    cy.get("#email").type("ssss@fdgdg.com")
    cy.get("#password").type("123456")
    cy.get("button[type='submit']").click().get('form').submit();  
    cy.visit('http://localhost:3000/crafts/signin'); 
})

it('checking user account fields', () => {  
  cy.visit('http://localhost:3000/crafts/signin'); 
  cy.get('[data-cy="card-container"]').children().should('have.length', 3);
 })

 it('User Login', () => {   
  cy.visit('http://localhost:3000/crafts/signin');
  cy.get("#user_name").type("ayomi")
  cy.get("#password").type("123")
  cy.visit('http://localhost:3000/crafts');
})


})




