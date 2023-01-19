import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietAdmission } from '../models/diet-admission';

@Injectable({
  providedIn: 'root'
})
export class DietAdmissionService {
  public diet_admission: DietAdmission[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietAdmission[]> {
    let servObj = new ServiceObject(params ? 'diet_admission?pagination=false' : 'diet_admission');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_admission = <DietAdmission[]>servObj.data.diet_admission;

        return Promise.resolve(this.diet_admission);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_admission: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_admission');
    servObj.data = diet_admission;
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

  Update(diet_admission: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_admission', diet_admission.id ? diet_admission.id : id);
    servObj.data = diet_admission;
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
    let servObj = new ServiceObject('diet_admission', id);
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
