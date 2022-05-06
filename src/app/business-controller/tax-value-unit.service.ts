import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TaxValueUnit } from '../models/tax-value-unit';

@Injectable({
  providedIn: 'root'
})
export class TaxValueUnitService {
  public tax_value_unit: TaxValueUnit[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TaxValueUnit[]> {
    let servObj = new ServiceObject(params ? 'tax_value_unit?pagination=false' : 'tax_value_unit');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.tax_value_unit = <TaxValueUnit[]>servObj.data.tax_value_unit;

        return Promise.resolve(this.tax_value_unit);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetLatestTaxValueUnit(params = {}): Promise<TaxValueUnit[]> {
    let servObj = new ServiceObject(params ? 'tax_value_unit/get_latest_tax_value_unit/1?pagination=false' : 'tax_value_unit/get_latest_tax_value_unit/1');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.tax_value_unit = <TaxValueUnit[]>servObj.data.tax_value_unit;

        return Promise.resolve(this.tax_value_unit);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(tax_value_unit: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('tax_value_unit');
    servObj.data = tax_value_unit;
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

  Update(tax_value_unit: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('tax_value_unit', tax_value_unit.id);
    servObj.data = tax_value_unit;
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
    let servObj = new ServiceObject('tax_value_unit', id);
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
