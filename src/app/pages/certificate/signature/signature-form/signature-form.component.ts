import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import axios from 'axios';
import { CertificatesBusinessService } from '../../../../business-controller/certificates-business.service';


@Component({
  selector: 'ngx-signature-form',
  templateUrl: './signature-form.component.html',
  styleUrls: ['./signature-form.component.scss']
})
export class SignatureFormComponent implements OnInit {

  public selectedItem = 2;
  public messageError: string = null;
  @Input() public onlyList: boolean = false;
  public loading = false;
  public formSignature: FormGroup;
  public isSubmitted = false;
  public selectedFile: File;
  public elementAct : any = null;
  public selectedFile2 : any;
  public arrayElements : any;
  public export : boolean;
  public edit : any;
  public routes: any;
  public sizeCanvas: any = {width: 350, height: 400}

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService,
    private router: Router,
    private _route: ActivatedRoute,
    private _serviceCertificates: CertificatesBusinessService,
  ) {
    this.isSubmitted = false;
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
        name: 'Firmas',
        route: (this.edit != null) ? '../../../signatures' : '../../signatures',
      },
      {
        name: (this.edit != null) ? 'Editar' : 'Registrar',
        route: '',
      },
    ];
    this.formSignature = this.formBuilder.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      image: [null, [
        Validators.required,
        RxwebValidators.extension({extensions:["jpeg","png"]})
      ]],
    });
  }

  getElement(value) {
    this.loading = true;
    this._serviceCertificates.get('signatures', value).then(
      response => {
        let elements = JSON.parse(response.signature.elements);
        let image64 = elements.filter(res => res.type === 'image');
        this.formSignature.controls['code'].setValue(response.signature.code);
        this.formSignature.controls['name'].setValue(response.signature.name);
        this.formSignature.controls['image'].setValue(image64[0].value);
        this.changeObject(elements)
        this.updateElementsPositions(this.arrayElements);
        this.loading = false;
      },
      error => {
        console.log('============== error =====================');
        console.log(error);
        console.log('====================================');
      }
    )
  }

  changeObject(val){
    this.arrayElements = val.map((element,key) => ({...element,pos:key}))
  }

  async updateFile(event) {
    // this.formSignature.controls['image'].setValue(<File>event.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(<File>event.target.files[0]);
    let self = this
    reader.onload = await function () {
      self.selectedFile2 = reader.result;
      self.formSignature.controls['image'].setValue(self.selectedFile2);
    };
  }

  selectElement(element) {
    this.elementAct = element
  }

  addData() {
    if (!this.edit) {
      this.loading = true;
      let eleme = [
        {
          pos:0,
          element:"firma",
          "x":85,
          "y":115,
          type:'image',
          value: this.formSignature.get('image').value
        },
        {
          pos:1,
          element: 'name',
          value: this.formSignature.get('name').value,
          type:'text',
          x:50,
          y:130
        },
        {
          pos:2,
          element: 'code',
          value: this.formSignature.get('code').value,
          type:'text',
          x:50,
          y:140
        }
      ]
      this.arrayElements = eleme;
      this.loading = false;
    }
  }

  async urltoFile(url, filename, mimeType){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
  }

  async updateUrlCanvas(url: any) {
    let file = await this.urltoFile(url, 'cualquiera.png', 'image/png');
    var formData: any = new FormData();
    formData.append('image', file);
    formData.append('name', this.formSignature.get('name').value);
    formData.append('elements', JSON.stringify(this.arrayElements));
    formData.append('code', this.formSignature.get('code').value);
    if (this.edit) {
      this._serviceCertificates.editPost('signatures', formData, this.edit).then(
        (res: any) => {
            this.loading = false;
            this.toastrService.success('', 'Firma actualizada exitosamente');
            this.router.navigate(['/pages/certificates/signatures']);
        },
        (error: any) => {
          this.loading = false;
          this.toastrService.danger('', error.message);
        }
      );
    } else {
      this._serviceCertificates.save('signatures', formData).then(
        (res: any) => {
            this.loading = false;
            this.toastrService.success('', 'Firma registrada exitosamente');
            this.router.navigate(['/pages/certificates/signatures']);
        },
        (error: any) => {
          this.loading = false;
          this.toastrService.danger('', error.message);
        }
      );
    }
  }

  updateElementsPositions(positions) {
    this.arrayElements = positions;
    this.elementAct = null
  }

  submit() {
    this.export = true;
  }

}
