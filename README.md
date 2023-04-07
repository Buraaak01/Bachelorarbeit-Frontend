# Macro Fit

Bachelorarbeit - UI der Anwendung in Angular

## Voraussetzungen

- NodeJS und NPM installiert ([Anleitung: Installation NodeJS & NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))
- Befehl `npm install` im Projektverzeichnis ausführen

## Development

- `ng serve` für lokale Entwicklung gegen lokale Spring Boot Rest API
  - UI: `http://localhost:4200/` (App lädt neu bei Änderungen)
  - Backend: `http://localhost:8080/`
  - Konfiguration [config.json](src/assets/config/config.json)

## Integration von NgRx
NgRx wird in dieser Anwendung für das State-Management verwendet. Die folgenden Ordner/Dateien sind mit NgRx verbunden:

* [src/app/ngrx-store](src/app/ngrx-store): Enthält den mit NgRx zusammenhängenden Code des Stores.
* [src/app/ngrx-store/actions](src/app/ngrx-store/actions): Enthält die Action-Creator.
* [src/app/ngrx-store/effects](src/app/ngrx-store/effects): Enthält die NgRx-Effekte.
* [src/app/ngrx-store/reducer](src/app/ngrx-store/reducer): Enthält die Reducer, die den Anwendungsstatus verwalten.
* [src/app/ngrx-store/selectors](src/app/ngrx-store/selectors): Enthält die Selector, die einen Teil des Anwendungsstatus auswählen und zurückgeben.
* [src/app/ngrx-store/state](src/app/ngrx-store/state): In diesem Ordner befindet sich der Anwendungsstatus. Der Anwendungsstatus ist ein Objekt, das alle relevanten Daten der Anwendung enthält.

## Integration von Bootstrap
Bootstrap wird in dieser Anwendung für das Styling und das Layout verwendet. Die Bootstrap-CSS- und JavaScript-Dateien sind über die Datei [angular.json](angular.json) miteingebunden.
