import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Actions2Component } from './actions.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormPadComponent } from './form-pad/form-pad.component';
import * as XLSX from 'ts-xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { CurrencyPipe } from '@angular/common';
import { date } from '@rxweb/reactive-form-validators';
import { PatientService } from '../../../business-controller/patient.service';
import { RoleBusinessService } from '../../../business-controller/role-business.service';
import { ActionsSemaphore2Component } from '../management-plan/actions-semaphore.component';

@Component({
  selector: 'ngx-pad-list',
  templateUrl: './pad-list.component.html',
  styleUrls: ['./pad-list.component.scss'],
})
export class PadListComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;
  public loading: boolean = false;
  public loading2: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'Plan de atención domiciliaria';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['Tipo de documento', 'Número de documento', 'Nombre completo', 'Email', 'Ciudad', 'Barrio', 'Dirección'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public file: File;
  public user_id;
  public user;
  public patients:any;
  public dialog;
  public currentRole;
  public selectedOptions: any[] = [];
  public result: any = null;
  public status_type = [
    { id: (0+1), color: "#28B463", name: "Cumplido" },
    { id: (1+1), color: "#54BCC1", name: "Admisión creada" },
    { id: (2+1), color: "#FF0000", name: "Sin agendar" },
    { id: (6+1), color: "#0000FF", name: "Proyección creada" },
    { id: (3+1), color: "#FFFF00", name: "Sin asignar profesional" },
    { id: (4+1), color: "#7A39BB", name: "Por subsanar" },
    { id: (5+1), color: "#FF7000", name: "Pendiente por ejecutar" },
  ];


  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      semaphore: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
          };
        },
        renderComponent: ActionsSemaphore2Component,
      },
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'management':this.patients,
            'edit': this.EditGloss.bind(this),
            'delete': this.DeleteConfirmGloss.bind(this),
            'refresh': this.RefreshData.bind(this),
            'currentRole': this.user.roles[0].role_type_id,
          };
        },
        renderComponent: Actions2Component,
      },
      identification_type: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      identification: {
        title: this.headerFields[1],
        type: 'string',
      },
      nombre_completo: {
        title: this.headerFields[2],
        type: 'string',
      },
      email: {
        title: this.headerFields[3],
        type: 'string',
      },
      residence_municipality: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      residence: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      residence_address: {
        title: this.headerFields[6],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Pad',
      route: '../list',
    },
  ];

  constructor(

    private formBuilder: FormBuilder,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private toastService: NbToastrService,
    private PatientBS: PatientService,
    private authService: AuthService,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    public roleBS: RoleBusinessService,
  ) {
  }
  public form: FormGroup;
  public ResponseGlossForm: FormGroup;
  public RadicationGlossForm: FormGroup;
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;




  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.user_id = this.user.id;
    this.currentRole = this.authService.GetRole();
    if (this.user.roles[0].role_type_id==2 ) {
      this.entity = 'patient/byPAD/2/' + this.user_id;
    }
    else {
      this.entity = "patient/byPAD/2/0";
    }


    this.form = this.formBuilder.group({
      file: [Validators.compose([Validators.required])],
    });

    this.ResponseGlossForm = this.formBuilder.group({
      response: ['', Validators.compose([Validators.required])],
      accepted_value: ['', Validators.compose([Validators.required])],
      value_not_accepted: ['', Validators.compose([Validators.required])],
      objetion_code_response_id: ['', Validators.compose([Validators.required])],
      justification_status: ['', Validators.compose([Validators.required])],
      objetion_response_id: ['', Validators.compose([Validators.required])],
      file: [Validators.compose([Validators.required])],
    });

    this.RadicationGlossForm = this.formBuilder.group({
      observation: ['', Validators.compose([Validators.required])],
      file: ['', Validators.compose([Validators.required])],
    });

    this.PatientBS.PatientByPad(this.user_id).then(x => {
      this.patients=x;
    });
  }



  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
    this.GetResponseParam();
  }



  RefreshData() {
    this.table.refresh();
  }

  NewGloss() {
    this.dialogFormService.open(FormPadComponent, {
      context: {
        title: 'Crear nueva glosa',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditGloss(data) {
    this.dialogFormService.open(FormPadComponent, {
      context: {
        title: 'Editar glosa',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }


  DeleteConfirmGloss(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteGloss.bind(this),
      },
    });
  }

  DeleteGloss(data) {
    /*  return this.glossS.Delete(data.id).then(x => {
        this.table.refresh();
        return Promise.resolve(x.message);
      }).catch(x => {
        throw x;
      });*/
  }



  async saveGroup() {
    this.isSubmitted = true;
    if (!this.ResponseGlossForm.invalid) {
      if (!this.selectedOptions.length) {
        this.dialog = this.dialog.close();
        this.toastS.danger(null, 'Debe seleccionar un registro');
      } else {
        this.loading = true;
        this.dialog.close();
        var formData = new FormData();
        formData.append('single', "0");
        formData.append('response', this.ResponseGlossForm.value.response);
        formData.append('file', this.ResponseGlossForm.value.file);
        formData.append('result', this.result);
        formData.append('gloss_id', JSON.stringify(this.selectedOptions));
        formData.append('justification_status', this.ResponseGlossForm.controls.justification_status.value);
        formData.append('objetion_response_id', this.ResponseGlossForm.controls.objetion_response_id.value);
        formData.append('objetion_code_response_id', this.ResponseGlossForm.controls.objetion_code_response_id.value);
        formData.append('accepted_value', this.ResponseGlossForm.controls.accepted_value.value);
        formData.append('value_not_accepted', this.ResponseGlossForm.controls.value_not_accepted.value);

      }
    }
  }

  async saveRadication() {
    /*this.isSubmitted = true;
    if (!this.RadicationGlossForm.invalid) {
      if (!this.selectedOptions.length) {
        this.dialog = this.dialog.close();
        this.toastS.danger(null, 'Debe seleccionar un registro');
      } else {
        this.loading = true;
        this.dialog.close();

        var formData = new FormData();
        formData.append('single', "0");
        formData.append('file', this.RadicationGlossForm.value.file);
        formData.append('gloss_response_id', JSON.stringify(this.gloss_response_id));
        formData.append('observation', this.RadicationGlossForm.value.observation);
        formData.append('gloss_id', JSON.stringify(this.gloss_id));
        formData.append('total_selected', JSON.stringify(this.selectedOptions));

        await this.GlossRadicationS.Save(formData).then(x => {
          this.toastService.success('', x.data);
          this.RefreshData();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }
    }

*/

  }


  GetResponseParam() {
    /*
    if (!this.objetion_code_response || !this.objetion_response) {
      this.objetionCodeResponseS.GetCollection().then(x => {
        this.objetion_code_response = x;
      });
      this.objetionResponseS.GetCollection().then(x => {
        this.objetion_response = x;
      });
    }*/
  }

  async saveFile(event) {
    if (event.target.files[0]) {
      this.loading2 = true;
      this.file = event.target.files[0];
      let lectura;
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        lectura = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        console.log(lectura);
        this.uploadDocumentInfo(lectura);
      }
      fileReader.readAsArrayBuffer(this.file);
    }
  }

  async uploadDocumentInfo(lectura) {
    /*try {
      let response;
      response = await this.glossS.SaveFile(lectura);
      this.loading2 = false;
      this.toastService.success('', response.message);
      this.RefreshData();
    } catch (e) {
      this.loading2 = false;
      throw new Error(e);
    }*/
  }

  ChangeGlossStatus(status) {
    this.status = status;
    if (status != 0 && this.currentRole == 5) {
      this.table.changeEntity(`gloss/byStatus/${this.status}/${this.user_id}`, 'gloss');
      // this.RefreshData();
    } else if (this.currentRole == 4 || this.currentRole == 1) {
      this.table.changeEntity(`gloss/byStatus/${this.status}/0`, 'gloss');
    } else if (status) {
      this.table.changeEntity(`gloss/byStatus/${this.status}/0`, 'gloss');
    }
    else {
      this.table.changeEntity(`gloss/byStatus/0/${this.user_id}`, 'gloss');
    }
  }

  async changeFile(files, option) {
    this.loading = true;
    if (!files) return false;
    const file = await this.toBase64(files.target.files[0]);

    switch (option) {
      case 2:
        this.ResponseGlossForm.patchValue({
          file: files.target.files[0],
        });
        this.loading = false;
        break;
      case 3:
        this.RadicationGlossForm.patchValue({
          file: files.target.files[0],
        });
        break;
    }
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  changeSemaphore($event: any) {
    this.table.changeEntity(this.entity + '?semaphore=' + $event, 'patients');
  }
}
