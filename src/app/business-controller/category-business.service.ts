import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { WebAPIService } from '../services/web-api.service';
import { ServiceObject } from '../models/service-object';
import { AuthService } from '../services/auth.service';
import { HttpParams } from '@angular/common/http';
import { BaseBusinessService } from './base-business.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryBusinessService extends BaseBusinessService {

  public categories: Category[] = [];

  constructor(private webAPI: WebAPIService, private authService: AuthService) {
    super(webAPI, 'category', 'category', 'category');
    this.categories = [];
  }

  GetCollection(): Promise<Category[]> {
    var origin = this.authService.GetUserOrigin().origin_id;
    var servObj = new ServiceObject('category/allByOrigin', origin);
    this.categories = [];
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        Object.entries(servObj.data.categories).forEach(element => {
          element.forEach(elementB => {
            if (typeof elementB !== 'string')
              this.categories.push(<Category>this.ConvertObjectToArray(<Category>elementB));
          });
        });
        return Promise.resolve(this.categories);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }

  GetByOrigin(id: number, pagination = false): Promise<any> {
    var servObj = new ServiceObject('category');
    var paramsMain = new HttpParams().set('origin_id', id.toString()).set('pagination', pagination.toString());
    return this.webAPI.GetActionParams(servObj, paramsMain)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj.data.categories);
      })
      .catch(x => {
        throw x.message;
      });
  }

  ConvertObjectToArray(category: Category) {
    var subcategories: Category[] = [];
    if (category.subcategories.length !== 0) {
      Object.entries(category.subcategories).forEach(element => {
        element.forEach(elementB => {
          if (typeof elementB !== 'string')
            subcategories.push(<Category>this.ConvertObjectToArray(<Category>elementB));
        });
      });
      category.subcategories = subcategories;
    }
    return category;
  }

  GetSingleCollection(params = {}): Promise<Category[]> {
    var servObj = new ServiceObject(params ? 'course_type?pagination=false' : 'course_type');
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.categories = <Category[]>servObj.data.categories;
        return Promise.resolve(this.categories);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(category: any): Promise<ServiceObject> {
    var servObj = new ServiceObject('category');
    servObj.data = category;
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

  Update(category: any): Promise<ServiceObject> {
    var servObj = new ServiceObject('category', category.id);
    servObj.data = category;
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

  Delete(id: any): Promise<ServiceObject> {
    var servObj = new ServiceObject('category', id);
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

  DeleteCategoryOrigin(id: any): Promise<ServiceObject> {
    var servObj = new ServiceObject('categoryOrigin', id);
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

  SaveCategoryOrigin(data): Promise<ServiceObject> {
    var servObj = new ServiceObject('categoryOrigin');
    servObj.data = data;
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
