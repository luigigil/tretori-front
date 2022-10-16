/* eslint-disable spaced-comment */
/// <reference types="cypress" />

import fixture from '../fixtures/physical_people.json'
import useSessionInterceptor from '../helpers/useSessionInterceptor'

describe('Insurance Page', () => {
  const baseUrl = Cypress.env('NEXT_PUBLIC_BASE_URL')
  beforeEach(() => {
    useSessionInterceptor()
  })

  it.only('it should show a list of physical people', () => {
    cy.intercept('GET', `${baseUrl}/physical-person`, { fixture: 'physical_people.json' }).as(
      'getPhysicalPeople',
    )
    cy.visit('/physical-person')
    cy.wait(['@getPhysicalPeople'])

    cy.get('#0-name').should('have.text', fixture[0].name)
    cy.get('#0-cpf').should('have.text', fixture[0].cpf)
    cy.get('#0-rg').should('have.text', fixture[0].rg)

    cy.get('#1-name').should('have.text', fixture[1].name)
    cy.get('#1-cpf').should('have.text', fixture[1].cpf)
    cy.get('#1-rg').should('have.text', fixture[1].rg)
  })

  it('', () => {})

  it('', () => {})

  it('', () => {})

  it('', () => {})
})
