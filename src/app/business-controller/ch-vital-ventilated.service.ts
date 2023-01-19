import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChVitalVentilated } from '../models/ch-vital-ventilated';

@Injectable({
  providedIn: 'root'
})
export class ChVitalVentilatedService {
  public ch_vital_ventilated: ChVitalVentilated[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChVitalVentilated[]> {
    let servObj = new ServiceObject(params ? 'ch_vital_ventilated?pagination=false' : 'ch_vital_ventilated');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_vital_ventilated = <ChVitalVentilated[]>servObj.data.ch_vital_ventilated;

        return Promise.resolve(this.ch_vital_ventilated);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_vital_ventilated: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_vital_ventilated');
    servObj.data = ch_vital_ventilated;
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

  Update(ch_vital_ventilated: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_vital_ventilated', ch_vital_ventilated.id);
    servObj.data = ch_vital_ventilated;
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
    let servObj = new ServiceObject('ch_vital_ventilated', id);
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
