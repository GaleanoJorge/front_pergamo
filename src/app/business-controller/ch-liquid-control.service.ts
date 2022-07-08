import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChLiquidControl } from '../models/liquid-control'; 

@Injectable({
  providedIn: 'root'
})
export class ChLiquidControlService {
  public ch_liquid_control: ChLiquidControl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params): Promise<ChLiquidControl[]> {
    let servObj = new ServiceObject(params ? 'ch_liquid_control?pagination=false' : 'ch_liquid_control');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_liquid_control = <ChLiquidControl[]>servObj.data.ch_liquid_control;

        return Promise.resolve(this.ch_liquid_control);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetByRecord(record_id?): Promise<ChLiquidControl[]> {
    let servObj = new ServiceObject(record_id ? 'ch_liquid_control/by_record/'+record_id+'?pagination=false' : 'ch_liquid_control');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_liquid_control = <ChLiquidControl[]>servObj.data.ch_liquid_control;

        return Promise.resolve(this.ch_liquid_control);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_liquid_control: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_liquid_control');
    servObj.data = ch_liquid_control;
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

  Update(ch_liquid_control: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_liquid_control', ch_liquid_control.id);
    servObj.data = ch_liquid_control;
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
    let servObj = new ServiceObject('ch_liquid_control', id);
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
