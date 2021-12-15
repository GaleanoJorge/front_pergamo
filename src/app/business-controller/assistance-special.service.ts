import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AssistanceSpecial } from '../models/assistance-special';

@Injectable({
  providedIn: 'root'
})
export class AssistanceSpecialService {
  public assistance_special: AssistanceSpecial[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<AssistanceSpecial[]> {
    let servObj = new ServiceObject(params ? 'assistance-special?pagination=false' : 'assistance-special');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.assistance_special = <AssistanceSpecial[]>servObj.data.assistance_special;

        return Promise.resolve(this.assistance_special);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(assistance_special: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('assistance_special');
    servObj.data = assistance_special;
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

  Update(assistance_special: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('assistance_special', assistance_special.id);
    servObj.data = assistance_special;
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
    let servObj = new ServiceObject('assistance_special', id);
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
