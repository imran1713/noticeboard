import {NextFunction, Request, Response} from 'express';

const jwt = require('jsonwebtoken');

module.exports = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['token'];
    jwt.verify(token, "GiveYourSecretKeyHere", function (err: any, decoded: any) {
        if (err) {
            res.status(401).json({status:"unauthorized"})
        } else {
            let email = decoded['data'];
            req.headers.email = email
            next();
        }
    })
}