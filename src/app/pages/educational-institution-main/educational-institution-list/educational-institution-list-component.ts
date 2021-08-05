import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { InstitutionBusinessService } from '../../../business-controller/institution-business.service';

@Component({
  selector: 'ngx-educational-insitution-list',
  templateUrl: 'educational-institution-list-component.html',
  styleUrls: ['educational-institution-list-component.scss'],
})

export class EducationalInstitutionListComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  public data: any[] = [];
  public messageError: string = null;
  public dialog;

  public settings = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'string'
      },
      name: {
        title: 'Nombre',
        type: 'string'
      },
      municipality: {
        title: 'Municipio',
        type: 'string',
      }
    }
  };

  constructor(private windowService: NbWindowService, public institutionsBS: InstitutionBusinessService) { }

  ngOnInit() {
    this.data = [];
    this.institutionsBS.GetCollection().then(x => {
      this.messageError = null;
      x.forEach(element => {
        this.data.push({
          id: element.id,
          name: element.name,
          municipality: element.municipality.name
        });
      });
      this.source.load(this.data);
    }).catch(x => {
      this.messageError = x;
    });
  }

  onSelect(event, contentTemplate: TemplateRef<any>) {
    let data = [];
    this.institutionsBS.educationalInstitutions.forEach(inst => {
      if (inst.id == event.data.id) {
        data.push({
          latitude: inst.latitude,
          longitude: inst.longitude,
          label: "Nombre: " + inst.name,
        });
      }
    });
    this.dialog = this.windowService.open(contentTemplate, {
      title: event.data.name,
      context: data
    });
  }
  SeeAll(contentTemplate: TemplateRef<any>) {
    let data = [];
    this.institutionsBS.educationalInstitutions.forEach(inst => {
      data.push({
        latitude: inst.latitude,
        longitude: inst.longitude,
        label: "Nombre: " + inst.name,
      });
    });
    this.dialog = this.windowService.open(contentTemplate, {
      title: 'Instituciones Educativas',
      context: data
    });
  }


}
