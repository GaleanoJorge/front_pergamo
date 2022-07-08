import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChOstomies } from '../models/ch-ostomies';

@Injectable({
  providedIn: 'root'
})
export class ChOstomiesService {
  public ch_ostomies: ChOstomies[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChOstomies[]> {
    let servObj = new ServiceObject(params ? 'ch_ostomies?pagination=false' : 'ch_ostomies');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ostomies = <ChOstomies[]>servObj.data.ch_ostomies;

        return Promise.resolve(this.ch_ostomies);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ostomies: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ostomies');
    servObj.data = ch_ostomies;
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

  Update(ch_ostomies: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ostomies', ch_ostomies.id);
    servObj.data = ch_ostomies;
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
    let servObj = new ServiceObject('ch_ostomies', id);
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
