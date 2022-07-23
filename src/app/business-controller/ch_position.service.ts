import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPosition } from '../models/ch_position'; 

@Injectable({
  providedIn: 'root'
})
export class ChPositionService {
  public ch_position: ChPosition[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPosition[]> {
    let servObj = new ServiceObject(params ? 'ch_position?pagination=false' : 'ch_position');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_position = <ChPosition[]>servObj.data.ch_position;

        return Promise.resolve(this.ch_position);
      })
      .catch(x => {
        throw x.message;
      });
  }

  ByRecord(record, type): Promise<ChPosition[]> {
    let servObj = new ServiceObject('ch_position/by_record/' + record + '/' + type + '?pagination=false');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_position = <ChPosition[]>servObj.data.ch_position;

        return Promise.resolve(this.ch_position);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_position: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_position');
    servObj.data = ch_position;
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

  Update(ch_position: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_position', ch_position.id);
    servObj.data = ch_position;
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
    let servObj = new ServiceObject('ch_position', id);
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
