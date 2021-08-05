import { Component, OnInit } from '@angular/core';
import { CardAdmissionsComponent } from './card-admissions.component';
import { InscriptionStatusBusinessService } from '../../../business-controller/inscription-status-business.service';
import { InscriptionStatus } from '../../../models/inscription-status';

@Component({
  selector: 'ngx-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent implements OnInit {
  public messageError = null;

  public title = 'Formadores';
  public subtitle = 'Admisiones';
  public headerFields: any[] = ['Identificación', 'Nombre', 'Especialidad', 'Municipio', 'Entidad', 'Cargo'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}, ${this.headerFields[5]}`;

  public routes = [
    {
      name: 'Admisiones Formadores',
      route: '/pages/admissions/teachers',
    },
  ];

  public inscriptionStatus: InscriptionStatus[] = [];

  public settings = {
    columns: {
      created_at: {
        title: 'Formadores',
        type: 'custom',
        sort: false,
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'inscriptionStatus': this.inscriptionStatus,
            // 'edit': this.EditSectional.bind(this),
            // 'delete': this.DeleteConfirmSectional.bind(this),
          };
        },
        renderComponent: CardAdmissionsComponent,
      },
    },
  };

  constructor(
    private inscriptionStatusBs: InscriptionStatusBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.inscriptionStatusBs.GetCollection({
      pagination: false,
    }).then(x => {
      this.inscriptionStatus = x;
    }).catch(x => {
    });
  }

}
