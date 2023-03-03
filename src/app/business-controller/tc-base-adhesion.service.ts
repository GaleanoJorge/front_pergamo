import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TcBaseAdhesion } from '../models/tc-base-adhesion';



@Injectable({
  providedIn: 'root'
})
export class TcBaseAdhesionService {
  public base_adhesion_tc: TcBaseAdhesion[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TcBaseAdhesion[]> {
    let servObj = new ServiceObject(params ? 'base_adhesion_tc?pagination=false' : 'base_adhesion_tc');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.base_adhesion_tc = <TcBaseAdhesion[]>servObj.data.base_adhesion_tc;

        return Promise.resolve(this.base_adhesion_tc);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(base_adhesion_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('base_adhesion_tc');
    servObj.data = base_adhesion_tc;
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

  Update(base_adhesion_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('base_adhesion_tc', base_adhesion_tc.id);
    servObj.data = base_adhesion_tc;
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
    let servObj = new ServiceObject('base_adhesion_tc', id);
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

  SaveFile(base_adhesion_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('base_adhesion_tc/file');
    servObj.data = base_adhesion_tc;
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
}
