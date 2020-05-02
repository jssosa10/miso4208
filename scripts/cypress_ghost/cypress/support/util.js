export const getDatosBlog = () => {
    console.log('Obtener Datos para blog')
    cy.request({
      method: 'GET',
      url: 'https://my.api.mockaroo.com/blog_.json?key=aaa41230&__method=POST',
      
    }).then((resp) => {
        console.log('Respuesta'+resp);
    })
  }