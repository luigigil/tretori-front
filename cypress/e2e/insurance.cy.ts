/* eslint-disable spaced-comment */
/// <reference types="cypress" />

import fixture from '../fixtures/insurances.json'
import useSessionInterceptor from '../helpers/useSessionInterceptor'

describe('Insurance Page', () => {
  const baseUrl = Cypress.env('NEXT_PUBLIC_BASE_URL')
  beforeEach(() => {
    useSessionInterceptor()
  })

  it('should show a list of insurances', () => {
    cy.intercept('GET', `${baseUrl}/insurance`, { fixture: 'insurances.json' }).as('getInsurance')
    cy.visit('/insurances')
    cy.wait(['@getInsurance'])

    cy.get('#0-fantasy_name').should('have.text', fixture[0].fantasy_name)
    cy.get('#0-cnpj').should('have.text', fixture[0].cnpj)
    cy.get('#0-type').should('have.text', fixture[0].type)
    cy.get('#0-size').should('have.text', fixture[0].size)
    cy.get('#0-uf').should('have.text', fixture[0].uf)

    cy.get('#1-fantasy_name').should('have.text', fixture[1].fantasy_name)
    cy.get('#1-cnpj').should('have.text', fixture[1].cnpj)
    cy.get('#1-type').should('have.text', fixture[1].type)
    cy.get('#1-size').should('have.text', fixture[1].size)
    cy.get('#1-uf').should('have.text', fixture[1].uf)
  })

  it('should create a new insurance', () => {
    cy.intercept('GET', `${baseUrl}/insurance`, { fixture: 'insurances.json' }).as('getInsurance')
    cy.intercept('POST', `${baseUrl}/insurance`, { statusCode: 201 }).as('saveInsurance')

    cy.visit('/insurances')
    cy.wait(['@getInsurance'])

    cy.get('#newBtn').click()

    cy.get('[name="email"]').type('email')
    cy.get('[name="phone"]').type('phone')
    cy.get('[name="phone_secondary"]').type('phone_secondary')
    cy.get('[name="address"]').type('address')
    cy.get('[name="cep"]').type('cep')
    cy.get('[name="city"]').type('city')
    cy.get('[name="neighborhood"]').type('neighborhood')
    cy.get('[name="uf"]').type('uf')
    cy.get('[name="fantasy_name"]').type('fantasy_name')
    cy.get('[name="cnpj"]').type('cnpj')
    cy.get('[name="social_reason"]').type('social_reason')
    cy.get('[name="type"]').type('type')
    cy.get('[name="size"]').type('size')

    cy.get('#saveBtn').click()

    cy.wait(['@saveInsurance'])

    cy.get('#notistack-snackbar').should('have.text', 'Seguradora adicionada com sucesso')
  })

  it('should view an existing insurance', () => {
    cy.intercept('GET', `${baseUrl}/insurance`, { fixture: 'insurances.json' }).as('getInsurances')
    cy.intercept('GET', `${baseUrl}/insurance/*`, {
      statusCode: 200,
      fixture: 'insurance.json',
    }).as('getInsurance')

    cy.visit('/insurances')
    cy.wait(['@getInsurances'])

    cy.get('#0-fantasy_name').click()

    cy.wait(['@getInsurance'])
    cy.get('[name="email"]').should('have.value', fixture[0].email)
    cy.get('[name="phone"]').should('have.value', fixture[0].phone)
    cy.get('[name="phone_secondary"]').should('have.value', fixture[0].phone_secondary)
    cy.get('[name="address"]').should('have.value', fixture[0].address)
    cy.get('[name="cep"]').should('have.value', fixture[0].cep)
    cy.get('[name="city"]').should('have.value', fixture[0].city)
    cy.get('[name="neighborhood"]').should('have.value', fixture[0].neighborhood)
    cy.get('[name="uf"]').should('have.value', fixture[0].uf)
    cy.get('[name="fantasy_name"]').should('have.value', fixture[0].fantasy_name)
    cy.get('[name="cnpj"]').should('have.value', fixture[0].cnpj)
    cy.get('[name="social_reason"]').should('have.value', fixture[0].social_reason)
    cy.get('[name="type"]').should('have.value', fixture[0].type)
    cy.get('[name="size"]').should('have.value', fixture[0].size)
  })

  it('should edit an existing insurance', () => {
    cy.intercept('GET', `${baseUrl}/insurance`, { fixture: 'insurances.json' }).as('getInsurances')
    cy.intercept('GET', `${baseUrl}/insurance/*`, {
      statusCode: 200,
      fixture: 'insurance.json',
    }).as('getInsurance')
    cy.intercept('PUT', `${baseUrl}/insurance/*`, { statusCode: 200 }).as('editInsurance')

    cy.visit('/insurances')
    cy.wait(['@getInsurances'])

    cy.get('#0-fantasy_name').click()

    cy.wait(['@getInsurance'])
    cy.get('#editBtn').click()

    cy.get('[name="email"]').type('email')
    cy.get('[name="phone"]').type('phone')
    cy.get('[name="phone_secondary"]').type('phone_secondary')
    cy.get('[name="address"]').type('address')
    cy.get('[name="cep"]').type('cep')
    cy.get('[name="city"]').type('city')
    cy.get('[name="neighborhood"]').type('neighborhood')
    cy.get('[name="uf"]').type('uf')
    cy.get('[name="fantasy_name"]').type('fantasy_name')
    cy.get('[name="cnpj"]').type('cnpj')
    cy.get('[name="social_reason"]').type('social_reason')
    cy.get('[name="type"]').type('type')
    cy.get('[name="size"]').type('size')

    cy.get('#saveBtn').click()

    cy.wait(['@editInsurance'])

    cy.get('#notistack-snackbar').should('have.text', 'Seguradora editada com sucesso')
  })

  it('should delete an existing insurance', () => {
    cy.intercept('GET', `${baseUrl}/insurance`, { fixture: 'insurances.json' }).as('getInsurances')
    cy.intercept('GET', `${baseUrl}/insurance/*`, {
      statusCode: 200,
      fixture: 'insurance.json',
    }).as('getInsurance')
    cy.intercept('DELETE', `${baseUrl}/insurance/*`, { statusCode: 200 }).as('deleteInsurance')

    cy.visit('/insurances')
    cy.wait(['@getInsurances'])

    cy.get('#0-fantasy_name').click()

    cy.wait(['@getInsurance'])
    cy.get('#deleteBtn').click()

    cy.get('#dialog-confirm-btn').click()

    cy.wait(['@deleteInsurance'])

    cy.get('#notistack-snackbar').should('have.text', 'Seguradora deletada com sucesso!')
  })
})
