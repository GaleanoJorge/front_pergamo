import { Injectable } from '@angular/core';
import { id } from '@swimlane/ngx-charts';
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
  public docUpdate: any;

  //Constructor de Archivo PounchDB
  constructor() {
    this.user_db = new PouchDB('login_db');
  }

  //Almacenar datos de Usuario en Base login_db
  public saveUser = (
    metadataUser: any,
    user: string,
    password: any,
    location: any
  ) => {
    let doc = {
      _id: user,
      user: user,
      metadataUser: metadataUser,
      password: password,
      location: location,
      menu: {},
    };

    /* Se verifica que el usuario ya este registrado en la base de datos:
    Sí esta registrado se retorna un mensaje de error, por el contrario se almacena en la base de datos */
    this.user_db.put(doc, (err, response) => {
      if (err) {
        return console.log(
          'El usuario no ha sido almacenado, es probable que ya exista en la base de datos'
        );
      } else {
        console.log('Usuario almacenado correctamente');
      }
    });
  };

  public UpdateMenu = (menu: any, permission: any, user: string) => {
    this.user_db.get(user, function (err, doc) {
      if (err) {
        return console.log(err);
      }
      let db = new PouchDB('login_db');
      console.log('Estos son los permisos', menu);
      doc.menu = menu;
      doc.permission = permission;
      db.put(doc, function (err, response) {
        if (err) {
          return console.log('Error al actualizar informacion del usuario');
        } else {
          console.log(response);
        }
        // handle response
      });
    });
  };

  //Obtener Usuario
  public getUser = (user) => {
    this.user_db.get(user, function (err, doc) {
      return doc.user;
    });
  };

  async returnCampus(user) {
    this.user_db.get(user, function (err, doc) {
      return Promise.resolve(doc.campus); //No retorna valor
    });
  }

  async returnPermission() {
    this.user_db.get(this.user, function (err, doc) {
      return Promise.resolve(doc.permission);
    });
  }

  //Guardar Informacion de las tablas en PouchDB
  public saveData = (id: any, data: any) => {
    this.id = id;
    var id2 = new PouchDB(id);
    id2.get(this.id, function (err, doc) {
      if (err) {
        id2.put(
          {
            _id: id,
            data: data,
          },
          function (err, response) {
            if (err) {
              return console.log(err);
            }
            // handle response
          }
        );
      } else {
        doc.data = data;
        id2.put(doc, function (err, response) {
          if (err) {
            return console.log('Error al actualizar informacion');
          } else {
            console.log(response);
          }
          // handle response
        });
      }
    });
  };

  public Updatedata(id: any, data: any) {
    data = data;
    this.id = id;
    id = new PouchDB(id);
    id.get(this.id, function (err, doc) {
      doc._deleted = true;
      this.saveData(this.id, data);
    });
  }

  //Obtener datos para las tablas en PouchDB
  public getData = (id: any) => {
    this.id = id;
    id = new PouchDB(id);
    id.get(this.id, function (err, doc) {
      return Promise.resolve([doc]);
    });
  };

  //Guardar Informacion del Plan de Manejo en PouchDB
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
      this.savePlan(this.id, this.data, this.userTable);
    });
  }

  //Obtener Informacion del Plan de Manejo de PouchDB
  public getPlan = (id: any, userTable: string) => {
    this.userTable = userTable;
    this.id = id;
    id = new PouchDB(id);
    id.get(this.userTable, function (err, doc) {
      return Promise.resolve([doc]);
    });
  };

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

//Sincronizar PouchDB con Base de Datos
// this.user_db.getData().then((items:any)=>{
//   itemSelection.forEach(({doc})=>this.servicio(doc))
// })
