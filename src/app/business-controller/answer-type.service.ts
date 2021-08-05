import {AnswerType} from '../models/answer-type';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';
import {BaseBusinessService} from './base-business.service';

@Injectable({
  providedIn: 'root',
})
export class AnswerTypeService extends BaseBusinessService {
  public answerT: AnswerType[] = [];

  constructor(private webAPI: WebAPIService) {
    super(webAPI, 'answerType', 'answerTypes', 'answerType');
  }
}
