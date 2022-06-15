import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChRespiratoryTherapy } from '../models/ch_respiratory-therapy';

@Injectable({
  providedIn: 'root'
})
export class ChRespiratoryTherapyService {
  public ch_respiratory_therapy: ChRespiratoryTherapy[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChRespiratoryTherapy[]> {
    let servObj = new ServiceObject(params ? 'ch_respiratory_therapy?pagination=false' : 'ch_respiratory_therapy');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_respiratory_therapy = <ChRespiratoryTherapy[]>servObj.data.ch_respiratory_therapy;

        return Promise.resolve(this.ch_respiratory_therapy);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_respiratory_therapy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_respiratory_therapy');
    servObj.data = ch_respiratory_therapy;
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

  Update(ch_respiratory_therapy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_respiratory_therapy', ch_respiratory_therapy.id);
    servObj.data = ch_respiratory_therapy;
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
    let servObj = new ServiceObject('ch_respiratory_therapy', id);
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
