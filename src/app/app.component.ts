/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import PouchDB from 'pouchdb-browser';
import { PouchManager } from './pages/clinic-history/PouchManager';
import { ChReasonConsultationService } from './business-controller/ch-reason-consultation.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  reasonConsultationS: ChReasonConsultationService;

  constructor(private analytics: AnalyticsService, private seoService: SeoService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }

  //@HostListener('window:online', [ '$event' ])
  syncData() {
    //El return es únicamente para poder iniciar sesión sin que se borren los datos al sincronizar (Solo pruebas)
    return
    let entry = 'reason_consultation_sync';
    let indexedDB = new PouchDB(entry);
    indexedDB.allDocs({
      include_docs: true,
      attachments: true
    }).then((x) => {
      if(!x.rows || x.rows.length == 0){
        return;
      }
      let reasonsConsultation = x.rows.map(reason => reason.doc);
      for (let reason of reasonsConsultation) {
        this.reasonConsultationS.Save(reason).then(x => {
          let pouchManager = new PouchManager("reason_consultation_sync");
          pouchManager.delete(reason._id);
        });
      }
      console.log("Sincronización exitosa de " + entry);
    })
  }
}
