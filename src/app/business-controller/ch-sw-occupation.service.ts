import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChSwOccupation } from '../models/ch-sw-occupation';

@Injectable({
  providedIn: 'root'
})
export class ChSwOccupationService {
  public ch_sw_occupation: ChSwOccupation[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwOccupation[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_occupation?pagination=false' : 'ch_sw_occupation');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_occupation = <ChSwOccupation[]>servObj.data.ch_sw_occupation;

        return Promise.resolve(this.ch_sw_occupation);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_occupation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_occupation');
    servObj.data = ch_sw_occupation;
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

  Update(ch_sw_occupation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_occupation', ch_sw_occupation.id);
    servObj.data = ch_sw_occupation;
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
    let servObj = new ServiceObject('ch_sw_occupation', id);
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
