import { Component, Input,TemplateRef } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdmissionsService } from '../../../../business-controller/admissions.service';
import { BedService } from '../../../../business-controller/bed.service';
import {PavilionService} from '../../../../business-controller/pavilion.service';
import {FlatService} from '../../../../business-controller/flat.service';
import {LocationService} from '../../../../business-controller/location.service';



@Component({
  template: `
    <div class="d-flex justify-content-center">
    <button  nbTooltip="Aprobar" nbTooltipPlacement="top" nbTooltipStatus="primary"   nbButton ghost (click)="ChangeAccountReceivable(value.data,0)">
      <nb-icon icon="checkmark-outline"></nb-icon>
    </button>

    <button nbTooltip="Rechazar" nbTooltipPlacement="top" nbTooltipStatus="primary"   nbButton ghost (click)="ChangeAccountReceivable(value.data,1)">
    <nb-icon icon="close-outline"></nb-icon>
  </button>
    </div>
  `,
})
export class Actions3Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  public state;
  public traslate;
  loading: boolean = false;
  public form: FormGroup;
  public form2: FormGroup;
  public saved: any = null;
  public dialog;
  public isSubmitted: boolean = false;
  public data;
  public data2;
  public campus_id;
  public flat:any[];
  public pavilion:any[];
  public bed:any[];

  constructor(
    private toastService: NbToastrService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private AdmissionsS: AdmissionsService,
    private BedS: BedService,
    private PavilionS: PavilionService,
    private FlatS: FlatService,
    private LocationS: LocationService,
  ) {
  }
  ngOnInit(){

 
    }

    async ChangeAccountReceivable(data,dta) {
      if(dta==0){
        var status2= 'APROBADO'
      }else{
        var status2= 'RECHAZADO'
  
      }
      // await this.billUserActivityS.Update({
      //   id: data.id,
      //   status: status2,
      // }).then(x => {
      //   this.toastService.success('', x.message);
      //   this.value.refresh();
      //   if (this.saved) {
      //     this.saved();
      //   }
      // }).catch(x => {
      //   this.isSubmitted = false;
      //   this.loading = false;
      // });
    }

  }





