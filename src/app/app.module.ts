import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";


import { WebcamModule } from 'ngx-webcam';
import { DpDatePickerModule } from 'ng2-date-picker';

import { AppComponent } from './app.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberDetailsComponent } from './member-details/member-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberFormComponent,
    MemberDetailsComponent
  ],
  imports: [
    BrowserModule,
    WebcamModule,
    HttpClientModule,
    DpDatePickerModule,
    ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
