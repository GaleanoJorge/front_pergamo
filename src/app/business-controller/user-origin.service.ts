import { Injectable } from '@angular/core';
import { WebAPIService } from '../services/web-api.service';
import { ServiceObject } from '../models/service-object';
import { Origin } from '../models/origin';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserOriginService {

  public origins: Origin[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(): Promise<Origin[]> {
    var servObj = new ServiceObject("origin/allByUserAuth");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.origins = <Origin[]>servObj.data.origins;
        return Promise.resolve(this.origins);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }
}
