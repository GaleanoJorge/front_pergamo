import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChRouteFluid } from '../models/ch-route-fluid';

@Injectable({
  providedIn: 'root'
})
export class ChRouteFluidService {
  public ch_route_fluid: ChRouteFluid[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params): Promise<ChRouteFluid[]> {
    let servObj = new ServiceObject(params ? 'ch_route_fluid?pagination=false&type='+ params : 'ch_route_fluid');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_route_fluid = <ChRouteFluid[]>servObj.data.ch_route_fluid;

        return Promise.resolve(this.ch_route_fluid);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_route_fluid: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_route_fluid');
    servObj.data = ch_route_fluid;
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

  Update(ch_route_fluid: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_route_fluid', ch_route_fluid.id);
    servObj.data = ch_route_fluid;
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
    let servObj = new ServiceObject('ch_route_fluid', id);
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
