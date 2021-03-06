import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Entry } from '../../models/entry.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.page.html',
  styleUrls: ['./entries.page.scss'],
})
export class EntriesPage implements OnInit {

  clientID:string;
  public entries: any[];
  public sumHours: any;
  public breakConverted: any;

  constructor(private dataService: DataService, 
    private route: ActivatedRoute,
    private router: Router) {
   }

  ngOnInit() {
    const data = JSON.parse(this.route.snapshot.paramMap.get('id'));
    this.clientID = data.id;
    console.log(this.clientID);
    this.dataService.getEntries(this.clientID).valueChanges().subscribe( response => 
      {
        console.log('res',response);
        this.entries = response;
      });;

  }

    //SEND ENTRY ID TO GET ENTRY DETAILS
    entryDetails(id:string){
      const idJSON = JSON.stringify({id: id});
      //redirect to another page with the id selected
      this.router.navigate(['../entry-details',idJSON]);
    }

    convertTotalToUTC(hour:number){
      let UNIXtime = new Date(hour*1000);      
      this.sumHours = UNIXtime.toUTCString();
      return true;
    }

    convertBreakToUTC(hour:number){
      let UNIXtime = new Date(hour*1000);      
      this.breakConverted = UNIXtime.toUTCString();
      return true;
    }

  

}
