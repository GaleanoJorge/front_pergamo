import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Auth } from '../models/auth';
import { NbToastrService, NbGlobalPhysicalPosition, NbToastrConfig, NbGlobalPosition, NbComponentStatus } from '@nebular/theme';
import { Router } from '@angular/router';
import { AuthMiPres } from '../models/auth-mipres';
import { AuthMiPresService } from '../services/auth-mipress.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    config: NbToastrConfig;

    index = 1;
    destroyByClick = true;
    duration = 1000 * 10;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
    status: NbComponentStatus = 'warning';

    constructor(
        private authService: AuthService,
        private toastrService: NbToastrService,
        private router: Router,
        private authMipresService: AuthMiPresService,
    ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: Auth = this.authService.GetToken();
        const mipres_token: AuthMiPres = this.authMipresService.GetToken();


            if (token && token.access_token != null) {
                request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token.access_token) });
                // if(mipres_token.mipres_token_type != null){

                //     request = request.clone({headers: request.headers.append('Access-Control-Allow-Origin:', '*' )});
                //     // request.headers.keys();
                // }
            }

            /*if (!request.headers.has('Content-Type')) {
                request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
            }*/

            request = request.clone({ headers: request.headers.set('Accept', 'application/json') });



            return next.handle(request).pipe(
                map((event: HttpEvent<any>) => {
                    // if (event instanceof HttpResponse) {console.log('event--->>>', event);}
                    return event;
                }), catchError((error: HttpErrorResponse) => {
                    const config = {
                        destroyByClick: this.destroyByClick,
                        duration: this.duration,
                        hasIcon: this.hasIcon,
                        icon: 'alert-circle-outline',
                        limit: 3,
                        preventDuplicates: true
                    };
                    this.toastrService.danger(
                        "Ocurrió un error",
                        error.error.msg ? error.error.msg : error.error.message,
                        config
                    );
                    new Promise((res) => {
                        if (error.status === 401 || error.status === 403) {
                            setTimeout(() => {
                                this.router.navigateByUrl('/auth');
                                res();
                            }, 4000);
                        }
                    });
                    return throwError(error);
                })
            );
        }
    }
