describe('Checking each components on form page', () => {  
  beforeEach(() => {
    cy.visit('http://localhost:3000/employees/add');
  })


  it('checking the title bar', () => {  
    const ourTitle = 'Employee Manager';
    cy.get('[data-cy="title"]').contains(ourTitle);
    cy.get('[data-cy="title"]').should('have.length', 1);
    })
    
  it('checking back button', () => {  
    cy.get('[data-cy="back-button"]').should('have.text', 'Go Back');
    cy.get('[data-cy="back-button"]').should('have.length', 1);
    cy.visit('http://localhost:3000/');
   })

  it('checking all the form fields', () => {   
   cy.get('[data-cy="card-container"]').children().should('have.length', 7);
  })

  it('checking submit button', () => {  
    cy.get('[data-cy="submit-button"]').should('have.text', 'Submit');
    cy.get('[data-cy="submit-button"]').should('have.length', 1);
  })

})


describe('Successfully submiting the form', () => { 
  it('Valid data', () => {  
     cy.visit('http://localhost:3000/employees/add');
     cy.get("#first_name").type("cypresstes")
     cy.get("#last_name").type("lastname")
     cy.get("#email").type("ssss@fdgdg.com")
     cy.get("#number").type("+94767654354")
     cy.get("#photo").type("image")
     cy.get("button[type='submit']").click().get('form').submit();  
  })
})


describe('Show errors for invalid data when submiting the form', () => { 
  it('Invalid data', () => {  
     cy.visit('http://localhost:3000/employees/add');
     cy.get("#first_name").type("testtttttttt")
     cy.get("#last_name").type("testlastname")
     cy.get("#email").type("test@com")
     cy.get("#number").type("11111")
     cy.get("button[type='submit']").click().get('form').submit();  
  })
})