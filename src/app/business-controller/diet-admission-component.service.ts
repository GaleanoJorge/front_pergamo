import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietAdmissionComponent } from '../models/diet-admission-component';

@Injectable({
  providedIn: 'root'
})
export class DietAdmissionComponentService {
  public diet_admission_component: DietAdmissionComponent[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietAdmissionComponent[]> {
    let servObj = new ServiceObject(params ? 'diet_admission_component?pagination=false' : 'diet_admission_component');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_admission_component = <DietAdmissionComponent[]>servObj.data.diet_admission_component;

        return Promise.resolve(this.diet_admission_component);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_admission_component: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_admission_component');
    servObj.data = diet_admission_component;
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

  Update(diet_admission_component: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_admission_component', diet_admission_component.id ? diet_admission_component.id : id);
    servObj.data = diet_admission_component;
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
    let servObj = new ServiceObject('diet_admission_component', id);
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
