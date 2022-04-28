import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Admissions } from '../models/admissions';

@Injectable({
  providedIn: 'root'
})
export class AdmissionsService {
  public admissions: Admissions[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Admissions[]> {
    let servObj = new ServiceObject(params ? 'admissions?pagination=false' : 'admissions');

    return this.webAPI.GetAction(servObj,params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.admissions = <Admissions[]>servObj.data.admissions;

        return Promise.resolve(this.admissions);
      })
      .catch(x => {
        throw x.message;
      });
  }


   GetByPacient(user_id) {
    let servObj = new ServiceObject(`admissions/ByPacient/${user_id}`);
    return  this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data.admissions);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(admissions: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('admissions');
    servObj.data = admissions;
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

  Update(admissions: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('admissions', admissions.id);
    servObj.data = admissions;
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
    let servObj = new ServiceObject('admissions', id);
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
