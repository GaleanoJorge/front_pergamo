import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { NursingTypePhysical } from '../models/nursing-type-physical';

@Injectable({
  providedIn: 'root'
})
export class NursingTypePhysicalService {
  public nursing_type_physical: NursingTypePhysical[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<NursingTypePhysical[]> {
    let servObj = new ServiceObject(params ? 'nursing_type_physical?pagination=false' : 'nursing_type_physical');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.nursing_type_physical = <NursingTypePhysical[]>servObj.data.nursing_type_physical;

        return Promise.resolve(this.nursing_type_physical);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(nursing_type_physical: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('nursing_type_physical');
    servObj.data = nursing_type_physical;
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

  Update(nursing_type_physical: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('nursing_type_physical', nursing_type_physical.id);
    servObj.data = nursing_type_physical;
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
    let servObj = new ServiceObject('nursing_type_physical', id);
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
