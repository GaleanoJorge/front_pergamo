import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChTypeGynecologists } from '../models/ch-type-gynecologists';

@Injectable({
  providedIn: 'root'
})
export class ChTypeGynecologistsService {
  public ch_type_gynecologists: ChTypeGynecologists[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChTypeGynecologists[]> {
    let servObj = new ServiceObject(params ? 'ch_type_gynecologists?pagination=false' : 'ch_type_gynecologists');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_type_gynecologists = <ChTypeGynecologists[]>servObj.data.ch_type_gynecologists;

        return Promise.resolve(this.ch_type_gynecologists);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_type_gynecologists: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_type_gynecologists');
    servObj.data = ch_type_gynecologists;
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

  Update(ch_type_gynecologists: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_type_gynecologists', ch_type_gynecologists.id);
    servObj.data = ch_type_gynecologists;
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
    let servObj = new ServiceObject('ch_type_gynecologists', id);
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
