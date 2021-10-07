# Interview Scheduler

Interview Scheduler is a Full Stack Web App built in `ReactJS` with `Storybook`, `Cypress`, and `Jest` to learn `ReactJS` and modern web development.

## Final Product

### Days Navigation

![Days Navigation](https://github.com/babakshirvani/Scheduler/blob/master/docs/nav.gif)

### Creating an Appointment

![Creating Appointment](https://github.com/babakshirvani/Scheduler/blob/master/docs/create.gif)

### Deleting an Appointment

![Deleting Appointment](https://github.com/babakshirvani/Scheduler/blob/master/docs/delete.gif)

### Editing an Appointment

![Editing Appointment](https://github.com/babakshirvani/Scheduler/blob/master/docs/edit.gif)

### Real-time Updates via Web Socket

![Real-time Updates](https://github.com/babakshirvani/Scheduler/blob/master/docs/websocket.gif)

## Features

- Users can `create`, `edit`, and `cancel` an Interview/Appointment.
- Users can see the `number of available appointments` for each day
- Users can see `real-time update` for `appointments` booked by other users via `web socket`
- `Automatically updates` the `number of available appointments` for each day

## Technical Information / Stack

- ReactJS
- Storybook
- Cypress
- Jest
- HTML
- Javascript
- PostgreSQL
- SASS

## Dependencies

- axios: ^0.21.4,
- classnames: ^2.2.6,
- normalize.css: ^8.0.1,
- react: ^16.9.0,
- react-dom": ^16.9.0,
- react-scripts: 3.0.0

## Dev Dependencies

- @babel/core: ^7.4.3,
- @storybook/addon-actions: ^5.0.10,
- @storybook/addon-backgrounds: ^5.0.10,
- @storybook/addon-links: ^5.0.10,
- @storybook/addons: ^5.0.10,
- @storybook/react: ^5.0.10,
- @testing-library/jest-dom: ^4.0.0,
- @testing-library/react: ^8.0.7,
- @testing-library/react-hooks: ^7.0.2,
- babel-loader: ^8.0.5,
- node-sass: ^4.14.0,
- prop-types: ^15.7.2,
- react-test-renderer: ^16.9.0"

# Getting Started

## If you like to try the app live...

- **The api server was deployed to heroku using the free plan. After thirty minutes of inactivity our server instance will shutdown. Simply make a request by doing one of the following:**

  i. Go to `https://scheduler-bsh.herokuapp.com/api/days` on your browser
  Or ii. `curl https://scheduler-bsh.herokuapp.com/api/days` on your terminal

- Then browse to [Interview Scheduler](https://scheduler-bsh.netlify.com/)

## If you like to try it with the source code on your Local...

1. Fork and Clone this repository.
2. Follow the steps in [Custom API Server](https://github.com/lighthouse-labs/scheduler-api)

### - Setup:

Install dependencies with

```sh
npm install
```

### -Running Webpack Development Server:

Run the Webpack Development Server with `npm start`. The app will be served at http://localhost:8000/

```sh
npm start
```

### -Running Jest Test Framework

```sh
npm test
```

### -Running Storybook Visual Testbed

```sh
npm run storybook
```
