import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AppComponent } from './app.component';
import {MatDividerModule, MatIconModule, MatInputModule, MatListModule, MatToolbarModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {HightlightPipe, HightlightSearchPipe} from './hightlight.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HightlightPipe,
    HightlightSearchPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatDividerModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
