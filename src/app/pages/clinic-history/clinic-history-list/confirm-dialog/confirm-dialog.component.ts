import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import { Location } from '@angular/common';


@Component({
  selector: 'ngx-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogCHComponent implements OnInit {
  @Input() title: string = 'Eliminar registro';
  @Input() body: string = 'Este proceso es irreversible, ¿estas seguro?';
  @Input() name: string | null = null;
  @Input() delete: any = null;
  @Input() admission: any = null;
  @Input() changeImage;
  @Input() data: any = null;
  @Input() redo: any = null;
  @Input() textConfirm = 'Eliminar';
  @Input() signature: boolean = false;
  // @Input() save: any = null;
  @Input() showImage: any = null;
  @Input() firm_file: any = null;
  loading: boolean = false;

  public signatureImage: string;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private toastrService: NbToastrService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  // async changeImage2(files, option) {
  //   if (!files.length) return false;

  //   const file = await this.toBase64(files[0]);

  //   switch (option) {
  //     case 1:
  //       this.firm_file= files[0];
  //       break;
  //   }
  // }

  // toBase64 = file => new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => resolve(reader.result);
  //   reader.onerror = error => reject(error);
  // })


  DeleteAction() {
    this.loading = true;
    this.delete(this.firm_file).then((message) => {
      if(message!=false){
        // this.location.back();
      this.close();

      }else{
        this.loading = false;
      }
  
    }).catch((x) => {
      this.loading = false;
      // this.toastrService.danger('', message);
    });
  
  }
}
