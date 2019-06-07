import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Client } from '../models/client.model';
import { Entry } from '../models/entry.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userObj:any;


  constructor(public dataService: AngularFirestore) { 
  }
  //method to include the object into the database
  addClient(
    companyName: string,
    hourlyRate: number,
    payPeriod: string,
    userID: string
  ): Promise<void> {
    //create an ID before inserting into the database
    const clientID = this.dataService.createId();
    //insert into the collection Client with the ID created above
    return this.dataService.doc(`Client/${clientID}`).set({
      clientID,
      companyName,
      hourlyRate, 
      payPeriod,
      userID
    });
  }

  getClient(userID:string): AngularFirestoreCollection<Client>{
    //const data = this.dataService.collection(`Client`).doc<Client>('Etm5cdiBGOvglQ5caiVP');
    //console.log('data', data)
    return this.dataService.collection(`Client`, ref => ref.where('userID', '==', userID));
  }

  //entry method to include the object into the database
  addEntry(
    entryDate: number,
    startTime: number,
    endTime: number,
    breakTime: number,
    clientID: string
  ): Promise <void> {
    //create an ID before inserting into the database
    const entryID = this.dataService.createId();
    //insert into the collection Entry with the id created above
    return this.dataService.doc(`Entry/${entryID}`).set({
      entryID,
      entryDate,
      startTime,
      endTime,
      breakTime,
      clientID
    });
  }

  getEntries(clientID:string): AngularFirestoreCollection<Entry>{
    return this.dataService.collection(`Entry`, ref => ref.where('clientID', '==', clientID));
  }
}
