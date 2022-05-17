import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TcRadication } from '../models/tc-radication';



@Injectable({
  providedIn: 'root'
})
export class TcRadicationService {
  public radication_tc: TcRadication[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TcRadication[]> {
    let servObj = new ServiceObject(params ? 'radication_tc?pagination=false' : 'radication_tc');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.radication_tc = <TcRadication[]>servObj.data.radication_tc;

        return Promise.resolve(this.radication_tc);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(radication_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('radication_tc');
    servObj.data = radication_tc;
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

  Update(radication_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('radication_tc', radication_tc.id);
    servObj.data = radication_tc;
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
    let servObj = new ServiceObject('radication_tc', id);
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

  SaveFile(radication_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('radication_tc/file');
    servObj.data = radication_tc;
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
