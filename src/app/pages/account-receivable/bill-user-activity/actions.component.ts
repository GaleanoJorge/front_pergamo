import { Component, Input, TemplateRef } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { BillUserActivityService } from '../../../business-controller/bill-user-activity.service';
import { ChRecordService } from '../../../business-controller/ch_record.service';


@Component({
  template: `
  <div class="d-flex justify-content-center">
    <button *ngIf="!value.data.status" nbTooltip="Aprobar" nbTooltipPlacement="top" nbTooltipStatus="primary"   nbButton ghost (click)="ChangeAccountReceivable(value.data,0)">
      <nb-icon icon="checkmark-outline"></nb-icon>
    </button>

    <button *ngIf="!value.data.status" nbTooltip="Rechazar" nbTooltipPlacement="top" nbTooltipStatus="primary"   nbButton ghost (click)="ChangeAccountReceivable(value.data,1)">
    <nb-icon icon="close-outline"></nb-icon>
  </button>
<button  nbTooltip="Ver Registro Historia Clinica" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="viewHC()" >
<nb-icon icon="file-add"></nb-icon>
</button>
  </div>


  
  `,
  styleUrls: ['./bill-user-activity.component.scss'],
})
export class ActionsBillComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;



  constructor(
    private toastService: NbToastrService,
    private billUserActivityS: BillUserActivityService,
    private viewHCS: ChRecordService,
  ) {
  }

  async ngOnInit() {

  }




viewHC() {
this.viewHCS.ViewHC(this.value.data.ch_record_id).then(x => {

  //this.loadingDownload = false;
  this.toastService.success('', x.message);
  window.open(x.url, '_blank');

}).catch(x => {
  this.isSubmitted = false;
  this.loading = false;
});
}

  async ChangeAccountReceivable(data,dta) {
    if(dta==0){
      var status2= 'APROBADO'
    }else{
      var status2= 'RECHAZADO'

    }
    await this.billUserActivityS.Update({
      id: data.id,
      status: status2,
    }).then(x => {
      this.toastService.success('', x.message);
      this.value.refresh();
      if (this.saved) {
        this.saved();
      }
    }).catch(x => {
      this.isSubmitted = false;
      this.loading = false;
    });

  }


}
