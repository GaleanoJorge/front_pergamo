import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ObservationsComponent} from '../../observations-component';
import {InscriptionStatus} from '../../../../models/inscription-status';
import {InscriptionStatusBusinessService} from '../../../../business-controller/inscription-status-business.service';
import {InscriptionBusinessServices} from '../../../../business-controller/inscription-business.services';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Group} from '../../../../models/group';

@Component({
  template: `
                <div *ngFor="let course of inscriptionId">
                  <div *ngFor="let status of inscriptionStatusBs.inscriptionStatus">
                  <span *ngIf="course.pivot.inscription_status_id == status.id">
                  {{ status.name }}
                  </span>
                  </div>
                </div>
  `,
})
export class InscriptionStatusAdmissionsComponent implements ViewCell, OnInit {

  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  public inscriptionStatus: InscriptionStatus[] = [];
  public inscriptionId: any;

  constructor(
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private inscriptionBs: InscriptionBusinessServices,
    private toastS: NbToastrService,
    private inscriptionStatusBs: InscriptionStatusBusinessService
  ) {
  }

  ngOnInit() {
    this.inscriptionStatusBs.GetCollection({
      pagination: false,
    }).then(x => {
      this.inscriptionStatus = x;
    }).catch(x => {
    });
    var data = this.value.data.courses;
    this.inscriptionId = data.filter(course => course.pivot.course_id==this.route.snapshot.params.course_id);
  }

}
