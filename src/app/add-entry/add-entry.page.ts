import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController, PickerController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { PickerOptions } from '@ionic/core';


@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.page.html',
  styleUrls: ['./add-entry.page.scss'],
})
export class AddEntryPage implements OnInit {
  public addEntryForm:FormGroup;
  public clients:any[];
  totalHours:any;
  hours:number = 0;
  minutes:number = 0;
  totalInsert:number;

  public entryDate;
  public startTime;
  public endTime;
  public breakTime=0;

  constructor(
    public loadingCtrl:LoadingController,
    public alertCtrl:AlertController,
    private router:Router,
    private dataService:DataService,
    formBuilder: FormBuilder,
    private authService:AuthService,
    private pickerCtrl: PickerController   
  ) { 
    this.addEntryForm = formBuilder.group({
      entryDate: ['',Validators.required],
      startTime: ['',Validators.required],
      endTime: ['',Validators.required],
      clientID: ['', Validators.required]
    })
  }

  ngOnInit() {

    const userID = this.authService.getUser().uid;
    //get clients from database to show in the ion-select
    this.dataService.getClient(userID).valueChanges().subscribe( response => 
      {
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
    let clientID = this.addEntryForm.value.clientID;


    // putting the values into the method from dataService
    this.dataService.addEntry(
      this.entryDate.getTime(), 
      this.startTime.getTime(), 
      this.endTime.getTime(),
      this.breakTime, 
      clientID,
      this.totalInsert,
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

  //WEBSITE REFERENCE FOR UNIX/EPOCH: https://www.epochconverter.com/
  sumTotalHours(breakTime:number){
    //transform the UNIX timestamp into epoch
    this.startTime = Math.floor(new Date (this.addEntryForm.value.startTime).getTime()/1000.0);
    this.endTime = Math.floor(new Date (this.addEntryForm.value.endTime).getTime()/1000.0);

    this.totalInsert = this.endTime-this.startTime-breakTime;
    //doing the calculation and transforming into unix again
    let totalEpochToUnix= new Date(this.totalInsert*1000);
    //show the difference in simple timezone
    this.totalHours = totalEpochToUnix.toUTCString();
  }

  //picker data and function
  async showBreakPicker(){
    let opts: PickerOptions ={
      buttons:[
        {
          text: 'Ok'
        }
      ],
      columns:[
        {
          name: 'hours',
          options:[
            {text: '0', value: 0},
            {text: '1', value: 1},
            {text: '2', value: 2},
            {text: '3', value: 3},
            {text: '4', value: 4},
            {text: '5', value: 5},
            {text: '6', value: 6},
            {text: '7', value: 7},
            {text: '8', value: 8},
            {text: '9', value: 9},
            {text: '10', value: 10},
            {text: '11', value: 11},
            {text: '12', value: 12}
          ]
        },
        { name: 'minutes',
          options:[
          {text: '0', value: 0},
          {text: '5', value: 5},
          {text: '10', value: 10},
          {text: '15', value: 15},
          {text: '20', value: 20},
          {text: '25', value: 25},
          {text: '30', value: 30},
          {text: '35', value: 35},
          {text: '40', value: 40},
          {text: '45', value: 45},
          {text: '50', value: 50},
          {text: '55', value: 55},
          {text: '60', value: 60}
        ]

        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data=>{
      let hours = await picker.getColumn('hours');
      let minutes = await picker.getColumn('minutes');

      this.hours= parseInt(hours.options[hours.selectedIndex].text);
      this.minutes= parseInt(minutes.options[minutes.selectedIndex].text);

    //prepare data to send to the function
    this.breakTime = (this.hours*3600) + (this.minutes*60);
      //update total when selected a value
      this.sumTotalHours(this.breakTime);
    })
    //update total when clicked into the button
    this.sumTotalHours(this.breakTime);
  }


}

