import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { InsuranceCarrier } from '../models/insurance-carrier';

@Injectable({
  providedIn: 'root'
})
export class InsuranceCarrierService {
  public insurance_carrier: InsuranceCarrier[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<InsuranceCarrier[]> {
    let servObj = new ServiceObject(params ? 'insurance_carrier?pagination=false' : 'insurance_carrier');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.insurance_carrier = <InsuranceCarrier[]>servObj.data.insurance_carrier;

        return Promise.resolve(this.insurance_carrier);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(insurance_carrier: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('insurance_carrier');
    servObj.data = insurance_carrier;
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

  Update(insurance_carrier: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('insurance_carrier', insurance_carrier.id);
    servObj.data = insurance_carrier;
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
    let servObj = new ServiceObject('insurance_carrier', id);
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
