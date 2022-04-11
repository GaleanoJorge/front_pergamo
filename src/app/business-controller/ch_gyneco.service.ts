import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChGynecologists } from '../models/ch-gynecologists';


@Injectable({
  providedIn: 'root'
})
export class ChGynecologistsService {
  public ch_gynecologists: ChGynecologists[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChGynecologists[]> {
    let servObj = new ServiceObject(params ? 'ch_gynecologists?pagination=false' : 'ch_gynecologists');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_gynecologists = <ChGynecologists[]>servObj.data.ch_gynecologists;

        return Promise.resolve(this.ch_gynecologists);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_gynecologists: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_gynecologists');
    servObj.data = ch_gynecologists;
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

  Update(ch_gynecologists: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_gynecologists', ch_gynecologists.id);
    servObj.data = ch_gynecologists;
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
    let servObj = new ServiceObject('ch_gynecologists', id);
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
