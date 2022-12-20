import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Program } from '../models/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  public program: Program[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Program[]> {
    let servObj = new ServiceObject(params ? 'program?pagination=false' : 'program');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.program = <Program[]>servObj.data.program;

        return Promise.resolve(this.program);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetProgramByScope(scope_of_attention_id): Promise<Program[]> {
    let servObj = new ServiceObject('program/byScope',scope_of_attention_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.program = <Program[]>servObj.data.program;
        return Promise.resolve(this.program);
      })
      .catch(x => {
        throw x.message;
      });
  }

  getProgramByAmbit(admission_route_id): Promise<Program[]> {
    let servObj = new ServiceObject('program/byAmbit',admission_route_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.program = <Program[]>servObj.data.program;
        return Promise.resolve(this.program);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetProgramByGroup(product_group_id): Promise<Program[]> {
    let servObj = new ServiceObject('productCategory/byGroup',product_group_id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.program = <Program[]>servObj.data.program;
        return Promise.resolve(this.program);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(program: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('program');
    servObj.data = program;
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

  Update(program: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('program', program.id);
    servObj.data = program;
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
    let servObj = new ServiceObject('program', id);
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
