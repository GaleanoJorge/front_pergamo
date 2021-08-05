import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EntityType} from '../../../../models/entity-type';
import {Specialtym} from '../../../../models/specialtym';
import {CategoryN} from '../../../../models/CategoryN';
import {Origin} from '../../../../models/origin';
import {NbDialogRef, NbDialogService, NbToastrService} from '@nebular/theme';
import {EntityTypeService} from '../../../../business-controller/entity-type.service';
import {SpecialtymService} from '../../../../business-controller/specialtym.service';
import {NewCategoryService} from '../../../../business-controller/new-category.service';
import {ModuleBusinessService} from '../../../../business-controller/module-business.service';

@Component({
  selector: 'ngx-form-module',
  templateUrl: './form-module.component.html',
  styleUrls: ['./form-module.component.scss'],
})
export class FormModuleComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() category_id: number = null;
  @Input() title2: string;
  @Input() data2: any = null;
  @Input() moduleEdit: boolean;

  public form: FormGroup;
  public description: string;
  public entidades: EntityType[];
  public specialtyms: Specialtym[];
  public categories: CategoryN[];
  public origins: Origin[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public messageError: string = null;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private entityS: EntityTypeService,
    private specialtymS: SpecialtymService,
    private categoryS: NewCategoryService,
    private moduleS: ModuleBusinessService,
    private toastService: NbToastrService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        entity_type_id: '',
        description: '',
        specialtym_id: '',
        category_id: '',
      };
    }

    this.entityS.GetCollection().then(x => {
      this.entidades = x;
    });

    const params: any = {};

    if (!this.data.id) {
      params.status_id = 1;
    }

    this.specialtymS.GetCollection(params).then(x => {
      this.specialtyms = x;
    });
    this.categoryS.GetCollection().then(x => {
      this.categories = x;
    });


    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      entity_type_id: [this.data.entity_type_id, Validators.compose([Validators.required])],
      specialtym_id: [this.data.specialtym_id, Validators.compose([Validators.required])],
      // category_id: [this.data.category_id, Validators.compose([Validators.required])],
      description: [this.data.description, Validators.compose([Validators.required])],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.isSubmitted = true;

    this.loading = true;
    if (this.data.id) {
      this.moduleS.Update({
        id: this.data.id,
        name: this.form.controls.name.value,
        description: this.form.controls.description.value,
        entity_type_id: this.form.controls.entity_type_id.value,
        specialtym_id: this.form.controls.specialtym_id.value,
        category_id: this.category_id,
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

      this.moduleS.Save({

        name: this.form.controls.name.value,
        description: this.form.controls.description.value,
        entity_type_id: this.form.controls.entity_type_id.value,
        specialtym_id: this.form.controls.specialtym_id.value,
        category_id: this.category_id,
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
