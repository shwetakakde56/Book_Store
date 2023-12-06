import express, { request, response } from "express";
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
//import { Book } from "./models/bookmodel.js";

import bookRoute from "./routes/bookRoute.js";
import cors from "cors";



// Middleware for parsing request body
const app = express();
app.use(express.json());

//Middleware for handling cors policy
// Optin 1: Allow all origins with default cors(*)
app.use(cors());

// Optin 2: Allow Custom origin
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:[ 'GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders:[ 'content-Type'],
//     })
// );

app.get('/', (request, response) => {

    console.log(request);
    return response.status(234).send("Welcome to Shweta's book store")
});

app.use('/books', bookRoute)

mongoose
.connect(MongoDBURL)
.then(() => {
    console.log("App is connected to mongoose Database");
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);

});