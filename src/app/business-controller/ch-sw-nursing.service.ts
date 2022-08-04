import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChSwNursing } from '../models/ch-sw-nursing';


@Injectable({
  providedIn: 'root'
})
export class ChSwNursingService {
  public ch_sw_nursing: ChSwNursing[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwNursing[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_nursing?pagination=false' : 'ch_sw_nursing');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_nursing = <ChSwNursing[]>servObj.data.ch_sw_nursing;

        return Promise.resolve(this.ch_sw_nursing);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_nursing: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_nursing');
    servObj.data = ch_sw_nursing;
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

  Update(ch_sw_nursing: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_nursing', ch_sw_nursing.id);
    servObj.data = ch_sw_nursing;
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
    let servObj = new ServiceObject('ch_sw_nursing', id);
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
