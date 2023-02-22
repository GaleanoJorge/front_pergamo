import { Component, OnInit, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChRespiratoryTherapyService } from '../../../../business-controller/ch_respiratory_therapy.service';
import { ChPhysicalExamService } from '../../../../business-controller/ch_physical_exam.service';
import { ChVitalSignsService } from '../../../../business-controller/ch-vital-signs.service';
import { ChDiagnosisService } from '../../../../business-controller/ch-diagnosis.service';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-regular-respiratory-therapy',
  templateUrl: './regular-respiratory-therapy.component.html',
  styleUrls: ['./regular-respiratory-therapy.component.scss'],
})
export class RegularRespiratoryTherapyComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Input() user: any = null;
  @Input() admissions: any = null;
  @Input() type_record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  //@Input() vital: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user_id;
  public chrespiratoryconsultation: any[];
  public physical: any[];
  public chvitsigns: any[];
  public chdiagnosis: any[];
  public nameForm: String;
  public movieForm: String;


  public record_id;
  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;
  public show1 = false;
  public show2 = false;
  public show3 = false;
  public show4 = false;
  public show5 = false;
  public show6 = false;
  public show7 = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private chrespiratoryconsultS: ChRespiratoryTherapyService,
    private chphysicalS: ChPhysicalExamService,
    private chvitalSignsS: ChVitalSignsService,
    private chdiagnosisS: ChDiagnosisService,
    public userChangeS: UserChangeService,


  ) {

  }

  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id;
    if (!this.data) {
      this.data = {
        ch_diagnosis_id: '',
      };
    }

    this.form = this.formBuilder.group({

    });
  }
  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid && this.saveEntry) {
      this.loading = true;
      if (this.data.id) { }
      await this.chrespiratoryconsultS.Update({});
      await this.chvitalSignsS.Update({});
    }
  }
  receiveMessage($event) {
    if ($event == true) {
      this.messageEvent.emit($event);
    }
  }

  filterStepper($event) {
    return $event.target.textContent;
  }


  goto($event) {
    let selectedStep = this.filterStepper($event);
    if (selectedStep == '2' || selectedStep == 'Antecedentes') {
      this.show1 = true;
    } else if (selectedStep == '3' || selectedStep == 'Signos Vitales') {
      this.show2 = true;
    } else if (selectedStep == '4' || selectedStep == 'Destete de oxigeno') {
      this.show3 = true;
    } else if (selectedStep == '5' || selectedStep == 'Pedido de insumos') {
      this.show4 = true;
    } else if (selectedStep == '6' || selectedStep == 'Sesiones') {
      this.show5 = true;
    } else if (selectedStep == '7' || selectedStep == 'Intervención') {
      this.show6 = true;
    } else if (selectedStep == '8' || selectedStep == 'Recomendaciones') {
      this.show7 = true;
    }
  }
}

