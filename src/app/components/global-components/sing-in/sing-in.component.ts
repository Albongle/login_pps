import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatoinService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
})
export class SingInComponent implements OnInit {
  protected formLogin: FormGroup;
  protected isToastOpen: boolean;
  protected welcomeMessage: string;
  protected toastColor: string;
  protected toastIcon: string;
  constructor(
    private readonly authorization: AuthenticatoinService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  protected async singIn() {
    if (this.formLogin.valid) {
      const isAuthorized = await this.authorization.singInWithEmailAndPassword(
        this.formLogin.value.email,
        this.formLogin.value.password
      );

      if (isAuthorized) {
        this.showToast('Bienvenido usuario', 'log-in-outline', 'success');
        setTimeout(() => {
          this.router.navigateByUrl('welcome');
        }, 2000);
      } else {
        this.showToast(
          'Usuario o contraseña incorrectos',
          'alert-circle-outline',
          'danger'
        );
      }
    } else {
      this.showToast(
        'Debe completar los campos',
        'alert-circle-outline',
        'warning'
      );
    }
  }
  protected setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  private showToast(message: string, icon: string, color: string) {
    this.welcomeMessage = message;
    this.isToastOpen = true;
    this.toastColor = color;
    this.toastIcon = icon;
    this.formLogin.reset();
  }
}
