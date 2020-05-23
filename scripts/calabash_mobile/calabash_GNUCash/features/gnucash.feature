Feature: Config GNU CASH

  Scenario: As a user I want to be able to watch the config screen
	When I press the "SIGUIENTE" button
  Then I should see "Divisa por defecto"

  Scenario: As a user I want to be able to reach the next screen in config wizard
  When I press the "SIGUIENTE" button
	  And I touch the "COP" text
    And I press the "SIGUIENTE" button
  Then I should see "Configuración de cuenta"

  Scenario: As a user I want to be able to choose "cuentas por defecto"
  When I press the "SIGUIENTE" button
	  And I touch the "COP" text
  When I press the "SIGUIENTE" button
    And I touch the "Crear cuentas por defecto" text
  When I press the "SIGUIENTE" button
  Then I should see "Opciones de sugerencias"

  Scenario: As a user I want to be able to "Desactivar informes de cuelgues"
  When I press the "SIGUIENTE" button
	  And I touch the "COP" text
  When I press the "SIGUIENTE" button
    And I touch the "Crear cuentas por defecto" text
  When I press the "SIGUIENTE" button
    And I touch the "Desactivar informes de cuelgues" text
  When I press the "SIGUIENTE" button
  Then I should see "Review"

  Scenario: As a user I want to be able to back to "Divisa por defecto" from Review
  When I press the "SIGUIENTE" button
	  And I touch the "COP" text
  When I press the "SIGUIENTE" button
    And I touch the "Crear cuentas por defecto" text
  When I press the "SIGUIENTE" button
    And I touch the "Desactivar informes de cuelgues" text
  When I press the "SIGUIENTE" button
  When I touch the "DIVISA POR DEFECTO" text
  And I touch the "USD" text
  Then I should see "Divisa por defecto"

  Scenario: As a user I want to be able to back to "Configuración de cuenta" from Review
  When I press the "SIGUIENTE" button
	  And I touch the "COP" text
  When I press the "SIGUIENTE" button
    And I touch the "Crear cuentas por defecto" text
  When I press the "SIGUIENTE" button
    And I touch the "Desactivar informes de cuelgues" text
  When I press the "SIGUIENTE" button
  When I touch the "Crear cuentas por defecto" text
  And I touch the "Yo me encargo" text
  Then I should see "Configuración de cuenta"

  Scenario: As a user I want to be able to back to "Opciones de sugerencias" from Review
  When I press the "SIGUIENTE" button
	  And I touch the "COP" text
  When I press the "SIGUIENTE" button
    And I touch the "Crear cuentas por defecto" text
  When I press the "SIGUIENTE" button
    And I touch the "Desactivar informes de cuelgues" text
  When I press the "SIGUIENTE" button
  When I touch the "OPCIONES DE SUGERENCIAS" text
  And I touch the "Enviar automáticamente informes de cuelgues" text
  Then I should see "Opciones de sugerencias"

  Scenario: As a user I want to be able to confirm Config Review
  When I press the "SIGUIENTE" button
	  And I touch the "COP" text
  When I press the "SIGUIENTE" button
    And I touch the "Crear cuentas por defecto" text
  When I press the "SIGUIENTE" button
    And I touch the "Desactivar informes de cuelgues" text
  When I press the "SIGUIENTE" button
  When I press the "HECHO" button
  Then I should see "Novedades"