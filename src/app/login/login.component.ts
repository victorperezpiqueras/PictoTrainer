import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, untilDestroyed, CredentialsService } from '@app/core';
import { LoginService } from '@app/services/login-service';
import { HolaMundoService } from '@app/hola-mundo-service/hola-mundo-service.service';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private loginService: LoginService,
    private credentialsService: CredentialsService
  ) {
    this.createForm();
  }

  ngOnInit() { }

  ngOnDestroy() { }

  login() {
    this.isLoading = true;

    const nombre = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    //console.log(nombre, password)
    this.loginService.login({ nombre: nombre, password: password })
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (data) => {
          console.log(data);
          const cred = {
            username: data[0].nombre,
            id: data[0].idusuario
          };
          this.credentialsService.setCredentials(cred, true);
          this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
        },
        error => {
          console.log(error)
          this.error = error.error.error;
        });

    /*  const login$ = this.loginService.login({ nombre: nombre, password: password })
       .pipe(
         finalize(() => {
           this.loginForm.markAsPristine();
           this.isLoading = false;
         }),
         untilDestroyed(this)
       )
       .subscribe(
         (data) => {
           console.log(data)
           if (data.error) {
             log.debug(`Login error: ${data.error}`);
             this.error = data.error;
           }
           else {
             log.debug(`${data.nombre} successfully logged in`);
             this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
           }
         }
       ); */


    /*   this.isLoading = true;
      const login$ = this.authenticationService.login(this.loginForm.value);
      login$
        .pipe(
          finalize(() => {
            this.loginForm.markAsPristine();
            this.isLoading = false;
          }),
          untilDestroyed(this)
        )
        .subscribe(
          credentials => {
            log.debug(`${credentials.username} successfully logged in`);
            this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
          },
          error => {
            log.debug(`Login error: ${error}`);
            this.error = error;
          }
        ); */
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }
}
