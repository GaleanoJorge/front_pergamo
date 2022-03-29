import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChVitalNeurological } from '../models/ch-vital-neurological';

@Injectable({
  providedIn: 'root'
})
export class ChVitalNeurologicalService {
  public ch_vital_neurological: ChVitalNeurological[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChVitalNeurological[]> {
    let servObj = new ServiceObject(params ? 'ch_vital_neurological?pagination=false' : 'ch_vital_neurological');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_vital_neurological = <ChVitalNeurological[]>servObj.data.ch_vital_neurological;

        return Promise.resolve(this.ch_vital_neurological);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_vital_neurological: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_vital_neurological');
    servObj.data = ch_vital_neurological;
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

  Update(ch_vital_neurological: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_vital_neurological', ch_vital_neurological.id);
    servObj.data = ch_vital_neurological;
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
    let servObj = new ServiceObject('ch_vital_neurological', id);
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
