import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CiiuClass } from '../models/ciiu-class';

@Injectable({
  providedIn: 'root'
})
export class CiiuClassService {
  public ciiu_class: CiiuClass[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CiiuClass[]> {
    let servObj = new ServiceObject(params ? 'ciiu_class?pagination=false' : 'ciiu_class');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ciiu_class = <CiiuClass[]>servObj.data.ciiu_class;

        return Promise.resolve(this.ciiu_class);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ciiu_class: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ciiu_class');
    servObj.data = ciiu_class;
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

  Update(ciiu_class: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ciiu_class', ciiu_class.id);
    servObj.data = ciiu_class;
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
    let servObj = new ServiceObject('ciiu_class', id);
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
