import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { OxigenAdministrationWayService } from '../../../../../../business-controller/oxigen-administration-way.service';
import { OxigenControlService } from '../../../../../../business-controller/oxigen-control.service';
import { ServicesBriefcaseService } from '../../../../../../business-controller/services-briefcase.service';


@Component({
  selector: 'ngx-form-oxigen-control',
  templateUrl: './form-oxigen-control.component.html',
  styleUrls: ['./form-oxigen-control.component.scss']
})
export class FormOxigenControlComponent implements OnInit {

  @Input() title: string;
  @Input() record_id: any = null;
  @Input() type_record_id;
  @Input() pharmacy_product_request;
  @Input() admissions;
  @Output() messageEvent = new EventEmitter<any>();

  linearMode = false;
  public form: FormGroup;
  public rips_typefile: any[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public briefcase_oxigen: any = null;
  public briefcase_oxigen_id: any = null;
  public botton_title: string = 'Guardar';
  public prov_weight: number = 0;
  public prov_size: number = 0;
  public loading: boolean = false;
  public calculate: boolean = false;
  public messageError = null;
  public oxigen_administration_way: any = null;
  public duration_hours = [
    { id: 0, name: 0 },
    { id: 1, name: 1 },
    { id: 2, name: 2 },
    { id: 3, name: 3 },
    { id: 4, name: 4 },
    { id: 5, name: 5 },
    { id: 6, name: 6 },
    { id: 7, name: 7 },
    { id: 8, name: 8 },
    { id: 9, name: 9 },
    { id: 10, name: 10 },
    { id: 11, name: 11 },
    { id: 12, name: 12 },
  ];
  public duration_minutes = [
    { id: 0, name: 0 },
    { id: 5, name: 5 },
    { id: 10, name: 10 },
    { id: 15, name: 15 },
    { id: 20, name: 20 },
    { id: 25, name: 25 },
    { id: 30, name: 30 },
    { id: 35, name: 35 },
    { id: 40, name: 40 },
    { id: 45, name: 45 },
    { id: 50, name: 50 },
    { id: 55, name: 55 },
  ];
  public oxigen_flow = [
    { id: 0, name: 0 },
    { id: 0.25, name: 0.25 },
    { id: 0.5, name: 0.5 },
    { id: 1, name: 1 },
    { id: 2, name: 2 },
    { id: 3, name: 3 },
    { id: 4, name: 4 },
    { id: 5, name: 5 },
    { id: 6, name: 6 },
    { id: 7, name: 7 },
    { id: 8, name: 8 },
    { id: 9, name: 9 },
    { id: 10, name: 10 },
    { id: 11, name: 11 },
    { id: 12, name: 12 },
    { id: 13, name: 13 },
    { id: 14, name: 14 },
    { id: 15, name: 15 },
    { id: 20, name: 20 },
    { id: 25, name: 25 },
    { id: 30, name: 30 },
    { id: 35, name: 35 },
    { id: 40, name: 40 },
    { id: 45, name: 45 },
    { id: 50, name: 50 },
    { id: 55, name: 55 },
    { id: 60, name: 60 },
  ];


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private OxigenControlS: OxigenControlService,
    private toastService: NbToastrService,
    private OxigenAdministrationWayS: OxigenAdministrationWayService,
    private servicesBriefcaseS: ServicesBriefcaseService,
  ) {
  }

  ngOnInit(): void {

    this.servicesBriefcaseS.GetByBriefcase({ type: '2', is_oxigen: true }, this.admissions.briefcase_id).then(x => {
      if (x.length > 0) {
        this.briefcase_oxigen = x;
      }
    });

    this.form = this.formBuilder.group({
      briefcase_oxigen_id: ['', Validators.required],
      oxigen_flow: ['', Validators.required],
      duration_hours: ['', Validators.required],
      duration_minutes: ['', Validators.required],
      oxigen_administration_way_id: ['', Validators.required],
    });

    this.OxigenAdministrationWayS.GetCollection().then(x => {
      this.oxigen_administration_way = x;
    });


  }

  saveCode(e): void {
    if (this.briefcase_oxigen) {
      var localidentify = this.briefcase_oxigen.find((item) => item.name == e);

      if (localidentify) {
        this.briefcase_oxigen_id = localidentify.id;
      } else {
        this.briefcase_oxigen_id = null;
        this.toastService.warning(
          '',
          'Debe seleccionar un diagnostico de la lista'
        );
        this.form.controls.briefcase_oxigen_id.setErrors({ incorrect: true });
        
      }
    } else {
      this.briefcase_oxigen_id = null;
      this.toastService.warning(
        '',
        'Debe seleccionar un diagnostico de la lista'
      );
      this.form.controls.briefcase_oxigen_id.setErrors({ incorrect: true });
      
    }
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.messageError = null;

      this.OxigenControlS.Save({
        ch_record_id: this.record_id,
        type_record_id: this.type_record_id,
        oxigen_flow: this.form.controls.oxigen_flow.value,
        duration_minutes: this.form.controls.duration_minutes.value + (60 * this.form.controls.duration_hours.value),
        oxigen_administration_way_id: this.form.controls.oxigen_administration_way_id.value,
        admissions_id: this.admissions.id,
        ch_interconsultation_id: this.route.snapshot.params.id2,
        services_briefcase_id: this.briefcase_oxigen_id,
        product_com_id: this.pharmacy_product_request.at(-1).pharmacy_request_shipping.pharmacy_lot_stock.billing_stock.product_id,
        pharmacy_product_request_id: this.pharmacy_product_request.at(-1).id,
      }).then(x => {
        this.messageEvent.emit(true);
        this.saved = x;
        this.loading = false;
        this.toastService.success('Registro guardado correctamente', 'Correcto');
      }).catch(x => {
        this.loading = false;
        this.toastService.danger(x, 'Error');
      });

    }
  }

}
