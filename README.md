# Endouble - Assignment 

Endouble - Job Application Form assignment solution authored by Osman Fikret Ceylan.

## Usage

### Using the project on live environment
The final app hosted on `Google Firebase` server with the `live environment`.
 
Live demo:  https://endouble-assignment.firebaseapp.com

### Using the project with Stackblitz

Simply go to this URL: [https://stackblitz.com/github/ofcyln/endouble-assignment](https://stackblitz.com/github/ofcyln/endouble-assignment)

Stackblitz can only show you the visible UI of the project without cloning it to your local environment. Please not that, for security reasons `Stackblitz` doesn't show images, fonts or font icons that used on the project.

### Using the project on your local environment

Run these commands in the terminal to run the app on your local environment

    git clone https://github.com/ofcyln/endouble-assignment.git

    npm install

    npm start

or if you use yarn as package manager

    git clone https://github.com/ofcyln/endouble-assignment.git

    yarn

    yarn start

#### Development server

Run `npm start` or `yarn start` for a dev server to initialize. 
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Running scripts 

To build the app in `Ahead-Of-Time compilation` you need to run `yarn build:prod` or `npm run build:prod`

To run linter and check the code over tslint rules simply run `yarn lint` or `npm run lint`


#### Code scaffolding

Run `ng generate component component-name` to generate a new component. If you don't have `@angular/cli` as a global package on your system, you can run `npx ng generate component component-name`. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `yarn build:prod` or `npm run build:prod` to build the project. 
The build artifacts will be stored in the `dist/` directory.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



## App's Architecture
* Used latest Angular version 6.2.4

* Used code scaffolding for effective working and clean development environment. Specialized `build`, `deploy`, `lint`, `pre-commit` scripts added to package.json.

* `lint-staged` script cleans and checks the `TypeScript`, `SCSS` codes before committing any changes to the repository. `Prettier` and `tslint` plugins run in this script.

* Endouble assignment project has 3 core components. Namely; `Alert Component` - to inform users for success and error messages on the page efficiently, `Header Component` and `Footer Component`.

* The other components are `Job Component` and its children, which are `Job Application Component` and `Success Component`. Also, the wildcard routing redirection component is `Not-found Component` (404 page).

* Used `SCSS` as a CSS preprocessor to write efficient CSS codes.

* Used new generation `JavaScript (ES6)` with `TypeScript`.

* Used `Angular Services` for sharing app state and data-binding within injected components.

* Used latest `Bootstrap v4.1.3` version to integrate powerful responsive design powered by CSS FlexBox model.

* Used `semantic` HTML tags and elements with semantic class names.

* Modular components created for reusing components elsewhere to improve modularity in the app.

## Motivation of Choices on Implementation
* When a user clicks on the form input on mobile, browser is configured to not automatically zoom in page content for improving UX while writing.

* `ng2-date-picker` plugin is used for birth date selection input in the form. Visually improved this plugin's UI to help UX.

* `ngx-device-detector` plugin is used for mobile device detection to handle mobile specific problems such as gracefully degrading Dropbox upload feature on mobile. 

* `ngx-scroll-to` plugin is used to scroll to the top of the page with a smooth animation.

* The form immediately responses to user interactions with its `validation` checkers.

* `Dutch zip code` control is integrated with `RegExp` to reach to an improved validation.

* `Dropbox upload` is integrated into the project with [Dropbox Developers "Chooser"](https://www.dropbox.com/developers/chooser) interface. Also, the integrated file type and file size controls are used in the `Dropbox Upload` button actions.

* `Native upload` controls is written with browser's native File API to check file type and file size.

* If the user selects a file to upload from the PC with `Native upload` button instead of `Dropbox`, the `Dropbox` upload button is disabled. The same control also applies to the `Dropbox Upload` button selection.

* Mobile browser security reasons prevent users to use `Dropbox upload` on mobile browsers. Hence, on mobile `Dropbox upload` button is removed - graceful degradation. `Native upload` button grants access to installed cloud apps on user's mobile device.

* `aria-label` and `aria-describedby` are integrated into the project to help visually impaired users. Tested over Chrome extension named `ChromeVox` for accessibility compatibility.

* `tabindex` values added for form elements in a numeric order to complete the form just with the use of keyboard for accessibility.

* In case of navigating to a page which doesn't exist in the app, a `wildcard route (404)` is integrated to the project. It redirects users to the `job application` page which is the homepage of the project for demo purposes.

* Instead of using images for icons, font icons are integrated into the project with `Fontello` icon package. `Fontello` just includes preferred icons, this helps to balance the file size of the icon package.

* As the mentioned in PSD file, the fonts `Museo Sans` and `Yanone Kaffesatz` are used as `web fonts`, specified different formats for browser support.

* For instantiating `HTTP GET request`, the project has an `assets` folder which also includes an API folder. It represents a static data of the footer `Follow Us` section links and icons in a `JSON` file.

* Form data is collected and provided on submitting the form. Data is sent asynchronously by `HTTP POST request` with `RxJS` observables. The `HTTP POST request` posts the form data to mock file URL `assets/api`. I also created an interface for a hypothetical response from the server for this request. A refactor must be done when a backend is ready to make it work on live environment. Although this POST request fails on local environment, I intentionally redirected users to success page for demonstration purposes.

* I didn't have time to run a unit test with the configuration for `TestBed` and `Jasmine`.

* `Angular production build configuration` is used for optimizing bundle, using tree-shaking, aot compilation, compression.

* The total bundle size of the app is `~630KB` including all CSS, JS, IMG, FONT and HTML files.

` P.S.: I overcomplicated the app architecture to show my Angular skills. `

