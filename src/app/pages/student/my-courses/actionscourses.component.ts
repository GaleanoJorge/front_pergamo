import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';

@Component({
  template: `
    <div class="d-flex justify-content-center" *ngIf="value.data.status=='Admitido'">
      <button nbButton *ngIf="value.data.group_id!=null && value.data.entity_type_id!=3">
        <a routerLink="../mysession/{{value.data.group_id}}"><nb-icon icon="grid-outline"></nb-icon> </a>        
      </button>      
      <a nbButton *ngIf="value.data.entity_type_id==3 && value.data.status=='Admitido'" [href]="path" target="_blank" status="warning" size="tiny">
        Ir al Curso       
      </a>      
    </div>
  `,
})
export class ActionsComponentCourses implements ViewCell, OnInit {

  public path: string;
  public data: any;

  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.value.data.entity_type_id == 3) {
      let user = this.authService.GetUser();
      this.data = {
        username: user.username,
        id: user.id,
        firstname: user.firstname,
        middlefirstname: user.middlefirstname,
        lastname: user.lastname,
        middlelastname: user.middlelastname,
        email: user.email,
        pais: "Colombia",
        Estado: "",
        Ciudad: "",
        idcurso: this.value.data.course_id,
        idgrupo: this.value.data.group_id,
        role_id: this.authService.GetRole()
      };
      this.path = environment.url_lms + btoa(JSON.stringify(this.data));
    }
  }
}
