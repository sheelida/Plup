import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.page.html',
  styleUrls: ['./add-entry.page.scss'],
})
export class AddEntryPage implements OnInit {
  public addEntryForm:FormGroup;
  public clients:any[];
  totalHours:any;

  public entryDate;
  public startTime;
  public endTime;
  public breakTime;

  constructor(
    public loadingCtrl:LoadingController,
    public alertCtrl:AlertController,
    private router:Router,
    private dataService:DataService,
    formBuilder: FormBuilder,
    private authService:AuthService    
  ) { 
    this.addEntryForm = formBuilder.group({
      entryDate: ['',Validators.required],
      startTime: ['',Validators.required],
      endTime: ['',Validators.required],
      breakTime: ['',Validators.required],
      clientID: ['', Validators.required]
    })
  }

  ngOnInit() {

    const userID = this.authService.getUser().uid;
    //get clients from database to show in the ion-select
    this.dataService.getClient(userID).valueChanges().subscribe( response => 
      {
        console.log('res',response);
        this.clients = response;
      });
  }


  //method to get all values from form
  async addEntry(){
    const loading = await this.loadingCtrl.create();

    //get all values from the fields and convert into UNIX time 
    
    this.entryDate =  new Date(this.addEntryForm.value.entryDate);
    this.startTime = new Date(this.addEntryForm.value.startTime)
    this.endTime = new Date (this.addEntryForm.value.endTime);
    this.breakTime = new Date(this.addEntryForm.value.breakTime);
    let clientID = this.addEntryForm.value.clientID;

    // putting the values into the method from dataService
    this.dataService.addEntry(
      this.entryDate.getTime(), 
      this.startTime.getTime(), 
      this.endTime.getTime(),
      this.breakTime.getTime(), 
      clientID
    )
    .then(
      ()=> {
        loading.dismiss().then(() =>{
          const idJSON = JSON.stringify({id: clientID});
          this.router.navigate(['/entries/',idJSON]);
        });
      },
      error=>{
        console.error(error, "Entry couldn't be inserted.")
      }
    );
    return await loading.present();
  }

  sumTotalHours(){
    //calculate to get the total hours
    //this.totalHours = new Date(endTime-breakTime-startTime);

    return this.totalHours;
  }


}

