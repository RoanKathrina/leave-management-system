import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  imports:      [
                  BrowserModule,
                  FormsModule,
                  AppRoutingModule,
                  ReactiveFormsModule
                ],
  declarations: [ AppComponent, LoginPageComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
