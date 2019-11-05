import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  invalidLogin: boolean;
  isShowPassword = false;
  textType = 'password';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  signIn(credentials) {
    this.authService.login(credentials)
      .subscribe(result => {
        if (result) {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        } else {
          this.invalidLogin = true;
        }
      });
  }

  showPassWord() {
    this.textType = 'text';
    this.isShowPassword = !this.isShowPassword;
  }
  hidePassword() {
    this.textType = 'password';
    this.isShowPassword = !this.isShowPassword;
  }

}
