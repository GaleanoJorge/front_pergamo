import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ReceivedBy } from '../models/received-by';

@Injectable({
  providedIn: 'root'
})
export class ReceivedByService {
  public received_by: ReceivedBy[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ReceivedBy[]> {
    let servObj = new ServiceObject(params ? 'received_by?pagination=false' : 'received_by');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.received_by = <ReceivedBy[]>servObj.data.received_by;

        return Promise.resolve(this.received_by);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(received_by: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('received_by');
    servObj.data = received_by;
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

  Update(received_by: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('received_by', received_by.id);
    servObj.data = received_by;
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
    let servObj = new ServiceObject('received_by', id);
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
