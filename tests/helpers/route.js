export const BASE_URL = {
  HOME: Cypress.env("baseUrl")
};
export function visit(routes) {
  cy.visit(BASE_URL.HOME + routes);
}
