import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChOxygenTherapy } from '../models/ch_oxygen_therapy';

@Injectable({
  providedIn: 'root'
})
export class ChOxygenTherapyService {
  public ch_oxygen_therapy: ChOxygenTherapy[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChOxygenTherapy[]> {
    let servObj = new ServiceObject(params ? 'ch_oxygen_therapy?pagination=false' : 'ch_oxygen_therapy');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_oxygen_therapy = <ChOxygenTherapy[]>servObj.data.ch_oxygen_therapy;

        return Promise.resolve(this.ch_oxygen_therapy);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_oxygen_therapy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_oxygen_therapy');
    servObj.data = ch_oxygen_therapy;
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

  Update(ch_oxygen_therapy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_oxygen_therapy', ch_oxygen_therapy.id);
    servObj.data = ch_oxygen_therapy;
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
    let servObj = new ServiceObject('ch_oxygen_therapy', id);
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
