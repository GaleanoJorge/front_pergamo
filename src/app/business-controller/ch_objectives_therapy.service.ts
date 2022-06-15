import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChObjectivesTherapy } from '../models/ch-objectives-therapy';

@Injectable({
  providedIn: 'root'
})
export class ChObjectivesTherapyService {
  public ch_objectives_therapy:ChObjectivesTherapy[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChObjectivesTherapy[]> {
    let servObj = new ServiceObject(params ? 'ch_objectives_therapy?pagination=false' : 'ch_objectives_therapy');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_objectives_therapy = <ChObjectivesTherapy[]>servObj.data.ch_objectives_therapy;

        return Promise.resolve(this.ch_objectives_therapy);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_objectives_therapy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_objectives_therapy');
    servObj.data = ch_objectives_therapy;
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

  Update(ch_objectives_therapy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_objectives_therapy', ch_objectives_therapy.id);
    servObj.data = ch_objectives_therapy;
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
    let servObj = new ServiceObject('ch_objectives_therapy', id);
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
