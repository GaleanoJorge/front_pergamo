import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChAssChestSymmetry } from '../models/ch-ass-chest-symmetry';

@Injectable({
  providedIn: 'root'
})
export class ChAssChestSymmetryService {
  public ch_ass_chest_symmetry: ChAssChestSymmetry[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChAssChestSymmetry[]> {
    let servObj = new ServiceObject(params ? 'ch_ass_chest_symmetry?pagination=false' : 'ch_ass_chest_symmetry');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ass_chest_symmetry = <ChAssChestSymmetry[]>servObj.data.ch_ass_chest_symmetry;

        return Promise.resolve(this.ch_ass_chest_symmetry);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ass_chest_symmetry: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ass_chest_symmetry');
    servObj.data = ch_ass_chest_symmetry;
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

  Update(ch_ass_chest_symmetry: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ass_chest_symmetry', ch_ass_chest_symmetry.id);
    servObj.data = ch_ass_chest_symmetry;
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
    let servObj = new ServiceObject('ch_ass_chest_symmetry', id);
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
