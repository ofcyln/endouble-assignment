import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MyBriefcaseComponent } from './header/my-briefcase/my-briefcase.component';
import { LogoComponent } from './header/logo/logo.component';
import { SearchComponent } from './header/search/search.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        MyBriefcaseComponent,
        LogoComponent,
        SearchComponent,
    ],
    imports: [CommonModule, SharedModule, AppRoutingModule],
    providers: [],
    exports: [AppRoutingModule, HeaderComponent, FooterComponent],
})
export class CoreModule {}
