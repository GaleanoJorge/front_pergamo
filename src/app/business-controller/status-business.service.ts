import { Injectable } from '@angular/core';
import { Status } from '../models/status';
import { WebAPIService } from '../services/web-api.service';
import { ServiceObject } from '../models/service-object';

@Injectable({
  providedIn: 'root'
})
export class StatusBusinessService {

  public status: Status[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(): Promise<Status[]> {
    var servObj = new ServiceObject("status");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.status = <Status[]>servObj.data.status;
        return Promise.resolve(this.status);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
