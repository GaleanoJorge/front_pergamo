import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TypeBriefcase } from '../models/type-briefcase';

@Injectable({
  providedIn: 'root'
})
export class TypeBriefcaseService {
  public type_briefcase: TypeBriefcase[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TypeBriefcase[]> {
    let servObj = new ServiceObject(params ? 'type_briefcase?pagination=false' : 'type_briefcase');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.type_briefcase = <TypeBriefcase[]>servObj.data.type_briefcase;

        return Promise.resolve(this.type_briefcase);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(type_briefcase: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_briefcase');
    servObj.data = type_briefcase;
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

  Update(type_briefcase: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_briefcase', type_briefcase.id);
    servObj.data = type_briefcase;
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
    let servObj = new ServiceObject('type_briefcase', id);
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
