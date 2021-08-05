import {BaseBusinessService} from './base-business.service';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';
import {ServiceObject} from '../models/service-object';

@Injectable({
  providedIn: 'root',
})
export class EventDayBusinessService extends BaseBusinessService {
  constructor(
    private webAPI: WebAPIService,
  ) {
    super(webAPI, 'eventDay', 'event_days', 'event_day');
  }
}
