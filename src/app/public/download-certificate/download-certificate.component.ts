import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { UserBusinessService } from '../../business-controller/user-business.service';
import { DateFormatPipe } from '../../pipe/date-format.pipe';

@Component({
    selector: 'ngx-download-certificate',
    templateUrl: './download-certificate.component.html',
    styleUrls: ['./download-certificate.component.scss'],
})
export class DownloadCertificateComponent implements OnInit {

    loading: boolean;
    search: boolean;
    messageError: string;
    users = [];
    inputItemFormControl = new FormControl();
    storage: string;

    constructor(private userBS: UserBusinessService, public datePipe: DateFormatPipe) {
    }

    ngOnInit(): void {
        this.storage = environment.storage;
    }

    Search() {
        this.users = [];
        this.loading = true;
        this.userBS.DownloadCertificate({ identification: this.inputItemFormControl.value }).then(x => {
            this.search = true;
            this.messageError = null;
            this.loading = false;
            this.users = x.data;
        }).catch(x => {
            this.search = true;
            this.messageError = "El número de cédula " + this.inputItemFormControl.value + ", no se encuentra registrado";
            this.loading = false;
        });
    }

    PathDownload(file) {
        let path = this.storage + file.replace('public/', '');
        return path;
    }

}
