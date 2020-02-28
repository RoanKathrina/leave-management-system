import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LeaveManagementSystemPageComponent} from './leave-management-system-page/leave-management-system-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
// import { LeaveApplicationsPage } from './leave-applications-page/leave-applications-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'login-page', pathMatch: 'full'},
  {path: 'login-page', component: LoginPageComponent},
  {path: 'leave-management-system-page', component: LeaveManagementSystemPageComponent},
  {path: 'sign-up-page', component: SignUpPageComponent}
  // {path: 'leave-applications-page', component: LeaveApplicationsPage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
