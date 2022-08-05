import { Component, Input, TemplateRef } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { ConsentsInformedService } from '../../../business-controller/consents-informed.service';


@Component({
  template: `
  <div class="d-flex justify-content-center">
  <a nbTooltip="Descargar consentimiento"  nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="viewCI()" >
  <nb-icon icon="file-text-outline"></nb-icon>
</a>
  </div>
  `,
  styleUrls: ['./consents-informed.component.scss'],
})
export class ActionsCIComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  public today;
  public show;
  loading: boolean = false;
  public isSubmitted: boolean = false;


  constructor(
    private viewCIS: ConsentsInformedService,
    private toastService: NbToastrService,

  ) {
  }

  async ngOnInit() {
  }

  viewCI() {
    this.viewCIS.ViewCI(this.value.admissions_id, {id: this.value.data.id}).then(x => {

      //this.loadingDownload = false;
      this.toastService.success('', x.message);
      window.open(x.url, '_blank');

    }).catch(x => {
      this.isSubmitted = false;
      this.loading = false;
    });
  }


}
