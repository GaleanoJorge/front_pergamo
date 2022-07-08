import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { InputMaterialsUsedTl } from '../models/input-materials-used-tl';

@Injectable({
  providedIn: 'root'
})
export class InputMaterialsUsedTlService {
  public input_materials_used_tl: InputMaterialsUsedTl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<InputMaterialsUsedTl[]> {
    let servObj = new ServiceObject(params ? 'input_materials_used_tl?pagination=false' : 'input_materials_used_tl');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.input_materials_used_tl = <InputMaterialsUsedTl[]>servObj.data.input_materials_used_tl;

        return Promise.resolve(this.input_materials_used_tl);
      })
      .catch(x => {
        throw x.message;
      });
  }
  

  Save(input_materials_used_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('input_materials_used_tl');
    servObj.data = input_materials_used_tl;
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

  Update(input_materials_used_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('input_materials_used_tl', input_materials_used_tl.id);
    servObj.data = input_materials_used_tl;
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
    let servObj = new ServiceObject('input_materials_used_tl', id);
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
