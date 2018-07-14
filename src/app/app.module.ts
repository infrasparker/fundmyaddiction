// Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

// Counter
import { CountUpModule } from 'countup.js-angular2';

// Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { CasinoComponent } from './casino/casino.component';
import { AppRoutingModule } from './/app-routing.module';
import { PlayerService } from './player/player.service';
import { SlotsComponent } from './casino/slots/slots.component';
import { CoinFlipComponent } from './casino/coin-flip/coin-flip.component';
import { InventoryService } from './inventory/inventory.service';
import { StoreroomComponent } from './guild/storeroom/storeroom.component';
import { ItemComponent } from './inventory/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ProfileComponent,
    TitleBarComponent,
    CasinoComponent,
    SlotsComponent,
    CoinFlipComponent,
    StoreroomComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    
    MatTabsModule,
    MatToolbarModule,
    MatDividerModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatListModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    
    AppRoutingModule,

    CountUpModule
  ],
  providers: [
    PlayerService,
    InventoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
