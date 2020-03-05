import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-leave-application-status-page',
  templateUrl: './leave-application-status-page.component.html',
  styleUrls: ['./leave-application-status-page.component.css']
})
export class LeaveApplicationStatusPageComponent implements OnInit, OnDestroy{

  leaves;
  userSubject: Subscription;
  user: string;
  constructor(private service: AppService) { }

  ngOnInit() {
    const JSONObj = {
      "approved": [],
      "rejected": []
    }
    this.userSubject = this.service.user
    .subscribe(userLoggedIn => this.user = userLoggedIn);

    if(window.sessionStorage.getItem(this.user) === null) {
      window.sessionStorage.setItem(this.user, JSON.stringify(JSONObj));
      this.leaves = JSON.parse(window.sessionStorage.getItem(this.user));
    }
    else {
      this.leaves = JSON.parse(window.sessionStorage.getItem(this.user))
    }
  }

  ngOnDestroy() {
    this.userSubject.unsubscribe();
  }

}