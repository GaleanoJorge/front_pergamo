import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ServicesPharmacyStock } from '../models/services-pharmacy-stock';

@Injectable({
  providedIn: 'root'
})
export class ServicesPharmacyStockService {
  public services_pharmacy_stock: ServicesPharmacyStock[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ServicesPharmacyStock[]> {
    let servObj = new ServiceObject(params ? 'services_pharmacy_stock?pagination=false' : 'services_pharmacy_stock');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.services_pharmacy_stock = <ServicesPharmacyStock[]>servObj.data.services_pharmacy_stock;

        return Promise.resolve(this.services_pharmacy_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(services_pharmacy_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('services_pharmacy_stock');
    servObj.data = services_pharmacy_stock;
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

  Update(services_pharmacy_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('services_pharmacy_stock', services_pharmacy_stock.id);
    servObj.data = services_pharmacy_stock;
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

  updateInventoryByLot(services_pharmacy_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('services_pharmacy_stock/updateInventoryByLot', services_pharmacy_stock.id);
    servObj.data = services_pharmacy_stock;
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
    let servObj = new ServiceObject('services_pharmacy_stock', id);
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


  GetPharmacyByUserId(id, params = {}): Promise<ServicesPharmacyStock[]> {
    let servObj = new ServiceObject('fixed_assets/pharmacies/' + id);

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.services_pharmacy_stock = <ServicesPharmacyStock[]>servObj.data.fixed_assets;

        return Promise.resolve(this.services_pharmacy_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
