import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FixedTypeRole } from '../models/fixed-type-role';

@Injectable({
  providedIn: 'root'
})
export class FixedTypeRoleService {
  public fixed_type_role: FixedTypeRole[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FixedTypeRole[]> {
    let servObj = new ServiceObject(params ? 'fixed_type_role?pagination=false' : 'fixed_type_role');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_type_role = <FixedTypeRole[]>servObj.data.fixed_type_role;

        return Promise.resolve(this.fixed_type_role);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(fixed_type_role: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_type_role');
    servObj.data = fixed_type_role;
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

  Update(fixed_type_role: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_type_role', fixed_type_role.id);
    servObj.data = fixed_type_role;
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
    let servObj = new ServiceObject('fixed_type_role', id);
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
