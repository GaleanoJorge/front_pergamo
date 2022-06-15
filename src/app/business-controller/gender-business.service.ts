import { Injectable } from '@angular/core';
import { Gender } from '../models/gender';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class GenderBusinessService {

  public genders: Gender[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(): Promise<Gender[]> {
    var servObj = new ServiceObject("gender");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.genders = <Gender[]>servObj.data.gender;
        return Promise.resolve(this.genders);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
