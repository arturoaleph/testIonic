import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit(){}

  signUp(email, password){
      this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        localStorage.setItem('user', res.user.uid);
        console.log("Usuario registrado");
        this.router.navigate(['home']);  
      }).catch((error) => {
        window.alert(error.message)
      })
  }

}