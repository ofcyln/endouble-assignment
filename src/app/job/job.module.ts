import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JobComponent } from './job.component';
import { JobApplicationComponent } from './job-application/job-application.component';

@NgModule({
    declarations: [JobComponent, JobApplicationComponent],
    imports: [CommonModule, FormsModule],
})
export class JobModule {}
