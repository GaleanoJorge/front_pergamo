import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Coverage } from '../models/coverage';

@Injectable({
  providedIn: 'root'
})
export class CoverageService {
  public coverage: Coverage[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Coverage[]> {
    let servObj = new ServiceObject(params ? 'coverage?pagination=false' : 'coverage');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.coverage = <Coverage[]>servObj.data.coverage;

        return Promise.resolve(this.coverage);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetCoverageByGroup(product_group_id): Promise<Coverage[]> {
    let servObj = new ServiceObject('productCategory/byGroup',product_group_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.coverage = <Coverage[]>servObj.data.coverage;
        return Promise.resolve(this.coverage);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(coverage: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('coverage');
    servObj.data = coverage;
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

  Update(coverage: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('coverage', coverage.id);
    servObj.data = coverage;
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
    let servObj = new ServiceObject('coverage', id);
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
