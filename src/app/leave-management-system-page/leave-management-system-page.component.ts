import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leave-management-system-page',
  templateUrl: './leave-management-system-page.component.html',
  styleUrls: ['./leave-management-system-page.component.css']
})
export class LeaveManagementSystemPageComponent implements OnInit, OnDestroy{

  showSideDrawer: boolean = false;
  menuOption: string = '';
  isAuthenticatedSubject: Subscription;
  userSubject: Subscription;
  isAdminLoggedIn: boolean = false;
  user: string;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: AppService) { }

  ngOnInit() {
    this.isAuthenticatedSubject = this.service.isAdminLoggedIn
    .subscribe(isAuthenticated => this.isAdminLoggedIn = isAuthenticated);

    this.userSubject = this.service.user.subscribe(userLoggedIn => this.user = userLoggedIn);
    console.log(this.user);
  }

  ngOnDestroy() {
    this.isAuthenticatedSubject.unsubscribe();
    this.userSubject.unsubscribe();
  }

  toggleSideDrawer() {
    if (this.showSideDrawer === false) {
      this.showSideDrawer = true;
    }
    else {
      this.showSideDrawer = false;
    }
  }

  setMenuOption(menuOption: string) {
    this.menuOption = menuOption; 
  }

  onLogOut() {
    this.service.isAdminLoggedIn.next(false);    
    this.router.navigate(['../login-page'], {relativeTo: this.route})
  }
}