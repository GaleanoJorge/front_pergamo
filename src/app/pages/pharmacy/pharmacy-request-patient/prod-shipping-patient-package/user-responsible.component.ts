import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
    <div class="d-flex justify-content-center">
          <nb-select [selected]="value.data.user_request_id" id="user_request_id" fullWidth (selectedChange)="value.status($event, value.data)">
            <nb-option value="">Seleccione...</nb-option>
            <nb-option selected="{{ item.id == value.data.user_request_id }}" *ngFor="let item of value.select"
              [value]="item.id"> {{ item.name }}</nb-option>
          </nb-select>
        </div>
  `,
    styleUrls: ['./prod-shipping-patient-package.component.scss'],
})
export class UserResponsibleComponent implements ViewCell {
    @Input() value: any;    // This hold the cell value
    @Input() rowData: any;  // This holds the entire row object


    public dialog;
    public auth_status: any[] = [];


    constructor(
        private dialogService: NbDialogService,
    ) {
    }
    async ngOnInit() {
    }
    ConfirmAction(dialog: TemplateRef<any>) {
        this.dialog = this.dialogService.open(dialog);
        this.GetResponseParam()
    }
    GetResponseParam() {
    }
}
