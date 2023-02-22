import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TcQuit } from '../models/tc-quit';



@Injectable({
  providedIn: 'root'
})
export class TcQuitService {
  public quit_tc: TcQuit[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TcQuit[]> {
    let servObj = new ServiceObject(params ? 'quit_tc?pagination=false' : 'quit_tc');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.quit_tc = <TcQuit[]>servObj.data.quit_tc;

        return Promise.resolve(this.quit_tc);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(quit_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('quit_tc');
    servObj.data = quit_tc;
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

  Update(quit_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('quit_tc', quit_tc.id);
    servObj.data = quit_tc;
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
    let servObj = new ServiceObject('quit_tc', id);
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

  SaveFile(quit_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('quit_tc/file');
    servObj.data = quit_tc;
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
