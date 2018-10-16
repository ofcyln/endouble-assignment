import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JobComponent } from './job.component';
import { JobApplicationComponent } from './job-application/job-application.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { DropboxChooserService } from './job-application/dropbox-chooser.service';
import { RouterModule } from '@angular/router';
import { SuccessComponent } from './success/success.component';
import { NgxUploaderModule } from 'ngx-uploader';

@NgModule({
    declarations: [JobComponent, JobApplicationComponent, SuccessComponent],
    imports: [CommonModule, FormsModule, DpDatePickerModule, RouterModule, NgxUploaderModule],
    providers: [DropboxChooserService],
})
export class JobModule {}
