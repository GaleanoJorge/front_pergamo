import { Component } from '@angular/core';

@Component({
    selector: 'ngx-report-delivery',
    templateUrl: 'delivery.component.html',
    styleUrls: ['delivery.component.scss'],
})
export class DeliveryComponent {
    routes = [
        {
            name: "Reportes de Entregas",
            route: "../../report/delivery"
        }
    ];
}
