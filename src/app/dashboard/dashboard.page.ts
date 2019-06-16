import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { timer } from 'rxjs'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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


  constructor(
    public loadingCtrl:LoadingController,
    private dataService:DataService, 
    private authService:AuthService,
    private router:Router,
    formBuilder: FormBuilder
    ) { 
      this.countingForm = formBuilder.group({
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

  async saveStart(){  

    //get all values from the fields and convert into UNIX time     
    this.clientID = this.countingForm.value.clientID;
    this.todayDate = Date.now();
    this.todayStart = Date.now();

    this.toggleStarted();
    this.startCounting();

  }
  toggleStarted(){
    this.started = this.started ? false : true;
  }

 

  async saveEnd(){
    this.toggleStarted();
    this.endCounting();
    const loading = await this.loadingCtrl.create();

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
    const source  = timer(1000,2000);
    this.subscribe = source.subscribe(val => {
        this.timerDate = new Date(val*1000);
        console.log(this.timerDate);
                    
    }); 
  }
  endCounting(){
    //stop counter
    this.subscribe.unsubscribe();
      
  }
}
