import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsComponent } from './jobs.component';
import { JobApplicationComponent } from './job-application/job-application.component';

@NgModule({
    declarations: [JobsComponent, JobApplicationComponent],
    imports: [CommonModule],
})
export class JobsModule {}
