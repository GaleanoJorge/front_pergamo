import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AdmissionRoute } from '../models/admission-route';

@Injectable({
  providedIn: 'root'
})
export class AdmissionRouteService {
  public admission_route: AdmissionRoute[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<AdmissionRoute[]> {
    let servObj = new ServiceObject(params ? 'admission_route?pagination=false' : 'admission_route');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.admission_route = <AdmissionRoute[]>servObj.data.admission_route;

        return Promise.resolve(this.admission_route);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(admission_route: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('admission_route');
    servObj.data = admission_route;
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

  Update(admission_route: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('admission_route', admission_route.id);
    servObj.data = admission_route;
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
    let servObj = new ServiceObject('admission_route', id);
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
