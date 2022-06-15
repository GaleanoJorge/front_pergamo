import { Injectable } from '@angular/core';
import { WebAPIService } from '../services/web-api.service';
import { IdentificationType } from '../models/identification-type';
import { ServiceObject } from '../models/service-object';

@Injectable({
  providedIn: 'root'
})
export class IdentificationTypeBusinessService {

  public identificationTypes: IdentificationType[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(): Promise<IdentificationType[]> {
    var servObj = new ServiceObject("identificationType");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.identificationTypes = <IdentificationType[]>servObj.data.identificationType;
        return Promise.resolve(this.identificationTypes);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
