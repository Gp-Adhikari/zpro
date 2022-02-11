require("dotenv").config({ path: "./.env" });
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";
const compression = require("compression");
const csrf = require("csurf");

const cluster = require("cluster");
import os from "node:os";

import * as React from "react";
import ReactDOM from "react-dom/server";
import { matchPath } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import serialize from "serialize-javascript";
import App from "../shared/App";
import routes from "../shared/routes";

//multer stuff
const multer = require("multer");
multer({ dest: "./public/images", dest: "./public/AppliedApplicant" });

//connecting to mongodb
mongoose.connect(process.env.URI);

//on connection
mongoose.connection.on("connected", () => {
  //   console.log("connected to database.");
});

//on error
mongoose.connection.on("error", () => {
  console.log("Error connecting to database!");
});

const app = express();

//using helmet for security
app.use(helmet());

//limit file size
app.use(express.json({ limit: "50mb" }));

//access cookie easy
app.use(cookieParser());

//csrf protection
app.use(csrf({ cookie: { httpOnly: true, secure: false } }));

//compression
app.use(compression());

//get csrf token
app.get("/api/csrf", (req, res) => {
  return res.status(200).send({ status: true, csrfToken: req.csrfToken() });
});

//require models
require("./models/RefreshToken");
require("./models/Portfolio");
require("./models/VacancyAnnouncement");
require("./models/VacancyApplicant");
require("./models/Contact");
require("./models/Admin");
require("./models/Otp");
require("./models/PageVisit");
require("./models/TotalVisits");

//routes
const authRoute = require("./routes/authRoute");
const contactRoute = require("./routes/contactRoute");
const portfolioRoute = require("./routes/portfolioRoute");
const vacancyRoute = require("./routes/vacancyRoute");
const pageVisitsRoute = require("./routes/pageVisitRoute");

//use routes
app.use("/api", authRoute);
app.use("/api", contactRoute);
app.use("/api", portfolioRoute);
app.use("/api", vacancyRoute);
app.use("/api", pageVisitsRoute);

///////////////////////////////////////////////////////////////////////
app.use(express.static("dist"));

const PageVisit = mongoose.model("PageVisit");
const TotalVisit = mongoose.model("TotalVisit");

app.get("*", (req, res, next) => {
  const activeRoute =
    routes.find((route) => matchPath(route.path, req.url)) || {};

  if (activeRoute.path === "/") {
    const date =
      new Date().getDate() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getFullYear();

    //total visit counter
    TotalVisit.find({}, (err, data) => {
      try {
        const id = String(data[0]._id);
        TotalVisit.findByIdAndUpdate(
          `${id}`,
          {
            visit: parseInt(data[0].visit) + 1,
          },
          (err, data) => {}
        );
      } catch (error) {
        TotalVisit({
          visit: 1,
        }).save();
      }
    });
    PageVisit.find({}, (err, data) => {
      try {
        let dataFound = false;

        //search if today's counter record exists
        data.map((visitsPerDay) => {
          if (
            parseInt(new Date().getDate()) ===
            parseInt(visitsPerDay.createdAt.split("-")[0])
          ) {
            //if today's counter record exists set data found to true
            dataFound = true;
            //update the counter by 1
            PageVisit.findByIdAndUpdate(
              `${visitsPerDay._id}`,
              {
                counter: visitsPerDay.counter + 1,
              },
              (err, data) => {}
            );
          }
        });

        //if the counter field for today doesnt exists
        if (!dataFound) {
          const visits = new PageVisit({
            counter: 1,
            createdAt: date,
          });

          visits.save();
        }
      } catch (error) {}
    });
  }

  try {
    const markup = ReactDOM.renderToString(
      <StaticRouter location={req.url}>
        <App serverData={"hi"} />
      </StaticRouter>
    );

    res.send(`
        <!doctype html>
        <html lang="en">
          <head>
          <title>Zpro - Official Site</title>
            <script src="/bundle.js" defer></script>
            <link href="/main.css" rel="stylesheet">
            <link rel="manifest" href="/manifest.json"/>
            <meta charset="utf-8"/>
            <meta name="theme-color" content="#000000"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
           
          </head>
  
          <body>
            <div id="app">${markup}</div>
          </body>
        </html>
      `);
  } catch (error) {
    next();
  }
});

//if any syntax error occurs ------ do at last
app.use(function (err, req, res, next) {
  if (err.code === "EBADCSRFTOKEN") {
    // handle CSRF token errors here
    res.status(403);
    return res.json({ status: false, message: "Not a valid address." });
  }

  return res
    .status(err.status || 500)
    .json({ status: false, message: "Syntax Error!" });
});

//get number of cpus of server
const numCpu = os.cpus().length;

//if the cluster is master
if (cluster.isMaster) {
  for (let i = 0; i < numCpu; i++) {
    cluster.fork();
  }

  //if worker dies or is killed
  cluster.on("exit", (worker, code, signal) => {
    cluster.fork();
  });
} else {
  app.listen(process.env.PORT || 8080, () => {
    console.log("Port: " + 8080, process.pid);
  });
}
