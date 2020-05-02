describe('Monkey web', function () {
    it('Monkey web recursivo de x eventos', function () {
        cy.visit('https://losestudiantes.co');//AQUI SE APUNTA AL URL DEL WEB A HACER RAMDOM
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEvent(10);//CANTIDAD DE EVENTOS
    })
})


function randomClick(monkeysLeft) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var monkeysLeft = monkeysLeft;
    if (monkeysLeft > 0) {
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if (!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({ force: true });
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(1000);
            randomClick(monkeysLeft);
        });
    }
}

function randomEvent(monkeysLeft) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    function generateRandomString(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    var monkeysLeft = monkeysLeft;
    if (monkeysLeft > 0) {
        switch (getRandomInt(1, 4)) {
            case 1: //Hacer click en un link al azar
                cy.get('a').then($links => {
                    var randomLink = $links.get(getRandomInt(0, $links.length));
                    if (!Cypress.dom.isHidden(randomLink)) {
                        cy.wrap(randomLink).click({ force: true });
                        monkeysLeft = monkeysLeft - 1;
                    }
                    cy.wait(1000);
                    randomEvent(monkeysLeft);
                });
                break;
            case 2: //Llenar un campo de texto al azar
                cy.get('input').then($inputs => {
                    var randomInput = $inputs.get(getRandomInt(0, $inputs.length));
                    if (!Cypress.dom.isHidden(randomInput)) {
                        cy.wrap(randomInput).type(generateRandomString(getRandomInt(0, 255)) + '{enter}', { force: true });
                        monkeysLeft = monkeysLeft - 1;
                    }
                    cy.wait(1000);
                    randomEvent(monkeysLeft);
                });
                break;
            case 3: //Seleccionar un combo al azar
                cy.get('select').then($selects => {
                    var randomSelect = $selects.get(getRandomInt(0, $selects.length));
                    if (!Cypress.dom.isHidden(randomSelect)) {
                        var options = randomSelect.children;
                        var valueList = [];
                        for (var i = 0; i < options.length; i++) {
                            if (!options[i].disabled) {
                                valueList.push(options[i].value); //opciones elegibles
                            }
                        }
                        var randomValue = valueList[getRandomInt(0, valueList.length)];
                        cy.wrap(randomSelect).select(randomValue, { force: true });
                        monkeysLeft = monkeysLeft - 1;
                    }
                    cy.wait(1000);
                    randomEvent(monkeysLeft);
                });
                break;
            case 4: //Hacer click en un botón al azar
                cy.get('button').then($buttons => {
                    var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
                    if (!Cypress.dom.isHidden(randomButton)) {
                        cy.wrap(randomButton).click({ force: true });
                        monkeysLeft = monkeysLeft - 1;
                    }
                    cy.wait(1000);
                    randomEvent(monkeysLeft);
                });
                break;
        }
    }
}