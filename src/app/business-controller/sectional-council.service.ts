import {SectionalCouncil} from '../models/sectional-council';
import {ServiceObject} from '../models/service-object';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SectionalCouncilService {
  public sectionalCouncil: SectionalCouncil[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<SectionalCouncil[]> {
    let servObj = new ServiceObject('sectionalCouncil');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);


        this.sectionalCouncil = <SectionalCouncil[]>servObj.data.sectionalCouncil;

        return Promise.resolve(this.sectionalCouncil);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetByStatus(id: number): Promise<SectionalCouncil[]> {
    var servObj = new ServiceObject("sectionalCouncil");
    var paramsMain = new HttpParams().set("status_id", id.toString());
    return this.webAPI.GetActionParams(servObj, paramsMain)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.sectionalCouncil = <SectionalCouncil[]>servObj.data.sectionalCouncil;
        return Promise.resolve(this.sectionalCouncil);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(sect: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('sectionalCouncil');
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
    let servObj = new ServiceObject('sectionalCouncil', sect.id);
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
    let servObj = new ServiceObject('sectionalCouncil', id);
    return this.webAPI.DeleteAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {

        throw x;
      });
  }
}
