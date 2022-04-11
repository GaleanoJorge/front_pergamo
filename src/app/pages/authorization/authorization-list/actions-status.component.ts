import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { AuthStatusService } from '../../../business-controller/auth-status.service';

@Component({
    template: `
    <div class="d-flex justify-content-center">
          <nb-select [selected]="value.data.auth_status_id" id="auth_status_id" fullWidth (selectedChange)="value.status($event, value.data)">
            <nb-option value="">Seleccione...</nb-option>
            <nb-option selected="{{ item.id == value.data.auth_status_id }}" *ngFor="let item of value.select"
              [value]="item.id"> {{ item.name }}</nb-option>
          </nb-select>
        </div>
  `,
    styleUrls: ['./authorization-list.component.scss'],
})
export class ActionsStatusComponent implements ViewCell {
    @Input() value: any;    // This hold the cell value
    @Input() rowData: any;  // This holds the entire row object


    public dialog;
    public auth_status: any[] = [];


    constructor(
        private dialogService: NbDialogService,
        private authStatusS: AuthStatusService,

    ) {
    }

    async ngOnInit() {

        console.log(this.rowData);
        console.log(this.value);


    }

    ConfirmAction(dialog: TemplateRef<any>) {
        this.dialog = this.dialogService.open(dialog);
        this.GetResponseParam()
    }

    GetResponseParam() {

    }

}
