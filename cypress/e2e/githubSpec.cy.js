describe('Multiple API tests', () => {
  let baseUrl = 'https://lotrapi.co/api/v1';
  it("Tests for status code 200", () => {
    cy.request("GET", `${baseUrl}/characters`).should((response) => {
      expect(response.status).to.eq(200);
    });

  });
  

  //console.log(cy.response.body.count);
  it("Tests for response content", () => {
    cy.request("GET", `https://rb.gy/2a9g3m`).should((response) => {
      expect(response.body.results[0]).to.have.property('name', 'Frodo Baggins');
      expect(response.body.results[0]).to.have.property('id', 1);
    });
  });

  it("Tests for redirect", () => {
    cy.request({
      url: `https://rb.gy/2a9g3m`,
      followRedirect: false,
      })
      .then((resp) => {
      expect(resp.status).to.eq(301);
      expect(resp.headers.location).to.eq(`https://lotrapi.co/api/v1/characters`);
      let redirectedUrl = resp.headers.location;
      cy.request({
        url: redirectedUrl,
        })
        .then((resp => {
          expect(resp.status).to.eq(200);
          expect(resp.body.results[0]).to.have.property('id', 1);
        }))
      })

    })
});

describe('UI Tests', () => {
  it('Sportland Test', () => {
    cy.viewport(1000, 670)
    cy.visit('https://sportland.com/');
    cy.get('.Button-AcceptAll').click();
    cy.get('.Header-TopRow-Right > .Header-Menu > .Header-Burger > .Header-BurgerLogo').click();
    cy.get('.MenuPage > .Overlay > .MenuOverlay-Menu > .MenuOverlay-ItemList > :nth-child(1) > .MenuOverlay-SubLevelWrapper').click();
    cy.get('[href="/women"] > .MenuOverlay-ItemFigure > .MenuOverlay-ItemCaption').click();
    cy.get('.GenderCms-CollectionBanners > p > .ClothesCollection > .ClothesCollection-List > :nth-child(1) > .ClothesCollection-Link > .ClothesCollection-Image_desktop').click();

  });
});