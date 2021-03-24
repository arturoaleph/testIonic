import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  constructor(
    public afStore: AngularFirestore,
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {}

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        console.log(res.user.uid);
        if(this.authService.isLoggedIn) {
          this.router.navigate(['dashboard']);
          let self = this;
          setInterval(function(){
            var fecha = new Date();
            console.log(fecha, res.user.uid);
          self.afStore.collection('State').add({
              timestamp: fecha,
              user: res.user.uid
          })
          .then((docRef) => {
              console.log("Documento con ID: ", docRef.id);
          })
          .catch((error) => {
              console.error("Error: ", error);
          });
          }, 10000);            
        } else {
          console.log('Correo no verificado')
          return false;
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }

}