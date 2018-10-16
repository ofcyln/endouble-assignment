import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DropboxChooserService {
    readonly options = {
        // Required. Called when a user selects an item in the Chooser.
        success: (files) => {
            console.log("Here's the file link: " + files[0].link);

            this.result$.next(files[0].link);
        },

        // Optional. Called when the user closes the dialog without selecting a file
        // and does not include any parameters.
        cancel: () => {
            this.result$.error('Dropbox choose canceled!');
        },

        // Optional. "preview" (default) is a preview link to the document for sharing,
        // "direct" is an expiring link to download the contents of the file. For more
        // information about link types, see Link types below.
        linkType: 'preview', // or "direct"

        // Optional. A value of false (default) limits selection to a single file, while
        // true enables multiple file selection.
        multiselect: false, // or true

        // Optional. This is a list of file extensions. If specified, the user will
        // only be able to select uploadingFiles with these extensions. You may also specify
        // file types, such as "video" or "images" in the list. For more information,
        // see File types below. By default, all extensions are allowed.
        extensions: ['.pdf', '.doc', '.docx'],

        // Optional. A value of false (default) limits selection to uploadingFiles,
        // while true allows the user to select both folders and uploadingFiles.
        // You cannot specify `linkType: "direct"` when using `folderselect: true`.
        folderselect: false, // or true

        // Optional. A limit on the size of each file that may be selected, in bytes.
        // If specified, the user will only be able to select uploadingFiles with size
        // less than or equal to this limit.
        // For the purposes of this option, folders have size zero.
        sizeLimit: 4e6, // or any positive number
    };

    private result$: Subject<string> = new Subject();

    constructor() {}

    choose(extensions: string[]) {
        window.Dropbox.choose({
            ...this.options,
            extensions,
        });

        return this.result$;
    }
}
