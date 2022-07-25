# Backend Car
A simple social media application.

# Getting started

To get the Node server running locally:

- Clone this repo
- Install Docker
- `yarn` to install all required dependencies
- `docker compose up` to bring up the MySQL database
- `yarn dev` to start the local server
- Install Postman to play it

# API Guide

### Get all cars with filters

`GET /cars`

Use `GET` method on postman with query params

```js
http://localhost:8889/users?year={year}&make={make}&name={modelName}
```

### Read car with ID

`GET /cars/:id`

Use `GET` method on postman

```js
http://localhost:8889/cars/caridHere
```

### Create Car

`POST /cars`

Use `Post` method on postman with `Body` option `raw` with `JSON`

```js
{
    "licensePlate": "string",
    "registration": "string",
    "vin": "string",
    "color": "string",
    "registrationState": "string",
    "registrationName": "string",
    "registrationExpiration": "date:07/11/2025",
    "carValue": number,
    "currentMileage": number,
    "description": "string"
}

```

```js
http://localhost:8889/cars
```

### Update Car

`PUT /cars/:id`

Use `Put` method on postman with `Body` option `raw` with `JSON`

Assume VIN is unchangeable 

```js
{
    "licensePlate": "string",
    "registration": "string",
    "color": "string",
    "registrationState": "string",
    "registrationName": "string",
    "registrationExpiration": "date:07/11/2025",
    "carValue": number,
    "currentMileage": number,
    "description": "string"
}

```

```js
http://localhost:8889/cars/caridHere
```

### DELETE Car

`DELETE /cars/:id`

Use `Delete` method on postman


```js
http://localhost:8889/cars/caridHere
```

