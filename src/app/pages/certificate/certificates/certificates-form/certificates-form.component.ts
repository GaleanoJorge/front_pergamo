import { AfterViewInit, Component, ElementRef, OnInit, ViewChild,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CertificatesBusinessService } from '../../../../business-controller/certificates-business.service';
import axios from 'axios';
import { NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ngx-certificates-form',
  templateUrl: './certificates-form.component.html',
  styleUrls: ['./certificates-form.component.scss']
})
export class CertificatesFormComponent implements OnInit, AfterViewInit {
  public onlyList: boolean = false;
  public loading = false;
  public isSubmitted = false;
  public hiddenSelector:boolean = false;
  public edit : any;
  public messageError: string = null;
  public formCertificate: FormGroup;
  public selectedItem: string = '0';
  public routes: any
  public templates:any = []
  public templateSelected:any = null
  public arrayElements : any = [];
  public sizeCanvas:any = {height:200,width:400}
  public elementAct : any = null;
  public variableList : any = [];
  public valueDefault : any = null;
  public selectedFile : any = null;
  public export : boolean;
  public showConfig : boolean = true;
  public positionDrag : any;
  public widthPositionDrag : any = 0;
  public heigthPositionDrag : any = -300;
  public draggable: boolean = true;
  @Input() data: any = null;
  @ViewChild('myBounds') dragLayout: ElementRef;

  public listShow: boolean = true;
  public showForm: boolean = false;


  inBounds = true;
  edge = {
    top: true,
    bottom: true,
    left: true,
    right: true
  };

  constructor(
    private formBuilder: FormBuilder,
    private _serviceCertificates: CertificatesBusinessService,
    private toastrService: NbToastrService,
    private router: Router,
    private _route: ActivatedRoute,
  ) {
    this.isSubmitted = false;
    this.edit = null;
    this.positionDrag = {"x": this.widthPositionDrag ,"y": this.heigthPositionDrag}
   }

  updateElementsPositions(positions) {
    this.arrayElements = positions;
    this.elementAct = null
  }

  async getIma(url) {
    let dame;
    await fetch(`${environment.storage.replace('storage/','')}${url}`).then(
      (response: any) => {
        return response.arrayBuffer();
      }
    ).then(
      (buffer: any) => {
        dame = 'data:image/png;base64,'+Buffer.from(buffer, 'binary').toString('base64');
      }
    )

    // await axios.get(`${environment.storage}${url}`, {
    //   responseType: 'arraybuffer'
    // }).then(response => dame = 'data:image/png;base64,'+Buffer.from(response.data, 'binary').toString('base64'))
    return dame
  }

  async addData(){
    if (!this.edit) {
      this.templateSelected = this.templates.find(m => m.id === this.formCertificate.get('template').value)
      this.sizeCanvas = {
        width: this.templateSelected.papers_format.landscape == '1' ?  this.templateSelected.papers_format.width * 37.795275591 : this.templateSelected.papers_format.height * 37.795275591,
        height: this.templateSelected.papers_format.landscape == '1' ? this.templateSelected.papers_format.height * 37.795275591 : this.templateSelected.papers_format.width * 37.795275591
      }
      this.heigthPositionDrag = (this.templateSelected.papers_format.height * 37.795275591) * -1;
      this.positionDrag = {"x":this.widthPositionDrag ,"y": this.heigthPositionDrag};
      let signatures: any[] = await Promise.all(this.templateSelected.template_has_signature.map(async (m): Promise<any> => {
        let img = await this.getIma(m.signatures.url.replace('/storage/','storage/'));
        return {
          id:m.id,
          x:m.position_x,
          y:m.position_y,
          pos:m.position,
          value: img,
          type:'signature',
          element:m.signatures.name,
          width: m.width ? m.width : 150,
          height: m.height ? m.height : 150,
        };
      }));

      let imgbg;
      if (this.templateSelected.background !== "") {
        await fetch(`${environment.storage.replace('storage/','')}${this.templateSelected.background}`).then(
          (response: any) => {
            return response.arrayBuffer();
          }
        ).then(
          (buffer: any) => {
            imgbg = 'data:image/png;base64,'+Buffer.from(buffer, 'binary').toString('base64');
          }
        )
        // await axios.get(`${environment.storage}${this.templateSelected.background.replace('/storage/','storage/')}`, {
        //   responseType: 'arraybuffer'
        // }).then(response => {
        //   imgbg = 'data:image/png;base64,'+Buffer.from(response.data, 'binary').toString('base64')
        // })
      }

      let arrayele = [{
        pos:0,
        element:this.templateSelected.background !== "" && this.templateSelected.background !== null ?
          'background':'backgroundColor',
        value: this.templateSelected.background !== "" && this.templateSelected.background !== null ?
        imgbg : this.templateSelected.color,
        type:this.templateSelected.background !== "" && this.templateSelected.background !== null ?
          'background':'backgroundColor',
        x:0,
        y:0
      }]
      arrayele = arrayele.concat(signatures).map((m,key) => ({...m,pos:key}))
      this.arrayElements = arrayele
    }
  }

  changeValueDefault(val):void {
    this.valueDefault = val
  }

  async updateFile(event) {
    var reader = new FileReader();
    reader.readAsDataURL(<File>event.target.files[0]);
    let self = this
    reader.onload = await function () {
      self.selectedFile = reader.result;
    };
  }

  addElement():void {
    let newElement = {}
    switch(this.selectedItem) {
      case '1':
        this.valueDefault = this.selectedFile;
        newElement = {
          pos: this.arrayElements.length,
          element: 'image',
          value: this.valueDefault,
          type: 'image',
          x:40,
          y:40,
          width: 150,
          height: 150,
        }
      break;
      case '2':
        newElement = {
          pos: this.arrayElements.length,
          element: this.valueDefault.toUpperCase(),
          value: this.valueDefault.toUpperCase(),
          type:'text',
          x:40,
          y:40,
          size: 24,
          color: '#000000',
          bold: true,
          centerAlign:false,
          font: 'sans-serif'
        }
      break;
      case '3':
        newElement = {
          pos: this.arrayElements.length,
          element: this.valueDefault,
          value: this.valueDefault,
          type:'variable',
          x:40,
          y:40,
          size: 24,
          color: '#000000',
          bold: true,
          centerAlign:false,
          font: 'sans-serif'
        }
      break;
      default:
        return
    }
    this.arrayElements = this.arrayElements.concat([newElement])
    this.valueDefault = null
    this.listShow = true;
    this.showForm = false;
    this.selectedItem = '0';
  }

  ngAfterViewInit() {
    let resto = 50 / 100 * this.dragLayout.nativeElement.offsetWidth;
    this.widthPositionDrag = (this.dragLayout.nativeElement.offsetWidth - resto);
  }

  ngOnInit():void {
    console.log(this.data);
    this._route.url.subscribe(values => {
      if (values[1]) {
        this.edit = values[1];
        this.getElement(values[1]);
      }
    });
    this.formCertificate = this.formBuilder.group({
      name: ['', [Validators.required]],
      elements: [''],
      template: ['', [Validators.required]],
      thumbnail: [''],
    });
    this.getTemplates()
    this.routes = [
      {
        name: 'Certificados',
        route: (this.edit != null) ? '../../../certificates' : '../../certificates',
      },
      {
        name: (this.edit != null) ? 'Editar' : 'Registrar',
        route: '',
      },
    ];
    this.variableList = [
      {
        id:"<NOMBREESTUDIANTE>",
        label: "Nombre estudiante"
      },
      {
        id:"<IDENTIFICADOR>",
        label: "Identificador del estudiante"
      },
      {
        id:"<NOMBRECURSO>",
        label: "Nombre Curso"
      },
    ]
  }

  getElement(value) {
    this.loading = true;
    this._serviceCertificates.get('certificates', value).then(
      async (response) => {
        this.templateSelected = this.templates.find(m => m.id === this.formCertificate.get('template').value)
        this.formCertificate.controls['name'].setValue(response.certificate.name);
        this.sizeCanvas = {
          width: response.certificate.templates.papers_format.landscape == '1' ? response.certificate.templates.papers_format.width * 37.795275591 : response.certificate.templates.papers_format.height * 37.795275591,
          height: response.certificate.templates.papers_format.landscape == '1' ? response.certificate.templates.papers_format.height * 37.795275591 : response.certificate.templates.papers_format.width * 37.795275591,
        }
        this.formCertificate.controls['template'].setValue(response.certificate.templates_id);
        this.formCertificate.controls['elements'].setValue(response.certificate.elements);
        let obj = [];
        JSON.parse(response.certificate.elements).forEach(element => {
          obj.push(element);
        });
        this.updateElementsPositions(obj);
      },
      error => {
        console.log('============== error =====================');
        console.log(error);
        console.log('====================================');
      }
    )
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
    formData.append('thumbnail', file);
    formData.append('elements', JSON.stringify(this.arrayElements));
    formData.append('templates_id',this.formCertificate.get('template').value);
    formData.append('name',this.formCertificate.get('name').value);
    if (this.edit) {
      this._serviceCertificates.editPost('certificates', formData, this.edit).then(
        (res: any) => {
            this.loading = false;
            this.toastrService.success('', 'Certificado actualizado exitosamente');
            this.router.navigate(['/pages/certificates']);
        },
        (error: any) => {
          this.loading = false;
          this.toastrService.danger('', error.message);
        }
      );
    } else {
      this._serviceCertificates.save('certificates', formData).then(
        (response: any) => {
            this.loading = false;
            this.toastrService.success('', 'Certificado registrado exitosamente');
            this.router.navigate(['/pages/certificates']);
        },
        (error: any) => {
          this.loading = false;
          this.toastrService.danger('', error.message);
        }
      );
    }
  }

  getTemplates() {
    this.loading = true;
    this._serviceCertificates.getAll('templates').then(
      response => {
        this.templates = response['templates'];
        this.loading = false;
      },
      error => {
        console.log('============== error =====================');
        console.log(error);
        console.log('====================================');
      }
    )
  }

  selectElement(element) {
    this.elementAct = element
  }

  showOptionsElement(value) {
    this.selectedItem = value;
    this.valueDefault = null
  }

  submit() {
    this.export = true;
  }

  checkEdge(event) {
    this.edge = event;
  }

  showCong() {
    this.positionDrag = {"x": this.widthPositionDrag ,"y": this.heigthPositionDrag }
    this.showConfig = !this.showConfig;
  }

  activeDrag() {
    this.draggable = true;
  }

  desactiveDrag() {
    this.draggable = false;
  }

  submitInfo() {
    if (!this.formCertificate.controls.name.invalid || !this.formCertificate.controls.template.invalid) {
      this.addData()
    }
  }
}
