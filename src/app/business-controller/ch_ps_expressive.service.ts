import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChPsExpressive } from '../models/ch-ps-expressive';

@Injectable({
  providedIn: 'root'
})
export class ChPsExpressiveService {
  public ch_ps_expressive: ChPsExpressive[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsExpressive[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_expressive?pagination=false' : 'ch_ps_expressive');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_expressive = <ChPsExpressive[]>servObj.data.ch_ps_expressive;

        return Promise.resolve(this.ch_ps_expressive);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_expressive: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_expressive');
    servObj.data = ch_ps_expressive;
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

  Update(ch_ps_expressive: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_expressive', ch_ps_expressive.id);
    servObj.data = ch_ps_expressive;
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
    let servObj = new ServiceObject('ch_ps_expressive', id);
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
