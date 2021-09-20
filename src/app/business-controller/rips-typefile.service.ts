import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { RipsTypeFile } from '../models/rips-typefile';

@Injectable({
  providedIn: 'root'
})
export class RipsTypeFileService {
  public rips_typefile: RipsTypeFile[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<RipsTypeFile[]> {
    let servObj = new ServiceObject(params ? 'rips_typefile?pagination=false' : 'rips_typefile');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.rips_typefile = <RipsTypeFile[]>servObj.data.rips_typefile;

        return Promise.resolve(this.rips_typefile);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(rips_typefile: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('rips_typefile');
    servObj.data = rips_typefile;
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

  Update(rips_typefile: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fiscal_characteristic', rips_typefile.id);
    servObj.data = rips_typefile;
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
    let servObj = new ServiceObject('rips_typefile', id);
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
