import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChPsDelusional } from '../models/ch-ps-delusional';

@Injectable({
  providedIn: 'root'
})
export class ChPsDelusionalService {
  public ch_ps_delusional: ChPsDelusional[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsDelusional[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_delusional?pagination=false' : 'ch_ps_delusional');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_delusional = <ChPsDelusional[]>servObj.data.ch_ps_delusional;

        return Promise.resolve(this.ch_ps_delusional);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_delusional: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_delusional');
    servObj.data = ch_ps_delusional;
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

  Update(ch_ps_delusional: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_delusional', ch_ps_delusional.id);
    servObj.data = ch_ps_delusional;
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
    let servObj = new ServiceObject('ch_ps_delusional', id);
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
