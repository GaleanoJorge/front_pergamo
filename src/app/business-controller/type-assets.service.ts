import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TypeAssets } from '../models/type-assets';

@Injectable({
  providedIn: 'root'
})
export class TypeAssetsService {
  public type_assets: TypeAssets[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TypeAssets[]> {
    let servObj = new ServiceObject(params ? 'type_assets?pagination=false' : 'type_assets');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.type_assets = <TypeAssets[]>servObj.data.type_assets;

        return Promise.resolve(this.type_assets);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(type_assets: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_assets');
    servObj.data = type_assets;
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

  Update(type_assets: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_assets', type_assets.id);
    servObj.data = type_assets;
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
    let servObj = new ServiceObject('type_assets', id);
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
