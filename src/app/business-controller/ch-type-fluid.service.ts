import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChTypeFluid } from '../models/ch-type-fluid';

@Injectable({
  providedIn: 'root'
})
export class ChTypeFluidService {
  public ch_type_fluid: ChTypeFluid[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChTypeFluid[]> {
    let servObj = new ServiceObject(params ? 'ch_type_fluid?pagination=false' : 'ch_type_fluid');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_type_fluid = <ChTypeFluid[]>servObj.data.ch_type_fluid;

        return Promise.resolve(this.ch_type_fluid);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_type_fluid: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_type_fluid');
    servObj.data = ch_type_fluid;
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

  Update(ch_type_fluid: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_type_fluid', ch_type_fluid.id);
    servObj.data = ch_type_fluid;
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
    let servObj = new ServiceObject('ch_type_fluid', id);
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
