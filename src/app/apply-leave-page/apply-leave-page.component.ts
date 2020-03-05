import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-apply-leave-page',
  templateUrl: './apply-leave-page.component.html',
  styleUrls: ['./apply-leave-page.component.css']
})
export class ApplyLeavePageComponent implements OnInit, OnDestroy{

  applyLeaveForm: FormGroup;
  type_of_leave = ['Sick', 'Vacation', 'Maternity'];
  months = [
    {
      value: 'January',
      position: 1
    },
    {
      value: 'February',
      position: 2
    },
    {
      value: 'March',
      position: 3
    },
    {
      value: 'April',
      position: 4
    },
    {
      value: 'May',
      position: 5
    },
    {
      value: 'June',
      position: 6
    },
    {
      value: 'July',
      position: 7
    },
    {
      value: 'August',
      position: 8
    },
    {
      value: 'September',
      position: 9
    },
    {
      value: 'October',
      position: 10
    },
    {
      value: 'November',
      position: 11
    },
    {
      value: 'December',
      position: 12
    },
  ];
  years = ['2020', '2021', '2022', '2023', '2024', '2025'];
  applyLeaveFormSubmitted: boolean = false;
  members;
  user;
  userSubject: Subscription;

  constructor(private service: AppService) { }

  ngOnInit() {
    this.userSubject = this.service.user.subscribe(userLoggedIn => this.user = userLoggedIn);
    this.initForm();
  }

  ngOnDestroy() {
    this.userSubject.unsubscribe();
  }

  initForm() {
    this.applyLeaveForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'typeOfLeave': new FormControl(this.type_of_leave[1], Validators.required),
      'fromMonth': new FormControl(this.months[0].value, Validators.required),
      'fromDay': new FormControl('1', Validators.required),
      'fromYear': new FormControl(this.years[0], Validators.required),
      'toMonth': new FormControl(this.months[0].value, Validators.required),
      'toDay': new FormControl('1', Validators.required),
      'toYear': new FormControl(this.years[0], Validators.required),
      'numberOfDays': new FormControl(null, Validators.required),
      'reasonOfLeave': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    console.log(this.applyLeaveForm.get('fromMonth').value);
    console.log(this.applyLeaveForm.get('fromDay').value);
    console.log(this.applyLeaveForm.get('fromYear').value);
    this.applyLeaveFormSubmitted = true;

    if(this.applyLeaveForm.invalid === false) {
      // Check if the firstName_lastName is in the equal to user
        // if no, prompt error: firstName lastName is incorrect. Kindly input the correct First Name, and Last Name.
        // if yes, save the leave in the sessionStorage.
      const firstName = this.applyLeaveForm.get('firstName').value;
      const lastName = this.applyLeaveForm.get('lastName').value;
      const memberName = (firstName.replace(/ /g,"_") + '_' + lastName.replace(/ /g,"_")).toLowerCase();

      if (memberName !== this.user) {
        window.alert(`Error: ${firstName} ${lastName} is incorrect. Kindly input the correct First Name, and Last Name.`);
        return;
      }
      else {
        let JSONObj;
        const fromDate = `${this.applyLeaveForm.get('fromMonth').value} ${this.applyLeaveForm.get('fromDay').value}, ${this.applyLeaveForm.get('fromYear').value}`;
        const toDate = `${this.applyLeaveForm.get('toMonth').value} ${this.applyLeaveForm.get('toDay').value}, ${this.applyLeaveForm.get('toYear').value}`
        if(window.sessionStorage.getItem('leaves') === null) {
          JSONObj = {
            "leaves": [
              {
                "first_name": firstName,
                "last_name": lastName,
                "type_of_leave": this.applyLeaveForm.get('typeOfLeave').value,
                "from_date": fromDate,
                "to_date": toDate,
                "number_of_days": this.applyLeaveForm.get('numberOfDays').value,
                "reason": this.applyLeaveForm.get('reasonOfLeave').value
              }
            ]
          }
          console.log(JSONObj);
          window.sessionStorage.setItem('leaves', JSON.stringify(JSONObj))
        }
        else {
          JSONObj = {
            "leaves": [
              ...JSON.parse(window.sessionStorage.getItem('leaves')).leaves,
              {
                "first_name": firstName,
                "last_name": lastName,
                "type_of_leave": this.applyLeaveForm.get('typeOfLeave').value,
                "from_date": fromDate,
                "to_date": toDate,
                "number_of_days": this.applyLeaveForm.get('numberOfDays').value,
                "reason": this.applyLeaveForm.get('reasonOfLeave').value
              }
            ]
          }
          console.log(JSONObj);
          window.sessionStorage.setItem('leaves', JSON.stringify(JSONObj));
        }
      this.applyLeaveFormSubmitted = false;
      this.applyLeaveForm.reset();
      }
    }
    else {
      window.alert('Error: Kindly correct all Error/s before submitting.')
    }
  }

  calculateNumberOfDays() {
      this.applyLeaveForm.patchValue({
        'numberOfDays': ''
      })

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(parseInt(this.applyLeaveForm.get('toYear').value), this.getMonth(this.applyLeaveForm.get('toMonth').value), parseInt(this.applyLeaveForm.get('toDay').value)); // To Date
    const secondDate = new Date(parseInt(this.applyLeaveForm.get('fromYear').value), this.getMonth(this.applyLeaveForm.get('fromMonth').value), parseInt(this.applyLeaveForm.get('fromDay').value)); // From Date

    // To Date is greater than From Date (To Date > From Date)
    if(secondDate > firstDate) {
      window.alert('Error: Kindly correct the From Date, and To Date.')
      return;
    }
    else {
      const diffDays = Math.abs((firstDate.valueOf() - secondDate.valueOf())/(24*60*60*1000)) + 1;; 
      this.applyLeaveForm.patchValue({
        'numberOfDays': diffDays
      })
    }
  }

  getMonth(selectedMonth: string) {
    let month = this.months.find(item => item.value === selectedMonth)
    return month.position;
  }
}
