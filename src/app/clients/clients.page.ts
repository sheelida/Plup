import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from  '../../models/client.model';
import { DataService } from './../data.service';
import { AuthService } from './../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  public clients: Observable<Client>;
    constructor( 
    private router:Router,
    private dataService: DataService,
    private authService:AuthService

     ) { 
      
     }

  ngOnInit() {
    const userID = this.authService.getUser().uid;  

    console.log("test",userID);

     this.clients = this.dataService.getClient(userID).valueChanges();
     
    //  .subscribe( response => 
    //   {
    //     console.log(response);
    //   });
    console.log(this.clients);
  }

  clientEntries(id:string){
    const idJSON = JSON.stringify({id: id});
    //redirect to another page with the id selected
    this.router.navigate(['/entries',idJSON]);
  }

}
