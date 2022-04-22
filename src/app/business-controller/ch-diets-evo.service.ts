import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChDietsEvo } from '../models/ch-diets-evo';

@Injectable({
  providedIn: 'root'
})
export class ChDietsEvoService {
  public ch_diets_evo: ChDietsEvo[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChDietsEvo[]> {
    let servObj = new ServiceObject(params ? 'ch_diets_evo?pagination=false' : 'ch_diets_evo');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_diets_evo = <ChDietsEvo[]>servObj.data.ch_diets_evo;

        return Promise.resolve(this.ch_diets_evo);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_diets_evo: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_diets_evo');
    servObj.data = ch_diets_evo;
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

  Update(ch_diets_evo: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_diets_evo', ch_diets_evo.id);
    servObj.data = ch_diets_evo;
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
    let servObj = new ServiceObject('ch_diets_evo', id);
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
