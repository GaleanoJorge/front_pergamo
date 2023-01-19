import { Injectable } from '@angular/core';
import { mipressAPIService } from './mipress-api.service';
import { ServiceObject } from '../models/service-object';
import { AuthMiPres } from '../models/auth-mipres';
import { UserOrigin } from '../models/user-origin';
import { Origin } from '../models/origin';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { WebAPIService } from './web-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthMiPresService {

  private token: AuthMiPres;
  private userOrigin: UserOrigin;

  constructor(private webAPI: WebAPIService) {
  }

  // Login(username, password): Promise<ServiceObject> {
  //   var token = null;

  //  var servObj = new ServiceObject("oauth2.0/token");
  //  servObj.data = { grant_type: 'password', client_id: encodeURI('oaut2_service-1604361345670'), client_secret: 'MThlZTQ1YTNmNjEzNzQ0OTYwMzAzMmIw', username: username, password: encodeURI(password) };
  //     return this.webAPI.tokenCAS(servObj)
  //     .then(x => {
  //       servObj = <ServiceObject>x;
  //       if (!servObj.status)
  //         throw new Error(servObj.message);
  //         this.SaveToken(servObj.data);


  //       return Promise.resolve(servObj);
  //     })
  //     .catch(x => {
  //       throw x.status == 401 ? x.error.msg : 'Error en el servidor';
  //     });
  // }

  // Login(nit, token_perm): Promise<ServiceObject> {
  //   var servObj = new ServiceObject('GenerarToken');
  //   servObj.data = {nit: nit, token_perm: token_perm};
  //   return this.webAPI.LoginMipressAPISum(servObj)
  //     .then(x => {
  //       servObj = <ServiceObject>x;
  //       if (!servObj.status)
  //         throw new Error(servObj.message);

  //       this.SaveToken(servObj.data);
  //       return Promise.resolve(servObj);
  //     })
  //     .catch(x => {
  //       throw x.status == 401 ? x.error.msg : 'Error en el servidor';
  //     });
  // }

  // Profile(username, password): Promise<ServiceObject> {
  //   var servObjPRO = new ServiceObject('oauth2.0/profile');
  //   return this.webAPI.profileCAS(servObjPRO)
  //     .then(x => {

  //       servObjPRO = <ServiceObject>x;


  //       return Promise.resolve(servObjPRO);
  //     }).catch(x => {
  //       throw x.status == 401 ? x.error.msg : 'Error en el servidor';
  //     });

  // }

  // APIToken(nit, token_perm): Promise<ServiceObject> {
  //   var servObjAPI = new ServiceObject('GenerarToken');
  //   servObjAPI.data = {nit: nit, token_perm: token_perm};
  //   console.log(servObjAPI);
  //   return this.webAPI.LoginMipressAPISum(servObjAPI).then(x => {
  //     servObjAPI = <ServiceObject>x;
  //     this.SaveToken(servObjAPI.data);

  //     return Promise.resolve(servObjAPI);
  //   }).catch(x => {
  //     throw x.status == 401 ? x.error.msg : 'Error en el servidor';
  //   });

  // }

  APITokenMipress(mipres_token_type?): Promise<ServiceObject> {
    var servObjAPI = new ServiceObject('GenerarToken');
    servObjAPI.data = { mipres_token_type: mipres_token_type };
    // console.log(servObjAPI);
    return this.webAPI.LoginAPIMipres(servObjAPI, mipres_token_type).then(x => {
      servObjAPI = <ServiceObject>x;
      this.SaveToken(servObjAPI.data, mipres_token_type);
      return Promise.resolve(servObjAPI);
    }).catch(x => {
      throw x.status == 401 ? x.error.msg : 'Error en el servidor';
    });

  }

  // SupplyByDate(data?): Promise<ServiceObject> {
  //   var servObjAPI = new ServiceObject('SuministroXFecha');
  //   servObjAPI.data = { data: data };
  //   console.log(servObjAPI);
  //   return this.webAPI.LoginAPIMipres(servObjAPI, mipres_token_type).then(x => {
  //     servObjAPI = <ServiceObject>x;
  //     this.SaveToken(servObjAPI.data, mipres_token_type);
  //     return Promise.resolve(servObjAPI);
  //   }).catch(x => {
  //     throw x.status == 401 ? x.error.msg : 'Error en el servidor';
  //   });

  // }

  // ResetPassword(username: string): Promise<ServiceObject> {
  //   var servObj = new ServiceObject('forgot');
  //   servObj.data = {username: username};
  //   return this.webAPI.PostAction(servObj)
  //     .then(x => {
  //       servObj = <ServiceObject>x;
  //       if (!servObj.status)
  //         throw new Error(servObj.message);

  //       return Promise.resolve(x);
  //     })
  //     .catch(x => {
  //       throw x.message;
  //     });
  // }

  LogOut(): void {
    localStorage.clear();
  }

  private SaveToken(data: any, mipres_token_type?): void {
    if (mipres_token_type === 0) {

      localStorage.setItem('access_token_sum', data);

    } else {

      localStorage.setItem('access_token_fac', data);
    
    }
    localStorage.setItem('mipres_token_type', mipres_token_type);
    localStorage.setItem('mipres_expires_in', data.mipres_expires_in);
  }

  GetToken(): AuthMiPres {

    this.token = {
      access_token_sum: localStorage.getItem('access_token_sum'),
      access_token_fac: localStorage.getItem('access_token_fac'),
      mipres_token_type: localStorage.getItem('mipres_token_type'),
      mipres_expires_in: localStorage.getItem('mipres_expires_in'),
    };

    return this.token;
  }

  SaveUserOrigin(origins: Origin[]): void {
    localStorage.setItem('origins', JSON.stringify(origins));
    localStorage.setItem('origin_id', origins[0].pivot.origin_id);
    localStorage.setItem('user_id', origins[0].pivot.user_id);
  }

  ChangeOrigin(origin: string) {
    localStorage.setItem('origin_id', origin);
  }

  SaveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role_id', user.roles[0].id.toString());
  }

  ChangeRole(role: string) {
    localStorage.setItem('role_id', role);
  }

  GetUser(): User {
    var user: User;
    user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  GetRole(): number {
    var role = +localStorage.getItem('role_id');
    return role;
  }

  GetUserOrigin(): UserOrigin {
    this.userOrigin = {
      id: 0,
      user_id: +localStorage.getItem('user_id'),
      origin_id: +localStorage.getItem('origin_id'),
      Origin: null,
      User: null,
    };
    return this.userOrigin;
  }

  GetOrigins(): Origin[] {
    var origins: Origin[] = [];
    origins = JSON.parse(localStorage.getItem('origins'));
    return origins;
  }

  ResetPasswordForToken(data) {
    let servObj = new ServiceObject('public/password/reset');
    servObj.data = data;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(x);
      })
      .catch(x => {
        throw x;
      });
  }
}
