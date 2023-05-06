import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { FC_Service } from 'FC_Service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;

  constructor(private router: Router) { }

  login() {
  // Authenticate user
    // Redirect to landing page
    this.router.navigate(['']);
  }

  SignUp() {
    // Authenticate user
    // Redirect to landing page
    this.router.navigate(['signup']);
  }
  //constructor(private authService: AuthService) { }

  //onSubmit() {
  //  this.authService.login(this.username, this.password).subscribe(
  //    result => {
  //      // Handle successful login
  //    },
  //    error => {
  //      // Handle login error
  //    }
  //  );
  //}
}
