import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService, NbWindowService, NbWindowRef } from '@nebular/theme';
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
  @Input() briefcase_id: any = null;
  @Input() admissions_id: any = null;
  @Input() selectedOptions: any = null;


  public isSubmitted = false;
  public loading: boolean = false;
  public dialog;
  public showdiv: boolean = null;
  public parentData: any;

  public form: FormGroup;
  // public status: Status[];
  public saved: any = null;

  public package_id: any = null;
  public service_briefcase_id: any = null;
  public packages: any[] = [];
  public element;

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
        package_id: '',
        quantity: '',
      };
      // this.parentData.entity
      this.parentData.entity = 'authorization/auth_byAdmission/' + this.admissions_id;
      this.parentData.customData = 'authorization'
    } else {
      this.parentData.entity = 'authorization/auth_byAdmission/' + this.admissions_id;
      this.parentData.customData = 'authorization'
    }

    this.form = this.formBuilder.group({
      package_id: [
        this.data.package_id,
        Validators.compose([Validators.required])
      ],
      quantity: [
        this.data.quantity,
        Validators.compose([Validators.required])
      ],
    });

    await this.serviceBriefcaseS.GetPackageByBriecase(this.briefcase_id).then(x => {
      this.packages = x;
    });

    this.onChange();
  }


  close(t?) {
    if (!t) {
      this.saved()
    }
    this.element = document.getElementsByTagName("nb-windows-container");
    if(this.element.length > 0)
    {
      this.element[0].remove();
    }
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;
    if (!this.selectedOptions.length) {
      this.toastService.danger(null, 'Debe seleccionar al menos un Menú');
    } else {
      if (!this.form.invalid) {
        if (this.form.controls.quantity.value < 1) {
          this.toastService.danger(null, 'El tiempo de facturación debe ser mayoro  igual a 1');
        } else {
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
              this.saved();
            }).catch(x => {
              this.isSubmitted = false;
              this.loading = false;
            });
  
          } else {
            this.authPackageS.Save({
              admissions_id: this.admissions_id,
              quantity: this.form.controls.quantity.value,
              services_briefcase_id: this.service_briefcase_id,
              auth_array: JSON.stringify(this.selectedOptions.map(item => item.id)),
            }).then(x => {
              this.toastService.success('', x.message);
              if(this.dialog){
                this.dialog.close();
                this.dialog = null;
              }
              this.close();
              this.saved();
            }).catch(x => {
              this.isSubmitted = false;
              this.loading = false;
            });
          }
        }

      }
    }
  }

  onChange() {
    this.form.get('package_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.package_id = null;
        this.service_briefcase_id = null;
      } else {
        this.package_id = this.packages.find(item => item.manual_price_id == val);
        this.service_briefcase_id = this.package_id.id;
      }
    });
  }

  // GetBriefcase(contract_id) {
  //   if (!contract_id || contract_id === '') return Promise.resolve(false);
  //   return this.BriefcaseS.GetBriefcaseByContract(contract_id).then(x => {
  //     this.briefcase = x;

  //     return Promise.resolve(true);
  //   });
  // }

  // GetPackages(briefcase_id) {
  //   if (!briefcase_id || briefcase_id === '') return Promise.resolve(false);
  //   return this.serviceBriefcaseS.GetPackageByBriecase(briefcase_id).then(x => {
  //     this.packages = x;

  //     return Promise.resolve(true);
  //   });
  // }

  openInfo() {
    this.dialog = this.windowService.open(ProcedurePackage2Component, {
      title: 'Información de paquetes', hasBackdrop: false, closeOnEsc: false, 
      context: {
        procedure_package_id: this.package_id.manual_price_id,
      }
    });
  }

  // GetPatients(briefcase_id) {
  //   if (!briefcase_id || briefcase_id === '') return Promise.resolve(false);
  //   return this.admissionsS.GetByBriefcase(briefcase_id).then(x => {
  //     this.patients = x;
  //   });
  // }

  // saveCode(e): void {
  //   var localidentify = this.patients.find(item => item.nombre_completo == e);

  //   if (localidentify) {
  //     this.admissions_id = localidentify.id;
  //     this.parentData.entity = 'authorization/auth_byAdmission/' + this.admissions_id;
  //   } else {
  //     this.admissions_id = null;
  //     this.toastService.warning('', 'Debe seleccionar un paciente de la lista');
  //     this.form.controls.admissions_id.setErrors({ 'incorrect': true });
  //   }
  // }

  // receiveMessage($event) {
  //   this.selectedOptions = $event;
  // }
}
