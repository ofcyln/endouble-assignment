import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeaderService } from '../header.service';

@Component({
    selector: 'app-hamburger-menu',
    templateUrl: './hamburger-menu.component.html',
    styleUrls: ['./hamburger-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HamburgerMenuComponent implements OnInit {
    constructor(public headerService: HeaderService) {}

    ngOnInit() {}
}
