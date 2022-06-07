import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChFailureMethodGyneco } from '../models/ch-failure-method-gyneco';

@Injectable({
  providedIn: 'root'
})
export class ChFailureMethodGynecoService {
  public ch_failure_method_gyneco: ChFailureMethodGyneco[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChFailureMethodGyneco[]> {
    let servObj = new ServiceObject(params ? 'ch_failure_method_gyneco?pagination=false' : 'ch_failure_method_gyneco');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_failure_method_gyneco = <ChFailureMethodGyneco[]>servObj.data.ch_failure_method_gyneco;

        return Promise.resolve(this.ch_failure_method_gyneco);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_failure_method_gyneco: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_failure_method_gyneco');
    servObj.data = ch_failure_method_gyneco;
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

  Update(ch_failure_method_gyneco: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_failure_method_gyneco', ch_failure_method_gyneco.id);
    servObj.data = ch_failure_method_gyneco;
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
    let servObj = new ServiceObject('ch_failure_method_gyneco', id);
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
