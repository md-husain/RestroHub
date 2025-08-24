# Restaurant Management System

## Technology

<ul>
<li>Angular</li>
<li>MongoDB</li>
<li>NodeJS</li>
<li>ExpressJS</li>
</ul>

## PROJECT SETUP

## Local Environment Setup

- Git
- Node.js
- npm
- PostMan / ThunderClient
- Visual Studio Code

> Create a .env file in backend folder and adjust the following environment variables. DONOT include the file in the source control.

```bash
CONNECTION_STRING = <value>
JWT_TOKEN = <value>
PORT = <value>
SALT = <value>
```

> Create a new folder environment. inside environment folder create two ts file {environment.prod.ts, environment.ts} and adjust the following environment variables. DONOT include the file in the source control.

>> In environment.prod.ts

```bash
export const environment = {
  production: true,
  apiURL: <value>,
};
```

>> In environment.ts

```bash
export const environment = {
  production: false,
  apiURL: <value>,
};
```
> Create a new Database on mongodb and put the CONNECTION_STRING on CONNECTION_STRING
