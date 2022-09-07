import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { AdmissionsService } from '../../../../business-controller/admissions.service';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'ngx-supplies-view',
  templateUrl: 'supplies-view.component.html',
  styleUrls: ['supplies-view.component.scss'],
})

export class SuppliesView {

  @Input() data: any = null;
  @Input() title: any = null;
  @Input() user: any = null;
  @Input() own_user: any = null;
  @Input() admissions_id: any = null;

  public show;
  public saved: any = null;
  public currentRole;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private userS: UserBusinessService,
    private toastrService: NbToastrService,
    public AdmissionsS: AdmissionsService,
    private authService: AuthService,
  ) {

  }
  async ngOnInit() {
    var curr = this.authService.GetRole();
    this.currentRole = this.own_user.roles.find(x => {
      return x.id == curr;
    });
  }

  close() {
    this.dialogRef.close();
  }

  tablock(e) {
    // console.log(e.tabTitle);
    switch (e.tabTitle) {
      case "SUMINISTROS": {
        this.show = 1;
        break;
      }
      case "SOLICITUDES": {
        this.show = 2;
        break;
      }
      case "ACTIVOS FIJOS": {
        this.show = 3;
        break;
      }
    }
  }

}
