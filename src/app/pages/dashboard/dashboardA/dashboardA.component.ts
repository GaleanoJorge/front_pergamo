import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { ReportBusinessService } from '../../../business-controller/report-business.service';

@Component({
    selector: 'ngx-dashboardA',
    templateUrl: 'dashboardA.component.html',
    styleUrls: ['dashboardA.component.scss'],
})
export class DashboardAComponent {

    constructor(private reporteBS: ReportBusinessService) { }

    routes = [
        {
            name: "Dashboard",
            route: "../../dashboard"
        }
    ];
    public messageError: string = null;
    public columns: string[] = [];
    public data: any[] = [];
    public show: boolean;
    public dataGraphic: any[] = [];

    ngOnInit() {
        this.dataGraphic.push({
            type: 'pie',
            title: 'Total de Grupos (120)',
            description: 'Número de grupos esperados',
            labels: ["20 Actuales", "100 Faltantes"],
            series: [
                { name: "20 Actuales", value: 20 },
                { name: "100 Faltantes", value: 100 }
            ]
        });
        this.dataGraphic.push({
            type: 'pie',
            title: 'Total de Formadores (120)',
            description: 'Número de formadores esperados',
            labels: ["100 Actuales", "20 Faltantes"],
            series: [
                { name: "100 Actuales", value: 100 },
                { name: "20 Faltantes", value: 20 }
            ]
        });
        this.dataGraphic.push({
            type: 'pie',
            title: 'Total de Discentes (3.000)',
            description: 'Número de discentes esperados',
            labels: ["1.000 Actuales", "2.000 Faltantes"],
            series: [
                { name: "1.000 Actuales", value: 1000 },
                { name: "2.000 Faltantes", value: 2000 }
            ]
        });
        this.dataGraphic.push({
            type: 'pie',
            title: 'Discentes por Género (1.000)',
            description: 'Número de discentes por género',
            labels: ["351 Hombres", "649 Mujeres"],
            series: [
                { name: "351 Hombres", value: 351 },
                { name: "649 Mujeres", value: 649 }
            ]
        });
    }
}
