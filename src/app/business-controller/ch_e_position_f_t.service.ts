import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChEPositionFT } from '../models/ch_e_position_f_t';


@Injectable({
  providedIn: 'root'
})
export class ChEPositionFTService {
  public ch_e_position_f_t: ChEPositionFT[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChEPositionFT[]> {
    let servObj = new ServiceObject(params ? 'ch_e_position_f_t?pagination=false' : 'ch_e_position_f_t');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_e_position_f_t = <ChEPositionFT[]>servObj.data.ch_e_position_f_t;

        return Promise.resolve(this.ch_e_position_f_t);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_e_position_f_t: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_e_position_f_t');
    servObj.data = ch_e_position_f_t;
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

  Update(ch_e_position_f_t: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_e_position_f_t', ch_e_position_f_t.id);
    servObj.data = ch_e_position_f_t;
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
    let servObj = new ServiceObject('ch_e_position_f_t', id);
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
