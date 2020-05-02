

describe( 'Test ghost', ()=> {
  
  before(function () {
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      console.log('Cypress detected uncaught exception', err);
      return false;
    });
     cy.visit('http://localhost:2368/ghost/#/signin'); 
     cy.wait(5000);
     cy.get('.gh-signin').find('input[name="identification"]').click().type("angela.anaya.castaneda@gmail.com");
      cy.get('.gh-signin').find('input[name="password"]').click().type("juanda2309");
      cy.get('.gh-signin').contains('Sign in').click();
     cy.wait(3000)
      
  })


beforeEach(function () {
  Cypress.Cookies.preserveOnce('ghost-admin-api-session'); 
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

it( 'Edicion de post ', ()=> {
  const target;
  cy.serve()
  cy.request({
    method: 'POST',
    url: 'https://my.api.mockaroo.com/blog_.json?key=aaa41230&__method=POST',
    
  }).then((resp) => {
      console.log('Respuesta'+resp.body.Descripcion);
      //expect(resp.status).to.eq(200);
      target=resp.body;
      cy.log(target.Descripcion);
  });
/*cy.get('[placeholder="Post Title"]',{ timeout: 4000}).click();
cy.get('[placeholder="Post Title"]').clear();
cy.get('[placeholder="Post Title"]').click().type("Cambio de titulo");
cy.wait(3000);
cy.get('.koenig-editor__editor p').click({force: true});
cy.get('.koenig-editor__editor p').clear();
cy.get('.koenig-editor__editor p').click({force: true}).type("Cambio");
cy.wait(3000);*/
}) ;



} );