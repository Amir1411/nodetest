import express from 'express';
import 'dotenv/config';
import cors from "cors";
import path from "path";
import glob from "glob";
import chalk from "chalk";
import bodyParser from "body-parser";
import db from "./mongodb/db.js";


const app = express();
const port = process.env.port || 3003;

// logger
app.use(cors());
app.use(db());

// 3rd party middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'config')));
const initRoutes = (app) => {
    // including all routes
    glob("./routes/*.js", {
        cwd: path.resolve("./src")
    }, (err, routes) => {
        if (err) {
            console.log(chalk.red("Error occured including routes"));
            return;
        }
        routes.forEach((routePath) => {
            require(routePath).setRouter(app);
        });
        console.log(chalk.green("included " + routes.length + " route files"));
    });
};
initRoutes(app);

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
});

