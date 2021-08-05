import {Component, Input, OnInit} from '@angular/core';
import {BudgetContractsBussinesService} from '../../../../business-controller/budget-contracts-bussines.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-contracts-events',
  templateUrl: './contracts-events.component.html',
  styleUrls: ['./contracts-events.component.scss'],
})
export class ContractsEventsComponent implements OnInit {
  @Input() contract_id = null;
  title = 'Listado de eventos relacionados';
  event = null;

  events = [];

  constructor(
    private contractBS: BudgetContractsBussinesService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.contractBS.GetEvents(this.contract_id).then(events => {
      this.events = events;
    });
  }

  changeEvent(event) {
    this.events.push({
      id: event.id,
      label: `COD: ${event.id} ${event.name} ${event.city}`,
    });
  }

  async Save() {
    try {
      const events = this.events.map(event => event.id);

      const response = await this.contractBS.SaveEvents(this.contract_id, {events});

      this.toastService.success('', response.message);
      this.refreshData();
    } catch (e) {
      // this.messageError = e;
    }
  }
}
