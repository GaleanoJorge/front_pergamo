import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import { environment } from '../../../../environments/environment.prod';

@Component({
  template: `
    <div class="d-flex justify-content-center">
    <a href='{{this.previewFile}}' target='_blank'>Ver documento</a>
    </div>
    
  `,
})

export class Actions2Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  public previewFile;

  ngOnInit():void {
    this.previewFile = environment.storage + this.value.data.policy_file;
  }

  }
