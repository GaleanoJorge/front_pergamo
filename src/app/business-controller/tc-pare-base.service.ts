import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TcPareBase } from '../models/tc-pare-base';



@Injectable({
  providedIn: 'root'
})
export class TcPareBaseService {
  public pare_base_tc: TcPareBase[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TcPareBase[]> {
    let servObj = new ServiceObject(params ? 'pare_base_tc?pagination=false' : 'pare_base_tc');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pare_base_tc = <TcPareBase[]>servObj.data.pare_base_tc;

        return Promise.resolve(this.pare_base_tc);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(pare_base_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pare_base_tc');
    servObj.data = pare_base_tc;
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

  Update(pare_base_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pare_base_tc', pare_base_tc.id);
    servObj.data = pare_base_tc;
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
    let servObj = new ServiceObject('pare_base_tc', id);
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

  SaveFile(pare_base_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pare_base_tc/file');
    servObj.data = pare_base_tc;
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
