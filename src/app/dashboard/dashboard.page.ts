import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { timer } from 'rxjs'
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public countingForm:FormGroup;
  clients:any[];
  todayDate:number;
  todayStart:number;
  clientID:string;
  started:boolean = false;
  totalHours:number = 0;
  timerDate:any;
  subscribe:any;
  userID:string;
  allEntriesTotalHours:number = 0;


  constructor(
    public loadingCtrl:LoadingController,
    private dataService:DataService, 
    private authService:AuthService,
    private router:Router,
    private localNotifications:LocalNotifications,
    formBuilder: FormBuilder
    ) { 
      this.countingForm = formBuilder.group({
        clientID: ['', Validators.required]
      })

   
    }

  ngOnInit() {    
    this.userID = this.authService.getUser().uid;
    //get clients from database to show in the ion-select
    this.dataService.getClient(this.userID).valueChanges().subscribe( response => 
      {
        this.clients = response;
      });

      this.sumTotalTotalHours();
      this.triggerNotification();
      
  }

  async saveStart(){  

    //get all values from the fields and convert into UNIX time     
    this.clientID = this.countingForm.value.clientID;
    this.todayDate = Date.now();
    this.todayStart = Date.now();

    this.toggleStarted();
    this.startCounting();

  }

  //DISABLE CONTROLLER
  toggleStarted(){
    this.started = this.started ? false : true;
  }

 
//GET END OF COUNTER AND SAVE INTO THE DATABASE
  async saveEnd(){
    // ACTIVATE START BUTTON AGAIN
    this.toggleStarted();

    //STOP TIMER COUNTER
    this.endCounting();
    const loading = await this.loadingCtrl.create();

    //GET DATES
    let todayEnd = Date.now();
    let breakTime = 0;

    // putting the values into the method from dataService
    this.dataService.addEntry(
      this.todayDate,
      this.todayStart,
      todayEnd,
      breakTime,
      this.clientID,
      this.totalHours
    )
    .then(
      ()=> {
        loading.dismiss().then(() =>{
          const idJSON = JSON.stringify({id: this.clientID});
        });
      },
      error=>{
        console.error(error, "Entry couldn't be inserted.")
      }
    );
    return await loading.present();
  }


  startCounting(){
    //START TIMER
    const source  = timer(1000,2000);
    this.subscribe = source.subscribe(val => {
        this.timerDate = new Date(val*1000);                    
    }); 
  }

  endCounting(){
    //STOP TIMER
    this.subscribe.unsubscribe();
      
  }

  sumTotalTotalHours(){

    this.dataService.getClient(this.userID).valueChanges().subscribe( response => 
      {
        console.log('resClients',response);
        response.forEach( (client) => {
          this.dataService.getEntries(client.clientID).valueChanges().subscribe( newResponse => 
            {
             newResponse.forEach( (entry) => {
                this.allEntriesTotalHours += entry.totalHours;         
              });;
            });
        });
      }); 
  }

  triggerNotification(){
    // Schedule delayed notification
    this.localNotifications.schedule({
      text: 'Don\'t forget to enter your hours from today!',
      //sends once a day
      trigger: {at: new Date(new Date().getTime() + 86400)},
      led: 'FF0000',
      sound: null
    });

  }
}
