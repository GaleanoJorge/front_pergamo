import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AuthStatus } from '../models/auth-status';

@Injectable({
  providedIn: 'root'
})
export class AuthStatusService {
  public auth_status: AuthStatus[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<AuthStatus[]> {
    let servObj = new ServiceObject(params ? 'auth_status?pagination=false' : 'auth_status');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.auth_status = <AuthStatus[]>servObj.data.auth_status;

        return Promise.resolve(this.auth_status);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(auth_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('auth_status');
    servObj.data = auth_status;
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

  Update(auth_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('auth_status', auth_status.id);
    servObj.data = auth_status;
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
    let servObj = new ServiceObject('auth_status', id);
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
