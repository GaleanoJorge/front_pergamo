import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsIntervention } from '../models/ch-ps-intervention';


@Injectable({
  providedIn: 'root'
})
export class ChPsInterventionService {
  public ch_ps_intervention: ChPsIntervention[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsIntervention[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_intervention?pagination=false' : 'ch_ps_intervention');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_intervention = <ChPsIntervention[]>servObj.data.ch_ps_intervention;

        return Promise.resolve(this.ch_ps_intervention);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_intervention: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_intervention');
    servObj.data = ch_ps_intervention;
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

  Update(ch_ps_intervention: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_intervention', ch_ps_intervention.id);
    servObj.data = ch_ps_intervention;
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
    let servObj = new ServiceObject('ch_ps_intervention', id);
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
