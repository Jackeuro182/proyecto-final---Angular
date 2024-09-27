import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import '../../assets/login-animation.js';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MaterialModule, FormsModule, NgIf],
})

export class LoginComponent {
  username: string;
  password: string;
  message: string;
  error: string;
  userDomain: string = 'user@domain.com';

  //constructor(private loginService: LoginService, private router: Router) {}
  constructor( private router: Router) {}
  login() {
    //this.loginService.login(this.username, this.password).subscribe((data) => {
    //  sessionStorage.setItem(environment.TOKEN_NAME, data.jwtToken);
      //this.router.navigate(['pages/patient']);
      http://10.20.0.11:8081/patients
      this.router.navigate(['pages/dashboard']);
    };
  

  // ngAfterViewInit(): void {
  //   (window as any).initialize();
  // }
}
