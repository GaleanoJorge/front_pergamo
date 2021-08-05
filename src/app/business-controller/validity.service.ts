import {Validity} from '../models/validity';
import {ServiceObject} from '../models/service-object';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidityService {
  public validity: Validity[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Validity[]> {
    let servObj = new ServiceObject('validity');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);


        this.validity = <Validity[]>servObj.data.validitys;

        return Promise.resolve(this.validity);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(vali: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('validity');
    servObj.data = vali;
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

  Update(vali: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('validity', vali.id);
    servObj.data = vali;
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
    let servObj = new ServiceObject('validity', id);
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

  CountPoblationAcademic(params) {
    let servObj = new ServiceObject('countPoblationAcademic');
    return this.webAPI.GetAction(servObj, params)
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
