import {ServiceObject} from '../models/service-object';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';
import {InscriptionStatus} from '../models/inscription-status';

@Injectable({
  providedIn: 'root',
})
export class InscriptionStatusBusinessService {
  public inscriptionStatus: InscriptionStatus[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<InscriptionStatus[]> {
    let servObj = new ServiceObject('inscriptionStatus');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);


        this.inscriptionStatus = <InscriptionStatus[]>servObj.data.inscriptionStatus;

        return Promise.resolve(this.inscriptionStatus);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
