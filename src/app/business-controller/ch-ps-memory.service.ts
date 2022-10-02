import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChPsMemory } from '../models/ch-ps-memory';

@Injectable({
  providedIn: 'root'
})
export class ChPsMemoryService {
  public ch_ps_memory: ChPsMemory[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsMemory[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_memory?pagination=false' : 'ch_ps_memory');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_memory = <ChPsMemory[]>servObj.data.ch_ps_memory;

        return Promise.resolve(this.ch_ps_memory);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_memory: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_memory');
    servObj.data = ch_ps_memory;
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

  Update(ch_ps_memory: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_memory', ch_ps_memory.id);
    servObj.data = ch_ps_memory;
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
    let servObj = new ServiceObject('ch_ps_memory', id);
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
