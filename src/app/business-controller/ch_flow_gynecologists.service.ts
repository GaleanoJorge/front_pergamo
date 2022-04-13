import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChFlowGynecologists } from '../models/ch-flow-gynecologists';

@Injectable({
  providedIn: 'root'
})
export class ChFlowGynecologistsService {
  public ch_flow_gynecologists: ChFlowGynecologists[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChFlowGynecologists[]> {
    let servObj = new ServiceObject(params ? 'ch_flow_gynecologists?pagination=false' : 'ch_flow_gynecologists');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_flow_gynecologists = <ChFlowGynecologists[]>servObj.data.ch_flow_gynecologists;

        return Promise.resolve(this.ch_flow_gynecologists);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_flow_gynecologists: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_flow_gynecologists');
    servObj.data = ch_flow_gynecologists;
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

  Update(ch_flow_gynecologists: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_flow_gynecologists', ch_flow_gynecologists.id);
    servObj.data = ch_flow_gynecologists;
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
    let servObj = new ServiceObject('ch_flow_gynecologists', id);
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
