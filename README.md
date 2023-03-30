# EventApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.2.

The application views and creates new events.

## How to start the application?
1. Install the project 
    `npm install`
2. Start the server
    `npm start`
3. Navigate to `http://localhost:4200/` (Make sure that the back end server is running to get full functionality)

## How to run tests?
1. Install the project 
    `npm install`
2. Run tests
    `npm test`
## Features

### Create new event

A new event can be created using the button 'Add new event' on the main page with the following details:
* Title
* Description
* Start date
* Start time
### View list of past events
All events with start date and time before or equal to the current date and time are displayed as past. It uses REST api to get the list.
### View list of future events

All events that haven't started yet are displayed as past. It uses REST api to get the list.
### View details for an event (applicable for both past and future events)
When clicked on some event (either from the list of past or future events), a modal is displayed with the details. REST api is used to retrieve the details using the id of the event.

The following details are displayed:
* Title
* Description
* Start date
* Start time
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
