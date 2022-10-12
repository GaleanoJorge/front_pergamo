import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ProvidersOfHealthServices } from '../models/providers-of-health-services';

@Injectable({
  providedIn: 'root'
})
export class ProvidersOfHealthServicesService {
  public providers_of_health_services: ProvidersOfHealthServices[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ProvidersOfHealthServices[]> {
    let servObj = new ServiceObject(params ? 'providers_of_health_services?pagination=false' : 'providers_of_health_services');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.providers_of_health_services = <ProvidersOfHealthServices[]>servObj.data.providers_of_health_services;

        return Promise.resolve(this.providers_of_health_services);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(providers_of_health_services: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('providers_of_health_services');
    servObj.data = providers_of_health_services;
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

  Update(providers_of_health_services: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('providers_of_health_services', providers_of_health_services.id);
    servObj.data = providers_of_health_services;
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
    let servObj = new ServiceObject('providers_of_health_services', id);
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
