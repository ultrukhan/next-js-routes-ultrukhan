describe('Navigation', () => {
  const labelToProt = 'Show protected information if';

  const assertShell = () => {
    cy.get('h1').contains('React Practical');
    cy.get('h2').contains("The topic 'Routes'");
  };

  it('Should navigate to the start page', () => {
    cy.visit('/');

    assertShell();
    cy.contains(labelToProt);
    cy.get('div').contains('Go to the component programmatically, by checking the box:');
    cy.get('input[type="number"]').should('exist');
    cy.get('input[type="checkbox"]').should('exist');
  });

  [3, 5].forEach((parameter) => {
    it(`Should navigate to /subtask1/${parameter} with a path parameter`, () => {
      cy.visit(`/subtask1/${parameter}`);
      assertShell();
      cy.get('div').contains(`Subtask1, parameter: ${parameter}`);
    });
  });

  [
    'name=user1',
    'name=usr&role=admin',
  ].forEach((query) => {
    it(`Should navigate to /subtask2 with query ${query}`, () => {
      cy.visit(`/subtask2?${query}`);
      assertShell();
      cy.get('div').contains(
        `Subtask2, query parameters: ${query.replaceAll('&', ', ')}`,
      );
    });
  });

  describe('Test /subtask3', () => {
    const path = '/subtask3';
    const benchmarkContent = 'Subtask3, protected information';

    it('Should navigate to /subtask3 by clicking if the condition is true', () => {
      cy.visit('/');
      cy.get('input[type="number"]').type('3');
      cy.contains(labelToProt).click();
      assertShell();
      cy.get('div').contains(benchmarkContent);
      cy.url().should('include', path);
    });

    it('Should not navigate to /subtask3 by clicking if the condition is false', () => {
      cy.visit('/');
      cy.contains(labelToProt).click();
      assertShell();
      cy.get('div').should('not.contain', benchmarkContent);
      cy.url().should('not.include', path);
    });

    it('Should not show protected information through the address bar if the condition is false', () => {
      cy.visit(path);
      assertShell();
      cy.get('div').should('not.contain', benchmarkContent);
    });

    it('Protected information should disappear as soon as the condition becomes false', () => {
      cy.visit('/');
      cy.get('input[type="number"]').clear().type('5');
      cy.contains(labelToProt).click();
      cy.get('div').contains(benchmarkContent);
      cy.url().should('include', path);
      cy.get('input[type="number"]').clear().type('2');
      cy.contains(labelToProt).click();
      cy.get('div').should('not.contain', benchmarkContent);
    });
  });

  describe('Test /subtask4', () => {
    const path = '/subtask4';
    const benchmarkContent = 'Subtask4, navigated programmatically';

    it('Should navigate to /subtask4 through the address bar', () => {
      cy.visit(path);
      assertShell();
      cy.get('div').contains(benchmarkContent);
    });

    it('Should navigate to /subtask4 programmatically', () => {
      cy.visit('/');
      cy.get('div').should('not.contain', benchmarkContent);
      cy.get('input[type="checkbox"]').check();
      assertShell();
      cy.get('div').contains(benchmarkContent);
      cy.url().should('include', path);
    });
  });
});
