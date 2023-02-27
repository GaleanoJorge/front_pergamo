import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { OxigenAdministrationWay } from '../models/oxigen-administration-way';

@Injectable({
  providedIn: 'root'
})
export class OxigenAdministrationWayService {
  public oxigen_administration_way: OxigenAdministrationWay[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<OxigenAdministrationWay[]> {
    let servObj = new ServiceObject(params ? 'oxigen_administration_way?pagination=false' : 'oxigen_administration_way');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.oxigen_administration_way = <OxigenAdministrationWay[]>servObj.data.oxigen_administration_way;

        return Promise.resolve(this.oxigen_administration_way);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(oxigen_administration_way: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('oxigen_administration_way');
    servObj.data = oxigen_administration_way;
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

  Update(oxigen_administration_way: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('oxigen_administration_way', oxigen_administration_way.id);
    servObj.data = oxigen_administration_way;
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
    let servObj = new ServiceObject('oxigen_administration_way', id);
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
