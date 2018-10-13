import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JobComponent } from './job/job.component';
import { JobApplicationComponent } from './job/job-application/job-application.component';

const appRoutes: Routes = [
    {
        path: '',
        component: JobComponent,
        children: [{ path: 'job-application', component: JobApplicationComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
