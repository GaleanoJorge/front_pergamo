import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AdministrationRoute } from '../models/administration-route';

@Injectable({
  providedIn: 'root'
})
export class AdministrationRouteService {
  public administration_route: AdministrationRoute[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<AdministrationRoute[]> {
    let servObj = new ServiceObject(params ? 'administration_route?pagination=false' : 'administration_route');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.administration_route = <AdministrationRoute[]>servObj.data.administration_route;

        return Promise.resolve(this.administration_route);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(administration_route: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('administration_route');
    servObj.data = administration_route;
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

  Update(administration_route: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('administration_route', administration_route.id);
    servObj.data = administration_route;
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
    let servObj = new ServiceObject('administration_route', id);
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
