import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { InterventionTl } from '../models/intervention-tl';

@Injectable({
  providedIn: 'root'
})
export class InterventionTlService {
  public intervention_tl: InterventionTl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<InterventionTl[]> {
    let servObj = new ServiceObject(params ? 'intervention_tl?pagination=false' : 'intervention_tl');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.intervention_tl = <InterventionTl[]>servObj.data.intervention_tl;

        return Promise.resolve(this.intervention_tl);
      })
      .catch(x => {
        throw x.message;
      });
  }
  

  Save(intervention_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('intervention_tl');
    servObj.data = intervention_tl;
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

  Update(intervention_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('intervention_tl', intervention_tl.id);
    servObj.data = intervention_tl;
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
    let servObj = new ServiceObject('intervention_tl', id);
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
