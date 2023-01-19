import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { SpecificTestsTl } from '../models/specific-tests-tl';

@Injectable({
  providedIn: 'root'
})
export class SpecificTestsTlService {
  public specific_tests_tl: SpecificTestsTl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<SpecificTestsTl[]> {
    let servObj = new ServiceObject(params ? 'specific_tests_tl?pagination=false' : 'specific_tests_tl');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.specific_tests_tl = <SpecificTestsTl[]>servObj.data.specific_tests_tl;

        return Promise.resolve(this.specific_tests_tl);
      })
      .catch(x => {
        throw x.message;
      });
  }
  

  Save(specific_tests_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('specific_tests_tl');
    servObj.data = specific_tests_tl;
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

  Update(specific_tests_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('specific_tests_tl', specific_tests_tl.id);
    servObj.data = specific_tests_tl;
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
    let servObj = new ServiceObject('specific_tests_tl', id);
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
