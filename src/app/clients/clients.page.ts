import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from  '../../models/client.model';
import { DataService } from './../data.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  public clients;
  constructor( 
    private router:Router,
    private dataService: DataService,
    private route:ActivatedRoute

     ) { }

  ngOnInit() {
    const data = JSON.parse(this.route.snapshot.paramMap.get('id'));
    this.clients = this.dataService.getClient(data.id).valueChanges();
    
    
  }

  clientEntries(id:string){
    const idJSON = JSON.stringify({id: id});
    //redirect to another page with the id selected
    this.router.navigate(['/entries',idJSON]);
  }

}
