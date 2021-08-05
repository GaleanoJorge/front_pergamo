import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { CertificatesBusinessService } from '../../../../business-controller/certificates-business.service';
import axios from 'axios';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ngx-templates-form',
  templateUrl: './templates-form.component.html',
  styleUrls: ['./templates-form.component.scss']
})
export class TemplatesFormComponent implements OnInit {

  public selectedItem = 2;
  public messageError: string = null;
  @Input() public onlyList: boolean = false;
  public hiddenSelector:boolean = false;
  public loading = false;
  public formTemplate: FormGroup;
  public isSubmitted = false;
  public selectedFile: File;
  public elementAct : any = null;
  public selectedFile2 : any = null;
  public arrayElements : any = [];
  public export : boolean;
  public edit : any;
  public routes: any;
  public sizeCanvas: any = {width: 500, height: 400}
  public signatures: any = [];
  public papers: any = [];
  public selectBg: any = null;
  public colorInput: string = '#fff';

  public showConfig : boolean = true;
  public positionDrag : any;
  public widthPositionDrag : any = 0;
  public heigthPositionDrag : any = -300;
  public draggable: boolean = true;
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
    private toastrService: NbToastrService,
    private router: Router,
    private _route: ActivatedRoute,
    private _serviceCertificates: CertificatesBusinessService,
  ) {
    this.isSubmitted = false;
    this.edit = null;
    this.positionDrag = {"x": this.widthPositionDrag ,"y": this.heigthPositionDrag}
  }

  ngOnInit(): void {
    // observamos la url de la app
    this.getPaperFormats();
    this.getSignatures();
		this._route.url.subscribe(values => {
      if (values[2]) {
        this.edit = values[2];
        this.getElement(values[2]);
      }
    });
    this.routes = [
      {
        name: 'Plantillas',
        route: (this.edit != null) ? '../../../templates' : '../../templates',
      },
      {
        name: (this.edit != null) ? 'Editar' : 'Registrar',
        route: '',
      },
    ];
    this.formTemplate = this.formBuilder.group({
      name: ['', [Validators.required]],
      paper: ['', [Validators.required]],
      signatures: [[], [Validators.required]],
      color: ['', [Validators.required]],
      background: [null, [
        Validators.required,
        RxwebValidators.extension({extensions:["jpeg","png"]})
      ]],
    });
  }

  getElement(value) {
    this.loading = true;
    this._serviceCertificates.get('templates', value).then(
      async (response) => {
        this.formTemplate.controls['name'].setValue(response.template.name);
        this.formTemplate.controls['paper'].setValue(response.template.papers_formats_id);
        this.sizeCanvas = {
          width: response.template.papers_format.landscape == '1' ?  response.template.papers_format.width * 37.795275591 : response.template.papers_format.height * 37.795275591,
          height: response.template.papers_format.landscape == '1' ? response.template.papers_format.height * 37.795275591 : response.template.papers_format.width * 37.795275591
        }
        if(response.template.background) {
          this.selectBg = 1;
          let imgurl;
          await fetch(`${environment.storage.replace('storage/','')}${response.template.background}`).then(
            (response: any) => {
              return response.arrayBuffer();
            }
          ).then(
            (buffer: any) => {
              imgurl = 'data:image/png;base64,'+Buffer.from(buffer, 'binary').toString('base64')
            }
          )
          // await axios.get(, {
          //     responseType: 'arraybuffer'
          // }).then(imageResponse => {
          //    
          // })
          this.formTemplate.controls['background'].setValue(imgurl);
        } else {
          this.selectBg = 0;
          this.colorInput = response.template.color;
          this.formTemplate.controls['color'].setValue(response.template.color);
        }
        let idsPapers = [];
        response.template.template_has_signature.forEach(element => {
          idsPapers.push(element.signatures_id);
        });
        this.formTemplate.controls['signatures'].setValue(idsPapers);
        let objs = [];
        objs.push(
          {
            pos:0,
            element:response.template.background !== "" && response.template.background !== null ?
              'background':'backgroundColor',
            value: response.template.background !== "" && response.template.background !== null ?
            `${this._serviceCertificates.getFilePath()}${response.template.background.replace('/storage/','storage/')}` : response.template.color,
            type:response.template.background !== "" && response.template.background !== null ?
              'background':'backgroundColor',
            x:0,
            y:0
          }
        );
        for (let index = 0; index < response.template.template_has_signature.length; index++) {
          const element = response.template.template_has_signature[index];
          let image:any = await this.getImageSignature(element.signatures_id)
          if (image !== null && image !== undefined && image.signature === undefined) continue
          image = image.signature
          objs.push({
            type:'signature',
            x:element.position_x,
            y:element.position_y,
            value:`${this._serviceCertificates.getFilePath()}${image.url.replace('/storage/','storage/')}`,
            signatures_id:image.id,
            templates_id:this.edit !== null ? Number(this.edit.path) : undefined,
            element: image.name,
            pos: index + 1,
            id: this.edit ? element.id : null,
            width: this.edit && element.width !== undefined
              && element.width !== undefined ? element.width : 150,
            height: this.edit && element.width !== undefined
              && element.height !== undefined ? element.height : 150,
          })
        }
        this.updateElementsPositions(objs);
        this.loading = false;
      },
      error => {
        console.log('============== error =====================');
        console.log(error);
        console.log('====================================');
      }
    )
  }

  selectBackground(event) {
    this.selectBg = event;
  }

  changeComplete(event) {
    this.formTemplate.controls['color'].setValue(event.color.hex);
  }

  getPaperFormats() {
    this._serviceCertificates.getAll('papers').then(
      (response: any) => {
       this.papers = response.papers_formats;
      },
      error => {
        console.log('============== error =====================');
        console.log(error);
        console.log('====================================');
      }
    )
  }

  getSignatures() {
    this._serviceCertificates.getAll('signatures').then(
      (response: any) => {
       this.signatures = response.signatures;
      },
      error => {
        console.log('============== error =====================');
        console.log(error);
        console.log('====================================');
      }
    )
  }

  async getImageSignature(value) {
    try {
      let response = await this._serviceCertificates.get('signatures', value)
      return response
    } catch (error) {
      return {url:''}
    }
  }

  changeObject(val){
    this.arrayElements = val.map((element,key) => ({...element,pos:key}))
  }

  async updateFile(event) {
    var reader = new FileReader();
    reader.readAsDataURL(<File>event.target.files[0]);
    let self = this
    reader.onload = await function () {
      self.selectedFile2 = event.target.files[0];
      self.formTemplate.controls['background'].setValue(reader.result);
    };
  }

  selectElement(element) {
    this.elementAct = element
  }

  async addData() {
    this.loading = true;
    let signatures = []
    
    for (let index = 0; index < this.formTemplate.get('signatures').value.length; index++) {
      const element = this.formTemplate.get('signatures').value[index];
      let image:any = await this.getImageSignature(element)
      let signaturePosition;
      if (this.edit) {
        signaturePosition = this.arrayElements.find((elm) => elm.signatures_id === element)
      }
      if (image !== null && image !== undefined && image.signature === undefined) continue
      image = image.signature
      let imgurl;
      await fetch(`${environment.storage}${image.url.replace('/storage/','')}`).then(
        (response: any) => {
          return response.arrayBuffer();
        }
      ).then(
        (buffer: any) => {
          imgurl = 'data:image/png;base64,'+Buffer.from(buffer, 'binary').toString('base64')
        }
      )
      // await axios.get(`${environment.api_absolute}public/${image.url.replace('/storage/','storage/')}`, {
      //   responseType: 'arraybuffer'
      // }).then(response => {
      //   imgurl = 'data:image/png;base64,'+Buffer.from(response.data, 'binary').toString('base64')
      // })

      signatures.push({
        type:'signature',
        x: this.edit && signaturePosition !== undefined ? signaturePosition.x : 20,
        y: this.edit && signaturePosition !== undefined ? signaturePosition.y : 20,
        width: this.edit && signaturePosition !== undefined && signaturePosition !== null && signaturePosition.width !== undefined
          && signaturePosition.width !== undefined ? signaturePosition.width : 150,
        height: this.edit && signaturePosition !== undefined && signaturePosition !== null && signaturePosition.width !== undefined
          && signaturePosition.height !== undefined ? signaturePosition.height : 150,
        value: imgurl,
        signatures_id:image.id,
        element: image.name,
        pos: index + 1,
        id: this.edit && signaturePosition !== undefined ? signaturePosition.id : null
      })
    }

    let eleme = [
      {
        pos:0,
        element: this.formTemplate.get('background').value !== null ? 'background' : 'backgroundColor',
        value: this.formTemplate.get('background').value !== null ? this.formTemplate.get('background').value : this.formTemplate.get('color').value,
        type: this.formTemplate.get('background').value !== null ? 'background' : 'backgroundColor',
        x:0,
        y:0
      }
    ]
    let paper = this.papers.find(m => m.id === this.formTemplate.get('paper').value)
    if(paper !== null && paper !== undefined){
      this.sizeCanvas = {
        width: paper.landscape == '1' ? paper.width * 37.795275591 : paper.height * 37.795275591,
        height: paper.landscape == '1' ? paper.height * 37.795275591 : paper.width * 37.795275591,
      }
    }
    this.arrayElements = eleme.concat(signatures);

    this.loading = false;
  }

  async urltoFile(url, filename, mimeType){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
  }

  async updateUrlCanvas(url: any) {
    let fileT = await this.urltoFile(url, 'cualquiera.png', 'image/png');
    let formData: any = new FormData();
    formData.append('thumbnail', fileT);
    if (this.formTemplate.get('background').value) {
      let fileBg = await this.urltoFile(this.formTemplate.get('background').value, 'cualquiera.png', 'image/png');
      formData.append('background', fileBg);
    }
    formData.append('name', this.formTemplate.get('name').value);
    if (this.formTemplate.get('color').value != '') {
      formData.append('color', this.formTemplate.get('color').value);
    } else {
      formData.append('color', '#ffffff');
    }
    formData.append('papers_formats_id',this.formTemplate.get('paper').value);
    if (this.edit) {
      formData.append('signatures', JSON.stringify(this.arrayElements.filter(m => m.type !== 'background' && m.type !== 'backgroundColor')
      .map(m => ({
        "position_x" : m.x,
        "position_y" : m.y,
        "templates_id" : Number(this.edit.path),
        "signatures_id" : m.signatures_id,
        "position": m.pos,
        "id": m.id,
        "width": m.width !== undefined ? m.width : 150,
        "height": m.height !== undefined ? m.height : 150,
      }))));

      this._serviceCertificates.editPost('templates', formData, this.edit).then(
        (res: any) => {
            this.loading = false;
            this.toastrService.success('', 'Plantilla actualizada exitosamente');
            this.router.navigate(['/pages/certificates/templates']);
        },
        (error: any) => {
          this.loading = false;
          this.toastrService.danger('', error.message);
        }
      );
    } else {
      this._serviceCertificates.save('templates', formData).then(
        (response: any) => {
            this.loading = false;
            let template_id = response.template.id
            axios.all(this.arrayElements.filter(m => m.type !== 'background' && m.type !== 'backgroundColor')
            .map(m => axios.post(`${environment.api}template_has_signature`, {
              "position_x" : m.x,
              "position_y" : m.y,
              "templates_id" : template_id,
              "signatures_id" : m.signatures_id,
              "position": m.pos,
              "width": m.width !== undefined ? m.width : 150,
              "height": m.height !== undefined ? m.height : 150,
            })))
            this.toastrService.success('', 'Plantilla registrada exitosamente');
            this.router.navigate(['/pages/certificates/templates']);
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

  async submit() {
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
  
}
