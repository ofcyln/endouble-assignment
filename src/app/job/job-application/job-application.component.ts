import { Component, EventEmitter, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePickerDirective, IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { DropboxChooserService } from './dropbox-chooser.service';
import { UploaderOptions, UploadFile, UploadInput, UploadOutput } from 'ngx-uploader';
import { AlertService } from '../../core/alert/alert.service';

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

    public ngxUploaderOptions: UploaderOptions;
    public formData: FormData;
    public uploadingFiles: UploadFile[];
    public uploadInput: EventEmitter<UploadInput>;
    public uploadFileOutput: EventEmitter<UploadOutput>;
    public humanizeBytes: Function;
    public dragOver: boolean;
    public contentLoaded: boolean = false;
    public uploadEvent: UploadInput;

    private readonly DOCUMENT_EXTENSIONS = ['.docx', '.doc', '.pdf', '.txt', '.rtf'];
    private readonly IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

    constructor(
        private dropboxChooserService: DropboxChooserService,
        private alertService: AlertService,
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

        console.log(this.signupForm);
        // this.signupForm.reset();
    }
}
