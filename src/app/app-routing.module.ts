import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'clients', loadChildren: './clients/clients.module#ClientsPageModule' },
  { path: 'add-client', loadChildren: './add-client/add-client.module#AddClientPageModule' },
  { path: 'entries', loadChildren: './entries/entries.module#EntriesPageModule' },
  { path: 'add-entry', loadChildren: './add-entry/add-entry.module#AddEntryPageModule' },
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'signout', loadChildren: './signout/signout.module#SignoutPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
