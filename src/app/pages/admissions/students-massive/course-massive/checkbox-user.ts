import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ObservationsComponent} from '../../observations-component';
import {InscriptionBusinessServices} from '../../../../business-controller/inscription-business.services';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Group} from '../../../../models/group';

@Component({
  template: `
  
    <div >
    <nb-checkbox status="basic" [checked]="false" (checkedChange)="value.dataUserRole($event,value.data)">
    </nb-checkbox>
    </div>
  `,
})
export class CheckboxUser implements ViewCell {

  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
 

  constructor(private dialogService: NbDialogService,
    private inscriptionBs: InscriptionBusinessServices,
    private toastS: NbToastrService,) {
    
  }
  

  ngOnInit() {

}

  
}
