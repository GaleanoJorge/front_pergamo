import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TcHumanTalent2 } from '../models/tc-human-talent-2';



@Injectable({
  providedIn: 'root'
})
export class TcHumanTalent2Service {
  public human_talent_2_tc: TcHumanTalent2[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TcHumanTalent2[]> {
    let servObj = new ServiceObject(params ? 'human_talent_2_tc?pagination=false' : 'human_talent_2_tc');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.human_talent_2_tc = <TcHumanTalent2[]>servObj.data.human_talent_2_tc;

        return Promise.resolve(this.human_talent_2_tc);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(human_talent_2_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('human_talent_2_tc');
    servObj.data = human_talent_2_tc;
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

  Update(human_talent_2_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('human_talent_2_tc', human_talent_2_tc.id);
    servObj.data = human_talent_2_tc;
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
    let servObj = new ServiceObject('human_talent_2_tc', id);
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

  SaveFile(human_talent_2_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('human_talent_2_tc/file');
    servObj.data = human_talent_2_tc;
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
}
