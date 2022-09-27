import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { StayType } from '../models/stay-type';

@Injectable({
  providedIn: 'root'
})
export class StayTypeService {
  public stay_type: StayType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<StayType[]> {
    let servObj = new ServiceObject(params ? 'stay_type?pagination=false' : 'stay_type');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.stay_type = <StayType[]>servObj.data.stay_type;

        return Promise.resolve(this.stay_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(stay_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('stay_type');
    servObj.data = stay_type;
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

  Update(stay_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('stay_type', stay_type.id);
    servObj.data = stay_type;
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
    let servObj = new ServiceObject('stay_type', id);
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
