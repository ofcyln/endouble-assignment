import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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
})
export class JobApplicationComponent implements OnInit {
    @ViewChild('f')
    signupForm: NgForm;

    public submitted: boolean = false;

    public personalDetails: FormValues;

    constructor() {}

    ngOnInit() {}

    onSubmit() {
        console.log(this.signupForm);

        this.submitted = true;

        // this.personalDetails.username = this.signupForm.value.userData.username;
        // this.personalDetails.email = this.signupForm.value.userData.email;
        // this.personalDetails.secret = this.signupForm.value.secret;
        // this.personalDetails.answer = this.signupForm.value.questionAnswer;
        // this.personalDetails.gender = this.signupForm.value.gender;

        this.signupForm.reset();
    }
}
