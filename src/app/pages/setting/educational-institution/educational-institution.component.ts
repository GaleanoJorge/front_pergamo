import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InstitutionBusinessService } from '../../../business-controller/institution-business.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { EducationalInstitution } from '../../../models/educational-institution';

@Component({
  selector: 'ngx-educational-institution',
  templateUrl: './educational-institution.component.html',
  styleUrls: ['./educational-institution.component.scss']
})
export class EducationalInstitutionComponent implements OnInit {

  public instForm: FormGroup;
  public isSubmitted = false;
  public messageError: string = null;
  public inst: EducationalInstitution;
  public dialog;
  routes = [
    {
      name: "Instituciones",
      route: "../../setting/institutions"
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    public institutionsBS: InstitutionBusinessService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {
    this.instForm = this.formBuilder.group({
      municipality: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
    this.institutionsBS.GetCountries().then(x => {
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
    this.GetInstitutions();
  }

  Cancel() {
    this.inst = null;
    this.instForm.setValue({ name: '', municipality: '' });
  }

  GetInstitutions() {
    this.isSubmitted = false;
    this.Cancel();
    this.institutionsBS.GetCollection().then(x => {
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
  }

  ConfirmDelete(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }

  DeleteInst() {
    this.dialog.close();
    if (this.inst)
      this.institutionsBS.Delete(this.inst.id).then(x => {
        this.toastrService.success("", x.message);
        this.GetInstitutions();
      }).catch(x => {
        this.messageError = x;
      });
  }

  saveInst() {
    this.isSubmitted = true;
    if (!this.instForm.invalid)
      if (this.inst)
        this.institutionsBS.Update({
          id: this.inst.id,
          nombre: this.instForm.controls.name.value,
          municipio: this.instForm.controls.municipality.value
        }).then(x => {
          this.toastrService.success("", x.message);
          this.GetInstitutions();
        }).catch(x => {
          this.messageError = x;
        });
      else
        this.institutionsBS.Save({
          nombre: this.instForm.controls.name.value,
          municipio: this.instForm.controls.municipality.value
        }).then(x => {
          this.toastrService.success("", x.message);
          this.GetInstitutions();
        }).catch(x => {
          this.messageError = x;
        });
  }

  onCountrySelected(event) {
    this.institutionsBS.GetRegionByCountry(event).then(x => {
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
  }

  onRegionSelected(event) {
    this.institutionsBS.GetMunicipalityByRegion(event).then(x => {
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
  }

  EditInst(inst: EducationalInstitution) {
    this.inst = inst;
    this.institutionsBS.municipalities.push(inst.municipality);
    this.instForm.setValue({ name: inst.name, municipality: inst.municipality_id });
  }

}
