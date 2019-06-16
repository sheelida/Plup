import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-entry-details',
  templateUrl: './entry-details.page.html',
  styleUrls: ['./entry-details.page.scss'],
})
export class EntryDetailsPage implements OnInit {
  entryID:string;
  public details: any;

  constructor(private dataService: DataService, 
              private route: ActivatedRoute, 
              private alertController: AlertController, 
              private router: Router
    ) { }

  ngOnInit() {
    const data = JSON.parse(this.route.snapshot.paramMap.get('id'));
    this.entryID = data.id;

    this.dataService.getEntryDetails(this.entryID).valueChanges().subscribe( response => 
      {
        console.log('res',response);
        this.details = response;
      });;
  }

  async deleteEntry(){
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete this entry?',
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
              this.dataService.deleteEntry(this.entryID).then(() => {
              this.router.navigateByUrl('/clients');
            });
          },
        },
      ],
    });
  
    await alert.present();

  }

}
