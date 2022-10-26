import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import PouchDB from 'pouchdb-browser';

@Injectable({
  providedIn: 'root',
})
export class DbPwaService {
  private user_db: any;
  public user:string;

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

    // this.user_db.get(this.user, function (err, doc) {
    //   if (err) { return console.log(err); }
    //   this.user_db.put({
    //     _id: this.user,
    //     _rev: doc._rev,
    //     // _doc_id_rev:doc._doc_id_rev,
    //     permission: permission,
    //   });
      
    
    // })


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
