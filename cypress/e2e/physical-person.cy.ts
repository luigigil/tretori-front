/* eslint-disable spaced-comment */
/// <reference types="cypress" />

import fixture from '../fixtures/physical_person.json'
import useSessionInterceptor from '../helpers/useSessionInterceptor'

describe('Insurance Page', () => {
  const baseUrl = Cypress.env('NEXT_PUBLIC_BASE_URL')
  beforeEach(() => {
    useSessionInterceptor()
  })
})
