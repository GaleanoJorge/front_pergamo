import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FixedPermissionType } from '../models/fixed-permission-type';

@Injectable({
  providedIn: 'root'
})
export class FixedPermissionTypeService {
  public fixed_permission_type: FixedPermissionType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FixedPermissionType[]> {
    let servObj = new ServiceObject(params ? 'fixed_permission_type?pagination=false' : 'fixed_permission_type');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_permission_type = <FixedPermissionType[]>servObj.data.fixed_permission_type;

        return Promise.resolve(this.fixed_permission_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(fixed_permission_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_permission_type');
    servObj.data = fixed_permission_type;
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

  Update(fixed_permission_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_permission_type', fixed_permission_type.id);
    servObj.data = fixed_permission_type;
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
    let servObj = new ServiceObject('fixed_permission_type', id);
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
