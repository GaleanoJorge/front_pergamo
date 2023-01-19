import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsPsychomotricity } from '../models/ch-ps-psychomotricity';
@Injectable({
  providedIn: 'root'
})
export class ChPsPsychomotricityService {
  public ch_ps_psychomotricity: ChPsPsychomotricity[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsPsychomotricity[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_psychomotricity?pagination=false' : 'ch_ps_psychomotricity');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_psychomotricity = <ChPsPsychomotricity[]>servObj.data.ch_ps_psychomotricity;

        return Promise.resolve(this.ch_ps_psychomotricity);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_psychomotricity: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_psychomotricity');
    servObj.data = ch_ps_psychomotricity;
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

  Update(ch_ps_psychomotricity: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_psychomotricity', ch_ps_psychomotricity.id);
    servObj.data = ch_ps_psychomotricity;
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
    let servObj = new ServiceObject('ch_ps_psychomotricity', id);
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
