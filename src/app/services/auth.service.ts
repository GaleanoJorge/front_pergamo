import {Injectable} from '@angular/core';
import {WebAPIService} from './web-api.service';
import {ServiceObject} from '../models/service-object';
import {Auth} from '../models/auth';
import {UserOrigin} from '../models/user-origin';
import {Origin} from '../models/origin';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private token: Auth;
  private userOrigin: UserOrigin;

  constructor(private webAPI: WebAPIService) {
  }

  // Login(email, password): Promise<ServiceObject> {
  //   var token = null;

  //  var servObj = new ServiceObject("oauth2.0/token");
  //  servObj.data = { grant_type: 'password', client_id: encodeURI('oaut2_service-1604361345670'), client_secret: 'MThlZTQ1YTNmNjEzNzQ0OTYwMzAzMmIw', username: email, password: encodeURI(password) };
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

  Login(email, password): Promise<ServiceObject> {
    var servObj = new ServiceObject('login');
    servObj.data = {email: email, password: password};
    return this.webAPI.Login(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.SaveToken(servObj.data);
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : 'Error en el servidor';
      });
  }

  Profile(email, password): Promise<ServiceObject> {
    var servObjPRO = new ServiceObject('oauth2.0/profile');
    return this.webAPI.profileCAS(servObjPRO)
      .then(x => {

        servObjPRO = <ServiceObject>x;


        return Promise.resolve(servObjPRO);
      }).catch(x => {
        throw x.status == 401 ? x.error.msg : 'Error en el servidor';
      });

  }

  APIToken(email, password, id): Promise<ServiceObject> {
    var servObjAPI = new ServiceObject('loginJWH');
    servObjAPI.data = {id: id, email: email, password: password};
    console.log(servObjAPI);
    return this.webAPI.LoginAPI(servObjAPI).then(x => {
      servObjAPI = <ServiceObject>x;
      this.SaveToken(servObjAPI.data);

      return Promise.resolve(servObjAPI);
    }).catch(x => {
      throw x.status == 401 ? x.error.msg : 'Error en el servidor';
    });

  }

  ResetPassword(email: string): Promise<ServiceObject> {
    var servObj = new ServiceObject('forgot');
    servObj.data = {email: email};
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(x);
      })
      .catch(x => {
        throw x.message;
      });
  }

  LogOut(): void {
    localStorage.clear();
  }

  private SaveToken(data: any): void {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('token_type', data.token_type);
    localStorage.setItem('expires_in', data.expires_in);
  }

  GetToken(): Auth {

    this.token = {
      access_token: localStorage.getItem('access_token'),
      token_type: localStorage.getItem('token_type'),
      expires_in: localStorage.getItem('expires_in'),
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
