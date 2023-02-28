import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChFormulation } from '../models/ch-formulation';

@Injectable({
  providedIn: 'root'
})
export class ChFormulationService {
  public ch_formulation: ChFormulation[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChFormulation[]> {
    let servObj = new ServiceObject(params ? 'ch_formulation?pagination=false' : 'ch_formulation');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_formulation = <ChFormulation[]>servObj.data.ch_formulation;

        return Promise.resolve(this.ch_formulation);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_formulation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_formulation');
    servObj.data = ch_formulation;
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
  
  SuspendFormulations(ch_formulation_id, ch_formulation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_formulation/suspendFormulations/' + ch_formulation_id);
    servObj.data = ch_formulation;
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

  Update(ch_formulation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_formulation', ch_formulation.id);
    servObj.data = ch_formulation;
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
    let servObj = new ServiceObject('ch_formulation', id);
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
