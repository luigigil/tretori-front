/* eslint-disable spaced-comment */
/// <reference types="cypress" />

import fixture from '../fixtures/customers.json'
import legalPersonCustomerFixture from '../fixtures/customer-legal-person.json'
import physicalPersonCustomerFixture from '../fixtures/customer-physical-person.json'
import useSessionInterceptor from '../helpers/useSessionInterceptor'

describe('Customers Page', () => {
  const baseUrl = Cypress.env('NEXT_PUBLIC_BASE_URL')

  beforeEach(() => {
    useSessionInterceptor()
  })

  it('should show a list of customers', () => {
    cy.intercept('GET', `${baseUrl}/customers`, {
      fixture: 'customers.json',
    }).as('getCustomers')

    cy.visit('/customers')
    cy.wait(['@getCustomers'])

    cy.get('#0-code').should('have.text', fixture[0].code)
    cy.get('#0-cep').should('have.text', fixture[0].cep)
    cy.get('#0-city').should('have.text', fixture[0].city)
    cy.get('#0-uf').should('have.text', fixture[0].uf)
    cy.get('#0-email').should('have.text', fixture[0].email)
    cy.get('#0-customer_type').should('have.text', fixture[0].customer_type)

    cy.get('#1-code').should('have.text', fixture[1].code)
    cy.get('#1-cep').should('have.text', fixture[1].cep)
    cy.get('#1-city').should('have.text', fixture[1].city)
    cy.get('#1-uf').should('have.text', fixture[1].uf)
    cy.get('#1-email').should('have.text', fixture[1].email)
    cy.get('#1-customer_type').should('have.text', fixture[1].customer_type)
  })

  it('should create a new physical person customer', () => {
    cy.intercept('GET', `${baseUrl}/customers`, {
      fixture: 'customers.json',
    }).as('getCustomers')
    cy.intercept('POST', `${baseUrl}/customers`, { statusCode: 201 }).as('saveCustomer')
    cy.intercept('POST', `${baseUrl}/physical-people`, { statusCode: 201 }).as('savePhysicalPerson')

    cy.visit('/customers')
    cy.wait(['@getCustomers'])

    cy.get('#newBtn').click()

    cy.get('#radio-physical-person').click()

    cy.get('[name="phone"]').type(fixture[0].phone)
    cy.get('[name="phone_secondary"]').type(fixture[0].phone_secondary)
    cy.get('[name="address"]').type(fixture[0].address)
    cy.get('[name="cep"]').type(fixture[0].cep)
    cy.get('[name="city"]').type(fixture[0].city)
    cy.get('[name="neighborhood"]').type(fixture[0].neighborhood)
    cy.get('[name="uf"]').type(fixture[0].uf)
    cy.get('[name="email"]').type(fixture[0].email)

    cy.get('#saveBtn').click()

    cy.wait(['@saveCustomer'])

    cy.get('#notistack-snackbar').should('have.text', 'Cliente adicionado com sucesso')

    cy.get('[name="name"]').type('João da Silva')
    cy.get('[name="cpf"]').type('02304093800')
    cy.get('[name="rg"]').type('123456789')
    cy.get('[name="rg_emissor"]').type('SSP')
    cy.get('[name="rg_emissor_uf"]').type('SP')

    cy.get('#physical-person-title-crud-buttons > #saveBtn').click()

    cy.wait(['@savePhysicalPerson'])

    cy.wait(5000)
    cy.get('#notistack-snackbar').should('have.text', 'Pessoa Física adicionada com sucesso')
  })

  it('should create a new legal person customer', () => {
    cy.intercept('GET', `${baseUrl}/customers`, {
      fixture: 'customers.json',
    }).as('getCustomers')
    cy.intercept('POST', `${baseUrl}/customers`, { statusCode: 201 }).as('saveCustomer')
    cy.intercept('POST', `${baseUrl}/legal-people`, { statusCode: 201 }).as('saveLegalPerson')

    cy.visit('/customers')
    cy.wait(['@getCustomers'])

    cy.get('#newBtn').click()

    cy.get('#radio-legal-person').click()

    cy.get('[name="phone"]').type(fixture[0].phone)
    cy.get('[name="phone_secondary"]').type(fixture[0].phone_secondary)
    cy.get('[name="address"]').type(fixture[0].address)
    cy.get('[name="cep"]').type(fixture[0].cep)
    cy.get('[name="city"]').type(fixture[0].city)
    cy.get('[name="neighborhood"]').type(fixture[0].neighborhood)
    cy.get('[name="uf"]').type(fixture[0].uf)
    cy.get('[name="email"]').type(fixture[0].email)

    cy.get('#saveBtn').click()

    cy.wait(['@saveCustomer'])

    cy.get('#notistack-snackbar').should('have.text', 'Cliente adicionado com sucesso')

    cy.get('[name="cnpj"]').type('123112312312')
    cy.get('[name="fantasy_name"]').type('Nome Fantasia')
    cy.get('[name="social_reason"]').type('Razao social')
    cy.get('[name="type"]').type('Logistica')
    cy.get('[name="size"]').type('Media')

    cy.get('#legal-person-title-crud-buttons > #saveBtn').click()

    cy.wait(['@saveLegalPerson'])

    cy.wait(5000)
    cy.get('#notistack-snackbar').should('have.text', 'Pessoa Jurídica adicionada com sucesso')
  })

  it('should view an existing physical person customer', () => {
    cy.intercept('GET', `${baseUrl}/customers`, {
      fixture: 'customers.json',
    }).as('getCustomers')
    cy.intercept('GET', `${baseUrl}/customers/*`, {
      statusCode: 200,
      fixture: 'customer-physical-person.json',
    }).as('getCustomer')

    cy.visit('/customers')
    cy.wait(['@getCustomers'])

    cy.get('#0-code').click()

    cy.wait(['@getCustomer'])

    cy.get('[name="phone"]').should('have.value', physicalPersonCustomerFixture.phone)
    cy.get('[name="phone_secondary"]').should(
      'have.value',
      physicalPersonCustomerFixture.phone_secondary,
    )
    cy.get('[name="address"]').should('have.value', physicalPersonCustomerFixture.address)
    cy.get('[name="cep"]').should('have.value', physicalPersonCustomerFixture.cep)
    cy.get('[name="city"]').should('have.value', physicalPersonCustomerFixture.city)
    cy.get('[name="neighborhood"]').should('have.value', physicalPersonCustomerFixture.neighborhood)
    cy.get('[name="uf"]').should('have.value', physicalPersonCustomerFixture.uf)
    cy.get('[name="email"]').should('have.value', physicalPersonCustomerFixture.email)
    cy.get('[name="name"]').should('have.value', physicalPersonCustomerFixture.physical_person.name)
    cy.get('[name="cpf"]').should('have.value', physicalPersonCustomerFixture.physical_person.cpf)
    cy.get('[name="rg"]').should('have.value', physicalPersonCustomerFixture.physical_person.rg)
    cy.get('[name="rg_emissor"]').should(
      'have.value',
      physicalPersonCustomerFixture.physical_person.rg_emissor,
    )
    cy.get('[name="rg_emissor_uf"]').should(
      'have.value',
      physicalPersonCustomerFixture.physical_person.rg_emissor_uf,
    )
  })

  it('should view an existing legal person customer', () => {
    cy.intercept('GET', `${baseUrl}/customers`, {
      fixture: 'customers.json',
    }).as('getCustomers')
    cy.intercept('GET', `${baseUrl}/customers/*`, {
      statusCode: 200,
      fixture: 'customer-legal-person.json',
    }).as('getCustomer')

    cy.visit('/customers')
    cy.wait(['@getCustomers'])

    cy.get('#0-code').click()

    cy.wait(['@getCustomer'])

    cy.get('[name="phone"]').should('have.value', legalPersonCustomerFixture.phone)
    cy.get('[name="phone_secondary"]').should(
      'have.value',
      legalPersonCustomerFixture.phone_secondary,
    )
    cy.get('[name="address"]').should('have.value', legalPersonCustomerFixture.address)
    cy.get('[name="cep"]').should('have.value', legalPersonCustomerFixture.cep)
    cy.get('[name="city"]').should('have.value', legalPersonCustomerFixture.city)
    cy.get('[name="neighborhood"]').should('have.value', legalPersonCustomerFixture.neighborhood)
    cy.get('[name="uf"]').should('have.value', legalPersonCustomerFixture.uf)
    cy.get('[name="email"]').should('have.value', legalPersonCustomerFixture.email)
    cy.get('[name="cnpj"]').should('have.value', legalPersonCustomerFixture.legal_person.cnpj)
    cy.get('[name="fantasy_name"]').should(
      'have.value',
      legalPersonCustomerFixture.legal_person.fantasy_name,
    )
    cy.get('[name="social_reason"]').should(
      'have.value',
      legalPersonCustomerFixture.legal_person.social_reason,
    )
    cy.get('[name="type"]').should('have.value', legalPersonCustomerFixture.legal_person.type)
    cy.get('[name="size"]').should('have.value', legalPersonCustomerFixture.legal_person.size)
  })

  it('should edit an existing physical person customer', () => {
    cy.intercept('GET', `${baseUrl}/customers`, {
      fixture: 'customers.json',
    }).as('getCustomers')
    cy.intercept('GET', `${baseUrl}/customers/*`, {
      statusCode: 200,
      fixture: 'customer-physical-person.json',
    }).as('getCustomer')
    cy.intercept('PUT', `${baseUrl}/customers/*`, {
      statusCode: 200,
    }).as('editCustomer')
    cy.intercept('PUT', `${baseUrl}/physical-people/*`, {
      statusCode: 200,
    }).as('editPhysicalPerson')

    cy.visit('/customers')
    cy.wait(['@getCustomers'])

    cy.get('#0-code').click()

    cy.wait(['@getCustomer'])
    cy.get('#customers-title-crud-buttons > #editBtn').click({ force: true })

    cy.get('#radio-physical-person').click()

    cy.get('[name="phone"]').type(fixture[0].phone)
    cy.get('[name="phone_secondary"]').type(fixture[0].phone_secondary)
    cy.get('[name="address"]').type(fixture[0].address)
    cy.get('[name="cep"]').type(fixture[0].cep)
    cy.get('[name="city"]').type(fixture[0].city)
    cy.get('[name="neighborhood"]').type(fixture[0].neighborhood)
    cy.get('[name="uf"]').type(fixture[0].uf)
    cy.get('[name="email"]').type(fixture[0].email)

    cy.get('#saveBtn').click()

    cy.wait(['@editCustomer'])

    cy.get('#notistack-snackbar').should('have.text', 'Cliente editado com sucesso')

    cy.get('#physical-person-title-crud-buttons > #editBtn').click({ force: true })

    cy.get('[name="name"]').type('João da Silva')
    cy.get('[name="cpf"]').clear().type('02304093800')
    cy.get('[name="rg"]').type('123456789')
    cy.get('[name="rg_emissor"]').type('SSP')
    cy.get('[name="rg_emissor_uf"]').type('SP')

    cy.get('#physical-person-title-crud-buttons > #saveBtn').click()

    cy.wait(['@editPhysicalPerson'])

    cy.wait(5000)
    cy.get('#notistack-snackbar').should('have.text', 'Pessoa Física editada com sucesso')
  })

  it('should edit an existing legal person customer', () => {
    cy.intercept('GET', `${baseUrl}/customers`, {
      fixture: 'customers.json',
    }).as('getCustomers')
    cy.intercept('GET', `${baseUrl}/customers/*`, {
      statusCode: 200,
      fixture: 'customer-legal-person.json',
    }).as('getCustomer')
    cy.intercept('PUT', `${baseUrl}/customers/*`, {
      statusCode: 200,
    }).as('editCustomer')
    cy.intercept('PUT', `${baseUrl}/legal-people/*`, {
      statusCode: 200,
    }).as('editLegalPerson')

    cy.visit('/customers')
    cy.wait(['@getCustomers'])

    cy.get('#0-code').click()

    cy.wait(['@getCustomer'])
    cy.get('#customers-title-crud-buttons > #editBtn').click({ force: true })

    cy.get('#radio-legal-person').click()

    cy.get('[name="phone"]').type(fixture[0].phone)
    cy.get('[name="phone_secondary"]').type(fixture[0].phone_secondary)
    cy.get('[name="address"]').type(fixture[0].address)
    cy.get('[name="cep"]').type(fixture[0].cep)
    cy.get('[name="city"]').type(fixture[0].city)
    cy.get('[name="neighborhood"]').type(fixture[0].neighborhood)
    cy.get('[name="uf"]').type(fixture[0].uf)
    cy.get('[name="email"]').type(fixture[0].email)

    cy.get('#saveBtn').click()

    cy.wait(['@editCustomer'])

    cy.get('#notistack-snackbar').should('have.text', 'Cliente editado com sucesso')

    cy.get('#legal-person-title-crud-buttons > #editBtn').click({ force: true })

    cy.get('[name="cnpj"]').clear().type('123112312312')
    cy.get('[name="fantasy_name"]').type('Nome Fantasia')
    cy.get('[name="social_reason"]').type('Razao social')
    cy.get('[name="type"]').type('Logistica')
    cy.get('[name="size"]').type('Media')

    cy.get('#legal-person-title-crud-buttons > #saveBtn').click()

    cy.wait(['@editLegalPerson'])

    cy.wait(5000)
    cy.get('#notistack-snackbar').should('have.text', 'Pessoa Jurídica editada com sucesso')
  })

  it('should delete an existing physical person customer', () => {
    cy.intercept('GET', `${baseUrl}/customers`, {
      fixture: 'customers.json',
    }).as('getCustomers')
    cy.intercept('GET', `${baseUrl}/customers/*`, {
      statusCode: 200,
      fixture: 'customer-physical-person.json',
    }).as('getCustomer')
    cy.intercept('DELETE', `${baseUrl}/customers/*`, {
      statusCode: 200,
    }).as('deleteCustomer')

    cy.visit('/customers')
    cy.wait(['@getCustomers'])

    cy.get('#0-code').click()

    cy.wait(['@getCustomer'])

    cy.get('#customers-title-crud-buttons > #deleteBtn').click()

    cy.get('#dialog-confirm-btn').click()

    cy.wait(['@deleteCustomer'])

    cy.get('#notistack-snackbar').should('have.text', 'Cliente deletado com sucesso!')
  })

  it('should delete an existing legal person customer', () => {
    cy.intercept('GET', `${baseUrl}/customers`, {
      fixture: 'customers.json',
    }).as('getCustomers')
    cy.intercept('GET', `${baseUrl}/customers/*`, {
      statusCode: 200,
      fixture: 'customer-legal-person.json',
    }).as('getCustomer')
    cy.intercept('DELETE', `${baseUrl}/customers/*`, {
      statusCode: 200,
    }).as('deleteCustomer')

    cy.visit('/customers')
    cy.wait(['@getCustomers'])

    cy.get('#0-code').click()

    cy.wait(['@getCustomer'])

    cy.get('#customers-title-crud-buttons > #deleteBtn').click()

    cy.get('#dialog-confirm-btn').click()

    cy.wait(['@deleteCustomer'])

    cy.get('#notistack-snackbar').should('have.text', 'Cliente deletado com sucesso!')
  })
})
