import { Area } from '../models/area';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssistanceSessionService {

  constructor(private webAPI: WebAPIService) { }

  Save(are: any, ent?): Promise<ServiceObject> {
    let entity = ent ? ent : 'assistanceSession'
    let servObj = new ServiceObject(entity);
    servObj.data = are;
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

  GetByUserRoleGroup(data): Promise<any> {
    var ids = data.session_id + "/" + data.urg_id;
    var servObj = new ServiceObject("public/showByUserRoleGroup/" + ids);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj.data.assistance_session);
      })
      .catch(x => {
        throw x.error.message;
      });
  }

}
