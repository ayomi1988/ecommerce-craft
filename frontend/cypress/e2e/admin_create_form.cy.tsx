describe('Checking each components on form page', () => {  
  beforeEach(() => {
    cy.visit('http://localhost:3000/dashboard/admin/create');
  })

    
  it('checking Login button', () => {  
    cy.get('[data-cy="back-button"]').should('have.text', 'I Already Have a Login');
    cy.get('[data-cy="back-button"]').should('have.length', 1);
    cy.visit('http://localhost:3000/dashboard/login');
   })

  it('checking all the form fields', () => {   
   cy.get('[data-cy="card-container"]').children().should('have.length', 5);
  })

  it('checking submit button', () => {  
    cy.get('[data-cy="submit-button"]').should('have.text', 'Signup');
    cy.get('[data-cy="submit-button"]').should('have.length', 1);
  })

})


describe('Successfully creating an admin account', () => { 
  it('Valid data', () => {  
     cy.visit('http://localhost:3000/dashboard/admin/create');
     cy.get("#first_name").type("cypresstes")
     cy.get("#user_name").type("lastname")
     cy.get("#email").type("ssss@fdgdg.com")
     cy.get("#password").type("123456")
     cy.get("button[type='submit']").click().get('form').submit();  
 })
})


describe('Admin login', () => { 
  it('Navigate to Login page from Signup page', () => {  
     cy.visit('http://localhost:3000/dashboard/admin/create');
     cy.get('[data-cy="back-button"]').should('have.text', 'I Already Have a Login');
     cy.get('[data-cy="back-button"]').should('have.length', 1);
     cy.visit('http://localhost:3000/dashboard/login');
 })

 it('checking all the form fields', () => {  
  cy.visit('http://localhost:3000/dashboard/login'); 
  cy.get('[data-cy="card-container"]').children().should('have.length', 3);
 })

 it('Admin Signin Button', () => {  
  cy.visit('http://localhost:3000/dashboard/login');
   cy.get('[data-cy="submit-button"]').should('have.text', 'Login');
   cy.get('[data-cy="submit-button"]').should('have.length', 1);
 })

 it('Valid data', () => {   
  cy.visit('http://localhost:3000/dashboard/login');
  cy.get("#user_name").type("admin")
  cy.get("#password").type("123")
  cy.visit('http://localhost:3000/dashboard');
})
})


