import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'n1asqg',
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    specPattern: ['**/login.cy.ts', '**/*.cy.ts'],
  },
  video: false,
})
