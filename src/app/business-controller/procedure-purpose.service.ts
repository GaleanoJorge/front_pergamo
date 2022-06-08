import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ProcedurePurpose } from '../models/procedure-purpose';

@Injectable({
  providedIn: 'root'
})
export class ProcedurePurposeService {
  public procedure_purpose: ProcedurePurpose[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ProcedurePurpose[]> {
    let servObj = new ServiceObject(params ? 'procedure_purpose?pagination=false' : 'procedure_purpose');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.procedure_purpose = <ProcedurePurpose[]>servObj.data.procedure_purpose;

        return Promise.resolve(this.procedure_purpose);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(procedure_purpose: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('procedure_purpose');
    servObj.data = procedure_purpose;
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

  Update(procedure_purpose: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('procedure_purpose', procedure_purpose.id);
    servObj.data = procedure_purpose;
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
    let servObj = new ServiceObject('procedure_purpose', id);
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
