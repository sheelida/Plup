import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.page.html',
  styleUrls: ['./client-details.page.scss'],
})
export class ClientDetailsPage implements OnInit {

  clientID:string;
  public details: any;
  constructor( private dataService: DataService, 
              private route: ActivatedRoute, 
              private alertController: AlertController, 
              private router: Router
    ) { }

  ngOnInit() {
    const data = JSON.parse(this.route.snapshot.paramMap.get('id'));
    this.clientID = data.id;

    this.dataService.getClientDetails(this.clientID).valueChanges().subscribe( response => 
      {
        console.log('res',response);
        this.details = response;
      });;

  }

  async deleteClient(){
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete this client?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Action cancelled.');
          },
        },
        {
          text: 'Yes, I\'m sure!',
          handler: () => {
              this.dataService.deleteClient(this.clientID).then(() => {
              this.router.navigateByUrl('/clients');
            });
          },
        },
      ],
    });
  
    await alert.present();

  }
}
