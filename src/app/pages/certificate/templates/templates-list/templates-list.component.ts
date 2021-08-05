import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { CertificatesBusinessService } from '../../../../business-controller/certificates-business.service';

@Component({
  selector: 'ngx-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit {

  public source: LocalDataSource = new LocalDataSource();
  public data: any[] = [];
  public messageError: string = null;
  public dialog: any;
  public selectRecord: any;
  public loading: boolean = false;

  constructor(
    private dialogService: NbDialogService,
    private _serviceCertificates: CertificatesBusinessService,
  ) {
    this.data = [];
   }

  ngOnInit(): void {
    this.getTemplates();
  }

  getTemplates() {
    this.loading = true;
    this._serviceCertificates.getAll('templates').then(
      response => {
        this.data = response['templates'].map(m => ({
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

  dialogDeleteOpen(dialog: TemplateRef<any>, template: any) {
    this.selectRecord = template.id;
    this.dialog = this.dialogService.open(dialog)
  }
  
  dialogDeleteClose() {
    this.dialog.close();
  }

  deleteTemplates() {
    this.loading = true;
    this._serviceCertificates.delete('templates', this.selectRecord).then(
      (response: any) => {
        if(response.template_delete) {
          this.dialogDeleteClose();
          this.getTemplates();
          this.loading = false;
        }
      },
      error => {
        this.dialogDeleteClose();
        this.loading = false;
      }
    )
  }

}
