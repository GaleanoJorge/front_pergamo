import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { InformedConsents } from '../models/informed-consents';

@Injectable({
  providedIn: 'root'
})
export class InformedConsentsService {
  public informed_consents: InformedConsents[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<InformedConsents[]> {
    let servObj = new ServiceObject(params ? 'informed_consents?pagination=false' : 'informed_consents');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.informed_consents = <InformedConsents[]>servObj.data.informed_consents;

        return Promise.resolve(this.informed_consents);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(informed_consents: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('informed_consents');
    servObj.data = informed_consents;
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


  Update(sect: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('informed_consents', (sect.id ? sect.id : id));
    servObj.data = sect;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message)
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      })
  }


  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('informed_consents', id);
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
