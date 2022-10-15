/* eslint-disable spaced-comment */
/// <reference types="cypress" />

import fixture from '../fixtures/legal-people.json'

describe('Customer - Legal person', () => {
  const baseUrl = Cypress.env('NEXT_PUBLIC_BASE_URL')
  before(() => {
    {
      const username = Cypress.env('USER')
      const password = Cypress.env('PW')
      const cookieName = Cypress.env('COOKIE_NAME')

      cy.visit('/login')

      cy.get('#email').type(username)
      cy.get('#password').type(password)
      cy.get('#login-button').click()

      cy.visit('/')
      cy.getCookie(cookieName).should('exist')
    }
  })

  it('should show a list of Legal people', () => {
    cy.intercept('GET', `${baseUrl}/legal-person`, { fixture: 'legal-people.json' }).as(
      'getLegalPerson',
    )
    cy.visit('/legal-person')
    cy.wait(['@getLegalPerson'])

    cy.get('#0-code').should('be.empty')
    cy.get('#0-cnpj').should('have.text', fixture[0].cnpj)
    cy.get('#0-fantasy_name').should('have.text', fixture[0].fantasy_name)
    cy.get('#0-social_reason').should('have.text', fixture[0].social_reason)

    cy.get('#1-code').should('be.empty')
    cy.get('#1-cnpj').should('have.text', fixture[1].cnpj)
    cy.get('#1-fantasy_name').should('have.text', fixture[1].fantasy_name)
    cy.get('#1-social_reason').should('have.text', fixture[1].social_reason)
  })

  it('Should create a new Legal Person', () => {
    cy.intercept('GET', `${baseUrl}/legal-person`, { fixture: 'legal-people.json' }).as(
      'getLegalPerson',
    )
    cy.intercept('POST', `${baseUrl}/legal-person`, { statusCode: 201 }).as('saveLegalPerson')

    cy.visit('/legal-person')
    cy.wait(['@getLegalPerson'])

    cy.get('#newBtn').click()

    cy.get('[name="cnpj"]').type('23789000000100')
    cy.get('[name="fantasy_name"]').type('Akts')
    cy.get('[name="social_reason"]').type('Teste')
    cy.get('[name="type"]').type('Fornecedor')
    cy.get('[name="size"]').type('Micro')

    cy.get('#saveBtn').click()

    cy.wait(['@saveLegalPerson'])

    cy.get('#notistack-snackbar').should('have.text', 'Pessoa Jurídica adicionada com sucesso')
  })
})
