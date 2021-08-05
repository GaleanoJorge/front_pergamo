import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <a nbButton *ngIf="value.valid" [href]="value.endpoint + value.data.certificate" download="value.data.namefile" target="_blank" >
        <nb-icon icon="cloud-download-outline"></nb-icon>
      </a>
    </div>
  `,
})
export class ActionsCertificateComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
