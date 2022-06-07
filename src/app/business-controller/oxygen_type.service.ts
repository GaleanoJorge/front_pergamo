import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { OxygenType } from '../models/oxygen_type';

@Injectable({
  providedIn: 'root'
})
export class OxygenTypeService {
  public oxygen_type: OxygenType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<OxygenType[]> {
    let servObj = new ServiceObject(params ? 'oxygen_type?pagination=false' : 'oxygen_type');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.oxygen_type = <OxygenType[]>servObj.data.oxygen_type;

        return Promise.resolve(this.oxygen_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(oxygen_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('oxygen_type');
    servObj.data = oxygen_type;
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

  Update(oxygen_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('oxygen_type', oxygen_type.id);
    servObj.data = oxygen_type;
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
    let servObj = new ServiceObject('oxygen_type', id);
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
