import { Injectable } from '@angular/core';
import { Goal } from '../models/goal';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class GoalBusinessService {

  public goals: Goal[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(): Promise<Goal[]> {
    var servObj = new ServiceObject("goals");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.goals = <Goal[]>servObj.data.goals;
        return Promise.resolve(this.goals);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
