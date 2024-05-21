describe('Testes de login:', () => {
  it('E-mail ou senha invalidos', () => {
    cy.visit('https://app.agendinha.online/')
    cy.get('#email').type('hello@cypress.io')
    cy.get('#password').type('123')
    cy.get('.bg-orange-400 > .flex').click()
    cy.get('.swal-title').should('have.text', 'Erro')
    cy.get('.swal-text').should('have.text', 'Email ou senha inválidos!')
  })

  it('Login com sucesso!', () => {
    cy.visit('https://app.agendinha.online/')
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('teste')
    cy.get('.bg-orange-400 > .flex').click()
    cy.get('h1 .text-2xl').should('have.text', 'Dashboard')
  })

  it('Logout com sucesso!', () => {
    cy.visit('https://app.agendinha.online/')
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('teste')
    cy.get('.bg-orange-400 > .flex').click()
    cy.get('button').click()
    cy.get('.text-xl').should('have.text', 'Logout feito com sucesso!')
  })
})
