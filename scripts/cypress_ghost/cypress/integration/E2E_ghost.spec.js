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
   // cy.screenshot();
    cy.wait(5000);
  })
  
  /*
  afterEach(function () {
    cy.screenshot();
    cy.wait(10000);
  })*/
  
  
  function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
  };
  
  it( 'lista de post', ()=> {
  //1.lISTA DE POST y elegir al azar uno
  cy.wait(3000);
    cy.visit( 'http://localhost:2368/ghost/#/posts');
    cy.wait(3000);
     cy.get('.gh-post-list-title',{ timeout: 2000 }).then($links => {
      var randomLink = $links.get(getRandomInt(0, $links.length));    
      cy.wrap(randomLink).click({force:true});    
    });
  cy.wait(3000);
  }) ;
  
  it( 'Edicion de post', ()=> {
    //2.Edicion de post
  cy.get('[placeholder="Post Title"]',{ timeout: 4000}).click();
  cy.get('[placeholder="Post Title"]').clear();
  cy.get('[placeholder="Post Title"]').click().type("Cambio de titulo");
  cy.wait(3000);

  if(cy.get('.koenig-editor__editor p',{ timeout: 2000 }).find())
  cy.get('.koenig-editor__editor p',{ timeout: 2000 }).then($links => {
    var randomLink = $links.get(getRandomInt(0, $links.length));    
    cy.wrap(randomLink).click({force:true}).clear();
    cy.wait(3000);
    cy.wrap(randomLink).click({force:true}).type("Cambio");

  });
/*
  cy.get('.koenig-editor__editor p').click({force: true});
  cy.get('.koenig-editor__editor p').clear();
  cy.get('.koenig-editor__editor p').click({force: true}).type("Cambio");*/
  cy.wait(3000);
  }) ;
  
  it( 'Publicar post', ()=> {
  //publicar o Despublicar
  cy.get('.gh-btn span').contains(/Update|Publish/).click();
  cy.get('.gh-publishmenu-footer').contains(/Update|Publish/).click();
  cy.wait(3000);
  cy.get('.gh-btn span').contains('Update').click();
  cy.wait(1000);
  }) ;
  
  it( 'Despublicar post', ()=> {
    //publicar o Despublicar
    cy.get('.gh-btn span',{ timeout: 4000}).contains('Update').click();
    cy.get('.gh-publishmenu-radio',{ timeout: 4000}).contains('Unpublished').click();
    cy.get('.gh-publishmenu-footer',{ timeout: 4000}).contains('Unpublish').click();
    cy.wait(2000);
    cy.get('.gh-btn span').contains('Publish').click();
    cy.wait(2000);
    }) ;
  
    it( 'Configurar post', ()=> {
      cy.get('.post-settings').click({force:true});
      cy.wait(3000);
      cy.get('[id="tag-input"]',{ timeout: 2000 }).click({force:true});
      cy.get('[id="tag-input"]').get('.ember-power-select-options',{ timeout: 2000 }).then($list => {
        var randomList = $list.get(getRandomInt(0, $list.length));    
        cy.wrap(randomList).click({force:true});    
      });
    }) ;
  
    it( 'Eliminar post', ()=> {
    cy.get('.post-settings').click({force:true});
    cy.get('.settings-menu-content').get('button').contains('post').click({force:true});
    cy.get('.fullscreen-modal').get('button').contains('Cancel').click({force:true});
    //cy.get('.fullscreen-modal').get('button').contains('Delete').click();
     
    }) ;
  
  it( 'Listado de tags', ()=> {
    cy.visit( 'http://localhost:2368/ghost/#/tags');
    cy.wait(3000);
    cy.get('.gh-tag-list-title',{ timeout: 2000 }).then($links => {
    var randomLink = $links.get(getRandomInt(0, $links.length));
    cy.wrap(randomLink).click();
  });
  cy.wait(3000);
  }) ;
  
  it( 'Eliminar tags', ()=> {
    //Eliminar tags
  cy.get('button').contains('Delete tag').click();
  cy.get('.fullscreen-modal').get('button').contains('Cancel').click();
  //Asociar tag
  }) ;
  
  it( 'listado de paginas', ()=> {
    //2. listado de PAGES y hacer click en un post
  cy.visit( 'http://localhost:2368/ghost/#/pages');
  cy.wait(3000);
  cy.get('.gh-post-list-title',{ timeout: 2000 }).should('exist');
   cy.get('.gh-post-list-title',{ timeout: 2000 }).then($links => {
    var randomLink = $links.get(getRandomInt(0, $links.length));
    cy.wrap(randomLink).click({force:true});
  });
  cy.wait(3000);
  
  }) ;
  
  it( 'Edicion de pages', ()=> {
    //4.Edicion de pages
  cy.get('[placeholder="Page Title"]',{ timeout: 4000}).click();
  cy.get('[placeholder="Page Title"]').clear();
  cy.get('[placeholder="Page Title"]').click().type("Cambio de titulo");
  cy.wait(3000);
  cy.get('.koenig-editor__editor p').click({force: true});
  cy.get('.koenig-editor__editor p').clear();
  cy.get('.koenig-editor__editor p').click({force: true}).type("Cambio");
  cy.wait(3000);
  
  }) ;
  
  it( 'Publicar pagina', ()=> {
    cy.get('.gh-btn span').contains(/Update|Publish/).click();
    cy.get('.gh-publishmenu-footer').contains(/Update|Publish/).click();
    cy.wait(3000);
    cy.get('.gh-btn span').contains('Update').click();
    cy.wait(1000);
  }) ;
  
  it( 'Despublicar pagina', ()=> {
    cy.get('.gh-btn span').contains('Update').click();
    cy.get('.gh-publishmenu-radio',{ timeout: 4000}).contains('Unpublished').click();
    cy.get('.gh-publishmenu-footer',{ timeout: 4000}).contains('Unpublish').click();
    cy.wait(2000);
    cy.get('.gh-btn span',{ timeout: 4000}).contains('Publish').click();
    cy.wait(2000);
    }) ;
  
    it( 'Configurar pagina', ()=> {
      cy.get('.post-settings').click({force:true});
      cy.wait(3000);
      cy.get('[id="tag-input"]',{ timeout: 2000 }).click({force:true});
      cy.get('[id="tag-input"]').get('.ember-power-select-options',{ timeout: 2000 }).then($list => {
        var randomList = $list.get(getRandomInt(0, $list.length));    
        cy.wrap(randomList).click({force:true});    
      });
    }) ;
  
    it( 'Eliminar pagina', ()=> {
      cy.get('.post-settings').click({force:true});
      cy.get('.settings-menu-content').get('button').contains('page').click({force:true});
      cy.get('.fullscreen-modal').get('button').contains('Cancel').click({force:true});
      //cy.get('.fullscreen-modal').get('button').contains('Delete').click();
     }) ;
  
  it( 'Crear nueva pagina', ()=> {
    //4.crear nueva pagina
  cy.visit('http://localhost:2368/ghost/#/pages' );
  cy.wait(3000);
  cy.get('.view-actions',{ timeout: 2000 }).contains('New page').click();
  cy.get('[placeholder="Page Title"]',{ timeout: 4000}).click().type("Mi primera pagina");
  cy.wait(3000); 
  //cy.get('.koenig-editor__editor p').click({force: true}).type("Descripcion pagina");    
  //cy.wait(3000);
  }) ;
  
  it( 'Crear nuevo post', ()=> {
      cy.visit( 'http://localhost:2368/ghost/#/posts');
      cy.wait(3000);
      cy.get('.view-actions',{ timeout: 2000 }).contains('New post').click();    
      cy.get('[placeholder="Post Title"]',{ timeout: 4000}).click().type("Mi primer post");
      cy.wait(5000); 
      //cy.get('.koenig-editor__editor p').click({force: true}).type("Descripcion");
      //cy.wait(3000); 
  }) ;
  
  it( 'Crear nuevo tag', ()=> {
    //3.crear nuevo tag
  cy.visit( 'http://localhost:2368/ghost/#/tags' );
  cy.wait(3000);
  cy.get('.view-actions',{ timeout: 3000 }).contains('New tag').click();
  cy.wait(3000);
  cy.get('input[name="name"]',{ timeout: 4000}).click({force:true}).type("Pruebas E2E");
  cy.get('[name="description"]',{ timeout: 4000}).click({force:true}).type("Nueva prueba");
  cy.get('button').contains('Save').click({force:true});
  cy.wait(3000);
  }) ;
  
  } );