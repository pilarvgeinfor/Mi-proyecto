describe('Crypto App E2E Tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200'); 
  });

  it('Carga al menos 1 elemento en la tabla', () => {
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });

  it('El primer elemento es el de mayor capitalización de mercado (orden descendente)', () => {
    cy.get('table tbody tr').then(($rows) => {
      const firstCap = parseFloat($rows.eq(0).find('[data-cy="market-cap"]').text().replace(/[^0-9.]/g, ''));
      const secondCap = parseFloat($rows.eq(1).find('[data-cy="market-cap"]').text().replace(/[^0-9.]/g, ''));
      expect(firstCap).to.be.greaterThan(secondCap);
    });
  });

  it('El cambio de precio en 24h aparece verde si es positivo o rojo si es negativo', () => {
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).find('td').eq(5).then(($cell) => {
        const text = $cell.text().trim();
        const value = parseFloat(text.replace(/[^0-9.-]+/g, ''));
        if (value > 0) {
          expect($cell).to.have.class('text-success');
        } else if (value < 0) {
          expect($cell).to.have.class('text-danger');
        }
      });
    });
  });

  it('Cada precio tiene el símbolo del dólar', () => {
    cy.get('[data-cy="price"]').each(($cell) => {
      cy.wrap($cell).invoke('text').should('match', /\$/);
    });
  });

  it('Filtra monedas con el buscador y comprueba que están en la tabla', () => {
    const searchTerm= 'Lido Staked Ether';

    cy.get('[data-cy="search-input"]').type(searchTerm);

    cy.get('table tbody tr').should('have.length.greaterThan', 0).first().should('contain.text', searchTerm);
  });
});
