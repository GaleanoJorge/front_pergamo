import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Briefcase } from '../models/briefcase';

@Injectable({
  providedIn: 'root'
})
export class BriefcaseService {
  public briefcase: Briefcase[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Briefcase[]> {
    let servObj = new ServiceObject(params ? 'briefcase?pagination=false' : 'briefcase');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.briefcase = <Briefcase[]>servObj.data.briefcase;

        return Promise.resolve(this.briefcase);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetBriefcaseByContract(briefcase_id): Promise<Briefcase[]> {
    let servObj = new ServiceObject('briefcasecontract/briefcaseByContract',briefcase_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.briefcase = <Briefcase[]>servObj.data.briefcase;
        return Promise.resolve(this.briefcase);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(briefcase: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('briefcase');
    servObj.data = briefcase;
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

  Update(briefcase: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('briefcase', briefcase.id);
    servObj.data = briefcase;
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
    let servObj = new ServiceObject('briefcase', id);
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
