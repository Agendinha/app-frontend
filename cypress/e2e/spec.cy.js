describe('Testes de login:', () => {
  it('E-mai ou senha invalidos', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#email').type('hello@cypress.io')
    cy.get('#password').type('123')
    cy.get('.bg-orange-400 > .flex').click()
    cy.get('.swal-title').should('have.text', 'Erro')
    cy.get('.swal-text').should('have.text', 'Email ou senha inválidos!')
  })
  it('Login com sucesso!', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('teste')
    cy.get('.bg-orange-400 > .flex').click()
    cy.get('button').click()
    cy.get('.text-xl').should('have.text', 'Login bem sucedido!')
  })
})