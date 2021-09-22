import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Iva } from '../models/iva';

@Injectable({
  providedIn: 'root'
})
export class IvaService {
  public iva: Iva[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Iva[]> {
    let servObj = new ServiceObject(params ? 'iva?pagination=false' : 'iva');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.iva = <Iva[]>servObj.data.iva;

        return Promise.resolve(this.iva);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(iva: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('iva');
    servObj.data = iva;
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

  Update(iva: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('iva', iva.id);
    servObj.data = iva;
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
    let servObj = new ServiceObject('iva', id);
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
