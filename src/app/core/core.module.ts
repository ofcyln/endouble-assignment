import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [HeaderComponent, FooterComponent],
    imports: [CommonModule, SharedModule, AppRoutingModule],
    providers: [],
    exports: [AppRoutingModule, HeaderComponent, FooterComponent],
})
export class CoreModule {}
