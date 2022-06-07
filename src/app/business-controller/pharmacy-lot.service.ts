import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PharmacyLot } from '../models/pharmacy-lot';

@Injectable({
  providedIn: 'root'
})
export class PharmacyLotService {
  public pharmacy_lot: PharmacyLot[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PharmacyLot[]> {
    let servObj = new ServiceObject(params ? 'pharmacy_lot?pagination=false' : 'pharmacy_lot');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pharmacy_lot = <PharmacyLot[]>servObj.data.pharmacy_lot;

        return Promise.resolve(this.pharmacy_lot);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(pharmacy_lot: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_lot');
    servObj.data = pharmacy_lot;
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

  Update(pharmacy_lot: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_lot', pharmacy_lot.id);
    servObj.data = pharmacy_lot;
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
    let servObj = new ServiceObject('pharmacy_lot', id);
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
