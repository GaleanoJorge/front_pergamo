import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChNRMaterialsFT } from '../models/ch_n_r_materials_f_t';


@Injectable({
  providedIn: 'root'
})
export class ChNRMaterialsFTService {
  public ch_n_r_materials_f_t: ChNRMaterialsFT[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChNRMaterialsFT[]> {
    let servObj = new ServiceObject(params ? 'ch_n_r_materials_f_t?pagination=false' : 'ch_n_r_materials_f_t');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_n_r_materials_f_t = <ChNRMaterialsFT[]>servObj.data.ch_n_r_materials_f_t;

        return Promise.resolve(this.ch_n_r_materials_f_t);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_n_r_materials_f_t: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_n_r_materials_f_t');
    servObj.data = ch_n_r_materials_f_t;
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

  Update(ch_n_r_materials_f_t: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_n_r_materials_f_t', ch_n_r_materials_f_t.id);
    servObj.data = ch_n_r_materials_f_t;
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
    let servObj = new ServiceObject('ch_n_r_materials_f_t', id);
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
