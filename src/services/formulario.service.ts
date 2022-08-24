import {Request, Response} from "express";
import { Form, IForm } from "../models/formulario.model";

class FormService {
    public newForm(req: Request, res: Response){
        const body = req.body;
        const form: IForm = new Form(body);
        form.save((err:any) =>{
            if(!err){
                res.status(200).json({successed:true})
            }else{
                res.status(200).json({successed:false})
            }
        })
    };

    public getForms(req:Request, res: Response){
        Form.find({}, (err:any, data: IForm[]) => {
            if(!err){
                res.status(200).json({successed:true, forms: data})
            }else{
                res.sendStatus(403);
            };
        });
    };
};

export default FormService;