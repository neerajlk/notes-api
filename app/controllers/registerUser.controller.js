const User = require('../models/user.model.js');
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Create and Save a new Note
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
            res.status(200).send("User Created");
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};




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

// Find a single note with a noteId
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


    // try {

    //     const userCred = new User({
    //         email: req.body.email,
    //         password: Bcrypt.hashSync(req.body.password, 10)
    //     });

    //     var user = await UserModel.findOne({ username: request.body.username }).exec();
    //     if(!user) {
    //         return response.status(400).send({ message: "The username does not exist" });
    //     }
    //     if(!Bcrypt.compareSync(request.body.password, user.password)) {
    //         return response.status(400).send({ message: "The password is invalid" });
    //     }
    //     response.send({ message: "The username and password combination is correct!" });
    // } catch (error) {
    //     response.status(500).send(error);
    // }



// Update a note identified by the noteId in the request
// exports.update = (req, res) => {
//     // Validate Request
//     if (!req.body.content) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         });
//     }

//     // Find note and update it with the request body
//     Note.findByIdAndUpdate(req.params.noteId, {
//         title: req.body.title || "Untitled Note",
//         content: req.body.content
//     }, { new: true })
//         .then(note => {
//             if (!note) {
//                 return res.status(404).send({
//                     message: "Note not found with id " + req.params.noteId
//                 });
//             }
//             res.send(note);
//         }).catch(err => {
//             if (err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: "Note not found with id " + req.params.noteId
//                 });
//             }
//             return res.status(500).send({
//                 message: "Error updating note with id " + req.params.noteId
//             });
//         });
// };

// Delete a note with the specified noteId in the request
// exports.delete = (req, res) => {
//     Note.findByIdAndRemove(req.params.noteId)
//         .then(note => {
//             if (!note) {
//                 return res.status(404).send({
//                     message: "Note not found with id " + req.params.noteId
//                 });
//             }
//             res.send({ message: "Note deleted successfully!" });
//         }).catch(err => {
//             if (err.kind === 'ObjectId' || err.name === 'NotFound') {
//                 return res.status(404).send({
//                     message: "Note not found with id " + req.params.noteId
//                 });
//             }
//             return res.status(500).send({
//                 message: "Could not delete note with id " + req.params.noteId
//             });
//         });
// };