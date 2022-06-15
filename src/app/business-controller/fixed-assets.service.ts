import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FixedAssets } from '../models/fixed-assets';

@Injectable({
  providedIn: 'root'
})
export class FixedAssetsService {
  public fixed_assets: FixedAssets[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FixedAssets[]> {
    let servObj = new ServiceObject(params ? 'fixed_assets?pagination=false' : 'fixed_assets');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_assets = <FixedAssets[]>servObj.data.fixed_assets;

        return Promise.resolve(this.fixed_assets);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(fixed_assets: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_assets');
    servObj.data = fixed_assets;
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

  Update(fixed_assets: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_assets', fixed_assets.id);
    servObj.data = fixed_assets;
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
    let servObj = new ServiceObject('fixed_assets', id);
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
