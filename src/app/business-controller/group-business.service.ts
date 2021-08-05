import {BaseBusinessService} from './base-business.service';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';
import {Group} from '../models/group';

@Injectable({
  providedIn: 'root',
})
export class GroupBusinessService extends BaseBusinessService<Group> {
  constructor(
    private webAPI: WebAPIService,
  ) {
    super(webAPI, 'group', 'groups');
  }


}
