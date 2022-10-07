import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DashboardRole } from '../models/dashboard-role';

@Injectable({
  providedIn: 'root'
})
export class DashboardRoleService {
  public dashboard_role: DashboardRole[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DashboardRole[]> {
    let servObj = new ServiceObject(params ? 'dashboard_role?pagination=false' : 'dashboard_role');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.dashboard_role = <DashboardRole[]>servObj.data.dashboard_role;

        return Promise.resolve(this.dashboard_role);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(dashboard_role: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('dashboard_role');
    servObj.data = dashboard_role;
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

  Update(dashboard_role: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('dashboard_role', dashboard_role.id);
    servObj.data = dashboard_role;
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
    let servObj = new ServiceObject('dashboard_role', id);
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
