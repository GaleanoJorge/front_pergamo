import { Injectable } from '@angular/core';
import { itemSelection } from '@syncfusion/ej2/maps';
import PouchDB from 'pouchdb-browser';

@Injectable({
  providedIn: 'root',
})
export class DbPwaService {
  private user_db: any;
  public saveFormInfo: any;

  public user: string;
  public id: string;
  public userTable: string;
  public idForm: string;

  constructor() {
    this.user_db = new PouchDB('login_db');
  }

  //ALMACENAR USUARIO

  public saveUser = (userAll: any, user: string, pass, campus: any, token) => {
    this.user = user;
    this.user_db.put({
      _id: user,
      user: user,
      userAll: userAll,
      pass: pass,
      campus: campus,
      token: token,
      permission: [],
      menu:[],
    });
  };

  public update = (permission: any, user: string) => {
    this.user_db.get(user, function (err, doc) {
      let db = new PouchDB('login_db');
      (doc.permission = permission),
        db.put(doc, function (err, response) {
          if (err) {
            return console.log(err);
          } else {
            console.log(response);
          }
          // handle response
        });
    });
  };

  public UpdateMenu= (menu: any, user: string) =>{
    this.user_db.get(user, function (err, doc) {
      let db = new PouchDB('login_db');
      (doc.menu = menu),
      db.put(doc, function (err, response) {
          if (err) {
            return console.log(err);
          } else {
            return console.log(response);
          }
          //handle response
        });
    });
  }

  //OBTENER USUARIO
  public getUser = (user) => {
    this.user_db.get(user, function (err, doc) {
      return doc.user;
    });
  };

  async returnCampus(user) {
    this.user_db.get(user, function (err, doc) {
      return Promise.resolve(doc.campus);
    });
  }

  async returnPermission() {
    this.user_db.get(this.user, function (err, doc) {
      return Promise.resolve(doc.permission);
    });
  }

  //Guardar informacion de las tablas en pouchDB

  public saveData = (id: any, data: any) => {
    this.id = id;
    id = new PouchDB(id);
    id.put({
      _id: this.id,
      data: data,
    });
  };


  public Updatedata(id: any, data: any) {
    data=data;
    this.id = id;
    id = new PouchDB(id);
    id.get(this.id, function (err, doc) {
      doc._deleted = true;
      this.saveData(this.id, data);
    });
  }

  //obtener datos para las tablas en pouchDB

  public getData = (id: any) => {
    this.id = id;
    id = new PouchDB(id);
    id.get(this.id, function (err, doc) {
      return Promise.resolve([doc]);
    });
  };

  //Guardar informacion del plan de manejo en pouchDB

  public savePlan(id: any, data: any, userTable: string) {
    this.userTable = userTable;
    this.id = id;
    id = new PouchDB(id);
    id.put(
      {
        _id: this.userTable,
        data: data,
      },
      function (err, response) {
        if (err) {
          return console.log(err);
        }
        // handle response
      }
    );
  }

  public UpdatePlan(id: any, data: any, userTable: string) {
    this.userTable = userTable;
    this.id = id;
    id = new PouchDB(id);
    id.get(this.userTable, function (err, doc) {
      doc._deleted = true;
      this.savePlan(this.id, data, this.userTable);
    });
  }

  //Obtener informacion del plan de manejo de pouchDB

  public getPlan=(id: any, userTable: string)=> {
    this.userTable = userTable;
    this.id = id;
    id = new PouchDB(id);
    id.get(this.userTable, function (err, doc) {
      return Promise.resolve([doc]);
    });
  }

  public createPatient(id: any, data: any) {
    this.idForm = id;
    id = new PouchDB(id);
    id.put(
      {
        _id: this.idForm,
        data: data,
      },
      function (err, response) {
        if (err) {
          return console.log(err);
        }
        // handle response
      }
    );
  }

  public updatePatient(id: any, data: any) {
    this.idForm = id;
    id = new PouchDB(id);
    id.get(this.idForm, function (err, response) {
      if (err) {
        console.log(err);
      }
      id.put(
        {
          _id: this.idForm,
          data: data,
        },
        function (err, response) {
          if (err) {
            return console.log(err);
          }
          // handle response
        }
      );
    });
  }
}

// sincronizar pouchdb con base de datos
// this.user_db.getData().then((items:any)=>{
//   itemSelection.forEach(({doc})=>this.servicio(doc))
// })
