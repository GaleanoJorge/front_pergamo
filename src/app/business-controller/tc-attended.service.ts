import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TcAttended } from '../models/tc-attended';



@Injectable({
  providedIn: 'root'
})
export class TcAttendedService {
  public attended_tc: TcAttended[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TcAttended[]> {
    let servObj = new ServiceObject(params ? 'attended_tc?pagination=false' : 'attended_tc');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.attended_tc = <TcAttended[]>servObj.data.attended_tc;

        return Promise.resolve(this.attended_tc);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(attended_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('attended_tc');
    servObj.data = attended_tc;
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

  Update(attended_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('attended_tc', attended_tc.id);
    servObj.data = attended_tc;
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
    let servObj = new ServiceObject('attended_tc', id);
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

  SaveFile(attended_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('attended_tc/file');
    servObj.data = attended_tc;
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
