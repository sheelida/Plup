import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public user:any;

  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Clients',
      url: '/clients',
      icon: 'people'
    },
    {
      title: 'Add Entry',
      url: '/add-entry',
      icon: 'time'
    },   
    {
      title: 'Signup',
      url:'/signup',
      icon: 'person-add'
    },  
    {
      title: 'Signin',
      url:'/signin',
      icon: 'log-in'
    },     
    {
      title: 'Signout',
      url:'/signout',
      icon: 'exit'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth:AngularFireAuth,
    private router:Router
  ) {
    this.initializeApp();
    this.checkAuthStatus();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  //function to check if the user is logged or not
  checkAuthStatus(){
    this.afAuth.authState.subscribe((user)=>{
      if(user){
        this.user = user;

        //update navigation for logged in user
        this.appPages = [
          {
            title: 'Dashboard',
            url: '/dashboard',
            icon: 'home'
          },
          {
            title: 'Clients',
            url: '/clients',
            icon: 'people'
          },
          {
            title: 'Add Client',
            url: '/add-client',
            icon: 'person-add'
          },
          {
            title: 'Add Entry',
            url: '/add-entry',
            icon: 'time'
          }, 
          {
            title: 'Signout',
            url:'/signout',
            icon: 'exit'
          }
        ];
      }
      else{
        this.user = null;
        this.router.navigate(['/signin']);
        //update navigation for non authed user
        this.appPages = [        
          {
            title: 'Signin',
            url:'/signin',
            icon: 'log-in'
          },
          {
            title: 'Signup',
            url:'/signup',
            icon: 'person-add'
          }
        ];
      }
    });
  }
}