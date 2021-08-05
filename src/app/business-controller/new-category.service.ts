import { Injectable } from '@angular/core';
import { WebAPIService } from '../services/web-api.service';
import { CategoryN } from '../models/CategoryN';
import { ServiceObject } from '../models/service-object';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class NewCategoryService {

  public categorys: CategoryN[] = [];

  constructor(private webAPI: WebAPIService) { }
  GetCollection(): Promise<CategoryN[]> {
    var servObj = new ServiceObject("category");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.categorys = <CategoryN[]>servObj.data.categories;
        return Promise.resolve(this.categorys);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetAll(): Promise<CategoryN[]> {
    var servObj = new ServiceObject("category/all");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.categorys = <CategoryN[]>servObj.data.categories;
        return Promise.resolve(this.categorys);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetProgramByOrigin(catg: number): Promise<CategoryN[]> {
    var servObj = new ServiceObject("category/categoryByOrigin", catg);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.categorys = <CategoryN[]>servObj.data.categories;
        return Promise.resolve(this.categorys);
      })
      .catch(x => {
        throw x.message;
      });
  }
  GetCategoryId(catg: number): Promise<CategoryN[]> {
    let servObj = new ServiceObject('category', catg);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.categorys = <CategoryN[]>servObj.data.category[0];
        return Promise.resolve(this.categorys);
      })
      .catch(x => {
        throw x.message;
      });
  }
  Save(catg: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('category');
    servObj.data = catg;
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

  Update(catg: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('category', (catg.id ? catg.id : id));
    servObj.data = catg;
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

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('category', id);
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
