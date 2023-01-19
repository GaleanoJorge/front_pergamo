import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChSwRiskFactors } from '../models/ch-sw-risk-factors';

@Injectable({
  providedIn: 'root'
})
export class ChSwRiskFactorsService {
  public ch_sw_risk_factors: ChSwRiskFactors[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwRiskFactors[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_risk_factors?pagination=false' : 'ch_sw_risk_factors');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_risk_factors = <ChSwRiskFactors[]>servObj.data.ch_sw_risk_factors;

        return Promise.resolve(this.ch_sw_risk_factors);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_risk_factors: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_risk_factors');
    servObj.data = ch_sw_risk_factors;
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

  Update(ch_sw_risk_factors: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_risk_factors', ch_sw_risk_factors.id);
    servObj.data = ch_sw_risk_factors;
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
    let servObj = new ServiceObject('ch_sw_risk_factors', id);
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
