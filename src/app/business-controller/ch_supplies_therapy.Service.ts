import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChSuppliesTherapy } from '../models/ch-supplies-therapy';


@Injectable({
  providedIn: 'root'
})
export class ChSuppliesTherapyService {
  public ch_supplies_therapy: ChSuppliesTherapy[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSuppliesTherapy[]> {
    let servObj = new ServiceObject(params ? 'ch_supplies_therapy?pagination=false' : 'ch_supplies_therapy');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_supplies_therapy = <ChSuppliesTherapy[]>servObj.data.ch_supplies_therapy;

        return Promise.resolve(this.ch_supplies_therapy);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_supplies_therapy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_supplies_therapy');
    servObj.data = ch_supplies_therapy;
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

  Update(ch_supplies_therapy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_supplies_therapy', ch_supplies_therapy.id);
    servObj.data = ch_supplies_therapy;
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
    let servObj = new ServiceObject('ch_supplies_therapy', id);
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
