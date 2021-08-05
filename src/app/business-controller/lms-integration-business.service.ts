import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Certificate } from 'crypto';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class LmsIntegrationBusinessService {
  public res: any;

  constructor(
    private webAPI: WebAPIService,
  ) { }

  getAll(endpoint: string, id: string): Promise<any[]> {
    var servObj = new ServiceObject(endpoint);
    servObj.data = { user_id: id };
    return this.webAPI.PostAction(servObj)
      .then(response => {
        this.res = response;
        return Promise.resolve(this.res);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }

  get(endpoint: string, id: any): Promise<any[]> {
    let servObj = new ServiceObject(endpoint, id);
    return this.webAPI.GetAction(servObj)
      .then(response => {
        this.res = response;
        return Promise.resolve(this.res);
      })
      .catch(x => {
        throw x.message;
      });
  }

}
