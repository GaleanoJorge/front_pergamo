import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { NursingProcedure } from '../models/nursing-procedure';

@Injectable({
  providedIn: 'root'
})
export class NursingProcedureService {
  public nursing_procedure: NursingProcedure[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<NursingProcedure[]> {
    let servObj = new ServiceObject(params ? 'nursing_procedure?pagination=false' : 'nursing_procedure');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.nursing_procedure = <NursingProcedure[]>servObj.data.nursing_procedure;

        return Promise.resolve(this.nursing_procedure);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(nursing_procedure: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('nursing_procedure');
    servObj.data = nursing_procedure;
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

  Update(nursing_procedure: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('nursing_procedure', nursing_procedure.id);
    servObj.data = nursing_procedure;
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
    let servObj = new ServiceObject('nursing_procedure', id);
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
