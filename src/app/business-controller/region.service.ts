import {Region} from '../models/region';
import {ServiceObject} from '../models/service-object';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  public region: Region[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(): Promise<Region[]> {
    let servObj = new ServiceObject('region');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);


        this.region = <Region[]>servObj.data.regions;

        return Promise.resolve(this.region);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(reg: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('region');
    servObj.data = reg;
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

  Update(reg: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('region', reg.id);
    servObj.data = reg;
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
    let servObj = new ServiceObject('region', id);
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
