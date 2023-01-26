import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'ngx-help-center',
    templateUrl: 'help-center.component.html',
    styleUrls: ['help-center.component.scss'],
})
export class HelpCenterComponent {

    constructor(
        private router: Router,
        private location: Location,
    ) { }

    routes = [
        {
            name: "help-center",
            route: "../../help-center"
        }
    ];

    public mainhelpcenter = '';

    ngOnInit() {

        if(this.router.url == "/pages/help-center/administrative"){
            this.mainhelpcenter = "ADMINISTRATIVE";

        }else if(this.router.url == "/pages/help-center/assistencial"){
            this.mainhelpcenter = "ASSISTENCIAL";

        }else if(this.router.url == "/pages/help-center/dashboard2"){
            this.mainhelpcenter = "DASHBOARD2";

        }else if(this.router.url == "/pages/help-center/finance"){
            this.mainhelpcenter = "FINANCE";

        }else if(this.router.url == "/pages/help-center/logistic"){
            this.mainhelpcenter = "LOGISTIC";

        }else if(this.router.url == "/pages/help-center/setting2"){
            this.mainhelpcenter = "SETTING2";
        }
    }

    goToAdministrative(){
        this.router.navigateByUrl("/pages/help-center/administrative");
    }
    goToAssistencial(){
        this.router.navigateByUrl("/pages/help-center/assistencial");
    }
    goToDashboard2(){
        this.router.navigateByUrl("/pages/help-center/dashboard2");
    }
    goToFinance(){
        this.router.navigateByUrl("/pages/help-center/finance");
    }
    goToLogistic(){
        this.router.navigateByUrl("/pages/help-center/logistic");
    }
    goToSetting2(){
        this.router.navigateByUrl("/pages/help-center/setting2");
    }
    back() {
        this.location.back();
    
     }

}
