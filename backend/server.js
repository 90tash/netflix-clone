import express from "express";
import cookieParser from "cookie-parser";

import cors from 'cors';
import authRoute from "./route/auth.route.js";
import movieRoute from "./route/movie.route.js";
import tvRoute from "./route/tv.route.js";
import searchRoute from "./route/search.route.js";


import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

import { protectRoute } from "./middleware/protectRoute.js";

const app = express();



app.use(cors({
    origin: ['http://localhost:5173', 'https://netflix-clone-dusky-nine-67.vercel.app'],
    credentials: true,
}));





const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie", protectRoute, movieRoute);
app.use("/api/v1/tv", protectRoute, tvRoute);
app.use("/api/v1/search", protectRoute, searchRoute);



app.listen(PORT, () => {
    console.log("Server started at http:/localhost:" + PORT);
    connectDB();
});




// user name mongodb:- myvivobook11
// password:-ykZolJUuwuGPdO93