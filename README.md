# NgGeneratePicture

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

## Objectif de l'exercice

Créer une carte d'adhésion en recourant à une webcam
Plus spécifiquement, on va recourir au package ngx-webcam
https://www.npmjs.com/package/ngx-webcam
Il faut ensuite importer WebcamModule dans le tableau des imports

Pour disposer d'un backend rapidement : 
`npx create-strapi-app my-project --quickstart`
Ce qui implique, pour interagir avec d'ajouter httpClientModule au tableau des imports. L'interaction se fera par le biais d'un service. 

Au lieu du datepiker natif HMTL5, on utilise ici : 
https://www.npmjs.com/package/ng2-date-picker
`npm i ng2-date-picker`
qui implique d'importer au tableau des imports DpDatePickerModule
import {DpDatePickerModule} from 'ng2-date-picker';

Pour la création de nouveau membre, on utilisera ReactiveFormsModule à ajouter au tableau des imports
import { ReactiveFormsModule } from "@angular/forms";

## Coté strapi
La création de la collection member génère côté backend un modèle
api/member/member.settings.json

## Coté formulaire
La nouveauté pour moi, c'est l'imbrication de FormGroup destiné à l'adresse dans le FormGroup destiné à member.
Et le truc qui peut sembler contre intuitif si tant est qu'on puisse parler d'intuition ou de ressenti quand on fait du procédural, c'est la syntaxe qui suit pour le inner FormGroup :
` <div formGroupName="address">`
à l'intérieur de :
`<form [formGroup]="createMember" (ngSubmit)="create()">`

le fait d'avoir un modèle de données côté backend ne dispense pas de devoir créer des modèles côté frontend pour bénéficier d'un typage fort, comme nous y insite toujours codeconcept dans le suivi de ses cours

d'où le recours à : 
`ng g interface models/adress`
`ng g interface models/member`


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
