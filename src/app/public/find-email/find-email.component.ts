import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserBusinessService } from '../../business-controller/user-business.service';

@Component({
    selector: 'ngx-find-email',
    templateUrl: './find-email.component.html',
    styleUrls: ['./find-email.component.scss'],
})
export class FindEmailComponent implements OnInit {

    loading: boolean;
    search: boolean;
    messageError: string;
    users = [];
    inputItemFormControl = new FormControl();

    constructor(private userBS: UserBusinessService) {
    }

    ngOnInit(): void { }

    Search() {
        this.users = [];
        this.loading = true;
        this.userBS.FindEmail({ identification: this.inputItemFormControl.value }).then(x => {
            this.search = true;
            this.messageError = null;
            this.loading = false;
            this.users = x.data;
        }).catch(x => {
            this.search = true;
            this.messageError = "El número de cédula " + this.inputItemFormControl.value + ", no se encuentra registrado";
            this.loading = false;
        });
    }

}
