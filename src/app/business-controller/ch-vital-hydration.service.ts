import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChVitalHydration } from '../models/ch-vital-hydration';

@Injectable({
  providedIn: 'root'
})
export class ChVitalHydrationService {
  public ch_vital_hydration: ChVitalHydration[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChVitalHydration[]> {
    let servObj = new ServiceObject(params ? 'ch_vital_hydration?pagination=false' : 'ch_vital_hydration');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_vital_hydration = <ChVitalHydration[]>servObj.data.ch_vital_hydration;

        return Promise.resolve(this.ch_vital_hydration);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_vital_hydration: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_vital_hydration');
    servObj.data = ch_vital_hydration;
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

  Update(ch_vital_hydration: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_vital_hydration', ch_vital_hydration.id);
    servObj.data = ch_vital_hydration;
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
    let servObj = new ServiceObject('ch_vital_hydration', id);
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
