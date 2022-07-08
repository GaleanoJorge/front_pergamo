import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { MinimumSalary } from '../models/minimum-salary';

@Injectable({
  providedIn: 'root'
})
export class MinimumSalaryService {
  public minimum_salary: MinimumSalary[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<MinimumSalary[]> {
    let servObj = new ServiceObject(params ? 'minimum_salary?pagination=false' : 'minimum_salary');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.minimum_salary = <MinimumSalary[]>servObj.data.minimum_salary;

        return Promise.resolve(this.minimum_salary);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(minimum_salary: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('minimum_salary');
    servObj.data = minimum_salary;
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

  Update(minimum_salary: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('minimum_salary', minimum_salary.id);
    servObj.data = minimum_salary;
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
    let servObj = new ServiceObject('minimum_salary', id);
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
