/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
 export const environment = {
  production: false,
  cas: 'https://sso-test.eduredejrlb.co/cas/',
  api: 'http://192.168.0.144:8000/api/',
  storage: 'http://192.168.0.144:8000/storage/',
  api_absolute: 'http://192.168.0.144/api-ensename-ejrlb/public/',
  app_version: 'v1.0.7',
  url_lms: 'https://ejrlb.territorio.la/integraciones/Login/LoginGotoCourses/?assertion_data=',

  url_service: 'http://localhost',
  login_sso: 'false',  // sso -> Login por cas,ensename -> login directo
  url_lms_ratings: ' https://lms-test.eduredejrlb.co/blocks/sga_integrations/controller.php?method=extractGradesAndCompetences',
  url_lms_enrollment: 'https://lms-test.eduredejrlb.co/blocks/sga_integrations/controller.php?method=processSgaIntegration&debug=false',
  api_mipress_fac: 'WSFACMIPRESNOPBS/api/',
  nit_mipress: 900900122,
token: '0FE2D27C-7989-41D5-9C08-91A80DD81B67',
api_mipress_sum: 'WSSUMMIPRESNOPBS/api/',
};

