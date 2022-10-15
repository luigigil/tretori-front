/* eslint-disable spaced-comment */
/// <reference types="cypress" />

import { DateTime } from 'luxon'
import fixture from '../fixtures/representatives.json'
import useSessionInterceptor from '../helpers/useSessionInterceptor'

describe('Representative Page', () => {
  const baseUrl = Cypress.env('NEXT_PUBLIC_BASE_URL')
  beforeEach(() => {
    useSessionInterceptor()
  })

  it('should show a list of representatives', () => {
    cy.intercept('GET', `${baseUrl}/representative`, { fixture: 'representatives.json' }).as(
      'getRepresentatives',
    )
    cy.visit('/representatives')
    cy.wait(['@getRepresentatives'])

    cy.get('#0-name').should('have.text', fixture[0].name)
    cy.get('#0-role').should('have.text', fixture[0].role)
    cy.get('#0-email').should('have.text', fixture[0].email)
    cy.get('#0-insurance').should('have.text', fixture[0].insurance)
    cy.get('#0-company').should('have.text', fixture[0].company)

    cy.get('#1-name').should('have.text', fixture[1].name)
    cy.get('#1-role').should('have.text', fixture[1].role)
    cy.get('#1-email').should('have.text', fixture[1].email)
    cy.get('#1-insurance').should('have.text', fixture[1].insurance)
    cy.get('#1-company').should('have.text', fixture[1].company)
  })

  it('should create a new representative', () => {
    cy.intercept('GET', `${baseUrl}/representative`, { fixture: 'representatives.json' }).as(
      'getRepresentatives',
    )
    cy.intercept('POST', `${baseUrl}/representative`, { statusCode: 201 }).as('saveRepresentative')

    cy.visit('/representatives')
    cy.wait(['@getRepresentatives'])

    cy.get('#newBtn').click()

    cy.get('[name="type"]').type('type')
    cy.get('[name="name"]').type('name')
    cy.get('[name="role"]').type('role')
    cy.get('[name="description"]').type('description')
    cy.get('[name="email"]').type('email')
    cy.get('[name="phone"]').type('phone')
    cy.get('#datepicker-birthdate').type('15/09/2022')
    cy.get('[name="insurance"]').type('insurance')
    cy.get('[name="company"]').type('company')

    cy.get('#saveBtn').click()

    cy.wait(['@saveRepresentative'])

    cy.get('#notistack-snackbar').should('have.text', 'Representante adicionado com sucesso')
  })

  it('should view an existing representative', () => {
    cy.intercept('GET', `${baseUrl}/representative`, { fixture: 'representatives.json' }).as(
      'getRepresentativess',
    )
    cy.intercept('GET', `${baseUrl}/representative/*`, {
      statusCode: 200,
      fixture: 'representative.json',
    }).as('getRepresentatives')

    cy.visit('/representatives')
    cy.wait(['@getRepresentativess'])

    cy.get('#0-name').click()

    cy.wait(['@getRepresentatives'])

    cy.get('[name="type"]').should('have.value', fixture[0].type)
    cy.get('[name="name"]').should('have.value', fixture[0].name)
    cy.get('[name="role"]').should('have.value', fixture[0].role)
    cy.get('[name="description"]').should('have.value', fixture[0].description)
    cy.get('[name="email"]').should('have.value', fixture[0].email)
    cy.get('[name="phone"]').should('have.value', fixture[0].phone)
    cy.get('#datepicker-birthdate').should(
      'have.value',
      DateTime.fromISO(fixture[0].birthdate).minus({ day: 1 }).toFormat('dd/LL/yyyy'),
    )
    cy.get('[name="insurance"]').should('have.value', fixture[0].insurance)
    cy.get('[name="company"]').should('have.value', fixture[0].company)
  })

  it('should edit an existing representative', () => {
    cy.intercept('GET', `${baseUrl}/representative`, { fixture: 'representatives.json' }).as(
      'getRepresentativess',
    )
    cy.intercept('GET', `${baseUrl}/representative/*`, {
      statusCode: 200,
      fixture: 'representative.json',
    }).as('getRepresentatives')
    cy.intercept('PATCH', `${baseUrl}/representative/*`, { statusCode: 200 }).as(
      'editRepresentative',
    )

    cy.visit('/representatives')
    cy.wait(['@getRepresentativess'])

    cy.get('#0-name').click()

    cy.wait(['@getRepresentatives'])
    cy.get('#editBtn').click()

    cy.get('[name="type"]').type('type')
    cy.get('[name="name"]').type('name')
    cy.get('[name="role"]').type('role')
    cy.get('[name="description"]').type('description')
    cy.get('[name="email"]').type('email')
    cy.get('[name="phone"]').type('phone')
    cy.get('#datepicker-birthdate').type('15/09/2022')
    cy.get('[name="insurance"]').type('insurance')
    cy.get('[name="company"]').type('company')

    cy.get('#saveBtn').click()

    cy.wait(['@editRepresentative'])

    cy.get('#notistack-snackbar').should('have.text', 'Representante editado com sucesso')
  })

  it('should delete an existing representative', () => {
    cy.intercept('GET', `${baseUrl}/representative`, { fixture: 'representatives.json' }).as(
      'getRepresentatives',
    )
    cy.intercept('GET', `${baseUrl}/representative/*`, {
      statusCode: 200,
      fixture: 'representative.json',
    }).as('getRepresentatives')
    cy.intercept('DELETE', `${baseUrl}/representative/*`, { statusCode: 200 }).as(
      'deleteRepresentative',
    )

    cy.visit('/representatives')
    cy.wait(['@getRepresentatives'])

    cy.get('#0-name').click()

    cy.wait(['@getRepresentatives'])
    cy.get('#deleteBtn').click()

    cy.get('#dialog-confirm-btn').click()

    cy.wait(['@deleteRepresentative'])

    cy.get('#notistack-snackbar').should('have.text', 'Representante deletado com sucesso!')
  })
})
