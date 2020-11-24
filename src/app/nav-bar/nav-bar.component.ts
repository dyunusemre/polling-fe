import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  isAuth = false;
  isAdmin = false;
  private userSub : Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userSub  = this.authService.user.subscribe(user  => {
      if(user){
        this.isAuth = true;
        console.log(user);
        this.isAdmin = user.isAdmin;
      }else {
        this.isAuth = false;
      }
    });
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
