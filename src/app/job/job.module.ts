import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobComponent } from './job.component';
import { JobApplicationComponent } from './job-application/job-application.component';

@NgModule({
    declarations: [JobComponent, JobApplicationComponent],
    imports: [CommonModule],
})
export class JobModule {}
