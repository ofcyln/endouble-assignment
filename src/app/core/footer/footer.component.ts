import { Component, OnInit } from '@angular/core';
import { ApiService, ShareElements } from '../../shared/services/api.service';
import { HeaderService } from '../header/header.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    public shareElemets: ShareElements[];

    constructor(private apiService: ApiService, public headerService: HeaderService) {}

    ngOnInit() {
        this.apiService.getSharedElements('../../../assets/api/sharedElementsData.json').subscribe(
            (response: ShareElements[]) => {
                this.shareElemets = response;
            },
            (error) => {
                error = this.apiService.apiError.message;

                console.log(error);
            },
        );
    }
}
