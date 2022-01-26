import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

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
    this.previewFile = 'http://localhost:8000/storage/' + this.value.data.policy_file;
  }

  }
