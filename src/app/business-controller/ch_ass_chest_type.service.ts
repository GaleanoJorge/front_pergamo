import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChAssChestType } from '../models/ch-ass-chest-type';

@Injectable({
  providedIn: 'root'
})
export class ChAssChestTypeService {
  public ch_ass_chest_type: ChAssChestType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChAssChestType[]> {
    let servObj = new ServiceObject(params ? 'ch_ass_chest_type?pagination=false' : 'ch_ass_chest_type');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ass_chest_type = <ChAssChestType[]>servObj.data.ch_ass_chest_type;

        return Promise.resolve(this.ch_ass_chest_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ass_chest_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ass_chest_type');
    servObj.data = ch_ass_chest_type;
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

  Update(ch_ass_chest_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ass_chest_type', ch_ass_chest_type.id);
    servObj.data = ch_ass_chest_type;
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
    let servObj = new ServiceObject('ch_ass_chest_type', id);
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
