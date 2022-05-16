import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService, NbWindowService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../../../business-controller/authorization.service';
import { Contract } from '../../../../../models/contract';
import { ContractService } from '../../../../../business-controller/contract.service';
import { BriefcaseService } from '../../../../../business-controller/briefcase.service';
import { ServicesBriefcaseService } from '../../../../../business-controller/services-briefcase.service';
import { ProcedurePackage2Component } from '../../../../setting/manual/procedure-massive/procedure-package2/procedure-package2.component';
import { AdmissionsService } from '../../../../../business-controller/admissions.service';
import { AuthPackageService } from '../../../../../business-controller/auth-package.service';



@Component({
  selector: 'ngx-auth-package',
  templateUrl: './auth-package.component.html',
  styleUrls: ['./auth-package.component.scss']
})
export class AuthPackageComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() eps_id: any = null;


  public isSubmitted = false;
  public loading: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['Tipo de documento', 'Número de documento', 'Nombre completo', 'Email', 'Ciudad', 'Barrio', 'Dirección', 'Consecutivo de ingreso', 'ambito', 'Programa', 'Sede', 'Estado', 'Procedimiento', 'Número de autorización', 'Cantidad autorizada'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public arrayBuffer: any;
  public user;
  public dialog;
  public currentRole;
  public selectedOptions: any[] = [];
  public showdiv: boolean = null;
  public parentData: any;

  public form: FormGroup;
  // public status: Status[];
  public saved: any = null;

  public package_id: any = null;
  public contracts: any[] = [];
  public briefcase: any[] = [];
  public packages: any[] = [];
  public patients: any[] = [];
  public admissions_id: any = null;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private authorizationS: AuthorizationService,
    private authPackageS: AuthPackageService,
    private admissionsS: AdmissionsService,
    private ContractS: ContractService,
    private BriefcaseS: BriefcaseService,
    private serviceBriefcaseS: ServicesBriefcaseService,
    // private packageS: pac
    private windowService: NbWindowService,
    private dialogService: NbDialogService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.parentData = {
      selectedOptions: [],
      entity: '',
      customData: '',
    };
    if (!this.data) {
      this.data = {
        contract_id: '',
        briefcase_id: '',
        package_id: '',
        auth_number: '',
        admissions_id: '',
      };
      // this.parentData.entity
      this.parentData.entity = 'authorization/auth_byAdmission/' + this.admissions_id;
      this.parentData.customData = 'authorization'
    } else {
      this.parentData.entity = 'authorization/auth_byAdmission/' + this.admissions_id;
      this.parentData.customData = 'authorization'
    }

    this.form = this.formBuilder.group({
      contract_id: [
        this.data.contract_id
      ],
      briefcase_id: [
        this.data.briefcase_id
      ],
      package_id: [
        this.data.package_id
      ],
      admissions_id: [
        this.data.patient_id
      ]
    });

    await this.ContractS.GetByCompany({ id: this.eps_id }).then(x => {
      this.contracts = x;
    });
    this.onChange();
  }


  close() {
    this.saved()
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;
    if (!this.selectedOptions.length) {
      this.toastService.danger(null, 'Debe seleccionar al menos un Menú');
    } else {
      if (!this.form.invalid) {
        this.loading = true;
        if (this.data.id) {
          this.authPackageS.Update({
            id: this.data.id,
            auth_number: this.form.controls.auth_number.value ? this.form.controls.auth_number.value : null,
            authorized_amount: this.form.controls.authorized_amount.value ? this.form.controls.authorized_amount.value : null,
            observation: this.form.controls.observation.value ? this.form.controls.observation.value : null,
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            if (this.saved) {
              this.saved();
            }
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });
  
        } else {
          this.authPackageS.Save({
          admissions_id: this.admissions_id,
          services_briefcase_id: this.package_id,
          briefcase_id: this.form.controls.briefcase_id.value,
          auth_array: JSON.stringify(this.selectedOptions),
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            if (this.saved) {
              this.saved();
            }
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });
        }
  
      }
    }
  }

  onChange() {

    this.form.get('contract_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.briefcase = [];
      } else {
        this.GetBriefcase(val).then();
      }
      this.form.patchValue({
        briefcase_id: '',
      });
    });

    this.form.get('briefcase_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.packages = [];
        this.patients = [];
      } else {
        this.GetPackages(val).then();
        this.GetPatients(val);
      }
      this.form.patchValue({
        package_id: '',
      });
    });

    this.form.get('package_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.package_id = null;
      } else {
        // this.packagesS
        this.package_id = val;
        // this.GetPackages(val).then();
      }
    });
  }

  GetBriefcase(contract_id) {
    if (!contract_id || contract_id === '') return Promise.resolve(false);
    return this.BriefcaseS.GetBriefcaseByContract(contract_id).then(x => {
      this.briefcase = x;

      return Promise.resolve(true);
    });
  }

  GetPackages(briefcase_id) {
    if (!briefcase_id || briefcase_id === '') return Promise.resolve(false);
    return this.serviceBriefcaseS.GetPackageByBriecase(briefcase_id).then(x => {
      this.packages = x;

      return Promise.resolve(true);
    });
  }

  openInfo() {

    this.dialog = this.windowService.open(ProcedurePackage2Component, {
      context: {
        procedure_package_id: this.package_id,
      }
    });

  }

  GetPatients(briefcase_id) {
    if (!briefcase_id || briefcase_id === '') return Promise.resolve(false);
    return this.admissionsS.GetByBriefcase(briefcase_id).then(x => {
      this.patients = x;
    });
  }

  saveCode(e): void {
    var localidentify = this.patients.find(item => item.nombre_completo == e);

    if (localidentify) {
      this.admissions_id = localidentify.id;
      this.parentData.entity = 'authorization/auth_byAdmission/' + this.admissions_id;
    } else {
      this.admissions_id = null;
      this.toastService.warning('', 'Debe seleccionar un paciente de la lista');
      this.form.controls.admissions_id.setErrors({ 'incorrect': true });
    }
  }

  receiveMessage($event) {
    this.selectedOptions = $event;
  }
}
