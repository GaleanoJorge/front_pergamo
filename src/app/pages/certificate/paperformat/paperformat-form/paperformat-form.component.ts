import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CertificatesBusinessService } from '../../../../business-controller/certificates-business.service';

@Component({
  selector: 'ngx-paperformat-form',
  templateUrl: './paperformat-form.component.html',
  styleUrls: ['./paperformat-form.component.scss']
})
export class PaperformatFormComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public formPaperFormats: FormGroup;
  public title: string = 'Formatos de Papel';
  public data = [];
  public loading = false;
  public edit : any;
  public routes : any;

  constructor(
    private formBuilder: FormBuilder,
    private _serviceCertificates: CertificatesBusinessService,
    private toastrService: NbToastrService,
    private router: Router,
    private _route: ActivatedRoute,
  ) { 
    this.edit = null;
  }

  ngOnInit(): void {
     // observamos la url de la app
		this._route.url.subscribe(values => {
      if (values[2]) {
        this.edit = values[2];
        this.getElement(values[2]);
      }
    });
    this.routes = [
      {
        name: 'Formatos de papel',
        route: (this.edit != null) ? '../../../paperformat' : '../../paperformat',
      },
      {
        name: (this.edit != null) ? 'Editar' : 'Registrar',
        route: '',
      },
    ];
    this.formPaperFormats = this.formBuilder.group({
      name: ['', [Validators.required]],
      height: ['', [Validators.required]],
      width: ['', [ Validators.required]],
      margin_top: ['', [Validators.required]],
      margin_bottom: ['', [Validators.required]],
      margin_left: ['', [Validators.required]],
      margin_rigth: ['', [Validators.required]],
      landscape: ['', [Validators.required]]
    });
  }

  getElement(value) {
    this.loading = true;
    this._serviceCertificates.get('papers', value).then(
      response => {
        this.formPaperFormats.controls['height'].setValue(response.papersFormat.height);
        this.formPaperFormats.controls['margin_bottom'].setValue(response.papersFormat.margin_bottom);
        this.formPaperFormats.controls['margin_left'].setValue(response.papersFormat.margin_left);
        this.formPaperFormats.controls['margin_rigth'].setValue(response.papersFormat.margin_rigth);
        this.formPaperFormats.controls['margin_top'].setValue(response.papersFormat.margin_top);
        this.formPaperFormats.controls['name'].setValue(response.papersFormat.name);
        this.formPaperFormats.controls['width'].setValue(response.papersFormat.width);
        this.formPaperFormats.controls['landscape'].setValue(response.papersFormat.landscape.toString());
        this.loading = false;
      },
      error => {
        this.toastrService.danger('Ocurrio un error', error.error.message)
      }
    )
  }

  submit() {
    this.loading = true;
    this.isSubmitted = true;
    if (this.edit) {
      this._serviceCertificates.edit('papers', this.formPaperFormats.value, this.edit.path).then(
        response => {
          this.loading = false;
          this.toastrService.success('', 'Formato actualizado exitosamente');
          this.router.navigate(['/pages/certificates/paperformat']);
        },
        error => {
          this.toastrService.danger('Ocurrio un error', error.error.message)
        }
      )
    } else {
      this._serviceCertificates.save('papers', this.formPaperFormats.value).then(
        response => {
          this.loading = false;
          this.toastrService.success('', 'Formato registrado exitosamente');
          this.router.navigate(['/pages/certificates/paperformat']);
        },
        error => {
          this.toastrService.danger('Ocurrio un error', error.error.message)
        }
      )
    }
    
  }

}
