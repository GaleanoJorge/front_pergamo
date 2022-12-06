import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsObjectives } from '../models/ch-ps-objectives';


@Injectable({
  providedIn: 'root'
})
export class ChPsObjectivesService {
  public ch_ps_objectives: ChPsObjectives[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsObjectives[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_objectives?pagination=false' : 'ch_ps_objectives');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_objectives = <ChPsObjectives[]>servObj.data.ch_ps_objectives;

        return Promise.resolve(this.ch_ps_objectives);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_objectives: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_objectives');
    servObj.data = ch_ps_objectives;
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

  Update(ch_ps_objectives: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_objectives', ch_ps_objectives.id);
    servObj.data = ch_ps_objectives;
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
    let servObj = new ServiceObject('ch_ps_objectives', id);
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
