import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ServiceObject} from '../models/service-object';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebAPIService {

  constructor(private httpClient: HttpClient) {
  }

  private endPoint = environment.api;
  private filePath = environment.api;
  private endPointCAS = environment.cas;
  private paramsMain = new HttpParams().set('role_id', localStorage.getItem('role_id'));

  async GetAction(serviceObject: ServiceObject, params = {}): Promise<ServiceObject> {
    /*let httpParams = new HttpParams();

    Object.keys(params).map((key) => {
      httpParams = httpParams.append(key, params[key]);
    });*/

    return this.httpClient
      .get(`${this.endPoint}${serviceObject.entity}${ serviceObject.id ? '/' + serviceObject.id : ''}`,
        {
          params,
        })
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }

  GetActionLogin(serviceObject: ServiceObject): Promise<ServiceObject> {
    return this.httpClient
      .get(`${this.endPoint}${serviceObject.entity}/${serviceObject.id ? serviceObject.id : ''}`)
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }

  async GetActionParams(serviceObject: ServiceObject, paramsInt?: HttpParams): Promise<ServiceObject> {
    var params = paramsInt ? paramsInt : this.paramsMain;
    return this.httpClient
      .get(`${this.endPoint}${serviceObject.entity}/${serviceObject.id ? serviceObject.id : ''}`, {params})
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }

  async PostAction(serviceObject: ServiceObject): Promise<ServiceObject> {
    return this.httpClient
      .post(`${this.endPoint}${serviceObject.entity}${serviceObject.id
        ? '/' + serviceObject.id : ''}`, serviceObject.data, {})
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }

  async DeleteAction(serviceObject: ServiceObject): Promise<ServiceObject> {
    return this.httpClient
      .delete(`${this.endPoint}${serviceObject.entity}/${serviceObject.id ? serviceObject.id : ''}`)
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }

  async PutAction(serviceObject: ServiceObject): Promise<ServiceObject> {
    return this.httpClient
      .put(`${this.endPoint}${serviceObject.entity}${(serviceObject.id ? ('/' + serviceObject.id) : '')}`, serviceObject.data)
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }

  // async PutActionPAC(serviceObject: ServiceObject): Promise<ServiceObject> {
  //   return this.httpClient
  //     .put(`${this.endPoint}${serviceObject.entity}${(serviceObject.data.id_pac ? ('/' + serviceObject.id) : '')}${(serviceObject.data.id_reason ? ('/' + serviceObject.id) : '')}`, serviceObject.data)
  //     .toPromise()
  //     .then(x => {
  //       return Promise.resolve(<ServiceObject>x);
  //     })
  //     .catch(x => {
  //       throw x;
  //     });
  // }

  async PatchAction(serviceObject: ServiceObject): Promise<ServiceObject> {
    return this.httpClient
      .patch(`${this.endPoint}${serviceObject.entity}/${serviceObject.id ? serviceObject.id : ''}`, serviceObject.data)
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }

  async Login(serviceObject: ServiceObject): Promise<ServiceObject> {
    return this.httpClient
      .post(`${this.endPoint}${serviceObject.entity}?email=${serviceObject.data.email}&password=${serviceObject.data.password}`, serviceObject.data)
      .toPromise()
      .then(x => {
        var servObj = new ServiceObject();
        servObj.status = true;
        servObj.data = x;
        return Promise.resolve(<ServiceObject>servObj);
      })
      .catch(x => {
        throw x;
      });
  }

  async LoginAPI(serviceObject: ServiceObject): Promise<ServiceObject> {
    return this.httpClient
      .post(`${this.endPoint}${serviceObject.entity}?id=${serviceObject.data.id}&email=${serviceObject.data.email}&password=${serviceObject.data.password}`, serviceObject.data)
      .toPromise()
      .then(x => {
        var servObj = new ServiceObject();
        servObj.status = true;
        servObj.data = x;
        return Promise.resolve(<ServiceObject>servObj);
      })
      .catch(x => {
        throw x;
      });
  }

  async tokenCAS(serviceObject: ServiceObject): Promise<ServiceObject> {

    return this.httpClient
      .post(`${this.endPointCAS}${serviceObject.entity}?grant_type=${serviceObject.data.grant_type}&client_id=${serviceObject.data.client_id}&client_secret=${serviceObject.data.client_secret}&username=${serviceObject.data.username}&password=${serviceObject.data.password}`, serviceObject.data)
      .toPromise()
      .then(x => {
        var servObj = new ServiceObject();
        servObj.status = true;
        servObj.data = x;
        return Promise.resolve(<ServiceObject>servObj);
      })
      .catch(x => {
        throw x;
      });
  }

  async profileCAS(serviceObject: ServiceObject): Promise<ServiceObject> {
    return this.httpClient
      .post(`${this.endPointCAS}${serviceObject.entity}/${serviceObject.id ? serviceObject.id : ''}`, serviceObject.data)
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }

  GetFilePath() {
    return this.filePath;
  }
}
