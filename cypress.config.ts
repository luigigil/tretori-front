export default {
  e2e: {
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    specPattern: ['**/login.cy.ts', '**/*.cy.ts'],
  },
}
