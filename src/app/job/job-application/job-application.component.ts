import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { DatePickerDirective, IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { DropboxChooserService } from './dropbox-chooser.service';
import { AlertService } from '../../core/alert/alert.service';
import { HeaderService } from '../../core/header/header.service';
import { FormSubmissionResponse, JobApplicationService } from './job-application.service';

export interface FormValues {
    personalData?: {
        address: string;
        country: string;
        email: string;
        firstName: string;
        gender: string;
        houseNumber: string;
        lastName: string;
        birthDate: string;
        phone: string;
        zipCode: string;
    };
    attachments?: {
        motivation?: string;
        uploadPhoto?: File;
        uploadPhotoDropbox?: string;
        uploadPortfolio?: File;
        uploadPortfolioDropbox?: string;
        uploadResume?: File;
        uploadResumeDropbox?: string;
    };
    sendCopy?: boolean;
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

    public formValues: FormValues = {
        attachments: {},
    };
    public genderModel: string = 'Gender';

    public datePickerConfig: IDatePickerDirectiveConfig;

    public resumeDropboxLink: string = '';
    public portfolioDropboxLink: string = '';
    public photoDropboxLink: string = '';

    private readonly DOCUMENT_EXTENSIONS = ['.docx', '.doc', '.pdf', '.txt', '.rtf'];
    private readonly IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

    constructor(
        private dropboxChooserService: DropboxChooserService,
        private alertService: AlertService,
        private router: Router,
        private headerService: HeaderService,
        private jobApplicationService: JobApplicationService,
    ) {}

    ngOnInit() {
        this.datePickerConfig = {
            locale: 'en',
            format: 'DD.MM.YYYY',
            monthFormat: 'DD.MM.YYYY',
            drops: 'down',
            showGoToCurrent: false,
        };
    }

    handleFileInput(files: FileList, key: string) {
        this.formValues.attachments[key] = files.item(0);
    }

    chooseResume() {
        this.dropboxChooserService.choose(this.DOCUMENT_EXTENSIONS).subscribe(
            (link: string) => {
                this.resumeDropboxLink = link;
            },
            (error: string) => {
                this.alertService.error(`Error: ${error}`);
            },
        );
    }

    choosePortfolio() {
        this.dropboxChooserService.choose(this.DOCUMENT_EXTENSIONS).subscribe(
            (link: string) => {
                this.portfolioDropboxLink = link;
            },
            (error: string) => {
                this.alertService.error(`Error: ${error}`);
            },
        );
    }

    choosePhoto() {
        this.dropboxChooserService.choose(this.IMAGE_EXTENSIONS).subscribe(
            (link: string) => {
                this.photoDropboxLink = link;
            },
            (error: string) => {
                this.alertService.error(`Error: ${error}`);
            },
        );
    }

    onSubmit() {
        const formValues = {
            attachments: {
                ...this.formValues.attachments,
                ...this.signupForm.value.attachments,
            },
            ...this.signupForm.value,
        };

        this.jobApplicationService.submitForm(formValues).subscribe(
            (result: FormSubmissionResponse) => {
                this.signupForm.reset();

                this.headerService.scrollToTop();

                this.router.navigate(['/job/success']);
            },
            (error: Error) => {
                this.alertService.error(error.message);

                // TODO: remove this after backend implementation
                // only for demonstration
                this.router.navigate(['/job/success']);
            },
        );
    }
}
