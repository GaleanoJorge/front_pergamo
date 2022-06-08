import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  @Input() title: string = 'Eliminar registro';
  @Input() body: string = 'Este proceso es irreversible, ¿estas seguro?';
  @Input() name: string | null = null;
  @Input() delete: any = null;
  @Input() data: any = null;
  @Input() textConfirm = 'Eliminar';
  loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private toastrService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  DeleteAction() {
    this.loading = true;
    this.delete(this.data).then((message) => {
      this.toastrService.success('', message);
      this.close();
    }).catch((x) => {
      this.loading = false;
      // this.toastrService.danger('', message);
    });
  }
}
