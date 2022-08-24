import {Application} from "express";
import FormService from "../services/formulario.service";
import { ImageService } from "../services/imagenes.service";

export class FormController{
    
    private fcont: FormService;
    private icont: ImageService;

    constructor(private app: Application){
        this.fcont = new FormService();
        this.icont = new ImageService();
        this.routes();
    };

    private routes(){           
        this.app.route("/form")
            .post(this.fcont.newForm)
            .get(this.fcont.getForms);

        this.app.route("/img")
            .post(this.icont.saveImage);

        this.app.route("/img/:id")
            .get(this.icont.getImage);
    };
};