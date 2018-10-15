import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JobComponent } from './job/job.component';
import { JobApplicationComponent } from './job/job-application/job-application.component';
import { SuccessComponent } from './job/success/success.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'job', pathMatch: 'full' },
    {
        path: 'job',
        component: JobComponent,
        children: [
            { path: 'job-application', component: JobApplicationComponent },
            { path: 'success', component: SuccessComponent },
            { path: '**', redirectTo: 'job-application' },
        ],
    },
    { path: '**', redirectTo: 'not-found' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
