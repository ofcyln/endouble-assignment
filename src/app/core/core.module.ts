import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [HeaderComponent, FooterComponent],
    imports: [AppRoutingModule],
    exports: [AppRoutingModule, HeaderComponent, FooterComponent],
})
export class CoreModule {}
