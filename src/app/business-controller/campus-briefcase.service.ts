import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CampusBriefcase } from '../models/campus-briefcase';

@Injectable({
  providedIn: 'root'
})
export class CampusBriefcaseService {
  public campus_briefcase: CampusBriefcase[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CampusBriefcase[]> {
    let servObj = new ServiceObject(params ? 'campus_briefcase?pagination=false' : 'campus_briefcase');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.campus_briefcase = <CampusBriefcase[]>servObj.data.campus_briefcase;

        return Promise.resolve(this.campus_briefcase);
      })
      .catch(x => {
        throw x.message;
      });
  }

  async GetByBriefcase(briefcase_id) {
    let servObj = new ServiceObject(`campus_briefcase/campusByBriefcase/${briefcase_id}`);
    return await this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data.campus_briefcase);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(campus_briefcase: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('campus_briefcase');
    servObj.data = campus_briefcase;
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

  Update(campus_briefcase: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('campus_briefcase', campus_briefcase.id);
    servObj.data = campus_briefcase;
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
    let servObj = new ServiceObject('campus_briefcase', id);
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
