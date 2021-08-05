import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CertificatesBusinessService } from '../../../../business-controller/certificates-business.service';

@Component({
  selector: 'ngx-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesListComponent implements OnInit {

  routes = [
    {
      name: "Certificados",
      route: "/pages/certificates"
    }
  ];
  public messageError: string = null;
  @Input() public onlyList: boolean = false;
  public certificates:any = [];
  public dialog: any;
  public selectRecord: any;
  public loading: boolean = false;

  constructor(
    private _serviceCertificates: CertificatesBusinessService,
    private dialogService: NbDialogService
  ) {
  }

  ngOnInit(): void {
    this.getCertificates();
  }

  getCertificates() {
    this.loading = true;
    this._serviceCertificates.getAll('certificates').then(
      response => {
        this.certificates = response['certificates'].map(m => ({
          ...m,url:`${this._serviceCertificates.getFilePath()}${m.thumbnail.replace('/storage/','storage/')}`
        }))
        this.loading = false;
      },
      error => {
        console.log('============== error =====================');
        console.log(error);
        console.log('====================================');
      }
    )
  }

  dialogDeleteOpen(dialog: TemplateRef<any>, certificate: any) {
    this.selectRecord = certificate.id;
    this.dialog = this.dialogService.open(dialog)
  }

  dialogDeleteClose() {
    this.dialog.close();
  }

  deleteCertificate() {
    this.loading = true;
    this._serviceCertificates.delete('certificates', this.selectRecord).then(
      (response: any) => {
        if(response.certificate_delete) {
          this.loading = false;
          this.dialogDeleteClose();
          this.getCertificates();
        }
      },
      error => {
        this.dialogDeleteClose();
        this.loading = false;
      }
    )
  }
}
