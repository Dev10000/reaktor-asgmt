# Reaktor Assignment - Project Birdnest

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)![](https://img.shields.io/badge/license-MIT-green)
  
Deployed client preview: https://reaktor-asgmt.vercel.app/

This is a fully serverless solution and to stay within serverless free tier limits the backend starts fetching data only after someone visits the website and keeps fetching 20 minutes from the last refresh, allowing the user to close the website and return later while still having access to the persistent data. Data is deleted after 10 minutes of the last update from the drone.

While not ideal, this approach was chosen specifically to gain experience with Google Cloud products such as Firebase and Firestore and working with serverless functions in general.

The most challenging aspect of this project was implementing continuous, high-frequency data fetching (long polling) due to limitations inherent in a serverless environment, including maximum execution time, stateless nature, slow cold starts and high costs.

## Screenshot
![Screenshot]()
Todo

## Description

Build and deploy a web application which lists all the pilots who recently violated the NDZ perimeter.

What it looks like is up to you, but this list should

- Persist the pilot information for 10 minutes since their drone was last seen by the equipment
- Display the closest confirmed distance to the nest
- Contain the pilot name, email address and phone number
- Immediately show the information from the last 10 minutes to anyone opening the application
- Not require the user to manually refresh the view to see up-to-date information


[Assigment Detailed Instructions](#assigment-detailed-instructions)

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started - Installation](#getting-started---installation)
- [Deployment](#serverless-and-database)
- [Testing](#testing)
- [License](#license)

## Tech Stack

Serverless Backend

- ![npm](https://img.shields.io/npm/v/typescript?label=TypeScript&logo=typescript) **TypeScript**
- ![npm](https://img.shields.io/npm/v/node?label=Node.js&logo=node.js) **Node.js**
- ![npm](https://img.shields.io/npm/v/firebase?label=firebase&logo=firebase) **Firebase Functions and Firestore DB**
- ![npm](https://img.shields.io/npm/v/ajv?label=AJV&logo=ajv) **AJV JSON Schema Validator**
- ![npm](https://img.shields.io/npm/v/xml2js?label=xml2js&logo=xml2js) **xml2js**


Client

- ![npm](https://img.shields.io/npm/v/react?label=React.js&logo=react) **React.js**
- ![npm](https://img.shields.io/npm/v/next?label=Next.js&logo=next.js) **Next.js**
- ![npm](https://img.shields.io/npm/v/typescript?label=TypeScript&logo=typescript) **TypeScript**
- ![npm](https://img.shields.io/npm/v/tailwindcss?label=TailwindCSS&logo=tailwindcss) **Tailwind CSS**
- ![npm](https://img.shields.io/npm/v/daisyui?label=daisyUI&logo=daisyui) **daisyUI**
- ![npm](https://img.shields.io/npm/v/chart.js?label=Chart.js&logo=chart.js) **Chart.js**
- ![npm](https://img.shields.io/npm/v/react-chartjs-2?label=react-chartjs-2.js&logo=react-chartjs-2) **react-chartjs-2**

Other

- ![npm](https://img.shields.io/npm/v/eslint?label=eslint&logo=eslint) **Eslint**
- ![npm](https://img.shields.io/npm/v/prettier?label=prettier&logo=prettier) **Prettier**
- ![npm](https://img.shields.io/npm/v/airbnb?label=airbnb&logo=airbnb) **Airbnb style guide**

## Getting Started - Installation

This project can be cloned locally with:

```sh
git clone https://github.com/Dev10000/reaktor-asgmt.git
```

### Serverless and Database

```sh
create firestore project in the firebase website console
cd firebase
cd functions
yarn install
npm install -g firebase-tools # Firebase CLI for local development and deployment
firebase login
firebase init firestore # accept the default values and
# Use an existing project for firestore db (the project that you just created in firebase console)
```

Development environment
```sh
yarn build:watch
firebase emulators:start
```

Deployment
```sh
firebase deploy --only functions
```

### Client

Development environment  
```sh
cd client
yarn install
yarn dev
```

Local Build
```sh
yarn build
yarn start
```

Deployment Vercel Cloud
```sh
vercel # Accept all the default configuration
vercel deploy # Preview Deployment
vercel --prod # Production Deployment
```

### Testing

- Todo


## License

This project is licensed under the MIT License - see the LICENSE file for details.

### Code of Conduct

By contributing to this project you agree to adhere to a Contributors Code of Conduct: please read CONDUCT.md before proposing any changes.

## Assigment Detailed Instructions

Todo
