import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import { environment } from '../../../../environments/environment.prod';
import * as envi from '../../../../environments/environment';

@Component({
  template: `
    <div class="d-flex justify-content-center">
    <a *ngIf="this.previewFile" href='{{this.previewFile}}' target='_blank'>Ver documento</a>
    <a *ngIf="!this.previewFile" > -- </a>
    </div>
    
  `,
})

export class ActionsDocumentComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  public previewFile: any = null;

  ngOnInit():void {
    if(this.rowData.file_auth){
      this.previewFile = environment.storage + this.rowData.file_auth;
    }
  }

  }
