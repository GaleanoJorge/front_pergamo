import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChSwEconomicAspects } from '../models/ch-sw-economic-aspects';


@Injectable({
  providedIn: 'root'
})
export class ChSwEconomicAspectsService {
  public ch_sw_economic_aspects: ChSwEconomicAspects[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwEconomicAspects[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_economic_aspects?pagination=false' : 'ch_sw_economic_aspects');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_economic_aspects = <ChSwEconomicAspects[]>servObj.data.ch_sw_economic_aspects;

        return Promise.resolve(this.ch_sw_economic_aspects);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_economic_aspects: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_economic_aspects');
    servObj.data = ch_sw_economic_aspects;
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

  Update(ch_sw_economic_aspects: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_economic_aspects', ch_sw_economic_aspects.id);
    servObj.data = ch_sw_economic_aspects;
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
    let servObj = new ServiceObject('ch_sw_economic_aspects', id);
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
