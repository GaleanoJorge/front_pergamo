import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CiiuGroup } from '../models/ciiu-group';

@Injectable({
  providedIn: 'root'
})
export class CiiuGroupService {
  public ciiu_group: CiiuGroup[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<CiiuGroup[]> {
    let servObj = new ServiceObject(params ? 'ciiu_group?pagination=false' : 'ciiu_group');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ciiu_group = <CiiuGroup[]>servObj.data.ciiu_group;

        return Promise.resolve(this.ciiu_group);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ciiu_group: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ciiu_group');
    servObj.data = ciiu_group;
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

  Update(ciiu_group: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ciiu_group', ciiu_group.id);
    servObj.data = ciiu_group;
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
    let servObj = new ServiceObject('ciiu_group', id);
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
