import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChTypeProcedure } from '../models/ch-type-procedure';

@Injectable({
  providedIn: 'root'
})
export class ChTypeProcedureService {
  public ch_type_procedure: ChTypeProcedure[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChTypeProcedure[]> {
    let servObj = new ServiceObject(params ? 'ch_type_procedure?pagination=false' : 'ch_type_procedure');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_type_procedure = <ChTypeProcedure[]>servObj.data.ch_type_procedure;

        return Promise.resolve(this.ch_type_procedure);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_type_procedure: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_type_procedure');
    servObj.data = ch_type_procedure;
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

  Update(ch_type_procedure: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_type_procedure', ch_type_procedure.id);
    servObj.data = ch_type_procedure;
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
    let servObj = new ServiceObject('ch_type_procedure', id);
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
