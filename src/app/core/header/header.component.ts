import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public isNavActive: boolean;

    constructor() {}

    ngOnInit() {}

    openNavigation(): void {
        this.isNavActive = !this.isNavActive;
        console.log(this.isNavActive);
    }
}
