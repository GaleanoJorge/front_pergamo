import { Component } from '@angular/core';

@Component({
    selector: 'ngx-general',
    templateUrl: 'general.component.html',
    styleUrls: ['general.component.scss'],
})
export class GeneralComponent {
    routes = [
        {
            name: "Reportes Generales",
            route: "../../report/general"
        }
    ];
}
