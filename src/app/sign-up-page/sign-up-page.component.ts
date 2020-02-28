import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import fs_bench_members from '../json/fs_bench_members.json';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  signUpForm: FormGroup;
  members = fs_bench_members;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    if (window.sessionStorage.getItem('members') === null) {
      window.sessionStorage.setItem('members', JSON.stringify(this.members));
    }
    else {
      this.members = JSON.parse(window.sessionStorage.getItem('members'));
    }
  }

  initForm() {
    this.signUpForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    const username = this.signUpForm.get('username').value;
    const password = this.signUpForm.get('password').value;
    const confirmPassword = this.signUpForm.get('confirmPassword').value;
    if(username === null || username === '') {
      window.alert('Error: Kindly input Username.');
      return;
    }
    else if ((username !== null || username !== '') && (password === null || password === '')) {
      window.alert('Error: Kindly input Password.');
      return;
    }
    else if ((username !== null || username !== '') && (password !== null || password !== '') && (confirmPassword === null || confirmPassword === '')) {
      window.alert('Error: Kindly input Confirm Password.');
      return;
    }
    else if ((username !== null || username !== '') && (password !== null || password !== '') && (confirmPassword !== null || confirmPassword !== '')) {
      // Check if Username already exists in the Leave Management System Database
        // Username already exists in the Leave Management System Database.
          // window.alert: Error: Username already exists in the Leave Management Database
        // Username does not exist in the Leave Management System Database
          // Password, and Confirm Password are not equal
            // window.alert: Error: Password, and Confirm Password are not equal
          // Password, and Confirm Password are equal
            // Save the new member in the session storage (members)
            // Go to Leave Management System Page
      let memberFlg = this.members.members.find(item => item.username === username);
      if (memberFlg !== undefined) {
        // Username already exists in the Leave Managament System Database
        window.alert('Error: Username already exists in the Leave Management System Database.')
        return;
      }
      else {
        if (password !== confirmPassword) {
          window.alert('Error: Password, and Confirm Password do not match.');
          return;
        }
        else {
          // Save the new member in the session storage
          const JSONObj = {
            "username": username,
            "password": password
          }
          this.members.members.push(JSONObj);
          window.sessionStorage.setItem('members', JSON.stringify(this.members))
          this.router.navigate(['../leave-management-system-page'], {relativeTo: this.route});
        }
      }
    }
  }

  goToLoginPage() {
    this.router.navigate(['../login-page'], {relativeTo: this.route});
  }
}