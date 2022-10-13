/// <reference types="cypress" />

import fixture from '../fixtures/products.json'

describe('Product Page', () => {
  before(() => {
    {
      const username = Cypress.env('USER')
      const password = Cypress.env('PW')
      const cookieName = Cypress.env('COOKIE_NAME')

      cy.visit(`/login`)

      cy.get('#email').type(username)
      cy.get('#password').type(password)
      cy.get('#login-button').click()

      cy.visit(`/`)
      cy.getCookie(cookieName).should('exist')
    }
  })

  it('should show a list products', () => {
    cy.intercept('GET', '/product', { fixture: 'products.json' }).as('getProducts')
    cy.visit('/products')
    cy.wait(['@getProducts'])

    cy.get('#0-name').should('have.text', fixture[0].name)
    cy.get('#0-type').should('have.text', fixture[0].type)
    cy.get('#0-plan').should('have.text', fixture[0].plan)
    cy.get('#0-size').should('have.text', fixture[0].size)

    cy.get('#1-name').should('have.text', fixture[1].name)
    cy.get('#1-type').should('have.text', fixture[1].type)
    cy.get('#1-plan').should('have.text', fixture[1].plan)
    cy.get('#1-size').should('have.text', fixture[1].size)
  })

  it('should create a new product', () => {
    cy.intercept('GET', '/product', { fixture: 'products.json' }).as('getProducts')
    cy.intercept('POST', '/product', { statusCode: 201 }).as('saveProduct')

    cy.visit('/products')
    cy.wait(['@getProducts'])

    cy.get('#newBtn').click()

    cy.get('[name="name"]').type('New Product')
    cy.get('[name="type"]').type('Saude')
    cy.get('[name="plan"]').type('Basico')
    cy.get('[name="size"]').type('Grande')

    cy.get('#saveBtn').click()

    cy.wait(['@saveProduct'])

    cy.get('#notistack-snackbar').should('have.text', 'Produto adicionado com sucesso')
  })

  it('should view an existing product', () => {
    cy.intercept('GET', '/product', { fixture: 'products.json' }).as('getProducts')
    cy.intercept('GET', '/product/*', { statusCode: 200, fixture: 'product.json' }).as('getProduct')

    cy.visit('/products')
    cy.wait(['@getProducts'])

    cy.get('#0-name').click()

    cy.wait(['@getProduct'])
    cy.get('[name="name"]').should('have.value', fixture[0].name)
    cy.get('[name="type"]').should('have.value', fixture[0].type)
    cy.get('[name="plan"]').should('have.value', fixture[0].plan)
    cy.get('[name="size"]').should('have.value', fixture[0].size)
  })

  it('should edit an existing product', () => {
    cy.intercept('GET', '/product', { fixture: 'products.json' }).as('getProducts')
    cy.intercept('GET', '/product/*', { statusCode: 200, fixture: 'product.json' }).as('getProduct')
    cy.intercept('PUT', '/product/*', { statusCode: 200 }).as('editProduct')

    cy.visit('/products')
    cy.wait(['@getProducts'])

    cy.get('#0-name').click()

    cy.wait(['@getProduct'])
    cy.get('#editBtn').click()

    cy.get('[name="name"]').type('Edit Product')
    cy.get('[name="type"]').type('Saude')
    cy.get('[name="plan"]').type('Basico')
    cy.get('[name="size"]').type('Grande')

    cy.get('#saveBtn').click()

    cy.wait(['@editProduct'])

    cy.get('#notistack-snackbar').should('have.text', 'Produto editado com sucesso')
  })

  it('should delete an existing product', () => {
    cy.intercept('GET', '/product', { fixture: 'products.json' }).as('getProducts')
    cy.intercept('GET', '/product/*', { statusCode: 200, fixture: 'product.json' }).as('getProduct')
    cy.intercept('DELETE', '/product/*', { statusCode: 200 }).as('deleteProduct')

    cy.visit('/products')
    cy.wait(['@getProducts'])

    cy.get('#0-name').click()

    cy.wait(['@getProduct'])
    cy.get('#deleteBtn').click()

    cy.get('#dialog-confirm-btn').click()

    cy.wait(['@deleteProduct'])

    cy.get('#notistack-snackbar').should('have.text', 'Produto deletado com sucesso!')
  })
})
