import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChPsIntellective } from '../models/ch-ps-intellective';

@Injectable({
  providedIn: 'root'
})
export class ChPsIntellectiveService {
  public ch_ps_intellective: ChPsIntellective[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsIntellective[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_intellective?pagination=false' : 'ch_ps_intellective');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_intellective = <ChPsIntellective[]>servObj.data.ch_ps_intellective;

        return Promise.resolve(this.ch_ps_intellective);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_intellective: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_intellective');
    servObj.data = ch_ps_intellective;
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

  Update(ch_ps_intellective: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_intellective', ch_ps_intellective.id);
    servObj.data = ch_ps_intellective;
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
    let servObj = new ServiceObject('ch_ps_intellective', id);
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
