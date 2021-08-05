import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbButton ghost>
        <a target="_blank" href="{{value.data.teams_url}}"> <nb-icon icon="video-outline"> </nb-icon> </a>        
      </button>            
    </div>
  `,
})
export class ActionsComponentSesion implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
