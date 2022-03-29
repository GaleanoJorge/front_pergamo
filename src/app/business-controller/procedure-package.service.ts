import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ProcedurePackage } from '../models/procedure-package';

@Injectable({
  providedIn: 'root'
})
export class ProcedurePackageService {
  public procedure_package: ProcedurePackage[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ProcedurePackage[]> {
    let servObj = new ServiceObject(params ? 'procedure_package?pagination=false' : 'procedure_package');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.procedure_package = <ProcedurePackage[]>servObj.data.procedure_package;

        return Promise.resolve(this.procedure_package);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetByPackage(id: number): Promise<ProcedurePackage[]> {
    var servObj = new ServiceObject("bypackage_procedure", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.procedure_package = <ProcedurePackage[]>servObj.data.procedure_package;
        return Promise.resolve(this.procedure_package);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }

  Save(procedure_package: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('procedure_package');
    servObj.data = procedure_package;
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

  Update(procedure_package: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('procedure_package', procedure_package.id);
    servObj.data = procedure_package;
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
    let servObj = new ServiceObject('procedure_package', id);
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
