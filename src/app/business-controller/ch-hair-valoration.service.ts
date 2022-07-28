import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChHairValoration } from '../models/ch-hair-valoration'; 

@Injectable({
  providedIn: 'root'
})
export class ChHairValorationService {
  public ch_hair_valoration: ChHairValoration[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChHairValoration[]> {
    let servObj = new ServiceObject(params ? 'ch_hair_valoration?pagination=false' : 'ch_hair_valoration');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_hair_valoration = <ChHairValoration[]>servObj.data.ch_hair_valoration;

        return Promise.resolve(this.ch_hair_valoration);
      })
      .catch(x => {
        throw x.message;
      });
  }

  ByRecord(record, type): Promise<ChHairValoration[]> {
    let servObj = new ServiceObject('ch_hair_valoration/by_record/' + record + '/' + type + '?pagination=false');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_hair_valoration = <ChHairValoration[]>servObj.data.ch_hair_valoration;

        return Promise.resolve(this.ch_hair_valoration);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_hair_valoration: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_hair_valoration');
    servObj.data = ch_hair_valoration;
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

  Update(ch_hair_valoration: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_hair_valoration', ch_hair_valoration.id);
    servObj.data = ch_hair_valoration;
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
    let servObj = new ServiceObject('ch_hair_valoration', id);
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
