import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChMethodPlanningGyneco } from '../models/ch-method-planning-gyneco';

@Injectable({
  providedIn: 'root'
})
export class ChMethodPlanningGynecoService {
  public ch_method_planning_gyneco: ChMethodPlanningGyneco[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChMethodPlanningGyneco[]> {
    let servObj = new ServiceObject(params ? 'ch_method_planning_gyneco?pagination=false' : 'ch_method_planning_gyneco');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_method_planning_gyneco = <ChMethodPlanningGyneco[]>servObj.data.ch_method_planning_gyneco;

        return Promise.resolve(this.ch_method_planning_gyneco);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_method_planning_gyneco: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_method_planning_gyneco');
    servObj.data = ch_method_planning_gyneco;
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

  Update(ch_method_planning_gyneco: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_method_planning_gyneco', ch_method_planning_gyneco.id);
    servObj.data = ch_method_planning_gyneco;
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
    let servObj = new ServiceObject('ch_method_planning_gyneco', id);
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
