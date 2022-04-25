import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { PermissionPharmacyStock } from '../models/permission_pharmacy_stock';

@Injectable({
  providedIn: 'root'
})
export class PermissionPharmacyStockService {
  public permission_pharmacy_stock: PermissionPharmacyStock[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PermissionPharmacyStock[]> {
    let servObj = new ServiceObject(params ? 'permission_pharmacy_stock?pagination=false' : 'permission_pharmacy_stock');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.permission_pharmacy_stock = <PermissionPharmacyStock[]>servObj.data.permission_pharmacy_stock;

        return Promise.resolve(this.permission_pharmacy_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(permission_pharmacy_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('permission_pharmacy_stock');
    servObj.data = permission_pharmacy_stock;
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

  Update(permission_pharmacy_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('permission_pharmacy_stock', permission_pharmacy_stock.id);
    servObj.data = permission_pharmacy_stock;
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
    let servObj = new ServiceObject('permission_pharmacy_stock', id);
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
