import {Injectable} from '@angular/core';
import {ServiceObject} from '../models/service-object';
import {Module} from '../models/module';
import {WebAPIService} from '../services/web-api.service';
import {SessionBusinessService} from './session-business.service';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModuleBusinessService {

  public modules: Module[] = [];

  constructor(private webAPI: WebAPIService, private sessionBS: SessionBusinessService) {
  }

  GetCollection(id: number): Promise<Module[]> {
    var servObj = new ServiceObject("module/allByCourse", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.modules = <Module[]>servObj.data.modules;
        this.modules.forEach(element => {
          element.sessions = [];
          this.sessionBS.GetCollection(element.id).then(x => {
            element.sessions = x;
          }).catch(x => {
            throw x.message;
          });
        });
        return Promise.resolve(this.modules);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetPublicByCourse(course_id) {
    let servObj = new ServiceObject('public/module/allByCourse', course_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.modules = <Module[]>servObj.data.modules;
        return Promise.resolve(this.modules);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetByCategoryId(id: number) {
    var servObj = new ServiceObject("module");
    var paramsMain = new HttpParams().set("category_id", id.toString());
    return this.webAPI.GetActionParams(servObj, paramsMain)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.modules = <Module[]>servObj.data.modules;
        return Promise.resolve(this.modules);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(sect: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('module');
    servObj.data = sect;
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

  Update(sect: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('module', sect.id);
    servObj.data = sect;
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
    let servObj = new ServiceObject('module', id);
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

  GetByCourse(course_id) {
    let servObj = new ServiceObject('modulesByCourse');
    return this.webAPI.GetAction(servObj, {
      course_id,
    })
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.modules = <Module[]>servObj.data.modules;
        return Promise.resolve(this.modules);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
