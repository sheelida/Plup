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
  public entryDoc: Observable<Entry[]>;
  constructor(private dataService: DataService, private route: ActivatedRoute) {
   }

  ngOnInit() {
    const data = JSON.parse(this.route.snapshot.paramMap.get('id'));
    this.clientID = data.id;
    console.log(this.clientID);
    //this.entryDoc = fireStore.doc<any>(this.clientID);
    this.entryDoc = this.dataService.getEntries(this.clientID).valueChanges();
    console.log(this.entryDoc);

  }

  

}
