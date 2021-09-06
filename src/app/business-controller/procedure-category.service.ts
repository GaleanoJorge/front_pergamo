import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ProcedureCategory } from '../models/procedure-category';

@Injectable({
  providedIn: 'root'
})
export class ProcedureCategoryService {
  public procedure_category: ProcedureCategory[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ProcedureCategory[]> {
    let servObj = new ServiceObject(params ? 'procedure_category?pagination=false' : 'procedure_category');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.procedure_category = <ProcedureCategory[]>servObj.data.procedure_category;

        return Promise.resolve(this.procedure_category);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(procedure_category: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('procedure_category');
    servObj.data = procedure_category;
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

  Update(procedure_category: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('procedure_category', procedure_category.id);
    servObj.data = procedure_category;
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
    let servObj = new ServiceObject('procedure_category', id);
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
