import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { FormValues } from './job-application.component';
import { environment } from '../../../environments/environment';

// TODO: refactor when backend is ready
// hypothetical response from server
export interface FormSubmissionResponse {
    success: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class JobApplicationService {
    constructor(private httpClient: HttpClient) {}

    submitForm(formValues: FormValues): Observable<FormSubmissionResponse> {
        const endpoint = environment.jobApplicationEndpoint;

        const formData: FormData = new FormData();

        Object.keys(formValues.attachments).forEach((key: string) => {
            formData.append(key, formValues.attachments[key]);
        });

        Object.keys(formValues.personalData).forEach((key: string) => {
            formData.append(key, formValues.personalData[key]);
        });

        formData.append('sendCopy', formValues.sendCopy ? 'true' : 'false');

        return this.httpClient.post<FormSubmissionResponse>(endpoint, formData);
    }
}
