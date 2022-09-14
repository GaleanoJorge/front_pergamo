import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';


@Component({
    template: `
    <div class="d-flex justify-content-center">
        <textarea  *ngIf="!value.enabled" type="text" nbInput fullWidth id="amount" amount [value]="value.amount ? value.amount : '' "
        (change)="value.onchange($event, value.data)" [disabled]="value.enabled" textarea>
        </textarea>
        <textarea  *ngIf="value.enabled" type="text" nbInput fullWidth id="amount" amount [value]="value.amount ? value.amount : '' "
        (change)="value.onchange($event, value.data)" readonly textarea>
        </textarea>
    </div>
  `,
    styleUrls: ['./authorization-list.component.scss'],
})
export class ActionsAuthNumberComponent implements ViewCell {
    @Input() value: any;    // This hold the cell value
    @Input() rowData: any;  // This holds the entire row object

    // public disabled: boolean = true;

    constructor(

    ) {
    }

    async ngOnInit() {

    }

   
}
