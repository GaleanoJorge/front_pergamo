import { Component, Input, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { RoleBusinessService } from '../../../../business-controller/role-business.service';

@Component({
  selector: 'ngx-form-confirm-disabled',
  templateUrl: './form-confirm-disabled.component.html',
  styleUrls: ['./form-confirm-disabled.component.scss'],
})
export class FormConfirmDisabledComponent implements OnInit {

  @Input() data;
  @Input() desable;


  public routes = [];
  public loading: boolean = false;

  public title;
  public textConfirm;
  public body: string = '¿Estas seguro de realizar esta acción?';
  public routeBack;



  constructor(
    protected dialogRef: NbDialogRef<any>,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private roleS: RoleBusinessService) {
  }

  ngOnInit(): void {
    if (this.data.status_id == 1) {
      this.textConfirm = 'Desactivar';
      this.title = `DESACTIVAR USUARIO DE ${this.data.nombre_completo}`;
    } else {
      this.textConfirm = 'Activar';
      this.title = `ACTIVAR USUARIO DE ${this.data.nombre_completo}`;
    }
  }

  close() {
    this.dialogRef.close();
  }

  DeleteAction() {
    this.loading = true;
    this.close();
    this.desable(this.data)
  }
}
