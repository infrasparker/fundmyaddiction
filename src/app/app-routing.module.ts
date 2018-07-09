import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { CasinoComponent } from './casino/casino.component';
import { StoreroomComponent } from './guild/storeroom/storeroom.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'casino', component: CasinoComponent },
  { path: 'storeroom', component: StoreroomComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
