import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Assistance } from '../models/assistance';

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {
  public assistance: Assistance[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Assistance[]> {
    let servObj = new ServiceObject(params ? 'assistance?pagination=false' : 'assistance');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.assistance = <Assistance[]>servObj.data.assistance;

        return Promise.resolve(this.assistance);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(assistance: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('assistance');
    servObj.data = assistance;
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

  Update(assistance: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('assistance', assistance.id);
    servObj.data = assistance;
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
    let servObj = new ServiceObject('assistance', id);
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
