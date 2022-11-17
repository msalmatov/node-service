import express from "express";
import config from "./config";
// import routes from "./routes";

const app = express();

app.set("port", process.env.PORT || config.service.port);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.use("/", routes);

export default app;