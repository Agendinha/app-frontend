/// <reference types="cypress"/>

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
    cy.get('.text-xl').should('have.text', 'Logout feito com sucesso!')
  })
  
})

describe('Testes de cadastro:', () => {
  it('Cadastro de parceiro com sucesso!', () => {
    cy.visit('https://app.agendinha.online/')
    cy.get('a').click()
    criarUsuario('Parceiro')    
  })
  it('Cadastro de cliente com sucesso!', () => {
    cy.visit('https://app.agendinha.online/')
    cy.get('a').click()
    criarUsuario('Cliente')    
  })
})

function criarUsuario(type) {
  let horas = new Date().getHours().toString()
  let minutos = new Date().getMinutes().toString()
  let seg = new Date().getSeconds().toString()
  let nome = "Usuario" + horas + minutos + seg
  let email = "email" + horas + minutos + seg + "@example.com"
  let senha = horas + minutos + seg + 'Senha@'
  let infoUsuario = {nome, email, senha}

  cy.get('#nomeCompleto').type(nome)
  cy.get('#email').type(email)
  cy.get('#password').type(senha)
  cy.get('#confirmPassword').type(senha)
  cy.get('#phone').type('123456789')
  cy.get('#userType').select(type)
  cy.get('.bg-orange-400 > .flex').click()
  cy.get('.swal-title').should('have.text', 'Sucesso')

  return infoUsuario

}