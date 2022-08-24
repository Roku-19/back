import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
import { decodeToken, encodeToken } from "../helpers/jwt.helper";

export class ImageService {

    public async getImage(req: Request, res: Response) {
        const doc: any = await decodeToken(req.params.id);
        res.writeHead(200, { 'content-type': doc.type });
        fs.createReadStream(`./src/img/${doc.route}`).on('error', function(error){
            console.log(error.message);
          }).pipe(res);
    };
    
    public saveImage(req: Request, res: Response) {
        if (req.files) {
            const efile = req.files.file as UploadedFile;
            const route: string = efile.name;

            const tk: string = encodeToken({type: efile.mimetype, route: route});

            efile.mv(`./src/img/${route}`, (err: any) => {
                if (err) {
                    res.status(404).send({ message: err })
                } else {
                    res.status(200).send({ successed: true, img: tk })
                }
            });
        };
    };

};