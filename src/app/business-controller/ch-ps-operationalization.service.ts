import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsOperationalization } from '../models/ch-ps-operationalization';


@Injectable({
  providedIn: 'root'
})
export class ChPsOperationalizationService {
  public ch_ps_operationalization: ChPsOperationalization[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsOperationalization[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_operationalization?pagination=false' : 'ch_ps_operationalization');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_operationalization = <ChPsOperationalization[]>servObj.data.ch_ps_operationalization;

        return Promise.resolve(this.ch_ps_operationalization);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_operationalization: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_operationalization');
    servObj.data = ch_ps_operationalization;
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

  Update(ch_ps_operationalization: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_operationalization', ch_ps_operationalization.id);
    servObj.data = ch_ps_operationalization;
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
    let servObj = new ServiceObject('ch_ps_operationalization', id);
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
