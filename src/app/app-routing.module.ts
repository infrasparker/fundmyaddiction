import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { CasinoComponent } from './casino/casino.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'casino', component: CasinoComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
