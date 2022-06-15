import { Injectable } from '@angular/core';
import { WebAPIService } from '../services/web-api.service';
import { ServiceObject } from '../models/service-object';
import { Item } from '../models/item';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemBusinessService {

  public items: Item[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(): Promise<Item[]> {
    var servObj = new ServiceObject("item");
    let paramsMain = new HttpParams().set('role_id', "1");
    return this.webAPI.GetActionParams(servObj, paramsMain)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        this.items = [];
        Object.entries(servObj.data.menu).forEach(element => {
          element.forEach(elementB => {
            if (typeof elementB !== 'string')
              this.items.push(<Item>this.ConvertObjectToArray(<Item>elementB));
          });
        });
        return Promise.resolve(this.items);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(item: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("item");
    servObj.data = item;
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

  Update(item: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("item", item.id);
    servObj.data = item;
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

  Delete(id: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("item", id);
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

  ConvertObjectToArray(item: Item) {
    var subitems: Item[] = [];
    if (item.subitems.length !== 0) {
      Object.entries(item.subitems).forEach(element => {
        element.forEach(elementB => {
          if (typeof elementB !== 'string')
            subitems.push(<Item>this.ConvertObjectToArray(<Item>elementB));
        });
      });
      item.subitems = subitems;
    }
    return item;
  }
}
