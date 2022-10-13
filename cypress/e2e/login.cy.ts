/// <reference types="cypress" />

describe('Login Page', () => {
  it('should login into the system', () => {
    const username = Cypress.env('USER')
    const password = Cypress.env('PW')
    const baseUrl = Cypress.env('SITE_NAME')
    const cookieName = Cypress.env('COOKIE_NAME')

    cy.intercept(`${baseUrl}/api/auth/*`).as('login')
    cy.visit(`${baseUrl}/login`)

    cy.get('#email').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()

    cy.wait('@login')

    cy.getCookie(cookieName).should('exist')
  })
})
