import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ProcedureType } from '../models/procedure-type';

@Injectable({
  providedIn: 'root'
})
export class ProcedureTypeService {
  public procedure_type: ProcedureType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ProcedureType[]> {
    let servObj = new ServiceObject(params ? 'procedure_type?pagination=false' : 'procedure_type');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.procedure_type = <ProcedureType[]>servObj.data.procedure_type;

        return Promise.resolve(this.procedure_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(procedure_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('procedure_type');
    servObj.data = procedure_type;
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

  Update(procedure_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('procedure_type', procedure_type.id);
    servObj.data = procedure_type;
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
    let servObj = new ServiceObject('procedure_type', id);
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
