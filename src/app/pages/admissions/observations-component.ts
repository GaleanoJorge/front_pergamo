import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {InscriptionBusinessServices} from '../../business-controller/inscription-business.services';

@Component({
  template: `
    <nb-card class='m-0' style="width: 360px">
      <nb-card-header>
        Agregar una observación
      </nb-card-header>
      <nb-card-body>
        <div class="row">
          <div class="col-12">
            <textarea nbInput fullWidth placeholder="Agrega tu observación aqui" [(ngModel)]="observation"
                      rows="4">{{ observation }}</textarea>
          </div>
        </div>
      </nb-card-body>

      <nb-card-footer class="d-flex justify-content-end">
        <button nbButton (click)="close()">Cancelar</button>
        <button nbButton class="ml-1" status="success" (click)="Save()" [nbSpinner]="loading" [disabled]="loading">
          Guardar
        </button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class ObservationsComponent implements OnInit {
  @Input() data: any;
  @Input() user = 'teacher';

  public observation: string = null;
  public loading: boolean = false;

  constructor(
    private dialogRef: NbDialogRef<any>,
    private inscriptionBS: InscriptionBusinessServices,
    private toastS: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.observation = this.data.observation;
    }
  }

  close() {
    this.dialogRef.close();
  }

  async Save() {
    this.data.observation = this.observation;
    this.loading = true;
    try {
      let success;
      if (this.user === 'teacher') {
        success = await this.inscriptionBS.QualifyTeacher(this.data);
      } else {
        success = await this.inscriptionBS.QualifyStudent(this.data);
      }
      this.dialogRef.close();
      this.toastS.success(null, success.message);
    } catch (x) {
      this.toastS.danger(null, x.message);
    }
    this.loading = false;

  }
}
