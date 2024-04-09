# Lead up API Documentation

To utilize the data available in the database, I developed an API through which both the web page and the mobile application can GET, POST, UPDATE, and DELETE information such as user data, company details, deliveries, and employee records.

The API is developed using pure JavaScript, leveraging npm packages such as axios, bcrypt, compression, connect-mongo, cors, express, mongoose, googlemaps, passport, and others.


[First time fetching data?](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

## Getting started

To retrieve all the required npm packages, you need to run the following command in your terminal:
```
npm install
```

[What is npm?](https://docs.npmjs.com/about-npm)


Now that you have the packages installed, it's time to understand where the data is being saved and how to establish a connection between the API and the database. Then, we'll explore all the endpoints and the authentication process.


### Where is the data been saved? 

Currently, the data is being saved in MongoDB. However, once version one is completed and in production, a new version will be implemented where some data will be stored in cache using Redis as a cache provider.

[What is MongoDB?](https://www.mongodb.com/es/company/what-is-mongodb)


[What is Redis?](https://redis.io/)

### How is the data been save ?


MongoDB is a NoSQL database that allows developers to work with data without adhering to a specific data structure. However, in this case, we need to create some data structures to keep all the data organized and make it easier to query data when needed.

#### Data models

[Learn all you need to know about Moongose module schemas here!](https://mongoosejs.com/docs/guide.html)


The first data module in our database is the user module. First, it's important to understand that each collection is identified with a specific key. To find all the collection keys, you should look under `src/utils/keys.js.` Keeping all the keys in the same file and exporting them throughout the project makes it easier to modify the key values across the project.

Find the user model on `src/models/auth.js`

- The authSchema creates a new schema for a user.
- The API allows the user to authenticate their credentials by making use of `passport-google-oauth20 and passport-local`.

- When authenticating users using local strategies, the user must provide data such as name, email, and password if it is the first time they are being saved. However, if the user already exists in the database, they must provide their email and password. Keep in mind that data such as photo is not required and it can update at any time

```
const authSchema = new Schema({
  local: {
    name: String,
    email: String,
    password: String,
    photo: String,
  },
  google: {
    id: String,
    email: String,
    name: String,
    photo: String,
  },
});

```

The second data module in our database is the `company` module. This module contains data such as name, address, location, country, phone number, number extension, task, owner ID, and so on. As you can see in the code above, the `location` key-value does not follow any standard notation. However, we have created a separate module to manage the company's location.

- Setting the `unique` property on any key helps avoid having duplicated values in the database. This is useful because we want each value to be unique.
- Setting the `default` property on any key helps manage empty values and also helps avoid null or undefined values in the database.
- To keep track of the latest version of the data saved in the database, a `timestamps` property was added to the company schema. Every time the user updates the data, these changes will also trigger updates to the `timestamps` property.

```
const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: locationSchema,
    country: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Array,
      of: Number,
      default: [],
    },
    numberExtension: {
      type: Number,
      default: 1,
    },
    task: {
      type: Array,
      of: String,
      default: [],
    },
    ownerId: {
      type: Types.ObjectId,
      ref: `${userKey}`,
      require: true,
    },
    placeId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
```


