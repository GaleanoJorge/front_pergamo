import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { MultidoseConcentration } from '../models/multidose-concentration';

@Injectable({
  providedIn: 'root'
})
export class MultidoseConcentrationService {
  public multidose_concentration: MultidoseConcentration[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<MultidoseConcentration[]> {
    let servObj = new ServiceObject(params ? 'multidose_concentration?pagination=false' : 'multidose_concentration');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.multidose_concentration = <MultidoseConcentration[]>servObj.data.multidose_concentration;

        return Promise.resolve(this.multidose_concentration);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(multidose_concentration: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('multidose_concentration');
    servObj.data = multidose_concentration;
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

  Update(multidose_concentration: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('multidose_concentration', multidose_concentration.id);
    servObj.data = multidose_concentration;
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
    let servObj = new ServiceObject('multidose_concentration', id);
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
