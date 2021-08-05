import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {UserBusinessService} from '../business-controller/user-business.service';

@Directive({
  selector: '[ngxCheckPerms]',
})
export class CheckPermsDirective implements OnInit {
  @Input() ngxCheckPerms: string;

  constructor(
    private el: ElementRef,
    private userBs: UserBusinessService,
  ) {
  }

  ngOnInit(): void {
    if (!this.userBs.CheckPermission(this.ngxCheckPerms)) {
      this.el.nativeElement.remove();
    }
  }

}
