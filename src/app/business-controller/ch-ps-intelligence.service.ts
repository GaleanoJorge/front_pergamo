import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsIntelligence } from '../models/ch-ps-intelligence';

@Injectable({
  providedIn: 'root'
})
export class ChPsIntelligenceService {
  public ch_ps_intelligence: ChPsIntelligence[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsIntelligence[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_intelligence?pagination=false' : 'ch_ps_intelligence');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_intelligence = <ChPsIntelligence[]>servObj.data.ch_ps_intelligence;

        return Promise.resolve(this.ch_ps_intelligence);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_intelligence: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_intelligence');
    servObj.data = ch_ps_intelligence;
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

  Update(ch_ps_intelligence: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_intelligence', ch_ps_intelligence.id);
    servObj.data = ch_ps_intelligence;
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
    let servObj = new ServiceObject('ch_ps_intelligence', id);
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
