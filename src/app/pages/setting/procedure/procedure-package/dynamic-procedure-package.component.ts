import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
          <nb-toggle id="amount" amount status="info" [checked]=value.amount
          (change)="value.onchange($event, value.data)" [disabled]="value.enabled"></nb-toggle>
    </div>
  `,
  styleUrls: ['./procedure-package.component.scss'],
})
export class DynamicProcedurePackageComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;
  
  ngOnInit(): void{
    console.log(this.value);
    console.log(this.rowData)
  }
}
