import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-form-analysis-and-interpretation',
  templateUrl: './form-analysis-and-interpretation.component.html',
  styleUrls: ['./form-analysis-and-interpretation.component.scss']
})
export class FormAnalysisAndInterpretationComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() user_id: any = null;

  linearMode = false;
  public form: FormGroup;
  public messageError: string = null;
  public rips_typefile: any[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      observation: ['', Validators.required],
    });
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {

    }
  }

}
