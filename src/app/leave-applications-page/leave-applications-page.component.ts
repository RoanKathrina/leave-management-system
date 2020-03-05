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
    const JSONObj = {
          "leaves": []
    }
    if (window.sessionStorage.getItem('leaves') === null) {
      // window.sessionStorage.setItem('leaves', JSON.stringify(this.leaves))
      window.sessionStorage.setItem('leaves', JSON.stringify(JSONObj))
    }

    else {
      console.log(JSON.parse(window.sessionStorage.getItem('leaves')));
      this.leaves = JSON.parse(window.sessionStorage.getItem('leaves'));
    }
  }

  approveLeave(element: any, position: number) {
    // Confirm Message: Message: Are you sure you want to approve member to have {type_of_leave} leave?
    // If no,
      // return
    // If yes
      // Add the leave application in the Approved entry
      // Delete the leave application

    const confirmRes = window.confirm(`Are you sure you want to approve member: ${element.first_name} ${element.last_name} to have ${element.type_of_leave} leave?`);
    if(confirmRes === false) {
      return;
    } 
    else {
      let JSONLeaves;
      let name = (element.first_name.replace(/ /g,"_") + '_' + element.last_name.replace(/ /g,"_")).toLowerCase();
      console.log(name);
      if (window.sessionStorage.getItem(name) === null) {
        JSONLeaves = {
          "approved": [
            {
              "first_name": element.first_name,
              "last_name": element.last_name,
              "type_of_leave": element.type_of_leave,
              "from_date": element.from_date,
              "to_date": element.to_date,
              "number_of_days": element.number_of_days,
              "reason": element.reason
            }
          ],
          "rejected": []
        }
        console.log(JSONLeaves);
        window.sessionStorage.setItem(name, JSON.stringify(JSONLeaves));
        this.leaves.leaves.splice(position, 1);
        window.sessionStorage.setItem('leaves', JSON.stringify(this.leaves));
      }

      else {
        JSONLeaves = {
          "approved": [
            ...JSON.parse(window.sessionStorage.getItem(name)).approved,
            {
              "first_name": element.first_name,
              "last_name": element.last_name,
              "type_of_leave": element.type_of_leave,
              "from_date": element.from_date,
              "to_date": element.to_date,
              "number_of_days": element.number_of_days,
              "reason": element.reason
            }
          ],
          "rejected": [
            ...JSON.parse(window.sessionStorage.getItem(name)).rejected
          ]
        }
        console.log(JSONLeaves);
        window.sessionStorage.setItem(name, JSON.stringify(JSONLeaves));
        this.leaves.leaves.splice(position, 1);
        window.sessionStorage.setItem('leaves', JSON.stringify(this.leaves));
      }
    }
  }

  rejectLeave(element: any, position: number) {
    const confirmRes = window.confirm(`Are you sure you want to reject member: ${element.first_name} ${element.last_name} to have ${element.type_of_leave} leave?`);
    if(confirmRes === false) {
      return;
    }
    else {
      // Add the leave application to Rejected Entry
      // Delete leave application
      let JSONLeaves;
      const name = (element.first_name.replace(/ /g,"_") + '_' + element.last_name.replace(/ /g,"_")).toLowerCase();
      if(window.sessionStorage.getItem(name) === null)
      {
        JSONLeaves = {
          "approved": [],
          "rejected": [
            {
              "first_name": element.first_name,
              "last_name": element.last_name,
              "type_of_leave": element.type_of_leave,
              "from_date": element.from_date,
              "to_date": element.to_date,
              "number_of_days": element.number_of_days,
              "reason": element.reason
            }
          ]
        }
        console.log(JSONLeaves);
        window.sessionStorage.setItem(name, JSON.stringify(JSONLeaves));
        this.leaves.leaves.splice(position, 1);
        window.sessionStorage.setItem('leaves', JSON.stringify(this.leaves));
      }
      else {
        JSONLeaves = {
          "approved": [
            ...JSON.parse(window.sessionStorage.getItem(name)).approved
          ],
          "rejected": [
            ...JSON.parse(window.sessionStorage.getItem(name)).rejected,
            {
              "first_name": element.first_name,
              "last_name": element.last_name,
              "type_of_leave": element.type_of_leave,
              "from_date": element.from_date,
              "to_date": element.to_date,
              "number_of_days": element.number_of_days,
              "reason": element.reason
            }
          ]
        }
        console.log(JSONLeaves);
        window.sessionStorage.setItem(name, JSON.stringify(JSONLeaves));
        this.leaves.leaves.splice(position, 1);
        window.sessionStorage.setItem('leaves', JSON.stringify(this.leaves));
      }
    }
  }
}
