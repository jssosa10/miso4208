describe( 'Test ghost', ()=> {
  
  before(function () {
   cy.visit('http://localhost:2368/ghost/#/signin'); 
   cy.get('.gh-signin').find('input[name="identification"]').click().type("angela.anaya.castaneda@gmail.com");
    cy.get('.gh-signin').find('input[name="password"]').click().type("juanda2309");
    cy.get('.gh-signin').contains('Sign in').click();
    Cypress.Cookies.preserveOnce('session_id','remember_token'); 
})

beforeEach(function () {
    
    //window.location.href = 'http://localhost:2368/ghost' ;
    //cy.visit("#/site");
    
  })

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

it( 'Pruebas ghost en un solo item', ()=> {
//1.POST
  cy.visit( 'http://localhost:2368/ghost/#/posts');
  cy.wait(3000);
   cy.get('.gh-posts-list-item',{ timeout: 2000 }).then($links => {
    var randomLink = $links.get(getRandomInt(0, $links.length));
    cy.wrap(randomLink).contains('Draft').click({force:true});
});
cy.visit( 'http://localhost:2368/ghost/#/posts');
    cy.wait(3000);
    cy.get('.view-actions',{ timeout: 2000 }).contains('New post').click();    
    cy.get('[placeholder="Post Title"]',{ timeout: 4000}).click().type("Mi primer post de prueba");
    //cy.get('.koenig-editor__editor p',{ timeout: 10000 }).click({force: true}).type("Prueba1");
    cy.wait(3000);  

    //2.PAGES
cy.visit( 'http://localhost:2368/ghost/#/pages');
cy.wait(3000);
 cy.get('.gh-posts-list-item',{ timeout: 2000 }).then($links => {
  var randomLink = $links.get(getRandomInt(0, $links.length));
  cy.wrap(randomLink).contains('Published').click({force:true});
});
//Despublicar
cy.get('.gh-btn span').contains('Update').click();
/*cy.get('.gh-publishmenu-radio-label').contains('Unpublished').then($buton=>{
  cy.get('.gh-publishmenu-radio').get('gh-publishmenu-radio-button').click();
});*/

cy.visit('http://localhost:2368/ghost/#/pages' );
  //  cy.get('.view-actions',{ timeout: 2000 }).contains('New page').click();    
    cy.wait(3000);


    //3.TAGS
cy.visit( 'http://localhost:2368/ghost/#/tags');
cy.wait(3000);
 cy.get('.gh-list-data',{ timeout: 2000 }).then($links => {
  var randomLink = $links.get(getRandomInt(0, $links.length));
  cy.wrap(randomLink).click();
});

cy.visit( 'http://localhost:2368/ghost/#/tags' );
cy.get('.view-actions',{ timeout: 2000 }).contains('New tag').click();

cy.wait(3000);

}) ;

  it( 'Editar Post', ()=> {
    cy.visit( 'http://localhost:2368/ghost/#/posts');
    cy.wait(3000);
    //cy.get('.gh-posts-list-item',{ timeout: 2000 });    

   cy.get('.gh-posts-list-item',{ timeout: 2000 }).then($links => {
      var randomLink = $links.get(getRandomInt(0, $links.length));
      cy.wrap(randomLink).contains('Draft').click();
  });
  cy.wait(3000);
  
  }) ;

  it( 'Editar Page', ()=> {
    cy.visit( 'http://localhost:2368/ghost/#/pages');
    cy.wait(3000);
    //cy.get('.gh-posts-list-item',{ timeout: 2000 });    

    cy.get('.gh-posts-list-item',{ timeout: 2000 }).then($links => {
      var randomLink = $links.get(getRandomInt(0, $links.length));
      cy.wrap(randomLink).contains('Published').click();
  });
  cy.wait(3000);
  
  }) ;
  it( 'Crear Post', ()=> {
    cy.visit( 'http://localhost:2368/ghost/#/posts');
    cy.wait(3000);
    cy.get('.view-actions',{ timeout: 2000 }).contains('New post').click();    
    cy.get('[placeholder="Post Title"]',{ timeout: 4000}).click().type("Mi primer post de prueba");
    //cy.get('.koenig-editor__editor p',{ timeout: 10000 }).click({force: true}).type("Prueba1");
    cy.wait(3000);    
    //window.location.href = 'http://localhost:2368/ghost';
    cy.visit( 'http://localhost:2368/ghost/#/posts');
  } );

  it( 'Crear Page', ()=> {
   
    cy.visit('http://localhost:2368/ghost/#/pages' );
    cy.get('.view-actions',{ timeout: 2000 }).contains('New page').click();    
    cy.wait(3000);
    cy.visit( 'http://localhost:2368/ghost' );
  } );

  it( 'Crear Tag', ()=> {
   
    cy.visit( 'http://localhost:2368/ghost/#/tags' );
    cy.get('.view-actions',{ timeout: 2000 }).contains('New tag').click();
    cy.wait(3000);
    cy.visit( 'http://localhost:2368/ghost' );
  } );

} );
