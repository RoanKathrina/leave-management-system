import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply-leave-page',
  templateUrl: './apply-leave-page.component.html',
  styleUrls: ['./apply-leave-page.component.css']
})
export class ApplyLeavePageComponent implements OnInit {

  applyLeaveForm: FormGroup;
  type_of_leave = ['Sick', 'Vacation', 'Maternity'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years = ['2020', '2021', '2022', '2023', '2024', '2025'];

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.applyLeaveForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'typeOfLeave': new FormControl(this.type_of_leave[1], Validators.required),
      'fromMonth': new FormControl(this.months[0], Validators.required),
      'fromDay': new FormControl('1', Validators.required),
      'fromYear': new FormControl(this.years[0], Validators.required),
      'toMonth': new FormControl(this.months[0], Validators.required),
      'toDay': new FormControl('1', Validators.required),
      'toYear': new FormControl(this.years[0], Validators.required),
      'numberOfDays': new FormControl(null),
      'reasonOfLeave': new FormControl(null, Validators.required)
    })
  }
  onSubmit() {
    console.log(this.applyLeaveForm.get('fromMonth').value);
    console.log(this.applyLeaveForm.get('fromDay').value);
    console.log(this.applyLeaveForm.get('fromYear').value);
  }

  calculateNumberOfDays() {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(parseInt(this.applyLeaveForm.get('toYear').value), parseInt(this.applyLeaveForm.get('toMonth').value), parseInt(this.applyLeaveForm.get('toDay').value)); // To Date
    const secondDate = new Date(parseInt(this.applyLeaveForm.get('fromYear').value), parseInt(this.applyLeaveForm.get('fromMonth').value), parseInt(this.applyLeaveForm.get('fromDay').value)); // From Date
    const diffDays = Math.abs((firstDate.valueOf() - secondDate.valueOf())/(24*60*60*1000)) + 1;; 
    //Math.floor(firstDate.getTime() / (3600 * 24 * 1000)) - Math.floor(secondDate.getTime() / (3600 * 24 * 1000)) + 1;
    this.applyLeaveForm.patchValue({
      'numberOfDays': diffDays
    })
  }
}