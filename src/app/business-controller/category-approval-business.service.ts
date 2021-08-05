import {Injectable} from '@angular/core';
import {ServiceObject} from '../models/service-object';
import {CategoryApproval} from '../models/category-approval';
import {WebAPIService} from '../services/web-api.service';
import {SessionBusinessService} from './session-business.service';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryApprovalBusinessService {

  public categoryApproval: CategoryApproval[] = [];

  constructor(private webAPI: WebAPIService, private sessionBS: SessionBusinessService) {
  }

  GetCollection(sect: any, id = null): Promise<CategoryApproval[]> {
    let servObj = new ServiceObject('categoryApproval/ApprovalByCategory',(sect.id ? sect.id : id));

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);


        this.categoryApproval = <CategoryApproval[]>servObj.data.categoryApproval;

        return Promise.resolve(this.categoryApproval);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(sub: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('categoryApproval');
    servObj.data = sub;
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

  Update(sect: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('categoryApproval', (sect.id ? sect.id : id));
    servObj.data = sect;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message)
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      })
  }

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('categoryApproval', id);
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
