import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { TherapeuticGoalsTl } from '../models/therapeutic-goals-tl';

@Injectable({
  providedIn: 'root'
})
export class TherapeuticGoalsTlService {
  public therapeutic_goals_tl: TherapeuticGoalsTl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TherapeuticGoalsTl[]> {
    let servObj = new ServiceObject(params ? 'therapeutic_goals_tl?pagination=false' : 'therapeutic_goals_tl');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.therapeutic_goals_tl = <TherapeuticGoalsTl[]>servObj.data.therapeutic_goals_tl;

        return Promise.resolve(this.therapeutic_goals_tl); 
      })
      .catch(x => {
        throw x.message;
      });
  }
  

  Save(therapeutic_goals_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('therapeutic_goals_tl');
    servObj.data = therapeutic_goals_tl;
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

  Update(therapeutic_goals_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('therapeutic_goals_tl', therapeutic_goals_tl.id);
    servObj.data = therapeutic_goals_tl;
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
    let servObj = new ServiceObject('therapeutic_goals_tl', id);
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
