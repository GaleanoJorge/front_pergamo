import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ParametersSigns } from '../models/parameters-signs';

@Injectable({
  providedIn: 'root'
})
export class ParametersSignsService {
  public parameters_signs: ParametersSigns[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ParametersSigns[]> {
    let servObj = new ServiceObject(params ? 'parameters_signs?pagination=false' : 'parameters_signs');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.parameters_signs = <ParametersSigns[]>servObj.data.parameters_signs;

        return Promise.resolve(this.parameters_signs);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(parameters_signs: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('parameters_signs');
    servObj.data = parameters_signs;
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

  Update(parameters_signs: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('parameters_signs', parameters_signs.id);
    servObj.data = parameters_signs;
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
    let servObj = new ServiceObject('parameters_signs', id);
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
