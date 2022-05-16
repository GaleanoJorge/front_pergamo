import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AuthPackage } from '../models/auth-package';

@Injectable({
  providedIn: 'root'
})
export class AuthPackageService {
  public auth_package: AuthPackage[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<AuthPackage[]> {
    let servObj = new ServiceObject(params ? 'auth_package?pagination=false' : 'auth_package');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.auth_package = <AuthPackage[]>servObj.data.auth_package;

        return Promise.resolve(this.auth_package);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetByPackage(params = {},id: number): Promise<AuthPackage[]> {
    var servObj = new ServiceObject("bypackage_procedure", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.auth_package = <AuthPackage[]>servObj.data.auth_package;
        return Promise.resolve(this.auth_package);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }

  Save(auth_package: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('auth_package');
    servObj.data = auth_package;
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

  Update(auth_package: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('auth_package', auth_package.id);
    servObj.data = auth_package;
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
    let servObj = new ServiceObject('auth_package', id);
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
