import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AffiliateType } from '../models/affiliate-type';

@Injectable({
  providedIn: 'root'
})
export class AffiliateTypeService {
  public affiliate_type: AffiliateType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<AffiliateType[]> {
    let servObj = new ServiceObject(params ? 'affiliate_type?pagination=false' : 'affiliate_type');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.affiliate_type = <AffiliateType[]>servObj.data.affiliate_type;

        return Promise.resolve(this.affiliate_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(affiliate_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('affiliate_type');
    servObj.data = affiliate_type;
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

  Update(affiliate_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('affiliate_type', affiliate_type.id);
    servObj.data = affiliate_type;
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
    let servObj = new ServiceObject('affiliate_type', id);
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
