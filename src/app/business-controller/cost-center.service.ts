import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CostCenter } from '../models/cost-center';

@Injectable({
  providedIn: 'root'
})
export class CostCenterService {
  public cost_center: CostCenter[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CostCenter[]> {
    let servObj = new ServiceObject(params ? 'cost_center?pagination=false' : 'cost_center');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.cost_center = <CostCenter[]>servObj.data.cost_center;

        return Promise.resolve(this.cost_center);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(cost_center: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('contract_type');
    servObj.data = cost_center;
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

  Update(cost_center: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('contract_type', cost_center.id);
    servObj.data = cost_center;
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
    let servObj = new ServiceObject('cost_center', id);
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
