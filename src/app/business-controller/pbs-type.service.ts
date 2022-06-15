import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PbsType } from '../models/pbs-type';

@Injectable({
  providedIn: 'root'
})
export class PbsTypeService {
  public pbs_type: PbsType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PbsType[]> {
    let servObj = new ServiceObject(params ? 'pbs_type?pagination=false' : 'pbs_type');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.pbs_type = <PbsType[]>servObj.data.pbs_type;

        return Promise.resolve(this.pbs_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(pbs_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pbs_type');
    servObj.data = pbs_type;
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

  Update(pbs_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('pbs_type', pbs_type.id);
    servObj.data = pbs_type;
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
    let servObj = new ServiceObject('pbs_type', id);
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
