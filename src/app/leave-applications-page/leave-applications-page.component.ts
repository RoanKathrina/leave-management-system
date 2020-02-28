import { Component, OnInit } from '@angular/core';

import fs_bench_leave_applications from '../json/fs_bench_leave_applications.json';
@Component({
  selector: 'app-leave-applications-page',
  templateUrl: './leave-applications-page.component.html',
  styleUrls: ['./leave-applications-page.component.css']
})
export class LeaveApplicationsPageComponent implements OnInit {

  leaves = fs_bench_leave_applications;

  constructor() { }

  ngOnInit() {
    if (window.sessionStorage.getItem('leaves') === null) {
      window.sessionStorage.setItem('leaves', JSON.stringify(this.leaves))
    }

    else {
      this.leaves = JSON.parse(window.sessionStorage.getItem('leaves'));
    }
  }

}