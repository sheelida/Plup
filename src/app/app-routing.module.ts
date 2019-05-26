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
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'clients', loadChildren: './clients/clients.module#ClientsPageModule' },
  { path: 'add-client', loadChildren: './add-client/add-client.module#AddClientPageModule' },
  { path: 'entries', loadChildren: './entries/entries.module#EntriesPageModule' },
  { path: 'add-entry', loadChildren: './add-entry/add-entry.module#AddEntryPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
