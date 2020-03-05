import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

import fs_bench_members from '../json/fs_bench_members.json';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  members = fs_bench_members;
  loginFormSubmitted: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: AppService) { }

  ngOnInit() {
    this.initForm();
    if (window.sessionStorage.getItem('members') === null) {
      window.sessionStorage.setItem('members', JSON.stringify(this.members))
    }

    else {
      this.members = JSON.parse(window.sessionStorage.getItem('members'));
    }
  }

  initForm() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
  // Check if Username, and Password is in fs_bench_members.json
    // If no, window.alert: "Error: Username, and Password in not found in Leave Management System Database."
    // If yes,
        // Check if the Username === "melody_anne_francisco"
          // If not, log in User
          // If yes, 
            // set adminIsLoggedIn = true
            // Log in
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid === false) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;

      let memberFlg = this.members.members.find(item => item.username === username && item.password === password);
      if (memberFlg === undefined) {
        // Username, and Password is not found
        window.alert('Error: Username, and Password is not found in the Leave Management System Database.')
        return;
      }
      else {
        if(username !== 'melody_anne_francisco') {
          this.service.user.next(username);
          this.router.navigate(['../leave-management-system-page'], {relativeTo: this.route})
        }
        else {
          this.service.isAdminLoggedIn.next(true);
          this.service.user.next(username);
          this.router.navigate(['../leave-management-system-page'], {relativeTo: this.route})
        }
      }
    }
    else {
      window.alert('Error: Kindly correct all Error/s before Logging in.')
      return;
    }
  }

  goToSignUpPage() {
    this.router.navigate(['../sign-up-page'], {relativeTo: this.route});
  }
}