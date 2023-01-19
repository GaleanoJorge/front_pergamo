import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChEvoSoap } from '../models/ch-evo-soap';

@Injectable({
  providedIn: 'root'
})
export class ChEvoSoapService {
  public ch_evo_soap: ChEvoSoap[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChEvoSoap[]> {
    let servObj = new ServiceObject(params ? 'ch_evo_soap?pagination=false' : 'ch_evo_soap');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_evo_soap = <ChEvoSoap[]>servObj.data.ch_evo_soap;

        return Promise.resolve(this.ch_evo_soap);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_evo_soap: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_evo_soap');
    servObj.data = ch_evo_soap;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Update(ch_evo_soap: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_evo_soap', ch_evo_soap.id);
    servObj.data = ch_evo_soap;
    return this.webAPI.PutAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_evo_soap', id);
    return this.webAPI.DeleteAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
