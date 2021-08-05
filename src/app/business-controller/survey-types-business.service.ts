import {BaseBusinessService} from './base-business.service';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';
import {SurveyTypes} from '../models/survey-types';

@Injectable({
  providedIn: 'root',
})
export class SurveyTypesBusinessService extends BaseBusinessService<SurveyTypes> {
  constructor(
    private webAPI: WebAPIService,
  ) {
    super(webAPI, 'surveyTypes', 'surveyTypes');
  }
}
