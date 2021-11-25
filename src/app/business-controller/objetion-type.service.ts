import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ObjetionType } from '../models/objetion-type';

@Injectable({
  providedIn: 'root'
})
export class ObjetionTypeService {
  public objetion_type: ObjetionType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ObjetionType[]> {
    let servObj = new ServiceObject(params ? 'objetion_type?pagination=false' : 'objetion_type');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.objetion_type = <ObjetionType[]>servObj.data.objetion_type;

        return Promise.resolve(this.objetion_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(objetion_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('objetion_type');
    servObj.data = objetion_type;
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

  Update(objetion_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('objetion_type', objetion_type.id);
    servObj.data = objetion_type;
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
    let servObj = new ServiceObject('objetion_type', id);
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
