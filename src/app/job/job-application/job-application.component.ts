import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePickerDirective, IDatePickerDirectiveConfig } from 'ng2-date-picker';

export interface Gender {
    man: string;
    woman: string;
    notToDisclose: string;
    // Prefer not to disclose
}

export interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    gender: Gender;
    address: string;
    houseNumber: string;
    zipCode: string;
    motivation: string;
}

@Component({
    selector: 'app-job-application',
    templateUrl: './job-application.component.html',
    styleUrls: ['./job-application.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class JobApplicationComponent implements OnInit {
    @ViewChild('f')
    signupForm: NgForm;

    @ViewChild('dateDirectivePickerStart')
    datePickerDirective: DatePickerDirective;

    public submitted: boolean = false;
    public personalDetails: FormValues;

    public datePickerConfig: IDatePickerDirectiveConfig;
    public birthDate: string;

    constructor() {}

    ngOnInit() {
        this.datePickerConfig = {
            locale: 'en',
            format: 'DD.MM.YYYY',
            monthFormat: 'DD.MM.YYYY',
            drops: 'down',
            showGoToCurrent: false,
        };
    }

    onSubmit() {
        console.log(this.signupForm);

        this.submitted = true;

        // this.personalDetails.email = this.signupForm.value.userData.email;

        this.signupForm.reset();
    }
}
