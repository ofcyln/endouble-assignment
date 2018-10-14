import { Injectable } from '@angular/core';

@Injectable()
export class HeaderService {
    public isNavActive: boolean;

    constructor() {}

    openNavigation(): void {
        this.isNavActive = !this.isNavActive;
    }
}
