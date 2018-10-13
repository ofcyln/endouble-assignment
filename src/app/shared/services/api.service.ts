import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

export interface ShareElements {
    icon: string;
    name: string;
    link: string;
}

export interface ShareElementsError {
    message: string;
    code: number | null;
}

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    public apiError: ShareElementsError = {
        message: 'There was an error while getting data!',
        code: null,
    };

    constructor(private http: HttpClient) {}

    getSharedElements(url: string): Observable<any> {
        return this.http.get<ShareElements[]>(url);
    }
}
