import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SpecialAttention } from '../models/special-attention';

@Injectable({
  providedIn: 'root'
})
export class SpecialAttentionService {
  public special_attention: SpecialAttention[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<SpecialAttention[]> {
    let servObj = new ServiceObject(params ? 'special_attention?pagination=false' : 'special_attention');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.special_attention = <SpecialAttention[]>servObj.data.special_attention;

        return Promise.resolve(this.special_attention);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(special_attention: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('special_attention');
    servObj.data = special_attention;
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

  Update(special_attention: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('special_attention', special_attention.id);
    servObj.data = special_attention;
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
    let servObj = new ServiceObject('special_attention', id);
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
