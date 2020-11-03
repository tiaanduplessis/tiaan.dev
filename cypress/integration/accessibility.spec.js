const BASE_URL = "http://localhost:3000";
const PAGES = [
  "/",
  "/about",
  "/posts",
  "/reading",
  "/contact",
  "/now",
  "/career",
];
const VIEWPORTS = [
  [1920, 1080],
  "macbook-15",
  "macbook-13",
  "macbook-11",
  "iphone-6",
  "iphone-6+",
  "ipad-mini",
];

context("Accessibility (A11Y)", () => {
  it("should have no A11y issues on the pages", () => {
    PAGES.forEach((page) => {
      cy.visit(`${BASE_URL}${page}`);
      cy.injectAxe();
      testA11y();
    });
  });
});

function testA11y() {
  VIEWPORTS.forEach((size) => {
    if (Cypress._.isArray(size)) {
      cy.viewport(size[0], size[1]);
    } else {
      cy.viewport(size);
    }
    cy.checkA11y();
  });
}
