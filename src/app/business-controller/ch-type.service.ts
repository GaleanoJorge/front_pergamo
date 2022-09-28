import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChType } from '../models/ch-type';

@Injectable({
  providedIn: 'root'
})
export class ChTypeService {
  public ch_type: ChType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChType[]> {
    let servObj = new ServiceObject(params ? 'ch_type?pagination=false' : 'ch_type');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_type = <ChType[]>servObj.data.ch_type;

        return Promise.resolve(this.ch_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetBedByPavilion(pavilion_id,ambit): Promise<ChType[]> {
    let servObj = new ServiceObject(`ch_type/byPavilion/${pavilion_id}/${ambit}`);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_type = <ChType[]>servObj.data.ch_type;
        return Promise.resolve(this.ch_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_type');
    servObj.data = ch_type;
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

  Update(ch_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_type', ch_type.id);
    servObj.data = ch_type;
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
    let servObj = new ServiceObject('ch_type', id);
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
