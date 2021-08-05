import {WebAPIService} from '../services/web-api.service';
import {ServiceObject} from '../models/service-object';


export class BaseBusinessService<ReturnData = any> {
  public entity = null;
  private returnData = null;
  private returnOneData = null;

  constructor(
    private webApi: WebAPIService,
    entity: string,
    returnData: string = null,
    returnOneData: string = null,
  ) {
    this.entity = entity;

    this.returnData = returnData ? returnData : entity;
    this.returnOneData = returnOneData ? returnOneData : entity;
  }

  GetCollection(params = {}): Promise<ReturnData[]> {
    let servObj = new ServiceObject(this.entity);
    return this.webApi.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data[this.returnData]);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetOne(id): Promise<ReturnData> {
    let servObj = new ServiceObject(this.entity, id);
    return this.webApi.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data[this.returnOneData][0]);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(data: any): Promise<ServiceObject> {
    let servObj = new ServiceObject(this.entity);
    servObj.data = data;
    return this.webApi.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x;
      });
  }

  Update(data: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject(this.entity, id ? id : data.id);
    servObj.data = data;
    return this.webApi.PutAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x;
      });
  }

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject(this.entity, id);
    return this.webApi.DeleteAction(servObj)
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
