import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { JobsComponent } from './jobs/jobs.component';
import { JobApplicationComponent } from './jobs/job-application/job-application.component';

@NgModule({
    declarations: [AppComponent, JobsComponent, JobApplicationComponent],
    imports: [BrowserModule, CoreModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
