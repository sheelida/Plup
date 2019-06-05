import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { DataService } from './../data.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.page.html',
  styleUrls: ['./add-client.page.scss'],
})
export class AddClientPage implements OnInit {
  public addClientForm: FormGroup;
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public dataService: DataService,
    public router: Router,
    formBuilder: FormBuilder,
    private authService:AuthService      
  ) { 
    this.addClientForm = formBuilder.group({
      companyName: ['',Validators.required],
      hourlyRate: ['',Validators.required],
      payPeriod: ['',Validators.required]
    });

  }

  ngOnInit() {
  }

  //method to get all values from form 
  async addClient(){
    const loading = await this.loadingCtrl.create();

    //get all values from the fields and put into a variable 
    const companyName = this.addClientForm.value.companyName;
    const hourlyRate = this.addClientForm.value.hourlyRate;
    const payPeriod = this.addClientForm.value.payPeriod;
    const user = this.authService.getUser();

    // putting the values into the method from dataService
    this.dataService.addClient(companyName, hourlyRate, payPeriod, user.uid)
    .then(
      ()=>{
        loading.dismiss().then(() => {
          const idJSON = JSON.stringify({id:user.uid})
          this.router.navigate(['/clients',idJSON]);
        });
      },
      error =>{
        console.error(error, "Client couldn't be added.")
      }
      );

    return await loading.present();
  }

}
