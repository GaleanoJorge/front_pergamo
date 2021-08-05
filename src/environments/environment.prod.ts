/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: false,
  api: 'https://sga-api-test.eduredejrlb.co/api/',
  cas: 'https://sso-test.eduredejrlb.co/cas/',
  storage: 'http://34.71.7.149:8001/storage/',
  api_absolute: 'http://34.71.7.149:8001/api-ensename-ejrlb/public/',
  app_version: 'v1.0.7',
  url_lms: 'https://ejrlb.territorio.la/integraciones/Login/LoginGotoCourses/?assertion_data=',
  url_lms_ratings: 'https://lms-test.eduredejrlb.co/blocks/sga_integrations/controller.php?method=extractGradesAndCompetences',
  url_lms_enrollment: 'https://lms-test.eduredejrlb.co/blocks/sga_integrations/controller.php?method=processSgaIntegration&debug=false',
  url_service: 'https://sga-test.eduredejrlb.co',
  login_sso: 'true',  //sso -> Login por cas, ensename -> login directo
};
