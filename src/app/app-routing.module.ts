import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './pages/profile/profile.component';
import { CasinoComponent } from './pages/casino/casino.component';
import { StoreroomComponent } from './pages/guild/storeroom/storeroom.component';
import { MembersComponent } from './pages/guild/members/members.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'casino', component: CasinoComponent },
  { path: 'storeroom', component: StoreroomComponent },
  { path: 'members', component: MembersComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
