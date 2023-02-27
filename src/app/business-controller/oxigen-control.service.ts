import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { OxigenControl } from '../models/oxigen-control';
@Injectable({
  providedIn: 'root'
})
export class OxigenControlService {
  public oxigen_control: OxigenControl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<OxigenControl[]> {
    let servObj = new ServiceObject(params ? 'oxigen_control?pagination=false' : 'oxigen_control');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.oxigen_control = <OxigenControl[]>servObj.data.oxigen_control;

        return Promise.resolve(this.oxigen_control);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(oxigen_control: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('oxigen_control');
    servObj.data = oxigen_control;
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

  Update(oxigen_control: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('oxigen_control', oxigen_control.id);
    servObj.data = oxigen_control;
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
    let servObj = new ServiceObject('oxigen_control', id);
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
