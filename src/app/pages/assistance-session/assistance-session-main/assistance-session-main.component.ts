import { ChangeDetectionStrategy, Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SessionBusinessService } from '../../../business-controller/session-business.service';
import { UserRoleGroupService } from '../../../business-controller/user-role-group.service';
import { AssistanceSessionService } from '../../../business-controller/assistance-session.service';
import { Session } from '../../../models/session';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-assistance-session-main',
  templateUrl: './assistance-session-main.component.html',
  styleUrls: ['./assistance-session-main.component.scss']
})
export class AssistanceSessionMainComponent implements OnInit {

  public sessionId: number;
  public messageError: string = null;
  public session: Session;
  public users = [];
  public loading = false;

  constructor(
    private route: ActivatedRoute,
    private sessionBS: SessionBusinessService,
    private datepipe: DateFormatPipe,
    private userRoleGroup: UserRoleGroupService,
    private assistance: AssistanceSessionService,
    private toastService: NbToastrService,
    private dialogService: NbDialogService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.sessionId = +params['id'];
        this.sessionBS.GetSingle(this.sessionId).then(x => {
          if (x.length > 0) {
            this.session = x[0];
            this.session.start_time = this.datepipe.convertoToAMPM(this.session.start_time);
            this.session.closing_time = this.datepipe.convertoToAMPM(this.session.closing_time);
            this.userRoleGroup.GetByGroup(this.session.group_id).then(x => {
              x.forEach(element => {
                this.users.push({
                  Id: element.id,
                  Nombres: element.user_role.user.firstname + ' ' + element.user_role.user.lastname,
                  Correo: element.user_role.user.email,
                  Ingreso: element.assistance_session.find(x => x.session_id == this.sessionId) ? this.datepipe.convertoToAMPM2(element.assistance_session.find(x => x.session_id == this.sessionId).start_time) : '',
                  Salida: element.assistance_session.find(x => x.session_id == this.sessionId) ? this.datepipe.convertoToAMPM2(element.assistance_session.find(x => x.session_id == this.sessionId).closing_time) : '',
                  IngresoN: element.assistance_session.find(x => x.session_id == this.sessionId) ? this.datepipe.convertoToAMPM2(element.assistance_session.find(x => x.session_id == this.sessionId).start_time_night) : '',
                  SalidaN: element.assistance_session.find(x => x.session_id == this.sessionId) ? this.datepipe.convertoToAMPM2(element.assistance_session.find(x => x.session_id == this.sessionId).closing_time_night) : '',
                  Status: true,
                  Qr: false,
                  QrLink: null,
                  QrURL: null
                });
              });
            }).catch(x => {
              this.messageError = x;
            });
          } else
            this.messageError = "No existe la sesión.";
        }).catch(x => {
          this.messageError = x;
        });
      }
    );
  }

  Save() {
    let validation = 0;
    this.users.forEach(element => {
      element.Status = (element.Ingreso < element.Salida || element.IngresoN < element.SalidaN);
      validation += element.Status ? 1 : 0;
    });
    if (validation > 0) {
      this.toastService.info('', 'Guardando asistencias...');
      let cont = 0;
      for (let i = 0; i < this.users.length; i++) {
        let item = this.users[i];
        if (item.Ingreso < item.Salida || item.IngresoN < item.SalidaN) {
          this.assistance.Save({
            session_id: this.sessionId,
            user_role_group_id: item.Id,
            start_time: item.Ingreso ? item.Ingreso + ':00' : null,
            closing_time: item.Salida ? item.Salida + ':00' : null,
            start_time_night: item.IngresoN ? item.IngresoN + ':00' : null,
            closing_time_night: item.SalidaN ? item.SalidaN + ':00' : null
          }).then(x => {
            cont++;
            if (validation == cont)
              this.toastService.success('', 'Asistencias almacenadas');
          }).catch(x => {
            this.toastService.danger('', x);
          });
        }
      }
    } else {
      this.toastService.danger('', 'No hay asistencias para registrar');
    }
  }

  AllQR(check) {
    this.users.forEach(element => { element.Qr = check; });
  }

  SingleQR(check, user) {
    this.users.find(x => x.Id === user.Id).Qr = check;
  }

  SaveQR() {
    let validation = 0;
    let cont = 0;
    this.users.forEach(element => {
      validation += element.Qr ? 1 : 0;
    });
    if (validation > 0) {
      this.loading = true;
      this.users.forEach((element, index) => {
        if (element.Qr)
          this.sessionBS.CreateQR({
            session_id: this.sessionId,
            urg_id: element.Id
          }).then(x => {
            cont++;
            this.users.find(user => user.Id === x.urg_id).QrLink = 'data:image/png;base64, ' + x.qr;
            this.users.find(user => user.Id === x.urg_id).QrURL = x.urlQR;
            this.users.find(user => user.Id === x.urg_id).Qr = false;
            this.loading = (index + 1) == validation ? false : true;
          }).catch(x => {
            this.toastService.danger('', x);
          });
      });
    } else {
      this.toastService.danger('', 'Seleccione un registro');
    }
  }

  open(dialog: TemplateRef<any>, user) {
    var base64Image = this.domSanitizer.bypassSecurityTrustUrl(user.QrLink);
    this.dialogService.open(dialog, { context: { Nombres: user.Nombres, QrLink: base64Image, QrURL: user.QrURL } });
  }

}
