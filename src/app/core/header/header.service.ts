import { Injectable } from '@angular/core';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

@Injectable()
export class HeaderService {
    public isNavActive: boolean;

    constructor(private scrollToService: ScrollToService) {}

    toggleNavigation(): void {
        this.isNavActive = !this.isNavActive;
    }

    public scrollToTop(): void {
        const config: ScrollToConfigOptions = {
            target: 'scrollToTopPlaceholder',
        };

        setTimeout(() => {
            this.scrollToService.scrollTo(config);
        }, 200);
    }
}
