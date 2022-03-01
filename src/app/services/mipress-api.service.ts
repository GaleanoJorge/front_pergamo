import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ServiceObject} from '../models/service-object';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class mipressAPIService {

  constructor(private httpClient: HttpClient) {
  }

  private endPointSum = environment.api_mipress_sum;
  private endPointFac = environment.api_mipress_fac;
  private filePath = environment.api_mipress_sum;
  private paramsMain = new HttpParams().set('role_id', localStorage.getItem('role_id'));

  async GetAction(serviceObject: ServiceObject, params = {}): Promise<ServiceObject> {
    /*let httpParams = new HttpParams();

    Object.keys(params).map((key) => {
      httpParams = httpParams.append(key, params[key]);
    });*/

    return this.httpClient
      .get(`${this.endPointSum}${serviceObject.entity}${ serviceObject.id ? '/' + serviceObject.id : ''}`,
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
      .get(`${this.endPointSum}${serviceObject.entity}/${serviceObject.id ? serviceObject.id : ''}`)
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
      .get(`${this.endPointSum}${serviceObject.entity}/${serviceObject.id ? serviceObject.id : ''}`, {params})
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
      .post(`${this.endPointSum}${serviceObject.entity}${serviceObject.id
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
      .delete(`${this.endPointSum}${serviceObject.entity}/${serviceObject.id ? serviceObject.id : ''}`)
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
      .put(`${this.endPointSum}${serviceObject.entity}${(serviceObject.id ? ('/' + serviceObject.id) : '')}`, serviceObject.data)
      .toPromise()
      .then(x => {
        return Promise.resolve(<ServiceObject>x);
      })
      .catch(x => {
        throw x;
      });
  }

  async PatchAction(serviceObject: ServiceObject): Promise<ServiceObject> {
    return this.httpClient
      .patch(`${this.endPointSum}${serviceObject.entity}/${serviceObject.id ? serviceObject.id : ''}`, serviceObject.data)
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
      .get(`${this.endPointSum}/${serviceObject.entity}?email=${serviceObject.data.email}&password=${serviceObject.data.password}`, serviceObject.data)
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

  async LoginMipressAPISum(serviceObject: ServiceObject): Promise<ServiceObject> {
    return this.httpClient
      .get(`${this.endPointSum}/${serviceObject.entity}/${serviceObject.data.nit}/${serviceObject.data.token}`, serviceObject.data)
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

  async BilledData(serviceObject: ServiceObject): Promise<ServiceObject> {
    return this.httpClient
      .post(`${this.endPointSum}/${serviceObject.entity}/${serviceObject.data.nit}/${serviceObject.data.token}`, serviceObject.data)
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

  async LoginMipressAPIFac(serviceObject: ServiceObject): Promise<ServiceObject> {
    return this.httpClient
      .get(`${this.endPointFac}/${serviceObject.entity}/${serviceObject.data.nit}/${serviceObject.data.token}`, serviceObject.data)
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

  GetFilePath() {
    return this.filePath;
  }
}
