import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import {NbToastrService} from '@nebular/theme';
import { CertificatesBusinessService } from '../../../../business-controller/certificates-business.service';
import { InscriptionBusinessServices } from '../../../../business-controller/inscription-business.services';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { ActionsCertificateComponent } from './actions-certificate.component';
import { SelectCerfiticateComponent } from './select-certificate.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ngx-generate-list',
  templateUrl: './generate-list.component.html',
  styleUrls: ['./generate-list.component.scss']
})
export class GenerateListComponent implements OnInit {

  public messageError: string = null;
  public loading: boolean = false;
  public course: any;
  public data: any[] = [];
  public selections: any[] = [];
  public routes = [];

  public settings = {
    selectMode: 'multi',
    columns: {
     /* select: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'valid': (row.certificate) ? false : true,
            'selection': (event, row: any) => this.eventSelections(event, row),
          };
        },
        renderComponent: SelectCerfiticateComponent,
      },*/
      name: {
        title: 'Nombre',
        type: 'string',
      },
      code: {
        title: 'Identificación',
        type: 'string',
      },
      email: {
        title: 'Correo',
        type: 'string',
      },
      actions: {
        title: 'Opciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'endpoint': environment.storage,
            'namefile': row.name + '_certificate.pdf'.replace(' ', '_'),
            'valid': (row.certificate) ? true : false,
          };
        },
        renderComponent: ActionsCertificateComponent,
      },
    },
  };

  constructor(
    private _route: ActivatedRoute,
    private _inscriptionBusinessServices: InscriptionBusinessServices,
    private _certificatesBusinessService: CertificatesBusinessService,
    private toastS: NbToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._route.url.subscribe(values => {
      if (values[1]) {
        this.course = values[1].path;
      }
    });
    this.getInscriptions()

    this.routes = [
      {
        name: 'Cursos',
        route: '/pages/course/list',
      },
      {
        name:'Certificados',
        route: this.router.url,
      },
    ];
  }

  getInscriptions() {
    console.log(this.data);
    this.loading = true;
    this._inscriptionBusinessServices.GetAllInscriptionsBy(this.course).then(
      (response: any) => {
        let copia = [];
        response.data.forEach(element => {
          let certificate = null;
          if (element.user_certificates.lenght != 0) {
            element.user_certificates.forEach(elem => {
              certificate = elem.user_role_course_id == element.id ? elem.url_certificate : '';
            });
          }
          copia.push({
            id: element.id,
            code: element.user_role.user.identification,
            name: `${element.user_role.user.firstname} ${element.user_role.user.lastname}`,
            email: element.user_role.user.email,
            certificate: (certificate) ? certificate.replace('public/', '') : null,
            course: element.course_id,
          });

        });
        this.data = copia;
        this.loading = false;
      });
  }

  GetDataSelect(select: any[]) {
    this.selections=[];
    select.forEach(element => {
      this.selections.push(element.id);
    });
    console.log(this.selections);
  }
  eventSelections(event, row) {
    if (event) {
      this.selections.push(row.id);
    } else {
      let i = this.selections.indexOf(row.id);
      i !== -1 && this.selections.splice(i, 1);
    }
  }

  generateCertificate() {
    this.loading = true;
    let json = {
      selections_ids: this.selections,
      employee_id: 1
    }
    this._certificatesBusinessService.generateCertificates(json).then(
      x => {
        this.getInscriptions()
        // console.log(response);
      }
    ).catch(x => {
      this.getInscriptions()
    });
  }

}
