import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Tariff } from '../models/tariff';

@Injectable({
  providedIn: 'root'
})
export class TariffService {
  public tariff: Tariff[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Tariff[]> {
    let servObj = new ServiceObject(params ? 'tariff?pagination=false' : 'tariff');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.tariff = <Tariff[]>servObj.data.tariff;

        return Promise.resolve(this.tariff);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(tariff: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('tariff');
    servObj.data = tariff;
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

  Update(tariff: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('tariff', tariff.id);
    servObj.data = tariff;
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
    let servObj = new ServiceObject('tariff', id);
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
