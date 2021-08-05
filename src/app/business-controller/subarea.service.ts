import {Subarea} from '../models/subarea';
import {ServiceObject} from '../models/service-object';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubareaService {
 public subarea: Subarea[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Subarea[]> {
    let servObj = new ServiceObject('subarea');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);


        this.subarea = <Subarea[]>servObj.data.subareas;

        return Promise.resolve(this.subarea);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(sub: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('subarea');
    servObj.data = sub;
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

  Update(sub: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('subarea', sub.id);
    servObj.data = sub;
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
    let servObj = new ServiceObject('subarea', id);
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
