import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CifDiagnosisTlService } from '../../../../business-controller/cif-diagnosis-tl.service';

@Component({
  selector: 'ngx-form-language-evolution',
  templateUrl: './form-language-evolution.component.html',
  styleUrls: ['./form-language-evolution.component.scss'],
})
export class FormLanguageEvolutionComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() record_id: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;

  public admissions_id;
  public check1;
  public cifdiagnosistl: any[];
  public saveEntry: any = 0;
  

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private CifDiagnosisTlS: CifDiagnosisTlService,


  ) {}

  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id;

    if (!this.data) {
      this.data = { 
        text:'',
      };
    }
    await this.CifDiagnosisTlS.GetCollection({ch_record_id: this.record_id,}).then((x) => {
      this.cifdiagnosistl = x;
    });

    this.form = this.formBuilder.group({
    
      //Diagnostico Cif
      text: [this.data[0] ? this.data[0].text : this.data],

    
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid && this.saveEntry) {
      this.loading = true;
      if (this.data.id) { }
      await this.CifDiagnosisTlS.Update({});
      
    }
  }
}
