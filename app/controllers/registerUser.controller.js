const User = require('../models/user.model.js');
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Create and Save a new User
exports.create = (req, res) => {
    // Validate request

    if (!req.body.name) {
        return res.status(400).send({
            message: "name can not be empty"
        });
    }

    if (!req.body.email) {
        return res.status(400).send({
            message: "email can not be empty"
        });
    }

    if (!req.body.password) {
        return res.status(400).send({
            message: "password can not be empty"
        });
    }

    // Create a user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: Bcrypt.hashSync(req.body.password, 10)
    });

    // Save user in the database
    user.save()
        .then(data => {
            res.status(200).send({
                message: "User Registered Successfully"
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};



// User Login
exports.login = (req, res) => {
    User.findOne({ "email": req.body.email }).then(user => {
        if (Bcrypt.compareSync(req.body.password, user.password)) {
            const payload = {
                user: {
                    id: user._id
                }
            }

            jwt.sign(
                payload,
                "mysecretkey", {
                expiresIn: '2h'
            },
                (err, token) => {
                    if (err) throw err;
                    else {
                        const payload = {
                            "_id": user._id,
                            "name": user.name,
                            "email": user.email,
                            "token": token
                        }
                        res.send(payload)
                    }
                }
            );
        }
        else {
            return res.status(500).send({
                message: "Error Logging in"
            });
        }

    }).catch(err => {
        return res.status(500).send({
            message: "Error Logging in"
        });
    });
}

// Find a single User with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId, 'name email')
        .then(person => {
            if (!person) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            res.send(person);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        });
};

