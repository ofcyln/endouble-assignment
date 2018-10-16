import { Component, EventEmitter, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { DatePickerDirective, IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { UploaderOptions, UploadFile, UploadInput, UploadOutput } from 'ngx-uploader';
import { DropboxChooserService } from './dropbox-chooser.service';
import { AlertService } from '../../core/alert/alert.service';
import { HeaderService } from '../../core/header/header.service';

export interface FormValues {
    personalData: {
        address: string;
        country: string;
        email: string;
        firstName: string;
        gender: 'Gender';
        houseNumber: string;
        lastName: string;
        birthDate: string;
        phone: string;
        zipCode: string;
    };
    attachments: {
        motivation: string;
        uploadPhoto: string;
        uploadPhotoDropbox: string;
        uploadPortfolio: string;
        uploadPortfolioDropbox: string;
        uploadResume: string;
        uploadResumeDropbox: string;
    };
    sendCopy: boolean;
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

    public formValues: FormValues;

    public genderModel: string = 'Gender';

    public datePickerConfig: IDatePickerDirectiveConfig;

    public resumeDropboxLink: string = '';
    public portfolioDropboxLink: string = '';
    public photoDropboxLink: string = '';

    public ngxUploaderOptions: UploaderOptions;
    public uploadingFiles: UploadFile[];
    public uploadInput: EventEmitter<UploadInput>;
    public dragOver: boolean;
    public uploadEvent: UploadInput;

    private readonly DOCUMENT_EXTENSIONS = ['.docx', '.doc', '.pdf', '.txt', '.rtf'];
    private readonly IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

    constructor(
        private dropboxChooserService: DropboxChooserService,
        private alertService: AlertService,
        private router: Router,
        private headerService: HeaderService,
    ) {}

    ngOnInit() {
        this.datePickerConfig = {
            locale: 'en',
            format: 'DD.MM.YYYY',
            monthFormat: 'DD.MM.YYYY',
            drops: 'down',
            showGoToCurrent: false,
        };

        this.ngxUploaderOptions = {
            concurrency: 1,
            maxUploads: 1,
            allowedContentTypes: [
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/msword',
                'application/rtf',
                'text/plain',
                'application/pdf',
                'image/jpeg',
                'image/png',
            ],
        };
        this.uploadingFiles = [];
        this.uploadInput = new EventEmitter<UploadInput>();
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

    onUploadOutput(output: UploadOutput): void {
        if (output.type === 'allAddedToQueue') {
            this.uploadInput.emit(this.uploadEvent);
        } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
            if (output.file.size > 4e6) {
                this.alertService.error(
                    'Allowed file size is 4Mb, your file is bigger than allowed size!',
                );
            } else {
                this.uploadingFiles.push(output.file);
            }
        } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
            const index = this.uploadingFiles.findIndex(
                (file) => typeof output.file !== 'undefined' && file.id === output.file.id,
            );

            this.uploadingFiles[index] = output.file;
        } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
            this.alertService.error('File type is not correct!');
        } else if (output.type === 'removed') {
            this.uploadingFiles = this.uploadingFiles.filter(
                (file: UploadFile) => file !== output.file,
            );
        } else if (output.type === 'dragOver') {
            this.dragOver = true;
        } else if (output.type === 'dragOut') {
            this.dragOver = false;
        } else if (output.type === 'drop') {
            this.dragOver = false;
        } else if (output.file.progress.data.percentage === 100) {
            this.alertService.success('File uploaded successfully!');
        }
    }

    startUpload(): void {
        this.uploadEvent = {
            type: 'uploadAll',
            url: 'https://endouble-assignment.firebaseio.com/file.json',
            method: 'POST',
            data: { foo: 'bar' },
        };

        this.uploadInput.emit(this.uploadEvent);
    }

    onSubmit() {
        this.submitted = true;

        let form = this.formValues;
        form = this.signupForm.value;

        console.log(form);

        this.signupForm.reset();

        this.headerService.scrollToTop();

        this.router.navigate(['/job/success']);
    }
}
