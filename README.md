# Traffic Camera Frontend

![App screenshot](/docs/app-screenshot.png)

## Description

Frontend app utilising [open source data from Data.gov](https://guide.data.gov.sg/developer-guide/api-overview) to display traffic camera and weather forecast data.

## Prerequisites

In order the make run the project locally, please ensure that:

- `node` is installed on your machine

## Installation

```bash
$ npm install
```

## Running the app

```bash
# watch mode in development
$ npm run dev
```

The app can be accessed at [http://localhost:5173](http://localhost:5173).

## Possible Enhancements
- Set limit on recent search saved to localStorage
  - Currently the app will keep adding every new search query without a maximum limit to the count
- Add more tests with mocking the useQuery values
