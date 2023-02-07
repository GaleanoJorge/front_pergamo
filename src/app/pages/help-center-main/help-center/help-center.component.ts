import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'ngx-help-center',
    templateUrl: 'help-center.component.html',
    styleUrls: ['help-center.component.scss'],
    
})
export class HelpCenterComponent {
    changeimg: boolean;

    constructor(
        private router: Router,
        private location: Location,        
    ) { 
        this.changeimg = false;
    }

    routes = [
        {
            name: "help-center",
            route: "../../help-center"
        }
    ];

    public mainhelpcenter = '';

    ngOnInit() {

        if (this.router.url == "/pages/help-center/assistencial") {
            this.mainhelpcenter = "ASSISTENCIAL";

        } else if (this.router.url == "/pages/help-center/quality") {
            this.mainhelpcenter = "QUALITY";

        } else if (this.router.url == "/pages/help-center/statistic") {
            this.mainhelpcenter = "STATISTIC";

        } else if (this.router.url == "/pages/help-center/finance") {
            this.mainhelpcenter = "FINANCE";

        } else if (this.router.url == "/pages/help-center/logistic") {
            this.mainhelpcenter = "LOGISTIC";

        } else if (this.router.url == "/pages/help-center/sysmaintenance") {
            this.mainhelpcenter = "SYSMAINTENANCE";

        } else if (this.router.url == "/pages/help-center/helpdesk") {
            this.mainhelpcenter = "HELPDESK";

        } else if (this.router.url == "/pages/help-center/talent") {
            this.mainhelpcenter = "TALENT";
        }
    }

    goToAssistencial() {
        this.router.navigateByUrl("/pages/help-center/assistencial");
    }
    goToQuality() {
        this.router.navigateByUrl("/pages/help-center/quality");
    }
    goToStatistic() {
        this.router.navigateByUrl("/pages/help-center/statistic");
    }
    goToFinance() {
        this.router.navigateByUrl("/pages/help-center/finance");
    }
    goToLogistic() {
        this.router.navigateByUrl("/pages/help-center/logistic");
    }
    goToSysMaintenance() {
        this.router.navigateByUrl("/pages/help-center/sysmaintenance");
    }
    goToHelpDesk() {
        this.router.navigateByUrl("/pages/help-center/helpdesk");
    }
    goToTalent() {
        this.router.navigateByUrl("/pages/help-center/talent");
    }
    back() {
        this.location.back();
    }
}
