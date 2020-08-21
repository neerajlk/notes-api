const jwt = require("jsonwebtoken");
const User = require('../models/user.model')

const paths = ['/login', '/user']

exports.routeGaurd = function (req, res, next) {
    if (paths.includes(req.path)) {
        next()
    }
    else {
        if (!req.headers.authorization)
            return res.status('401').send({message:'Unauthorized'});
        else {
            if (jwt.decode(req.headers.authorization)) {
                jwt.verify(req.headers.authorization, 'mysecretkey', function (err, decoded) {
                    if (err) {
                        return res.status('401').send({message:'Session Expired'});
                    }
                    else {
                        User.findById(jwt.decode(req.headers.authorization).user.id).then(user => {
                            if (user)
                                next()
                            else
                                return res.status('401').send({message:'Unauthorized'});
                        })
                    }
                });
            }
            else {
                return res.status('401').send({message:'Unauthorized'});
            }
        }
    }

}