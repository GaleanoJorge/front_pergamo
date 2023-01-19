import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TypeOfAttention } from '../models/type-of-attention';

@Injectable({
  providedIn: 'root'
})
export class TypeOfAttentionService {
  public type_of_attention: TypeOfAttention[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TypeOfAttention[]> {
    let servObj = new ServiceObject(params ? 'type_of_attention?pagination=false' : 'type_of_attention');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.type_of_attention = <TypeOfAttention[]>servObj.data.type_of_attention;

        return Promise.resolve(this.type_of_attention);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(type_of_attention: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_of_attention');
    servObj.data = type_of_attention;
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

  Update(type_of_attention: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_of_attention', type_of_attention.id);
    servObj.data = type_of_attention;
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
    let servObj = new ServiceObject('type_of_attention', id);
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
