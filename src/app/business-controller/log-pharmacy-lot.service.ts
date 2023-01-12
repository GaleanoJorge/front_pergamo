import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { LogPharmacyLot } from '../models/log-pharmacy-lot';

@Injectable({
  providedIn: 'root'
})
export class LogPharmacyLotService {
  public log_pharmacy_lot: LogPharmacyLot[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<LogPharmacyLot[]> {
    let servObj = new ServiceObject(params ? 'log_pharmacy_lot?pagination=false' : 'log_pharmacy_lot');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.log_pharmacy_lot = <LogPharmacyLot[]>servObj.data.log_pharmacy_lot;

        return Promise.resolve(this.log_pharmacy_lot);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(log_pharmacy_lot: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('log_pharmacy_lot');
    servObj.data = log_pharmacy_lot;
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

  Update(log_pharmacy_lot: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('log_pharmacy_lot', log_pharmacy_lot.id);
    servObj.data = log_pharmacy_lot;
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
    let servObj = new ServiceObject('log_pharmacy_lot', id);
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
