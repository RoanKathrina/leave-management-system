import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply-leave-page',
  templateUrl: './apply-leave-page.component.html',
  styleUrls: ['./apply-leave-page.component.css']
})
export class ApplyLeavePageComponent implements OnInit {

  applyLeaveForm: FormGroup;
  type_of_leave = ['Sick', 'Vacation', 'Maternity']
  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.applyLeaveForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'typeOfLeave': new FormControl(this.type_of_leave[0], Validators.required)
    })
  }
}