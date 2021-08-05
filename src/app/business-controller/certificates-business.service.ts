import { Injectable } from '@angular/core';
import { Certificate } from 'crypto';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class CertificatesBusinessService {
  public res: any;

  constructor(
    private webAPI: WebAPIService
  ) { }

  GetCollection(): Promise<Certificate[]> {
    let servObj = new ServiceObject('certificates');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<Certificate[]>servObj.data.certificates);
      })
      .catch(x => {
        throw x.message;
      });
  }

  getAll(table): Promise<any[]> {
    var servObj = new ServiceObject(table);
    return this.webAPI.GetAction(servObj)
      .then(response => {
        this.res = response;
        return Promise.resolve(this.res);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }

  editPost(table: any, form: any, id: any): Promise<ServiceObject> {
    var servObj = new ServiceObject(table, id);
    servObj.data = form;
    return this.webAPI.PostAction(servObj)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(x => {
        throw x.message;
      });
  }

  edit(table: any, form: any, id: any): Promise<ServiceObject> {
    var servObj = new ServiceObject(table, id);
    servObj.data = form;
    return this.webAPI.PutAction(servObj)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(x => {
        throw x.message;
      });
  }

  delete(table: any, id: any): Promise<ServiceObject> {
    var servObj = new ServiceObject(table, id);
    return this.webAPI.DeleteAction(servObj)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(x => {
        throw x.message;
      });
  }

  get(table: any, id: any): Promise<any> {
    var servObj = new ServiceObject(table, id);
    return this.webAPI.GetAction(servObj)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(x => {
        throw x.message;
      });
  }

  save(table: any, form: any): Promise<ServiceObject> {
    var servObj = new ServiceObject(table);
    servObj.data = form;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        this.res = x;
        return Promise.resolve(this.res);
      })
      .catch(x => {
        throw x.message;
      });
  }

  getFilePath(): String {
    return this.webAPI.GetFilePath().replace('api/', '')
  }

  generateCertificates(data) {
    var servObj = new ServiceObject("certificate_students");
    servObj.data = data;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        let response = x;
        return Promise.resolve(response);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
