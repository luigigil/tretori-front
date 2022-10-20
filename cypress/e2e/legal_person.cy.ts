/* eslint-disable spaced-comment */
/// <reference types="cypress" />

import fixture from '../fixtures/legal-people.json'
import useSessionInterceptor from '../helpers/useSessionInterceptor'

describe('Customer - Legal person', () => {
  const baseUrl = Cypress.env('NEXT_PUBLIC_BASE_URL')
  beforeEach(() => {
    useSessionInterceptor()
  })

  it('should show a list of Legal people', () => {
    cy.intercept('GET', `${baseUrl}/legal-people`, { fixture: 'legal-people.json' }).as(
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
    cy.intercept('GET', `${baseUrl}/legal-people`, { fixture: 'legal-people.json' }).as(
      'getLegalPerson',
    )
    cy.intercept('POST', `${baseUrl}/legal-people`, { statusCode: 201 }).as('saveLegalPerson')

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

  it('Should present required message errors on create a new Legal Person', () => {
    cy.intercept('GET', `${baseUrl}/legal-people`, { fixture: 'legal-people.json' }).as(
      'getLegalPerson',
    )

    cy.visit('/legal-person')
    cy.wait(['@getLegalPerson'])

    cy.get('#newBtn').click()

    cy.get('#saveBtn').click()
    cy.contains('#cnpj-helper-text', '"cnpj" is not allowed to be empty')
    cy.contains('#fantasy_name-helper-text', '"fantasy_name" is not allowed to be empty')
    cy.contains('#social_reason-helper-text', '"social_reason" is not allowed to be empty')
    cy.contains('#type-helper-text', '"type" is not allowed to be empty')
    cy.contains('#size-helper-text', '"size" is not allowed to be empty')
  })

  it('Should present min characters message errors on create a new Legal Person', () => {
    cy.intercept('GET', `${baseUrl}/legal-people`, { fixture: 'legal-people.json' }).as(
      'getLegalPerson',
    )

    cy.visit('/legal-person')
    cy.wait(['@getLegalPerson'])

    cy.get('#newBtn').click()

    cy.get('[name="cnpj"]').type('2')
    cy.get('[name="fantasy_name"]').type('Akts')
    cy.get('#saveBtn').click()
    cy.contains('#cnpj-helper-text', '"cnpj" length must be at least 2 characters long')
  })

  it('Should present max characters message errors on create a new Legal Person', () => {
    cy.intercept('GET', `${baseUrl}/legal-people`, { fixture: 'legal-people.json' }).as(
      'getLegalPerson',
    )

    cy.visit('/legal-person')
    cy.wait(['@getLegalPerson'])

    cy.get('#newBtn').click()

    cy.get('[name="cnpj"]').type('2'.padEnd(200 + 1, '2'))
    cy.get('[name="fantasy_name"]').type('2'.padEnd(20 + 1, '2'))
    cy.get('[name="social_reason"]').type('2'.padEnd(50 + 1, '2'))
    cy.get('[name="type"]').type('2'.padEnd(20 + 1, '2'))
    cy.get('[name="size"]').type('2'.padEnd(20 + 1, '2'))
    cy.get('#saveBtn').click()
    cy.contains(
      '#cnpj-helper-text',
      '"cnpj" length must be less than or equal to 200 characters long',
    )
    cy.contains(
      '#fantasy_name-helper-text',
      '"fantasy_name" length must be less than or equal to 20 characters long',
    )
    cy.contains(
      '#social_reason-helper-text',
      '"social_reason" length must be less than or equal to 50 characters long',
    )
    cy.contains(
      '#type-helper-text',
      '"type" length must be less than or equal to 20 characters long',
    )
    cy.contains(
      '#size-helper-text',
      '"size" length must be less than or equal to 20 characters long',
    )
  })

  it('should view an existing Legal person', () => {
    cy.intercept('GET', `${baseUrl}/legal-people`, { fixture: 'legal-people.json' }).as(
      'getLegalPeople',
    )
    cy.intercept('GET', `${baseUrl}/legal-people/*`, {
      statusCode: 200,
      fixture: 'legal-person.json',
    }).as('getLegalPerson')

    cy.visit('/legal-person')
    cy.wait(['@getLegalPeople'])

    cy.get('#0-cnpj').click()

    cy.wait(['@getLegalPerson'])

    cy.get('[name="cnpj"]').should('have.value', fixture[0].cnpj)
    cy.get('[name="fantasy_name"]').should('have.value', fixture[0].fantasy_name)
    cy.get('[name="social_reason"]').should('have.value', fixture[0].social_reason)
    cy.get('[name="type"]').should('have.value', fixture[0].type)
    cy.get('[name="size"]').should('have.value', fixture[0].size)
  })

  it('should edit an existing Legal person', () => {
    cy.intercept('GET', `${baseUrl}/legal-people`, { fixture: 'legal-people.json' }).as(
      'getLegalPeople',
    )
    cy.intercept('GET', `${baseUrl}/legal-people/*`, {
      statusCode: 200,
      fixture: 'legal-person.json',
    }).as('getLegalPerson')
    cy.intercept('PUT', `${baseUrl}/legal-people/*`, { statusCode: 200 }).as('editLegalPerson')

    cy.visit('/legal-person')
    cy.wait(['@getLegalPeople'])

    cy.get('#0-cnpj').click()
    cy.wait(['@getLegalPerson'])

    cy.get('#editBtn').click()

    cy.get('[name="cnpj"]').type('1')
    cy.get('[name="fantasy_name"]').type('A')
    cy.get('[name="social_reason"]').type('A')
    cy.get('[name="type"]').type('A')
    cy.get('[name="size"]').type('A')

    cy.get('#saveBtn').click()

    cy.wait(['@editLegalPerson'])

    cy.get('#notistack-snackbar').should('have.text', 'Pessoa Jurídica editada com sucesso')
  })

  it('should delete an existing legal person', () => {
    cy.intercept('GET', `${baseUrl}/legal-people`, { fixture: 'legal-people.json' }).as(
      'getLegalPeople',
    )
    cy.intercept('GET', `${baseUrl}/legal-people/*`, {
      statusCode: 200,
      fixture: 'legal-person.json',
    }).as('getLegalPerson')
    cy.intercept('DELETE', `${baseUrl}/legal-people/*`, { statusCode: 200 }).as('deleteLegalPerson')

    cy.visit('/legal-person')
    cy.wait(['@getLegalPeople'])

    cy.get('#0-cnpj').click()
    cy.wait(['@getLegalPerson'])

    cy.get('#deleteBtn').click()
    cy.get('#dialog-confirm-btn').click()
    cy.wait(['@deleteLegalPerson'])

    cy.get('#notistack-snackbar').should('have.text', 'Pessoa Jurídica deletada com sucesso!')
  })
})
