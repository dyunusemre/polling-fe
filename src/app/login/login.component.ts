import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;
  error: string;
  isLogin: boolean = true;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  switchMode(){
    this.isLogin = !this.isLogin;
  }

  onSubmit(loginForm: NgForm) {
    let obsvAuth: Observable<AuthResponseData>
    let username = loginForm.value.username;
    let password = loginForm.value.password;
    this.isLoading = true;
    if(this.isLogin){
      obsvAuth = this.authService.login(username, password);
    }else{
      obsvAuth = this.authService.signUp(username, password);
    }
    obsvAuth.subscribe
      (response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/home']);
      }, errorMes => {
        this.isLoading = false;
        this.error = errorMes;
        console.log(errorMes);
        loginForm.reset();
      });
  }
}
