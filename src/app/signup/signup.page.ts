import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signUpForm: FormGroup;
  constructor( 
    private authService:AuthService, 
    private formBuilder:FormBuilder,
    private router:Router,
    private alertController:AlertController) 
    { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.email ]],
      password:['',[Validators.required, Validators.minLength(6)]]
    });
  }
  signUp( formData ){
    this.authService.signUp( formData.email, formData.password )
    .then( (response) =>{
      console.log(response);
      //successful
      this.router.navigate(['/dashboard']);
      this.userCreatedAlert();
    })
    .catch((error)=>{
      this.errorAlert();
      console.log(error);
    })
  }

  async userCreatedAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'User Created',
      message: 'User successfully created!',
      buttons: ['OK']
    });

    await alert.present();
  }
  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'User Created',
      message: 'User successfully created!',
      buttons: ['OK']
    });

    await alert.present();
  }
}
