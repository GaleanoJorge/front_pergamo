import {Municipality} from '../models/municipality';
import {ServiceObject} from '../models/service-object';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MunicipalityService {
  public municipality: Municipality[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Municipality[]> {
    let servObj = new ServiceObject(params ? 'municipality?pagination=false' :'municipality');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);


        this.municipality = <Municipality[]>servObj.data.municipalitys;

        return Promise.resolve(this.municipality);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(mun: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('municipality');
    servObj.data = mun;
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

  Update(mun: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('municipality', mun.id);
    servObj.data = mun;
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
    let servObj = new ServiceObject('municipality', id);
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

  GetOne(id): Promise<Municipality> {
    let servObj = new ServiceObject('municipality', id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data.municipality[0]);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
