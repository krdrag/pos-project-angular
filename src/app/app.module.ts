import { environment } from './../environments/environment.prod';
import { WorkstationState } from './stores/workstation/workstation.state';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([
      WorkstationState
    ], { developmentMode: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
