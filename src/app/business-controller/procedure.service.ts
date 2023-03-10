import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Procedure } from '../models/procedure';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {
  public procedure: Procedure[] = [];
  public procedureObject: Procedure;

  constructor(private webAPI: WebAPIService) {
  }

  GetByMedicalDiary(medical_diary_id): Promise<Procedure> {
    let servObj = new ServiceObject('procedure/get_procedure_bymedicaldiary',medical_diary_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.procedureObject = <Procedure>servObj.data.procedure;

        return Promise.resolve(this.procedureObject);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetByUser(userId): Promise<Procedure[]> {
    let servObj = new ServiceObject('get_procedure_by_user', userId);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        let users = <Procedure[]>servObj.data.procedures;

        return Promise.resolve(users);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetCollection(params = {}): Promise<Procedure[]> {
    let servObj = new ServiceObject(params ? 'procedure?pagination=false' : 'procedure');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.procedure = <Procedure[]>servObj.data.procedure;

        return Promise.resolve(this.procedure);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(procedure: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('procedure');
    servObj.data = procedure;
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

  Update(procedure: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('procedure', procedure.id);
    servObj.data = procedure;
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
    let servObj = new ServiceObject('procedure', id);
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
