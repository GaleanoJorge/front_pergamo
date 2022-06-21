import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChOccupacionalTherapy } from '../models/ch-occupacional-therapy';


@Injectable({
  providedIn: 'root'
})
export class ChOccupacionalTherapyService {
  public ch_occupacional_therapy: ChOccupacionalTherapy[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChOccupacionalTherapy[]> {
    let servObj = new ServiceObject(params ? 'ch_occupacional_therapy?pagination=false' : 'ch_occupacional_therapy');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_occupacional_therapy = <ChOccupacionalTherapy[]>servObj.data.ch_occupacional_therapy;

        return Promise.resolve(this.ch_occupacional_therapy);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_occupacional_therapy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_occupacional_therapy');
    servObj.data = ch_occupacional_therapy;
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

  Update(ch_occupacional_therapy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_occupacional_therapy', ch_occupacional_therapy.id);
    servObj.data = ch_occupacional_therapy;
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
    let servObj = new ServiceObject('ch_occupacional_therapy', id);
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
