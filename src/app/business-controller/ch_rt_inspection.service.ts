import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChRtInspection } from '../models/ch-rt-inspection';

@Injectable({
  providedIn: 'root'
})
export class ChRtInspectionService {
  public ch_rt_inspection:ChRtInspection[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChRtInspection[]> {
    let servObj = new ServiceObject(params ? 'ch_rt_inspection?pagination=false' : 'ch_rt_inspection');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_rt_inspection = <ChRtInspection[]>servObj.data.ch_rt_inspection;

        return Promise.resolve(this.ch_rt_inspection);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_rt_inspection: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_rt_inspection');
    servObj.data = ch_rt_inspection;
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

  Update(ch_rt_inspection: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_rt_inspection', ch_rt_inspection.id);
    servObj.data = ch_rt_inspection;
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
    let servObj = new ServiceObject('ch_rt_inspection', id);
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
