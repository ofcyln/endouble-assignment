import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { JobApplicationComponent } from './jobs/job-application/job-application.component';

const appRoutes: Routes = [
    {
        path: '',
        component: JobsComponent,
        children: [{ path: 'job-application', component: JobApplicationComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
