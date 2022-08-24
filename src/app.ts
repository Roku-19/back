import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";

import { resolve } from "path";
import { config } from "dotenv";
import { FormController } from "./controllers/formulario.controller";

config({ path: resolve(__dirname, "../.env") });

class App {

    public app: Application;
    public fmcont: FormController;

    constructor() {
        this.app = express();
        this.setConfig();
        this.setMongoConfig();

        this.fmcont = new FormController(this.app);
    };

    private setConfig() {
        this.app.use(fileUpload());
        this.app.use(helmet({crossOriginResourcePolicy: false,}));
        this.app.use(morgan("short"));
        this.app.use(compression());
        this.app.use(express.json({ limit: "50mb" }));
        this.app.use(express.urlencoded({ limit: "50mb", extended: true }));
        this.app.use(cors());

        this.app.use(async (req: Request, res: Response, next) => {
            next();
        });     
    };

    private setMongoConfig() {
        mongoose.Promise = global.Promise;

        mongoose.connect(process.env.MNG_URI!, {}, (err: any) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Base de datos Conectada!");
            }
        });
    };

};




export default new App().app