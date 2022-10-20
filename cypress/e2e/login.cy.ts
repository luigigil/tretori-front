/* eslint-disable spaced-comment */
/// <reference types="cypress" />

describe('Login Page', () => {
  it('should login into the system using email and password', () => {
    const username = Cypress.env('USER')
    const password = Cypress.env('PW')

    cy.visit('/login')

    cy.get('#email').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
  })

  it('should show random image from public folder', () => {
    cy.visit('/login')

    cy.get('#login-image')
      .should('have.css', 'backgroundImage')
      .and('match', /\/images\/login\/login-/)
  })
})
