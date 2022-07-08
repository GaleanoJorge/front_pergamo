import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TcRentability } from '../models/tc-renatability';



@Injectable({
  providedIn: 'root'
})
export class TcRentabilityService {
  public rentability_tc: TcRentability[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TcRentability[]> {
    let servObj = new ServiceObject(params ? 'rentability_tc?pagination=false' : 'rentability_tc');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.rentability_tc = <TcRentability[]>servObj.data.rentability_tc;

        return Promise.resolve(this.rentability_tc);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(rentability_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('rentability_tc');
    servObj.data = rentability_tc;
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

  Update(rentability_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('rentability_tc', rentability_tc.id);
    servObj.data = rentability_tc;
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
    let servObj = new ServiceObject('rentability_tc', id);
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

  SaveFile(rentability_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('rentability_tc/file');
    servObj.data = rentability_tc;
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
}
