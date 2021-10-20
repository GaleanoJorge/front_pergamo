import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Modality } from '../models/modality';

@Injectable({
  providedIn: 'root'
})
export class ModalityService {
  public modality: Modality[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Modality[]> {
    let servObj = new ServiceObject(params ? 'modality?pagination=false' : 'modality');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.modality = <Modality[]>servObj.data.modality;

        return Promise.resolve(this.modality);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetModalityByGroup(product_group_id): Promise<Modality[]> {
    let servObj = new ServiceObject('productCategory/byGroup',product_group_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.modality = <Modality[]>servObj.data.modality;
        return Promise.resolve(this.modality);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(modality: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('modality');
    servObj.data = modality;
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

  Update(modality: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('modality', modality.id);
    servObj.data = modality;
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
    let servObj = new ServiceObject('modality', id);
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
