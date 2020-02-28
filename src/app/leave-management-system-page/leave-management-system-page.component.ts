import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-management-system-page',
  templateUrl: './leave-management-system-page.component.html',
  styleUrls: ['./leave-management-system-page.component.css']
})
export class LeaveManagementSystemPageComponent implements OnInit {

  showSideDrawer: boolean = false;
  menuOption: string = '';

  constructor() { }

  ngOnInit() {
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
}