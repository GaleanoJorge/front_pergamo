import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ServicesBriefcase } from '../models/services-briefcase';

@Injectable({
  providedIn: 'root'
})
export class ServicesBriefcaseService {
  public services_briefcase: ServicesBriefcase[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ServicesBriefcase[]> {
    let servObj = new ServiceObject(params ? 'services_briefcase?pagination=false' : 'services_briefcase');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.services_briefcase = <ServicesBriefcase[]>servObj.data.services_briefcase;

        return Promise.resolve(this.services_briefcase);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetProcedureByBriefcase(briefcase_id): Promise<ServicesBriefcase[]> {
    let servObj = new ServiceObject('ServiceBriefcase/ServicesByBriefcase' , briefcase_id);

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.services_briefcase = <ServicesBriefcase[]>servObj.data.services_briefcase;

        return Promise.resolve(this.services_briefcase);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(services_briefcase: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('services_briefcase');
    servObj.data = services_briefcase;
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

  GetByBriefcase(params = {},services_briefcase :any): Promise<ServicesBriefcase[]> {
    let servObj = new ServiceObject('ServiceBriefcase/ServicesByBriefcase',services_briefcase);

    return this.webAPI.GetAction(servObj,params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.services_briefcase = <ServicesBriefcase[]>servObj.data.services_briefcase;

        return Promise.resolve(this.services_briefcase);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetPackageByBriecase(briefcase_id): Promise<ServicesBriefcase[]> {
    let servObj = new ServiceObject('ServiceBriefcase/PackageByBriefcase',briefcase_id);

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.services_briefcase = <ServicesBriefcase[]>servObj.data.services_briefcase;

        return Promise.resolve(this.services_briefcase);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Update(services_briefcase: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('services_updatebriefcase', services_briefcase.id);
    servObj.data = services_briefcase;
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
    let servObj = new ServiceObject('services_briefcase', id);
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
