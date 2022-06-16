import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChNursingProcedure } from '../models/ch-nursing-procedure';

@Injectable({
  providedIn: 'root'
})
export class ChNursingProcedureService {
  public ch_nursing_procedure: ChNursingProcedure[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChNursingProcedure[]> {
    let servObj = new ServiceObject(params ? 'ch_nursing_procedure?pagination=false' : 'ch_nursing_procedure');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_nursing_procedure = <ChNursingProcedure[]>servObj.data.ch_nursing_procedure;

        return Promise.resolve(this.ch_nursing_procedure);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_nursing_procedure: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nursing_procedure');
    servObj.data = ch_nursing_procedure;
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

  Update(ch_nursing_procedure: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nursing_procedure', ch_nursing_procedure.id);
    servObj.data = ch_nursing_procedure;
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
    let servObj = new ServiceObject('ch_nursing_procedure', id);
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
