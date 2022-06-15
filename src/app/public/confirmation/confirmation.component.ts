import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserBusinessService } from '../../business-controller/user-business.service';

@Component({
    selector: 'ngx-find-email',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {

    loading: boolean;
    search: boolean;
    messageError: string;
    users = [];
    inputItemFormControl = new FormControl();

    constructor(private userBS: UserBusinessService) {
    }

    ngOnInit(): void {

        console.log('test.com');

     }
     Search() {}
    
    

}
