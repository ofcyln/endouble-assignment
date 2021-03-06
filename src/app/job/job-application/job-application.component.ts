import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { DatePickerDirective, IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { DropboxChooserService } from './dropbox-chooser.service';
import { AlertService } from '../../core/alert/alert.service';
import { HeaderService } from '../../core/header/header.service';
import { FormSubmissionResponse, JobApplicationService } from './job-application.service';
import { DeviceDetectorService } from 'ngx-device-detector';

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

export enum UploadedFileCategory {
    Resume = 'resume',
    Portfolio = 'portfolio',
    Photo = 'photo',
}

export enum MimeFileType {
    Docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    Doc = 'application/msword',
    Rtf = 'application/rtf',
    Pdf = 'application/pdf',
    Txt = 'text/plain',
    Jpg = 'text/jpeg',
    Png = 'text/png',
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

    public submitting: boolean = false;

    public isMobile: boolean;

    public formValues: FormValues = {
        attachments: {},
    };
    public genderModel: string = 'Gender';

    public datePickerConfig: IDatePickerDirectiveConfig;

    public resumeUploaded: boolean = false;
    public portfolioUploaded: boolean = false;
    public photoUploaded: boolean = false;

    public resumeDropboxLink: string = '';
    public portfolioDropboxLink: string = '';
    public photoDropboxLink: string = '';
    public fileTypeSupported: boolean = false;

    private readonly DOCUMENT_EXTENSIONS = ['.docx', '.doc', '.pdf', '.txt', '.rtf'];
    private readonly IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

    private readonly FILESIZE_LIMIT = 4e6;

    constructor(
        private dropboxChooserService: DropboxChooserService,
        private alertService: AlertService,
        private router: Router,
        private headerService: HeaderService,
        private jobApplicationService: JobApplicationService,
        private deviceService: DeviceDetectorService,
    ) {}

    ngOnInit() {
        this.datePickerConfig = {
            locale: 'en',
            format: 'DD.MM.YYYY',
            monthFormat: 'DD.MM.YYYY',
            drops: 'down',
            showGoToCurrent: false,
        };

        this.isMobile = this.deviceService.isMobile();
    }

    handleFileInput(files: FileList, key: string) {
        let file = files.item(0).type;
        let allowedFilesize = files.item(0).size < this.FILESIZE_LIMIT;

        switch (true) {
            case MimeFileType.Docx === file && allowedFilesize:
            case MimeFileType.Doc === file && allowedFilesize:
            case MimeFileType.Rtf === file && allowedFilesize:
            case MimeFileType.Pdf === file && allowedFilesize:
            case MimeFileType.Txt === file && allowedFilesize:
            case MimeFileType.Jpg === file && allowedFilesize:
            case MimeFileType.Png === file && allowedFilesize:
                this.fileTypeSupported = true;

                this.formValues.attachments[key] = files.item(0);

                this.alertService.success('Selected file uploaded successfully!');

                break;
            default:
                this.alertService.error("File couldn't be uploaded!");
        }

        switch (true) {
            case UploadedFileCategory.Resume === key && this.fileTypeSupported && allowedFilesize:
                this.resumeUploaded = true;
                break;
            case UploadedFileCategory.Portfolio === key &&
                this.fileTypeSupported &&
                allowedFilesize:
                this.portfolioUploaded = true;
                break;
            case UploadedFileCategory.Photo === key && this.fileTypeSupported && allowedFilesize:
                this.photoUploaded = true;
                break;
            default:
                this.alertService.error(
                    `Please try to upload supported file formats or check maximum allowed file size of 4MB!`,
                );
                break;
        }
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
        this.submitting = true;

        const formValues = {
            attachments: {
                ...this.formValues.attachments,
                ...this.signupForm.value.attachments,
            },
            ...this.signupForm.value,
        };

        this.jobApplicationService.submitForm(formValues).subscribe(
            (result: FormSubmissionResponse) => {
                this.submitting = false;

                this.signupForm.reset();

                this.headerService.scrollToTop();

                this.router.navigate(['/job/success']);
            },
            (error: Error) => {
                this.submitting = false;

                this.alertService.error(error.message);

                this.headerService.scrollToTop();

                // TODO: remove this after backend implementation
                // only for demonstration
                this.router.navigate(['/job/success']);
            },
        );
    }
}
