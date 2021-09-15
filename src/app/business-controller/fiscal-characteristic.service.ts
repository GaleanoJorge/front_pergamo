import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FiscalCharacteristic } from '../models/fiscal-characteristic';

@Injectable({
  providedIn: 'root'
})
export class FiscalCharacteristicService {
  public fiscal_characteristic: FiscalCharacteristic[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FiscalCharacteristic[]> {
    let servObj = new ServiceObject(params ? 'fiscal_characteristic?pagination=false' : 'fiscal_characteristic');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fiscal_characteristic = <FiscalCharacteristic[]>servObj.data.fiscal_characteristic;

        return Promise.resolve(this.fiscal_characteristic);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(fiscal_characteristic: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fiscal_characteristic');
    servObj.data = fiscal_characteristic;
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

  Update(fiscal_characteristic: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fiscal_characteristic', fiscal_characteristic.id);
    servObj.data = fiscal_characteristic;
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
    let servObj = new ServiceObject('fiscal_characteristic', id);
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
