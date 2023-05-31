import TitleBar from './Title';


describe('<TitleBar />', () => {
  it('shows title text', () => {
    cy.mount(<TitleBar />);
    cy.get('[data-cy="title"]').contains('Employee Manager').should('exist');
  })
})