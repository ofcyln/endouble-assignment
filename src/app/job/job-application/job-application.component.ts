import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePickerDirective, IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { DropboxChooserService } from './dropbox-chooser.service';

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

    public resumeDropboxLink: string = '';
    public portfolioDropboxLink: string = '';
    public photoDropboxLink: string = '';

    private readonly DOCUMENT_EXTENSIONS = ['.docx', '.doc', '.pdf', '.txt', '.rtf'];
    private readonly IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

    constructor(private dropboxChooserService: DropboxChooserService) {}

    ngOnInit() {
        this.datePickerConfig = {
            locale: 'en',
            format: 'DD.MM.YYYY',
            monthFormat: 'DD.MM.YYYY',
            drops: 'down',
            showGoToCurrent: false,
        };
    }

    chooseResume() {
        this.dropboxChooserService.choose(this.DOCUMENT_EXTENSIONS).subscribe(
            (link: string) => {
                this.resumeDropboxLink = link;
            },
            (error: string) => {
                console.log(error);
            },
        );
    }

    choosePortfolio() {
        this.dropboxChooserService.choose(this.DOCUMENT_EXTENSIONS).subscribe(
            (link: string) => {
                this.portfolioDropboxLink = link;
            },
            (error: string) => {
                console.log(error);
            },
        );
    }

    choosePhoto() {
        this.dropboxChooserService.choose(this.IMAGE_EXTENSIONS).subscribe(
            (link: string) => {
                this.photoDropboxLink = link;
            },
            (error: string) => {
                console.log(error);
            },
        );
    }

    onSubmit() {
        this.submitted = true;

        console.log(this.signupForm);
        // this.signupForm.reset();
    }
}
