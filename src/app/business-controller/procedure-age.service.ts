import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ProcedureAge } from '../models/procedure-age';

@Injectable({
  providedIn: 'root'
})
export class ProcedureAgeService {
  public procedure_age: ProcedureAge[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ProcedureAge[]> {
    let servObj = new ServiceObject(params ? 'procedure_age?pagination=false' : 'procedure_age');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.procedure_age = <ProcedureAge[]>servObj.data.procedure_age;

        return Promise.resolve(this.procedure_age);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(procedure_age: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('procedure_age');
    servObj.data = procedure_age;
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

  Update(procedure_age: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('procedure_age', procedure_age.id);
    servObj.data = procedure_age;
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
    let servObj = new ServiceObject('procedure_age', id);
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
