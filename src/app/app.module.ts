import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppService } from './app.service';
import { LeaveManagementSystemPageComponent } from './leave-management-system-page/leave-management-system-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { LeaveApplicationsPageComponent } from './leave-applications-page/leave-applications-page.component';
import { ApplyLeavePageComponent } from './apply-leave-page/apply-leave-page.component';
import { LeaveApplicationStatusPageComponent } from './leave-application-status-page/leave-application-status-page.component';

@NgModule({
  imports:      [
                  BrowserModule,
                  FormsModule,
                  AppRoutingModule,
                  ReactiveFormsModule
                ],
  declarations: [ AppComponent, LoginPageComponent, LeaveManagementSystemPageComponent, SignUpPageComponent, LeaveApplicationsPageComponent, ApplyLeavePageComponent, LeaveApplicationStatusPageComponent ],
  providers: [
              AppService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
