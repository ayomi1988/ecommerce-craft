import React from 'react';
import Loader from './Loader';

describe('<TitleBar />', () => {
  beforeEach(() => {
    cy.mount(<Loader/>);
  })

  it('renders', () => {
    cy.get('[data-cy="loader"]').should('have.length', 1);
  })
})