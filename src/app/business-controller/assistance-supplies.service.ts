import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AssistanceSupplies } from '../models/assistance-supplies';

@Injectable({
  providedIn: 'root'
})
export class AssistanceSuppliesService {
  public assistance_supplies: AssistanceSupplies[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<AssistanceSupplies[]> {
    let servObj = new ServiceObject(params ? 'assistance_supplies?pagination=false' : 'assistance_supplies');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.assistance_supplies = <AssistanceSupplies[]>servObj.data.assistance_supplies;

        return Promise.resolve(this.assistance_supplies);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(assistance_supplies: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('assistance_supplies');
    servObj.data = assistance_supplies;
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


  Update(assistance_supplies: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('assistance_supplies', assistance_supplies.id);
    servObj.data = assistance_supplies;
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
    let servObj = new ServiceObject('assistance_supplies', id);
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
