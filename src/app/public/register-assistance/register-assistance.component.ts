import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { environment } from '../../../environments/environment.prod';
import { AssistanceSessionService } from '../../business-controller/assistance-session.service';
import { SessionBusinessService } from '../../business-controller/session-business.service';
import { UserBusinessService } from '../../business-controller/user-business.service';
import { DateFormatPipe } from '../../pipe/date-format.pipe';

@Component({
    selector: 'ngx-register-assistance',
    templateUrl: './register-assistance.component.html',
    styleUrls: ['./register-assistance.component.scss'],
})
export class RegisterAssistanceComponent implements OnInit {

    session_id: string;
    urg_id: string;
    messageError: string;
    data: any;
    assistance: any;

    constructor(
        private sessionBS: SessionBusinessService,
        private assistanceBS: AssistanceSessionService,
        public datePipe: DateFormatPipe,
        private route: ActivatedRoute,
        private domSanitizer: DomSanitizer,
        private toastr: NbToastrService
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                this.session_id = params['session_id'];
                this.urg_id = params['urg_id'];
                this.sessionBS.GetQRData({ session_id: this.session_id, urg_id: this.urg_id }).then(x => {
                    this.messageError = null;
                    this.assistance = {
                        session_id: this.session_id,
                        user_role_group_id: this.urg_id,
                        start_time: '',
                        closing_time: '',
                        start_time_night: '',
                        closing_time_night: '',
                    };
                    this.assistanceBS.GetByUserRoleGroup({ session_id: this.session_id, urg_id: this.urg_id }).then(y => {
                        if (y.length > 0) {
                            this.assistance.start_time = y[0].start_time ? this.datePipe.convertoToAMPM2(y[0].start_time) : '';
                            this.assistance.closing_time = y[0].closing_time ? this.datePipe.convertoToAMPM2(y[0].closing_time) : '';
                            this.assistance.start_time_night = y[0].start_time_night ? this.datePipe.convertoToAMPM2(y[0].start_time_night) : '';
                            this.assistance.closing_time_night = y[0].closing_time_night ? this.datePipe.convertoToAMPM2(y[0].closing_time_night) : '';
                        }
                    }).catch(y => {
                        this.messageError = y;
                    });
                    x.session.start_time = this.datePipe.convertoToAMPM(x.session.start_time);
                    x.session.closing_time = this.datePipe.convertoToAMPM(x.session.closing_time);
                    x.qr = this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + x.qr);
                    this.data = x;
                }).catch(x => {
                    this.messageError = x;
                });
            }
        );
    }

    Save() {
        if (this.assistance.start_time > this.assistance.closing_time || this.assistance.start_time_night > this.assistance.closing_time_night)
            this.toastr.danger('', 'Revise las horas');
        else
            this.assistanceBS.Save(this.assistance, 'public/assistanceSessionP').then(x => {
                this.toastr.success('', x.message);
            }).catch(x => {
                this.messageError = x;
            });

    }
}
