import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { JobsModule } from './jobs/jobs.module';
import { SharedModule } from './shared/shared.module';
import { ApiService } from './shared/services/api.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        CoreModule,
        JobsModule,
        AppRoutingModule,
        SharedModule,
    ],
    providers: [ApiService],
    bootstrap: [AppComponent],
})
export class AppModule {}
