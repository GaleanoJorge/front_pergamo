import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { OrofacialTl } from '../models/orofacial-tl';

@Injectable({
  providedIn: 'root'
})
export class OrofacialTlService {
  public orofacial_tl: OrofacialTl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<OrofacialTl[]> {
    let servObj = new ServiceObject(params ? 'orofacial_tl?pagination=false' : 'orofacial_tl');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.orofacial_tl = <OrofacialTl[]>servObj.data.orofacial_tl;

        return Promise.resolve(this.orofacial_tl);
      })
      .catch(x => {
        throw x.message;
      });
  }
  

  Save(orofacial_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('orofacial_tl');
    servObj.data = orofacial_tl;
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

  Update(orofacial_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('orofacial_tl', orofacial_tl.id);
    servObj.data = orofacial_tl;
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
    let servObj = new ServiceObject('orofacial_tl', id);
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
