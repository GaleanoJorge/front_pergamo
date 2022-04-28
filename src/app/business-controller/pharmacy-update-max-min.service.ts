import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PharmacyUpdateMaxMin } from '../models/pharmacy-update-max-min';

@Injectable({
  providedIn: 'root'
})
export class PharmacyUpdateMaxMinService {
  public pharmacy_update_max_min: PharmacyUpdateMaxMin[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PharmacyUpdateMaxMin[]> {
    let servObj = new ServiceObject(params ? 'pharmacy_update_max_min?pagination=false' : 'pharmacy_update_max_min');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pharmacy_update_max_min = <PharmacyUpdateMaxMin[]>servObj.data.pharmacy_update_max_min;

        return Promise.resolve(this.pharmacy_update_max_min);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(pharmacy_update_max_min: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_update_max_min');
    servObj.data = pharmacy_update_max_min;
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

  Update(pharmacy_update_max_min: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_update_max_min', pharmacy_update_max_min.id);
    servObj.data = pharmacy_update_max_min;
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
    let servObj = new ServiceObject('pharmacy_update_max_min', id);
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
