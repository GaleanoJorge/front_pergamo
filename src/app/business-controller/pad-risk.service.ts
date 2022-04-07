import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PadRisk } from '../models/pad-risk';

@Injectable({
  providedIn: 'root'
})
export class PadRiskService {
  public pad_risk: PadRisk[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PadRisk[]> {
    let servObj = new ServiceObject(params ? 'pad_risk?pagination=false' : 'pad_risk');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pad_risk = <PadRisk[]>servObj.data.pad_risk;

        return Promise.resolve(this.pad_risk);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(pad_risk: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pad_risk');
    servObj.data = pad_risk;
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

  Update(pad_risk: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pad_risk', pad_risk.id);
    servObj.data = pad_risk;
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
    let servObj = new ServiceObject('pad_risk', id);
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
