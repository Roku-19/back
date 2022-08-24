import mongoose from "mongoose";

export interface IForm extends mongoose.Document{
    dni: string,
    nombres: string,
    apellidos: string,
    fecha_nacimiento: string,
    email: string,
    img: string
};

const FormSchema = new mongoose.Schema({
    dni: {type:String, required: true},
    nombres: {type:String, required: true},
    apellidos: {type:String, required: true},
    fecha_nacimiento: {type:String, required: true},
    email: {type:String, required: true},
    img: {type:String, required: true}
});

export const Form = mongoose.model<IForm>("Form", FormSchema);