export default function useSessionInterceptor() {
  return cy.intercept('GET', '/api/auth/session', { fixture: 'session.json' }).as('getSession')
}
