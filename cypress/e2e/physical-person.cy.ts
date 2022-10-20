/* eslint-disable spaced-comment */
/// <reference types="cypress" />

import { DateTime } from 'luxon'
import fixture from '../fixtures/physical-people.json'
import physicalPersonFixture from '../fixtures/physical-person.json'
import useSessionInterceptor from '../helpers/useSessionInterceptor'

describe('Physical Person Page', () => {
  const baseUrl = Cypress.env('NEXT_PUBLIC_BASE_URL')
  beforeEach(() => {
    useSessionInterceptor()
  })

  it('should show a list of Physical people', () => {
    cy.intercept('GET', `${baseUrl}/physical-people`, { fixture: 'physical-people.json' }).as(
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

  it('Should create a new Physical Person', () => {
    cy.intercept('GET', `${baseUrl}/physical-people`, { fixture: 'physical-people.json' }).as(
      'getPhysicalPeople',
    )
    cy.intercept('POST', `${baseUrl}/physical-people`, { statusCode: 201 }).as('savePhysicalPerson')

    cy.visit('/physical-person')
    cy.wait(['@getPhysicalPeople'])

    cy.get('#newBtn').click()

    cy.get('[name="name"]').type('name')
    cy.get('[name="cpf"]').type('11111111115')
    cy.get('[name="rg"]').type('rg')
    cy.get('[name="rg_emissor"]').type('rg emissor')
    cy.get('[name="rg_emissor_uf"]').type('uf')
    cy.get('#datepicker-birthdate').type('15/09/2022')

    cy.get('#saveBtn').click()

    cy.wait(['@savePhysicalPerson'])

    cy.get('#notistack-snackbar').should('have.text', 'Pessoa Física adicionada com sucesso')
  })

  it('should view an existing Physical person', () => {
    cy.intercept('GET', `${baseUrl}/physical-people`, {
      fixture: 'physical-people.json',
    }).as('getPhysicalPeople')

    cy.intercept('GET', `${baseUrl}/physical-people/*`, {
      statusCode: 200,
      fixture: 'physical-person.json',
    }).as('getPhysicalPerson')

    cy.visit('/physical-person')
    cy.wait(['@getPhysicalPeople'])

    cy.get('#0-name').click()
    cy.wait(['@getPhysicalPerson'])

    cy.get('[name="name"]').should('have.value', fixture[0].name)
    cy.get('[name="cpf"]').should('have.value', fixture[0].cpf)
    cy.get('[name="rg"]').should('have.value', fixture[0].rg)
    cy.get('[name="rg_emissor"]').should('have.value', fixture[0].rg_emissor)
    cy.get('[name="rg_emissor_uf"]').should('have.value', fixture[0].rg_emissor_uf)
    cy.get('#datepicker-birthdate').should(
      'have.value',
      DateTime.fromISO(fixture[0].birthdate).toFormat('dd/LL/yyyy'),
    )
  })

  it('should edit an existing Physical person', () => {
    cy.intercept('GET', `${baseUrl}/physical-people`, {
      fixture: 'physical-people.json',
    }).as('getPhysicalPeople')
    cy.intercept('GET', `${baseUrl}/physical-people/*`, {
      statusCode: 200,
      fixture: 'physical-person.json',
    }).as('getPhysicalPerson')
    cy.intercept('PUT', `${baseUrl}/physical-people/*`, { statusCode: 201 }).as(
      'savePhysicalPerson',
    )

    cy.visit('/physical-person')
    cy.wait(['@getPhysicalPeople'])

    cy.get('#0-name').click()
    cy.wait(['@getPhysicalPerson'])
    cy.get('#editBtn').click()

    cy.get('[name="name"]').clear({ force: true }).type(physicalPersonFixture.name)
    cy.get('[name="cpf"]').clear({ force: true }).type(physicalPersonFixture.cpf)
    cy.get('[name="rg"]').clear({ force: true }).type(physicalPersonFixture.rg)
    cy.get('[name="rg_emissor"]').clear({ force: true }).type(physicalPersonFixture.rg_emissor)
    cy.get('[name="rg_emissor_uf"]')
      .clear({ force: true })
      .type(physicalPersonFixture.rg_emissor_uf)
    cy.get('#datepicker-birthdate').clear({ force: true }).type(physicalPersonFixture.birthdate)

    cy.get('#saveBtn').click()

    cy.wait(['@savePhysicalPerson'])

    cy.get('#notistack-snackbar').should('have.text', 'Pessoa Física editada com sucesso')
  })

  it('should delete an existing Physical person', () => {
    cy.intercept('GET', `${baseUrl}/physical-people`, {
      fixture: 'physical-people.json',
    }).as('getPhysicalPeople')
    cy.intercept('GET', `${baseUrl}/physical-people/*`, {
      statusCode: 200,
      fixture: 'physical-person.json',
    }).as('getPhysicalPerson')
    cy.intercept('POST', `${baseUrl}/physical-people`, { statusCode: 201 }).as('savePhysicalPerson')
    cy.intercept('DELETE', `${baseUrl}/physical-people/*`, { statusCode: 200 }).as(
      'deletePhysicalPerson',
    )

    cy.visit('/physical-person')
    cy.wait(['@getPhysicalPeople'])

    cy.get('#0-name').click()
    cy.wait(['@getPhysicalPerson'])

    cy.get('#deleteBtn').click({ force: true })
    cy.get('#dialog-confirm-btn').click()

    cy.wait(['@deletePhysicalPerson'])

    cy.get('#notistack-snackbar').should('have.text', 'Pessoa Física deletada com sucesso!')
  })
})
