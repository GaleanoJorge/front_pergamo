/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  cas: 'https://sso-test.eduredejrlb.co/cas/',
  api: 'http://127.0.0.1:8000/api/',
  storage: 'http://localhost:8000/storage/',
  api_absolute: 'http://localhost/api-ensename-ejrlb/public/',
  app_version: 'v1.0.7',
  url_lms: 'https://ejrlb.territorio.la/integraciones/Login/LoginGotoCourses/?assertion_data=',

  url_service: 'http://localhost:4200',
  login_sso: 'false',  // sso -> Login por cas,ensename -> login directo
  url_lms_ratings: ' https://lms-test.eduredejrlb.co/blocks/sga_integrations/controller.php?method=extractGradesAndCompetences',
  url_lms_enrollment: 'https://lms-test.eduredejrlb.co/blocks/sga_integrations/controller.php?method=processSgaIntegration&debug=false',

};
