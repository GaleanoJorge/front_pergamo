import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PharmacyLotStock } from '../models/pharmacy-lot-stock';

@Injectable({
  providedIn: 'root'
})
export class PharmacyLotStockService {
  public pharmacy_lot_stock: PharmacyLotStock[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PharmacyLotStock[]> {
    let servObj = new ServiceObject(params ? 'pharmacy_lot_stock?pagination=false' : 'pharmacy_lot_stock');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pharmacy_lot_stock = <PharmacyLotStock[]>servObj.data.pharmacy_lot_stock;

        return Promise.resolve(this.pharmacy_lot_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(pharmacy_lot_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_lot_stock');
    servObj.data = pharmacy_lot_stock;
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

  Update(pharmacy_lot_stock: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_lot_stock', pharmacy_lot_stock.id ? pharmacy_lot_stock.id : id);
    servObj.data = pharmacy_lot_stock;
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

  updateInventoryByLot(pharmacy_lot_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_lot_stock/updateInventoryByLot', pharmacy_lot_stock.id);
    servObj.data = pharmacy_lot_stock;
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
  updateInvAdjustment(pharmacy_lot_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_lot_stock/updateInvAdjustment', pharmacy_lot_stock.id);
    servObj.data = pharmacy_lot_stock;
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
    let servObj = new ServiceObject('pharmacy_lot_stock', id);
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

  GetPharmacyByUserId(id, params = {}): Promise<PharmacyLotStock[]> {
    let servObj = new ServiceObject('pharmacy_lot_stock/pharmacies/' + id);

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pharmacy_lot_stock = <PharmacyLotStock[]>servObj.data.pharmacy_lot_stock;

        return Promise.resolve(this.pharmacy_lot_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }

  getPharmacyId(): Promise<PharmacyLotStock[]> {
    let servObj = new ServiceObject('pharmacy_lot_stock/pharmacies/');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pharmacy_lot_stock = <PharmacyLotStock[]>servObj.data.pharmacy_lot_stock;

        return Promise.resolve(this.pharmacy_lot_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }

  ViewInventory(params = {}): any {
    let servObj = new ServiceObject('viewInventory');
    return this.webAPI.GetAction(servObj, params)
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
