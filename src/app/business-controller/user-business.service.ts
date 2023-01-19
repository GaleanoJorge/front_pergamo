import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserCurriculum } from '../models/user-curriculum';
import { WebAPIService } from '../services/web-api.service';
import { ServiceObject } from '../models/service-object';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserBusinessService {

  public users: User[] = [];
  public user: User;
  public user_curriculum:UserCurriculum[]=[];

  constructor(
    private webAPI: WebAPIService,
    private router: Router,
  ) {
  }

v

  GetCollection(): Promise<User[]> {
    var servObj = new ServiceObject("user");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.users = <User[]>servObj.data.users;
        return Promise.resolve(this.users);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetByPacient(identification:{}): Promise<User[]> {
    console.log(identification);
    var servObj = new ServiceObject("user/byRole/2");
    return this.webAPI.GetAction(servObj, identification)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.users = <User[]>servObj.data.users;
        return Promise.resolve(this.users);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetByAdmission(identification:{}): Promise<User[]> {
    console.log(identification);
    var servObj = new ServiceObject("user/byAdmission/2");
    return this.webAPI.GetAction(servObj, identification)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.users = <User[]>servObj.data.users;
        return Promise.resolve(this.users);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetCollectionByPage(page: number, search: any): Promise<User[]> {
    var paramsMain = new HttpParams().set("identification", search.identification).set("firstname", search.firstname).set("middlefirstname", search.middlefirstname).set("lastname", search.lastname).set("middlelastname", search.middlelastname);
    var servObj = new ServiceObject("user?page=" + page);
    return this.webAPI.GetActionParams(servObj, paramsMain)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.users = <User[]>servObj.data.users;
        return Promise.resolve(this.users);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(user: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("user");
    servObj.data = user;
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

  SavePublic(user: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('public/userInscription');
    servObj.data = user;
    return this.webAPI.PostAction(servObj)
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

  SavePacient(user: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('PacientInscription');
    servObj.data = user;
    return this.webAPI.PostAction(servObj)
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

  UpdatePublic(user: any,id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('public/userInscription', (user.id ? user.id : id));
    servObj.data = user;
    return this.webAPI.PostAction(servObj)
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

  UpdatePatient(user: any,id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('PacientInscription', (user.id ? user.id : id));
    servObj.data = user;
    return this.webAPI.PostAction(servObj)
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

  Update(user: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("user", user.id);
    servObj.data = user;
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

  ProfesionalsByCampus(): Promise<User[]> {
    var servObj = new ServiceObject("users/Profesionals");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.users = <User[]>servObj.data.users;
        return Promise.resolve(this.users);
      })
      .catch(x => {
        throw x.message;
      });
  }

  UserByRole(id:any): Promise<User[]> {
    var servObj = new ServiceObject("user/byRole", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.users = <User[]>servObj.data.users;
        return Promise.resolve(this.users);
      })
      .catch(x => {
        throw x.message;
      });
  }

  UserByPad(id:any): Promise<User[]> {
    var servObj = new ServiceObject("user/byPAD/2", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.users = <User[]>servObj.data;
        return Promise.resolve(this.users);
      })
      .catch(x => {
        throw x.message;
      });
  }

  UserByRoleLocation(location_id:any,id:any, params = {}): Promise<User[]> {
    var servObj = new ServiceObject("user/byRoleLocation/"+location_id, id);
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.users = <User[]>servObj.data.users;
        return Promise.resolve(this.users);
      })
      .catch(x => {
        throw x.message;
      });
  }

  UserByExternalConsultation(params = {}): Promise<User[]> {
    var servObj = new ServiceObject("user/ExternalConsultant");
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.users = <User[]>servObj.data.users;
        return Promise.resolve(this.users);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Delete(id: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("user", id);
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

  GetUser(): Promise<User> {
    var servObj = new ServiceObject("user/auth/roles");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<User>servObj.data.user[0]);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetUserById(id): Promise<User> {
    var servObj = new ServiceObject("user", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.user = <User>servObj.data.user[0];
        return Promise.resolve(this.user);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetUserCurriculum(id: number): Promise<UserCurriculum> {
    let servObj = new ServiceObject('userCurriculumByHistory', id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        this.user_curriculum = <UserCurriculum[]>servObj.data.user;
        return Promise.resolve(this.user_curriculum[0]);
      })
      .catch(x => {
        throw x.message;
      });
  }

  AddRole(userRole: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("role/addUser");
    servObj.data = userRole;
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

  FindEmail(data): Promise<ServiceObject> {
    var servObj = new ServiceObject("find-email");
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

  DownloadCertificate(data): Promise<ServiceObject> {
    var servObj = new ServiceObject("find-certificate");
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

  AddChildren(userChildren: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("user/addParentUser");
    servObj.data = userChildren;
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

  GetUserChildrenById(params): Promise<any> {
    var servObj = new ServiceObject("user/allChildrenOfParentUser", params.id);
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj.data.userParentChildren);
      })
      .catch(x => {
        throw x.message;
      });
  }

  ChangeStatus(id, own_user_id): Promise<any> {
    let servObj = new ServiceObject(`user/${id}/changeStatus?own_user=${own_user_id}`);

    return this.webAPI.PatchAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;

        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      }).catch(x => {
        throw x.message;
      });
  }

  ChangeForceresetPassword(id, force_reset_password): Promise<any> {
    let servObj = new ServiceObject(`user/${id}/forceResetPassword`);
    servObj.data = { force_reset_password };
    return this.webAPI.PatchAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;

        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      }).catch(x => {
        throw x.message;
      });
  }

  ChangePassword(data): Promise<any> {
    let servObj = new ServiceObject(`user-changePassword`);
    servObj.data = data;
    return this.webAPI.PatchAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;

        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      }).catch(x => {
        throw x;
      });
  }

  GetFormAuxData(activo,type_professional_id?, search?) {
    let servObj = new ServiceObject('public/getUserAuxiliaryData');
    return this.webAPI.GetAction(servObj, {
      activo,
      type_professional_id,
      search
    })
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj.data);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetTrainersByCourse(course_id = null) {
    const params: any = {
      inscription_status_id: 1,
    };

    if (course_id) params.course_id = course_id;

    let servObj = new ServiceObject('trainersByCourse');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj.data.trainers);
      })
      .catch(x => {
        throw x.message;
      });
  }

  CheckPermission(checked) {
    const permissions = JSON.parse(localStorage.getItem('permissions'));
    const check = checked.split('.');
    const itemKeySearch = check.length === 1 ? 'item.route' : 'item.code';
    const itemValueSearch = check.length === 1 ? this.router.url : check[0];
    const perm = check.length === 1 ? check[0] : check[1];
    const keysplit = itemKeySearch.split('.');

    let show = false;

    permissions.map((permission) => {
      if (permission[keysplit[0]][keysplit[1]] === itemValueSearch && permission.permission.action === perm) {
        show = true;
      }
    });

    return show;
  }

  verifyUser(hash): Promise<User[]> {
    var servObj = new ServiceObject("check-email-user", hash);
    let response;
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        response = x;
        return Promise.resolve(response);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
