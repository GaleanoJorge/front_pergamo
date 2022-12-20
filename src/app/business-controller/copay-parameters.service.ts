import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CopayParameters } from '../models/copay-parameters';

@Injectable({
  providedIn: 'root'
})
export class CopayParametersService {
  public copay_parameters: CopayParameters[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CopayParameters[]> {
    let servObj = new ServiceObject(params ? 'copay_parameters?pagination=false' : 'copay_parameters');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.copay_parameters = <CopayParameters[]>servObj.data.copay_parameters;

        return Promise.resolve(this.copay_parameters);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(copay_parameters: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('copay_parameters');
    servObj.data = copay_parameters;
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

  ChangeStatus(id, status_id): Promise<any> {
    let servObj = new ServiceObject(`copay_parameters/${id}/` + 'changeStatus?status_id=' + status_id);

    return this.webAPI.PatchAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;

        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      }).catch(x => {
        throw x.message;
      });
  }

  Update(copay_parameters: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('copay_parameters', copay_parameters.id);
    servObj.data = copay_parameters;
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
    let servObj = new ServiceObject('copay_parameters', id);
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
