describe( 'Test ghost', ()=> {
  it( 'Prueba Login', ()=> {
    cy.visit( 'http://localhost:2368/ghost/#/signin' );
    cy.get('.gh-signin').find('input[name="identification"]').click().type("angela.anaya.castaneda@gmail.com");
    cy.get('.gh-signin').find('input[name="password"]').click().type("juanda2309");
    cy.get('.gh-signin').contains('Sign in').click();
    cy.visit('http://localhost:2368/ghost/#/site') ; 
    cy.visit( 'http://localhost:2368/ghost/#/posts');
    cy.get('.view-actions',{ timeout: 2000 }).contains('New post').click();
    
    cy.get('textarea',{ timeout: 9000 }).should('have.attr', 'placeholder').and('include', 'Post Title');
    

    //cy.go('back')
    //cy.visit( 'http://localhost:2368/ghost/#/pages' );
    //cy.get('.view-actions').contains('New pages').click();

    //cy.visit( 'http://localhost:2368/ghost/#/tags' );
    //cy.get('.view-actions').contains('New tag').click();
  } );

} );
