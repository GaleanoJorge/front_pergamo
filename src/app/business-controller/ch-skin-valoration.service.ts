import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChSkinValoration } from '../models/ch-skin-valoration';

@Injectable({
  providedIn: 'root'
})
export class ChSkinValorationService {
  public ch_skin_valoration: ChSkinValoration[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSkinValoration[]> {
    let servObj = new ServiceObject(params ? 'ch_skin_valoration?pagination=false' : 'ch_skin_valoration');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_skin_valoration = <ChSkinValoration[]>servObj.data.ch_skin_valoration;

        return Promise.resolve(this.ch_skin_valoration);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_skin_valoration: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_skin_valoration');
    servObj.data = ch_skin_valoration;
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

  Update(ch_skin_valoration: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_skin_valoration', ch_skin_valoration.id);
    servObj.data = ch_skin_valoration;
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
    let servObj = new ServiceObject('ch_skin_valoration', id);
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
