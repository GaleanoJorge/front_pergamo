import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AssistanceProcedure } from '../models/assistance-procedure';

@Injectable({
  providedIn: 'root'
})
export class AssistanceProcedureService {
  public AssistanceProcedure: AssistanceProcedure[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<AssistanceProcedure[]> {
    let servObj = new ServiceObject(params ? 'assistance_procedure?pagination=false' : 'assistance_procedure');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.AssistanceProcedure = <AssistanceProcedure[]>servObj.data.assistance_procedure;

        return Promise.resolve(this.AssistanceProcedure);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(AssistanceProcedure: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('assistance_procedure');
    servObj.data = AssistanceProcedure;
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

  UpdateProcedures(AssistanceProcedure: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('cups_package');
    servObj.data = AssistanceProcedure;
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

  Update(AssistanceProcedure: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('assistance_procedure', AssistanceProcedure.id);
    servObj.data = AssistanceProcedure;
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
    let servObj = new ServiceObject('assistance_procedure', id);
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
