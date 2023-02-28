import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import { environment } from '../../../../environments/environment';
@Component({
  template: `
    <div class="d-flex justify-content-center">
    <a *ngIf="this.value.data.file" href='{{this.previewFile}}' target='_blank'>Ver documento</a>
    <a *ngIf="!this.value.data.file">NO APLICA</a>
    </div>
    
  `,
})

export class ActionsFileComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  public previewFile;

  ngOnInit():void {
    this.previewFile = environment.storage + this.value.data.file;
  }

  }
