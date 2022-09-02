import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent, DialogTodoAdd} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ServerService} from "./server.service";
import { HttpClientModule} from "@angular/common/http";
import {HttpHandlerService} from "./httpHandler.service";


@NgModule({
  declarations: [
    AppComponent,
    DialogTodoAdd
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ServerService,
    HttpHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule{}
