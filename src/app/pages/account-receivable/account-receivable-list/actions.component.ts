import { Component, Input, TemplateRef } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';


@Component({
    template: `
  <div class="d-flex justify-content-center">
        <button
            *ngIf="(value.data.edit_date == 1 && !value.data.file_payment && value.role.role_type_id == 2) && !(value.data.status_bill_id == 3 || value.data.status_bill_id == 4)"
            nbTooltip="Adjuntar Planilla seguridad" nbTooltipPlacement="top" nbTooltipStatus="primary"
            ngxCheckPerms="update" nbButton ghost (click)="value.edit(value.data)">
            <nb-icon icon="paper-plane-outline"></nb-icon>
        </button>
        <button
            *ngIf="(value.data.status_bill_id == 2) && (value.role.role_type_id == 1) && !(value.data.status_bill_id == 3 || value.data.status_bill_id == 4)"
            nbTooltip="Pagar" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="update" nbButton ghost
            (click)="value.pay(value.data)">
            <nb-icon icon="diagonal-arrow-right-up-outline"></nb-icon>
        </button>
        <button
            *ngIf="(value.role.role_type_id == 1) && !(value.data.status_bill_id == 3 || value.data.status_bill_id == 4)"
            nbTooltip="Ver soportes" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="update" nbButton
            ghost (click)="value.view(value.data)">
            <nb-icon icon="eye-outline"></nb-icon>
        </button>
        <div
        *ngIf="(value.data.gross_value_activities > 5000000 && value.data.has_retention == 0 && value.role.role_type_id == 2) && !(value.data.status_bill_id == 3 || value.data.status_bill_id == 4)">
        <button nbTooltip="Alivios de Renta" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="update"
        nbButton ghost (click)="value.rent(value.data)">
        <nb-icon icon="trending-down-outline"></nb-icon>
        </button>
        </div>
        <button
            *ngIf="value.data.show_file == 1"
            nbTooltip="Generar Cuenta de cobro" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="update" nbButton
            ghost (click)="value.generate_file(value.data)">
            <nb-icon icon="file-text-outline"></nb-icon>
        </button>
        <a nbTooltip="Ver actividades" ngxCheckPerms="create" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton
            ghost [routerLink]="'/pages/account-receivable/bill-user-activity/' + value.data.id">
            <nb-icon icon="archive-outline"></nb-icon>
        </a>
    </div>
  `,
    styleUrls: ['./account-receivable-list.component.scss'],
})
export class Actions2Component implements ViewCell {
    @Input() value: any;    // This hold the cell value
    @Input() rowData: any;  // This holds the entire row object



    constructor(

    ) {
    }

    async ngOnInit() {

    }


}
