import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { FoodService } from '../Service/fc-service.service'



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  user: User = {
    name: '',
    alias: '',
    email: '',
    password: ''
  };

  message: string = '';
  showSuccessMessage = false;
  showErrorMessage = false;

  constructor(private router: Router, private foodService: FoodService) { }


  onSubmit() {
    this.foodService.addUser(this.user).subscribe(
      response => {
        //this.showSuccessMessage = true;
        alert("User Created Successfully");
        this.user = {
          name: '',
          alias: '',
          email: '',
          password: ''
        };

    }, error => {
        //this.showErrorMessage = true;
        alert(error.message);

    });
  }

  home() {
    this.router.navigate(['']);

  }
}
