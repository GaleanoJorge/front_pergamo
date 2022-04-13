import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPlanningGynecologists } from '../models/ch-planning-gynecologists';

@Injectable({
  providedIn: 'root'
})
export class ChPlanningGynecologistsService {
  public ch_planning_gynecologists: ChPlanningGynecologists[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPlanningGynecologists[]> {
    let servObj = new ServiceObject(params ? 'ch_planning_gynecologists?pagination=false' : 'ch_planning_gynecologists');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_planning_gynecologists = <ChPlanningGynecologists[]>servObj.data.ch_planning_gynecologists;

        return Promise.resolve(this.ch_planning_gynecologists);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_planning_gynecologists: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_planning_gynecologists');
    servObj.data = ch_planning_gynecologists;
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

  Update(ch_planning_gynecologists: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_planning_gynecologists', ch_planning_gynecologists.id);
    servObj.data = ch_planning_gynecologists;
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
    let servObj = new ServiceObject('ch_planning_gynecologists', id);
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
