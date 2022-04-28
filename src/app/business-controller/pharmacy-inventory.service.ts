import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PharmacyInventory } from '../models/pharmacy-inventory';

@Injectable({
  providedIn: 'root'
})
export class PharmacyInventoryService {
  public pharmacy_inventory: PharmacyInventory[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PharmacyInventory[]> {
    let servObj = new ServiceObject(params ? 'pharmacy_inventory?pagination=false' : 'pharmacy_inventory');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pharmacy_inventory = <PharmacyInventory[]>servObj.data.pharmacy_inventory;

        return Promise.resolve(this.pharmacy_inventory);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(pharmacy_inventory: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_inventory');
    servObj.data = pharmacy_inventory;
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

  Update(pharmacy_inventory: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_inventory', pharmacy_inventory.id);
    servObj.data = pharmacy_inventory;
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

  updateInventoryByLot(pharmacy_inventory: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pharmacy_inventory/updateInventoryByLot', pharmacy_inventory.id);
    servObj.data = pharmacy_inventory;
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
    let servObj = new ServiceObject('pharmacy_inventory', id);
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

  GetPharmacyByUserId(id, params = {}): Promise<PharmacyInventory[]> {
    let servObj = new ServiceObject('pharmacy_inventory/pharmacies/' + id);

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pharmacy_inventory = <PharmacyInventory[]>servObj.data.pharmacy_inventory;

        return Promise.resolve(this.pharmacy_inventory);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
