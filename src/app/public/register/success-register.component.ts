import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  template: `
    <div>
      <nb-card class='m-0'>
        <nb-card-body>
          <div class='row'>
            <div class="col-12">
              <h4 class="text-center">
                Se ha registrado al curso correctamente
                <br>
                <span *ngIf="!user">Ingresa a tu correo y revisa la bandeja de entrada para validar su cuenta</span>
              </h4>
            </div>
          </div>
        </nb-card-body>
      </nb-card>
    </div>
  `,
})
export class SuccessRegisterComponent implements OnInit {
  public user = null;

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.GetUser();
  }

}
