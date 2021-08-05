import {Injectable} from '@angular/core';
import {ServiceObject} from '../models/service-object';
import {WebAPIService} from '../services/web-api.service';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteRemoteBussinessService {
  constructor(
    private webAPI: WebAPIService) {
  }

  run(entity, params = {}) {
    let servObj = new ServiceObject(entity);

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
