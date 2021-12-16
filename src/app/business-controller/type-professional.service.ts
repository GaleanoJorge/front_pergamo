import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TypeProfessional } from '../models/type-professional';

@Injectable({
  providedIn: 'root'
})
export class TypeProfessionalService {
  public type_professional: TypeProfessional[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TypeProfessional[]> {
    let servObj = new ServiceObject(params ? 'type_professional?pagination=false' : 'type_professional');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.type_professional = <TypeProfessional[]>servObj.data.type_professional;

        return Promise.resolve(this.type_professional);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(type_professional: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_professional');
    servObj.data = type_professional;
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

  Update(type_professional: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_professional', type_professional.id);
    servObj.data = type_professional;
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
    let servObj = new ServiceObject('type_professional', id);
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
