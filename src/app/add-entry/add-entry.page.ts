import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.page.html',
  styleUrls: ['./add-entry.page.scss'],
})
export class AddEntryPage implements OnInit {
  public addEntryForm:FormGroup;
  public clients:any[];
  totalHours:number;

  

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

    //get all values from the fields and put into variables
    var entryDate =  new Date();
    entryDate = this.addEntryForm.value.entryDate;
    const entryUnixDate = entryDate.getTime();
    
    console.log(entryUnixDate);
    // const startTime = (this.addEntryForm.value.startTime).getUnixTime();
    // const endTime = (this.addEntryForm.value.endTime).getUnixTime();
    // const breakTime = (this.addEntryForm.value.breakTime).getUnixTime();
    // const clientID = this.addEntryForm.value.clientID;
      
    //putting the values into the method from dataService
    // this.dataService.addEntry(entryUnixDate, startTime, endTime, breakTime, clientID)
    // .then(
    //   ()=> {
    //     loading.dismiss().then(() =>{
    //       this.router.navigate(['/entries/',clientID]);
    //     });
    //   },
    //   error=>{
    //     console.error(error, "Entry couldn't be inserted.")
    //   }
    // );
    return await loading.present();
  }

  sumTotalHours(){
    const startTime = this.addEntryForm.value.startTime.getTime();
    const endTime = this.addEntryForm.value.endTime.getTime();
    const breakTime = this.addEntryForm.value.breakTime.getTime();

    //calculate to get the total hours
    this.totalHours = (startTime + endTime) - breakTime;
  }


}

