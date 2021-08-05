import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BudgetContractsBussinesService} from '../../../../business-controller/budget-contracts-bussines.service';

@Component({
  selector: 'ngx-edit-contratcs',
  templateUrl: './edit-contratcs.component.html',
  styleUrls: ['./edit-contratcs.component.scss'],
})
export class EditContratcsComponent implements OnInit {
  public loading = true;
  public title = 'Editar contrato';
  public data = null;

  public routes = [
    {
      name: 'Contratos',
      route: '/pages/budget/contracts',
    },
    {
      name: 'Editar',
      route: this.router.url,
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contractBS: BudgetContractsBussinesService,
  ) {
  }

  ngOnInit(): void {
    this.contractBS.GetOne(this.route.snapshot.params.id).then(x => {
      this.data = x;
      this.loading = false;
    });
  }

}
