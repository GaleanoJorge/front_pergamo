import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { MunicipalityIca } from '../models/municipality-ica';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityIcaService {
  public municipality_ica: MunicipalityIca[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<MunicipalityIca[]> {
    let servObj = new ServiceObject(params ? 'municipality_ica?pagination=false' : 'municipality_ica');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.municipality_ica = <MunicipalityIca[]>servObj.data.municipality_ica;

        return Promise.resolve(this.municipality_ica);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(municipality_ica: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('municipality_ica');
    servObj.data = municipality_ica;
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

  Update(municipality_ica: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('municipality_ica', municipality_ica.id);
    servObj.data = municipality_ica;
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
    let servObj = new ServiceObject('municipality_ica', id);
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
