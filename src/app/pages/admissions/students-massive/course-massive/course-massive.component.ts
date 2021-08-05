import {Component, OnInit,Input,TemplateRef,ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {CourseBusinessService} from '../../../../business-controller/course-business.service';
import {InscriptionStatus} from '../../../../models/inscription-status';
import {InscriptionStatusBusinessService} from '../../../../business-controller/inscription-status-business.service';
import {GroupBusinessService} from '../../../../business-controller/group-business.service';
import {InscriptionBusinessServices} from '../../../../business-controller/inscription-business.services';
import {Group} from '../../../../models/group';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CheckboxUser } from './checkbox-user.js';
import { InscriptionStatusAdmissionsComponent } from './inscription-status-admissions.component.js';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { Course } from '../../../../models/course';
import { numeric } from '@rxweb/reactive-form-validators';
import { multicast } from 'rxjs/operators';

@Component({
  selector: 'ngx-course-massive',
  templateUrl: './course-massive.component.html',
  styleUrls: ['./course-massive.component.scss'],
})
export class CourseMassiveComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public messageError = null;
  

  public InscriptionForm: FormGroup;
  public title = 'Inscritos en ';
  public subtitle = 'Admisiones discentes programa: ';
  public headerFields: any[] =  ['Código','Nombres', 'Identificación',  'Correo','Grupo', 'Estado'];
  public routes = [];
  public row;
  public course;
  public selectedOptions: any[] = [];
  public data= [];
  public dialog; 
  public inscriptionstatus = 0;
  public selectedRows: any;
  public inscriptionId;

  public inscriptionStatus: InscriptionStatus[] = [];
  public groups: Group[] = [];

  public settings = {  
    selectMode: 'multi',
    columns: {
     /* check :{
        sort: false,
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'dataUserRole': this.dataUserRole.bind(this),
          };
        },
        renderComponent: CheckboxUser,
      },     */
      id: {
        title: this.headerFields[0],
        width: '5%',
      },
      nombre_completo: {
        title: this.headerFields[1],
        type: 'string',
      },
      identification: {
        title: this.headerFields[2],
        type: 'string',
      },
      email: {
        title: this.headerFields[3],
        type: 'string',
      },
      group: {
        title: this.headerFields[4],
        type: 'string',
      },
      inscriptionstatus: {
        title: this.headerFields[5],
        sort: false,
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
          };
        },
        renderComponent: InscriptionStatusAdmissionsComponent,
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseBS: CourseBusinessService,
    private inscriptionStatusBs: InscriptionStatusBusinessService,
    private groupBs: GroupBusinessService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private inscriptionBs: InscriptionBusinessServices,
    private toastS: NbToastrService,
  ) {
  }

  GetParams() {
    return {
      course_id: this.route.snapshot.params.course_id,
    };
  }

  ngOnInit(): void {
    this.InscriptionForm = this.formBuilder.group({
      group: ['', Validators.compose([Validators.required])],
      inscriptionStat: ['', Validators.compose([Validators.required])],
  });
    this.courseBS.GetById(this.route.snapshot.params.course_id).then(x => {
      this.course = x;

      this.routes = [
        {
          name: 'Admisiones Masivas de discentes',
          route: '/pages/admissions/students-massive',
        },
        {
          name: this.course.coursebase.name,
          route: this.router.url,
        },
      ];

      this.title += this.course.coursebase.name;

      this.subtitle += this.course.coursebase.category.name;
    });
    this.inscriptionStatusBs.GetCollection({
      pagination: false,
    }).then(x => {
      this.inscriptionStatus = x;
    }).catch(x => {
    });

    this.groupBs.GetCollection({
      pagination: false,
      course_id: this.route.snapshot.params.course_id,
    }).then(x => {
      this.groups = x;
    });
    
  }
  GetDataSelect(select: any[]) {
    this.selectedOptions=[];
    select.forEach(element => {
      var role_id=element;
      var role_filter = role_id.courses.filter(course => course.pivot.course_id==this.route.snapshot.params.course_id);
      role_filter.user_role_group_id= role_id.user_role_group_id;
      role_filter.email=role_id.email;
      role_filter.name=role_id.nombre_completo;
      this.selectedOptions.push(role_filter);
    });
  }

  ChangeInscriptionStat(inscriptionstatus) {
    this.inscriptionstatus = inscriptionstatus;
    this.table.changeEntity(`inscriptionsByCourse/${this.inscriptionstatus}`);
    // this.RefreshData();
}
  RefreshData() {
    this.table.refresh();
    this.selectedOptions=[];
  }
  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
    this.selectedOptions.forEach(element => {
      this.inscriptionId= element[0].pivot.inscription_status_id
    });
  }
/*  dataUserRole($event,data){
    if($event==true && !this.selectedOptions.includes(data)){
      var role_id=data;
      var role_filter = role_id.courses.filter(course => course.pivot.course_id==this.route.snapshot.params.course_id);
      role_filter.user_role_group_id= role_id.user_role_group_id;
      role_filter.email=role_id.email;
      role_filter.name=role_id.nombre_completo;
      this.selectedOptions.push(role_filter);
    }else{
      var i = this.selectedOptions.indexOf( data );
      this.selectedOptions.splice( i, 1 );
    }
  }*/
  saveGroup() {
    var contador=0;
    var err=0;
    if (!this.selectedOptions.length) {
      this.dialog = this.dialog.close();
      this.toastS.danger(null, 'Debe seleccionar al menos un usuario');
    } else if(!this.InscriptionForm.controls.inscriptionStat.value){
      this.toastS.danger(null, 'Debe seleccionar un Estado');
    }else if(!this.InscriptionForm.controls.group.value && this.InscriptionForm.controls.inscriptionStat.value==1){
      this.toastS.danger(null, 'Debe seleccionar un Grupo');
    }
    else{
      this.dialog = this.dialog.close();
      this.selectedOptions.forEach(element => {
      element[0].pivot.inscription_status_id =  this.InscriptionForm.controls.inscriptionStat.value;
      element[0].pivot.group_id = this.InscriptionForm.controls.group.value;
      element[0].pivot.user_role_group_id = element.user_role_group_id;
      element[0].pivot.email=element.email;
      element[0].pivot.name=element.name;
      this.inscriptionBs.QualifyStudent(element[0].pivot).then(x => {
        element.user_role_group_id = x.data.inscription.user_role_group_id;
        element[0].pivot.user_role_group_id = x.data.inscription.user_role_group_id; 
      }).catch(x => {
        err++;
      });
      contador++;
    });
    if(contador > 0){
      this.toastS.success(null, 'Se actualizaron ' + contador + ' elemetos'); 
    }else if(err > 0){
      this.toastS.danger(null, 'No se actualizaron ' + contador + ' elemetos');
    }
    this.RefreshData();
    this.selectedOptions=[];
  } 
  }
}
