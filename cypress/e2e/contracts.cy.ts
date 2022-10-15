/* eslint-disable spaced-comment */
/// <reference types="cypress" />

import fixture from '../fixtures/contracts.json'
import contractFixture from '../fixtures/contract.json'
import useSessionInterceptor from '../helpers/useSessionInterceptor'

describe('Contracts Page', () => {
  const baseUrl = Cypress.env('NEXT_PUBLIC_BASE_URL')
  beforeEach(() => {
    useSessionInterceptor()
  })

  it('should show a list contract', () => {
    cy.intercept('GET', `${baseUrl}/contract`, { fixture: 'contracts.json' }).as('getContracts')
    cy.visit('/contracts')
    cy.wait(['@getContracts'])

    cy.get('#0-policy').should('have.text', fixture[0].policy)
    cy.get('#0-validity_start').should('have.text', fixture[0].validity_start)
    cy.get('#0-validity_end').should('have.text', fixture[0].validity_end)
    cy.get('#0-validity_time').should('have.text', fixture[0].validity_time)

    cy.get('#1-policy').should('have.text', fixture[1].policy)
    cy.get('#1-validity_start').should('have.text', fixture[1].validity_start)
    cy.get('#1-validity_end').should('have.text', fixture[1].validity_end)
    cy.get('#1-validity_time').should('have.text', fixture[1].validity_time)
  })

  it('should create a new contract', () => {
    cy.intercept('GET', `${baseUrl}/customers`, { fixture: 'customers.json' }).as('getCustomers')
    cy.intercept('GET', `${baseUrl}/contract`, { fixture: 'contracts.json' }).as('getContracts')
    cy.intercept('POST', `${baseUrl}/contract`, { statusCode: 201 }).as('saveContract')

    cy.visit('/contracts')
    cy.wait(['@getContracts'])

    cy.get('#newBtn').click()

    cy.get('[name="policy"]').type(contractFixture.policy)
    cy.get('[name="size"]').type(contractFixture.size)
    cy.get('[name="type"]').type(contractFixture.type)
    cy.get('[name="version"]').type(contractFixture.version.toString())
    cy.get('[name="number_of_lives"]').type(contractFixture.number_of_lives.toString())
    cy.get('[name="validity_time"]').type(contractFixture.validity_time.toString())
    cy.get('[name="inclusion_period"]').type(contractFixture.inclusion_period)
    cy.get('[name="cutoff_date"]').type(contractFixture.cutoff_date)
    cy.get('[name="email_on_insurancy"]').type(contractFixture.email_on_insurancy)
    cy.get('[name="phone_on_insurancy"]').type(contractFixture.phone_on_insurancy)
    cy.get('[name="copay"]').type(contractFixture.copay.toString())
    cy.get('[name="adhesion"]').type(contractFixture.adhesion.toString())
    cy.get('[name="copay_perc"]').type(contractFixture.copay_perc.toString())
    cy.get('[name="contributor_perc"]').type(contractFixture.contributor_perc.toString())
    cy.get('[name="copay_details"]').type(contractFixture.copay_details)
    cy.get('[name="cost"]').type(contractFixture.cost.toString())
    cy.get('[name="invoice_amount"]').type(contractFixture.invoice_amount.toString())
    cy.get('[name="total_contract_value"]').type(contractFixture.total_contract_value.toString())
    cy.get('#datepicker-validity_start').type('15/10/2022')
    cy.get('#datepicker-validity_end').type('15/10/2022')
    cy.get('#datepicker-first_invoice_date').type('15/10/2022')

    cy.get('#saveBtn').click()

    cy.wait(['@saveContract'])

    cy.get('#notistack-snackbar').should('have.text', 'Contrato adicionado com sucesso')
  })

  it('should view an existing contract', () => {
    cy.intercept('GET', `${baseUrl}/contract`, { fixture: 'contracts.json' }).as('getContracts')
    cy.intercept('GET', `${baseUrl}/customers`, { fixture: 'customers.json' }).as('getCustomers')
    cy.intercept('GET', `${baseUrl}/contract/*`, {
      statusCode: 200,
      fixture: 'contract.json',
    }).as('getContract')

    cy.visit('/contracts')
    cy.wait(['@getContracts'])

    cy.get('#0-policy').click()

    cy.wait(['@getContract', '@getCustomers'])

    // assert contract
    cy.get('[name="policy"]').should('have.value', contractFixture.policy)
    cy.get('[name="size"]').should('have.value', contractFixture.size)
    cy.get('[name="type"]').should('have.value', contractFixture.type)
    cy.get('[name="version"]').should('have.value', contractFixture.version.toString())
    cy.get('[name="number_of_lives"]').should(
      'have.value',
      contractFixture.number_of_lives.toString(),
    )
    cy.get('[name="validity_time"]').should('have.value', contractFixture.validity_time.toString())
    cy.get('[name="inclusion_period"]').should('have.value', contractFixture.inclusion_period)
    cy.get('[name="cutoff_date"]').should('have.value', contractFixture.cutoff_date)
    cy.get('[name="email_on_insurancy"]').should('have.value', contractFixture.email_on_insurancy)
    cy.get('[name="phone_on_insurancy"]').should('have.value', contractFixture.phone_on_insurancy)
    cy.get('[name="copay"]').should('have.value', contractFixture.copay.toString())
    cy.get('[name="adhesion"]').should('have.value', contractFixture.adhesion.toString())
    cy.get('[name="copay_perc"]').should('have.value', contractFixture.copay_perc.toString())
    cy.get('[name="contributor_perc"]').should(
      'have.value',
      contractFixture.contributor_perc.toString(),
    )
    cy.get('[name="copay_details"]').should('have.value', contractFixture.copay_details)
    cy.get('[name="cost"]').should('have.value', contractFixture.cost.toString())
    cy.get('[name="invoice_amount"]').should(
      'have.value',
      contractFixture.invoice_amount.toString(),
    )
    cy.get('[name="total_contract_value"]').should(
      'have.value',
      contractFixture.total_contract_value.toString(),
    )
    cy.get('#datepicker-validity_start').should('have.value', '11/10/2022') // ! THIS SHOULD BE FIXED ASAP
    cy.get('#datepicker-validity_end').should('have.value', '11/10/2022') // ! THIS SHOULD BE FIXED ASAP
    cy.get('#datepicker-first_invoice_date').should('have.value', '11/10/2022') // ! THIS SHOULD BE FIXED ASAP

    // assert customer
    cy.get('#combo-box-cliente').should('have.value', contractFixture.customer.code)

    // assert access
    cy.get('[name="system"').should('have.value', contractFixture.access.system)
    cy.get('[name="login_client"').should('have.value', contractFixture.access.login_client)
    cy.get('[name="pass_client"').should('have.value', contractFixture.access.pass_client)
    cy.get('[name="login_tret"').should('have.value', contractFixture.access.login_tret)
    cy.get('[name="pass_tret"').should('have.value', contractFixture.access.pass_tret)

    // assert renewal
    cy.get('#0-proposed_date').should('have.text', contractFixture.renew[0].proposed_date)
    cy.get('#0-proposed_adjustment').should(
      'have.text',
      contractFixture.renew[0].proposed_adjustment,
    )
    cy.get('#0-closed_value').should('have.text', contractFixture.renew[0].closed_value)
    cy.get('#0-closed_date').should('have.text', contractFixture.renew[0].closed_date)
    cy.get('#0-details').should('have.text', contractFixture.renew[0].details)

    cy.get('#1-proposed_date').should('have.text', contractFixture.renew[1].proposed_date)
    cy.get('#1-proposed_adjustment').should(
      'have.text',
      contractFixture.renew[1].proposed_adjustment,
    )
    cy.get('#1-closed_value').should('have.text', contractFixture.renew[1].closed_value)
    cy.get('#1-closed_date').should('have.text', contractFixture.renew[1].closed_date)
    cy.get('#1-details').should('have.text', contractFixture.renew[1].details)

    // ! FIX THIS CONFLICT FIELD WITH RENEWAL
    // assert movements
    cy.get('#0-move_date').should('have.text', contractFixture.move[0].move_date)
    cy.get('#0-action').should('have.text', contractFixture.move[0].action)
    cy.get('#0-number_of_lives').should('have.text', contractFixture.move[0].number_of_lives)
    cy.get('#0-description').should('have.text', contractFixture.move[0].description)
    // cy.get('#0-details').should('have.text', contractFixture.move[0].details)

    cy.get('#1-move_date').should('have.text', contractFixture.move[1].move_date)
    cy.get('#1-action').should('have.text', contractFixture.move[1].action)
    cy.get('#1-number_of_lives').should('have.text', contractFixture.move[1].number_of_lives)
    cy.get('#1-description').should('have.text', contractFixture.move[1].description)
    // cy.get('#1-details').should('have.text', contractFixture.move[1].details)
  })

  it('should add a renewal', () => {
    cy.intercept('POST', `${baseUrl}/contract/*/renew`, { statusCode: 201 }).as('createRenewal')
    cy.intercept('GET', `${baseUrl}/contract/*`, {
      statusCode: 200,
      fixture: 'contract.json',
    }).as('getContract')
    cy.intercept('GET', `${baseUrl}/contract`, { fixture: 'contracts.json' }).as('getContracts')
    cy.intercept('GET', `${baseUrl}/customers`, { fixture: 'customers.json' }).as('getCustomers')

    cy.visit('/contracts')
    cy.wait(['@getContracts'])

    cy.get('#0-policy').click()

    cy.wait(['@getContract', '@getCustomers'])

    cy.get('#add-renewal-btn').click()

    cy.visit({ url: '/renewals/create', method: 'GET', qs: { contractId: 1 } })

    cy.get('[name="proposed_adjustment"]').type('10')
    cy.get('#datepicker-proposed_date').clear().type('11/10/2022')
    cy.get('[name="closed_value"]').type('12')
    cy.get('[name="details"]').type('renewaldetails')
    cy.get('#datepicker-closed_date').clear().type('11/10/2022')

    cy.get('#saveBtn').click()

    cy.wait(['@createRenewal'])

    cy.get('#notistack-snackbar').should('have.text', 'Renovação adicionada com sucesso')
  })

  it('should add a movement', () => {
    cy.intercept('POST', `${baseUrl}/contract/*/move`, { statusCode: 201 }).as('createMovement')
    cy.intercept('GET', `${baseUrl}/contract/*`, {
      statusCode: 200,
      fixture: 'contract.json',
    }).as('getContract')
    cy.intercept('GET', `${baseUrl}/contract`, { fixture: 'contracts.json' }).as('getContracts')
    cy.intercept('GET', `${baseUrl}/customers`, { fixture: 'customers.json' }).as('getCustomers')

    cy.visit('/contracts')
    cy.wait(['@getContracts'])

    cy.get('#0-policy').click()

    cy.wait(['@getContract', '@getCustomers'])

    cy.get('#add-movement-btn').click()

    cy.visit({ url: '/movements/create', method: 'GET', qs: { contractId: 1 } })

    cy.get('#datepicker-move_date').clear().type('11/10/2022')
    cy.get('[name="action"]').type('movement action')
    cy.get('[name="number_of_lives"]').type('20')
    cy.get('[name="description"]').type('movement description')
    cy.get('[name="details"]').type('movement details')

    cy.get('#saveBtn').click()

    cy.wait(['@createMovement'])

    cy.get('#notistack-snackbar').should('have.text', 'Movimentação adicionada com sucesso')
  })

  it('should add a customer', () => {
    cy.intercept('GET', `${baseUrl}/contract/*`, {
      statusCode: 200,
      fixture: 'contract-with-access.json',
    }).as('getContract')
    cy.intercept('GET', `${baseUrl}/contract`, { fixture: 'contracts.json' }).as('getContracts')
    cy.intercept('GET', `${baseUrl}/customers`, { fixture: 'customers.json' }).as('getCustomers')
    cy.intercept('PUT', `${baseUrl}/contract/*`, { statusCode: 200 }).as('editContract')

    cy.visit('/contracts')
    cy.wait(['@getContracts'])

    cy.get('#0-policy').click()

    cy.wait(['@getContract', '@getCustomers'])

    cy.get('#editBtn').click({ force: true })

    cy.get('#combo-box-cliente').click()
    cy.get('#combo-box-cliente').type('0e2f07f5-5273-4b60-bcce-ffaceb80b40a')

    cy.get('#saveBtn').click({ force: true })

    cy.wait(['@editContract'])

    cy.get('#notistack-snackbar').should('have.text', 'Contrato editado com sucesso')
  })

  it('should add an access', () => {
    cy.intercept('GET', `${baseUrl}/contract/*`, {
      statusCode: 200,
      fixture: 'contract-with-customer.json',
    }).as('getContract')
    cy.intercept('GET', `${baseUrl}/contract`, { fixture: 'contracts.json' }).as('getContracts')
    cy.intercept('GET', `${baseUrl}/customers`, { fixture: 'customers.json' }).as('getCustomers')
    cy.intercept('PUT', `${baseUrl}/contract/*`, { statusCode: 200 }).as('editContract')

    cy.visit('/contracts')
    cy.wait(['@getContracts'])

    cy.get('#0-policy').click()

    cy.wait(['@getContract', '@getCustomers'])

    cy.get('#editBtn').click({ force: true })

    cy.get('[name="system"').type(contractFixture.access.system)
    cy.get('[name="login_client"').type(contractFixture.access.login_client)
    cy.get('[name="pass_client"').type(contractFixture.access.pass_client)
    cy.get('[name="login_tret"').type(contractFixture.access.login_tret)
    cy.get('[name="pass_tret"').type(contractFixture.access.pass_tret)

    cy.get('#saveBtn').click({ force: true })

    cy.wait(['@editContract'])

    cy.get('#notistack-snackbar').should('have.text', 'Contrato editado com sucesso')
  })

  it('should edit a customer', () => {
    cy.intercept('GET', `${baseUrl}/contract/*`, {
      statusCode: 200,
      fixture: 'contract.json',
    }).as('getContract')
    cy.intercept('GET', `${baseUrl}/contract`, { fixture: 'contracts.json' }).as('getContracts')
    cy.intercept('GET', `${baseUrl}/customers`, { fixture: 'customers.json' }).as('getCustomers')
    cy.intercept('PUT', `${baseUrl}/contract/*`, { statusCode: 200 }).as('editContract')

    cy.visit('/contracts')
    cy.wait(['@getContracts'])

    cy.get('#0-policy').click()

    cy.wait(['@getContract', '@getCustomers'])

    cy.get('#editBtn').click({ force: true })

    cy.get('#combo-box-cliente').click()
    cy.get('#combo-box-cliente').type('0e2f07f5-5273-4b60-bcce-ffaceb80b40a')

    cy.get('#saveBtn').click({ force: true })

    cy.wait(['@editContract'])

    cy.get('#notistack-snackbar').should('have.text', 'Contrato editado com sucesso')
  })

  it('should edit an access', () => {
    cy.intercept('GET', `${baseUrl}/contract/*`, {
      statusCode: 200,
      fixture: 'contract.json',
    }).as('getContract')
    cy.intercept('GET', `${baseUrl}/contract`, { fixture: 'contracts.json' }).as('getContracts')
    cy.intercept('GET', `${baseUrl}/customers`, { fixture: 'customers.json' }).as('getCustomers')
    cy.intercept('PUT', `${baseUrl}/contract/*`, { statusCode: 200 }).as('editContract')

    cy.visit('/contracts')
    cy.wait(['@getContracts'])

    cy.get('#0-policy').click()

    cy.wait(['@getContract', '@getCustomers'])

    cy.get('#editBtn').click({ force: true })

    cy.get('[name="system"').clear().type(contractFixture.access.system)
    cy.get('[name="login_client"').clear().type(contractFixture.access.login_client)
    cy.get('[name="pass_client"').clear().type(contractFixture.access.pass_client)
    cy.get('[name="login_tret"').clear().type(contractFixture.access.login_tret)
    cy.get('[name="pass_tret"').clear().type(contractFixture.access.pass_tret)

    cy.get('#saveBtn').click({ force: true })

    cy.wait(['@editContract'])

    cy.get('#notistack-snackbar').should('have.text', 'Contrato editado com sucesso')
  })

  it('should edit a contract', () => {
    cy.intercept('GET', `${baseUrl}/contract/*`, {
      statusCode: 200,
      fixture: 'contract.json',
    }).as('getContract')
    cy.intercept('GET', `${baseUrl}/contract`, { fixture: 'contracts.json' }).as('getContracts')
    cy.intercept('GET', `${baseUrl}/customers`, { fixture: 'customers.json' }).as('getCustomers')
    cy.intercept('PUT', `${baseUrl}/contract/*`, { statusCode: 200 }).as('editContract')

    cy.visit('/contracts')
    cy.wait(['@getContracts'])

    cy.get('#0-policy').click()

    cy.wait(['@getContract', '@getCustomers'])

    cy.get('#editBtn').click({ force: true })

    // edit contract section
    cy.get('[name="policy"]').clear({ force: true }).type(contractFixture.policy, { force: true })
    cy.get('[name="size"]').clear({ force: true }).type(contractFixture.size, { force: true })
    cy.get('[name="type"]').clear({ force: true }).type(contractFixture.type, { force: true })
    cy.get('[name="version"]')
      .clear({ force: true })
      .type(contractFixture.version.toString(), { force: true })
    cy.get('[name="number_of_lives"]')
      .clear({ force: true })
      .type(contractFixture.number_of_lives.toString(), { force: true })
    cy.get('[name="validity_time"]')
      .clear({ force: true })
      .type(contractFixture.validity_time.toString(), { force: true })
    cy.get('[name="inclusion_period"]')
      .clear({ force: true })
      .type(contractFixture.inclusion_period, { force: true })
    cy.get('[name="cutoff_date"]')
      .clear({ force: true })
      .type(contractFixture.cutoff_date, { force: true })
    cy.get('[name="email_on_insurancy"]')
      .clear({ force: true })
      .type(contractFixture.email_on_insurancy, { force: true })
    cy.get('[name="phone_on_insurancy"]')
      .clear({ force: true })
      .type(contractFixture.phone_on_insurancy, { force: true })
    cy.get('[name="copay"]')
      .clear({ force: true })
      .type(contractFixture.copay.toString(), { force: true })
    cy.get('[name="adhesion"]')
      .clear({ force: true })
      .type(contractFixture.adhesion.toString(), { force: true })
    cy.get('[name="copay_perc"]')
      .clear({ force: true })
      .type(contractFixture.copay_perc.toString(), { force: true })
    cy.get('[name="contributor_perc"]')
      .clear({ force: true })
      .type(contractFixture.contributor_perc.toString(), { force: true })
    cy.get('[name="copay_details"]')
      .clear({ force: true })
      .type(contractFixture.copay_details, { force: true })
    cy.get('[name="cost"]')
      .clear({ force: true })
      .type(contractFixture.cost.toString(), { force: true })
    cy.get('[name="invoice_amount"]')
      .clear({ force: true })
      .type(contractFixture.invoice_amount.toString(), { force: true })
    cy.get('[name="total_contract_value"]')
      .clear({ force: true })
      .type(contractFixture.total_contract_value.toString(), { force: true })
    cy.get('#datepicker-validity_start').clear({ force: true }).type('15/10/2022', { force: true })
    cy.get('#datepicker-validity_end').clear({ force: true }).type('15/10/2022', { force: true })
    cy.get('#datepicker-first_invoice_date')
      .clear({ force: true })
      .type('15/10/2022', { force: true })

    // edit access section
    cy.get('[name="system"').clear().type(contractFixture.access.system)
    cy.get('[name="login_client"').clear().type(contractFixture.access.login_client)
    cy.get('[name="pass_client"').clear().type(contractFixture.access.pass_client)
    cy.get('[name="login_tret"').clear().type(contractFixture.access.login_tret)
    cy.get('[name="pass_tret"').clear().type(contractFixture.access.pass_tret)

    cy.get('#saveBtn').click({ force: true })

    cy.wait(['@editContract'])

    cy.get('#notistack-snackbar').should('have.text', 'Contrato editado com sucesso')
  })

  it('should delete an existing contract', () => {
    cy.intercept('GET', `${baseUrl}/contract`, { fixture: 'contracts.json' }).as('getContracts')
    cy.intercept('GET', `${baseUrl}/customers`, { fixture: 'customers.json' }).as('getCustomers')
    cy.intercept('GET', `${baseUrl}/contract/*`, {
      statusCode: 200,
      fixture: 'contract.json',
    }).as('getContracts')
    cy.intercept('DELETE', `${baseUrl}/contract/*`, { statusCode: 200 }).as('deleteContract')

    cy.visit('/contracts')
    cy.wait(['@getContracts'])

    cy.get('#0-policy').click()

    cy.wait(['@getContracts'])

    cy.get('#deleteBtn').click({ force: true })

    cy.get('#dialog-confirm-btn').click()

    cy.wait(['@deleteContract'])

    cy.get('#notistack-snackbar').should('have.text', 'Contrato deletado com sucesso!')
  })
})
