import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { InstitutionBusinessService } from '../../../business-controller/institution-business.service';

@Component({
  selector: 'ngx-educational-institution-list',
  templateUrl: './educational-institution-list.component.html',
  styleUrls: ['./educational-institution-list.component.scss']
})
export class EducationalInstitutionListComponent implements OnInit {

  routes = [];
  public idParent: number;
  public messageError: string = null;

  constructor(
    private route: ActivatedRoute,
    public institutionBS: InstitutionBusinessService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.idParent = +params['idParent'];
        this.SaveRoutes();
        this.institutionBS.GetInstitutionByParent(this.idParent).then(x => {
          this.messageError = null;
        }).catch(x => {
          this.messageError = x;
        });
      }
    );
  }

  SaveRoutes() {
    this.routes = [
      {
        name: "Dashboard",
        route: "../../../dashboard"
      },
      {
        name: "Instituciones",
        route: "../../institutions/" + this.idParent
      },
    ];
  }

}
