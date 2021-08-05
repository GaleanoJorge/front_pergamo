import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { CertificatesBusinessService } from '../../../../business-controller/certificates-business.service';

@Component({
  selector: 'ngx-signature-list',
  templateUrl: './signature-list.component.html',
  styleUrls: ['./signature-list.component.scss']
})
export class SignatureListComponent implements OnInit {
  
  routes = [
    {
      name: "Firmas",
      route: "../../setting/signatures"
    }
  ];
  public messageError: string = null;
  @Input() public onlyList: boolean = false;
  public signatures:any = [];
  public dialog: any;
  public selectRecord: any;
  public loading: boolean = false;

  constructor(
    private _serviceCertificates: CertificatesBusinessService,
    private dialogService: NbDialogService
  ) {
  }

  ngOnInit(): void {
    this.getSignatures();
  }
  
  getSignatures() {
    this.loading = true;
    this._serviceCertificates.getAll('signatures').then(
      response => {
        this.signatures = response['signatures'].map(m => ({
          ...m,url:`${this._serviceCertificates.getFilePath()}${m.url.replace('/storage/','storage/')}`
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

  dialogDeleteOpen(dialog: TemplateRef<any>, signature: any) {
    this.selectRecord = signature.id;
    this.dialog = this.dialogService.open(dialog)
  }
  
  dialogDeleteClose() {
    this.dialog.close();
  }

  deleteSignature() {
    this.loading = true;
    this._serviceCertificates.delete('signatures', this.selectRecord).then(
      (response: any) => {
        if(response.signature_delete) {
          this.loading = false;
          this.dialogDeleteClose();
          this.getSignatures();
        }
      },
      error => {
        this.dialogDeleteClose();
        this.loading = false;
      }
    )
  }


}
