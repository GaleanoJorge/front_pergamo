import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsJudgment } from '../models/ch-ps-judgment';

@Injectable({
  providedIn: 'root'
})
export class ChPsJudgmentService {
  public ch_ps_judgment: ChPsJudgment[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsJudgment[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_judgment?pagination=false' : 'ch_ps_judgment');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_judgment = <ChPsJudgment[]>servObj.data.ch_ps_judgment;

        return Promise.resolve(this.ch_ps_judgment);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_judgment: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_judgment');
    servObj.data = ch_ps_judgment;
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

  Update(ch_ps_judgment: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_judgment', ch_ps_judgment.id);
    servObj.data = ch_ps_judgment;
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
    let servObj = new ServiceObject('ch_ps_judgment', id);
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
