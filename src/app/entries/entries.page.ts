import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private dataService: DataService, private route: ActivatedRoute) {
   }

  ngOnInit() {
    const data = JSON.parse(this.route.snapshot.paramMap.get('id'));
    this.clientID = data.id;
    console.log(this.clientID);
    //this.entryDoc = fireStore.doc<any>(this.clientID);
    this.dataService.getEntries(this.clientID).valueChanges().subscribe( response => 
      {
        console.log('res',response);
        this.entries = response;
      });;
    console.log(this.entries);

  }

  totalHours(startTime:Date,endTime:Date, breakTime:Date){
    return Math.abs(endTime.getTime()-breakTime.getTime()-startTime.getTime());

  }

  

}
