import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PharmacyAdjustment } from '../models/pharmacy-adjustment';

@Injectable({
  providedIn: 'root'
})
export class PharmacyAdjustmentService {
  public pharmacy_adjustment: PharmacyAdjustment[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PharmacyAdjustment[]> {
    let servObj = new ServiceObject(params ? 'pharmacy_adjustment?pagination=false' : 'pharmacy_adjustment');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pharmacy_adjustment = <PharmacyAdjustment[]>servObj.data.pharmacy_adjustment;

        return Promise.resolve(this.pharmacy_adjustment);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(pharmacy_adjustment: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_adjustment');
    servObj.data = pharmacy_adjustment;
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

  Update(pharmacy_adjustment: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_adjustment', pharmacy_adjustment.id);
    servObj.data = pharmacy_adjustment;
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
    let servObj = new ServiceObject('pharmacy_adjustment', id);
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
