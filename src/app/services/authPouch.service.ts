import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import PouchDB from 'pouchdb-browser';

@Injectable({
  providedIn: 'root',
})
export class DbPwaService {
  private user_db: any;
  public user:string;
  public type:string;

  constructor() {
    this.user_db = new PouchDB('login_db');
  }
  public saveUser = (userAll:any,user: string, pass, campus: any, token) => {
    this.user=user;
    this.user_db.put({
      _id: user,
      user: user,
      userAll:userAll,
      pass: pass,
      campus: campus,
      token: token,
      permission:[],
      menu:[]
    });
  };

  public update=(permission:any,user:any) =>{

    this.user_db.get(user, function(err, doc) {
      if (err) { return console.log(err); }
      let db = new PouchDB('login_db');
      doc.permission=permission,
      db.put(   
      doc, function(err, response) {
        if (err) { return console.log(err); }
        else{
          console.log(response);
        }
        // handle response
      });
    });
  };


  public saveSelects = (data:any,type:any) => {
    this.type = type;
    let db = new PouchDB(type);
    db.put({
      _id: this.type,
      type:data,
    });
  };


  public updateMenu=(menu:any,user:any) =>{


    this.user_db.get(user, function(err, doc) {
      if (err) { return console.log(err); }
      let db = new PouchDB('login_db');
      doc.menu=menu,
      db.put(   
      doc, function(err, response) {
        if (err) { return console.log(err); }
        else{
          console.log(response);
        }
        // handle response
      });
    });
  };


  public getUser = (user) => {
    this.user_db.get(user, function (err, doc) {

      console.log('usuario:', doc.user, 'campus:', doc.campus);

    });
  };

  async returnCampus(user) {
    this.user_db.get(user, function (err, doc) {
      return Promise.resolve(doc.campus);


    });
  };

  async returnPermission() {
    this.user_db.get(this.user, function (err, doc) {
      return Promise.resolve(doc.permission);


    });
  };

}
