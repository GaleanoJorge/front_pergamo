import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ServicesFixedStock } from '../models/services-fixed-stock';

@Injectable({
  providedIn: 'root'
})
export class ServicesFixedStockService {
  public services_fixed_stock: ServicesFixedStock[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ServicesFixedStock[]> {
    let servObj = new ServiceObject(params ? 'services_fixed_stock?pagination=false' : 'services_fixed_stock');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.services_fixed_stock = <ServicesFixedStock[]>servObj.data.services_fixed_stock;

        return Promise.resolve(this.services_fixed_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(services_fixed_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('services_fixed_stock');
    servObj.data = services_fixed_stock;
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

  Update(services_fixed_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('services_fixed_stock', services_fixed_stock.id);
    servObj.data = services_fixed_stock;
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

  updateInventoryByLot(services_fixed_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('services_fixed_stock/updateInventoryByLot', services_fixed_stock.id);
    servObj.data = services_fixed_stock;
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

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('services_fixed_stock', id);
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


  GetPharmacyByUserId(id, params = {}): Promise<ServicesFixedStock[]> {
    let servObj = new ServiceObject('fixed_assets/pharmacies/' + id);

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.services_fixed_stock = <ServicesFixedStock[]>servObj.data.fixed_assets;

        return Promise.resolve(this.services_fixed_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
