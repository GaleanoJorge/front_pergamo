import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
  <div >
    <a *ngIf="value.procedence == 1" [href]="value.preview_file" target="_blank">Ver documento radicación</a>
    <nb-icon *ngIf="!value.with_file && value.procedence == 0" icon="checkmark-outline"></nb-icon>
    <input *ngIf="value.with_file && value.procedence == 0" accept="application/pdf" type="file" id="file" nbInput fullWidth
        (change)="value.file($event.target.files, value.data)" [disabled]="!(value.enabled && value.with_file)" />
  </div>
  `,
})
export class FileRentReliefPackageComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;
}
