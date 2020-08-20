module.exports = (app) => {
    const user = require('../controllers/registerUser.controller.js');

    // login
    app.post('/login', user.login)

    // Create a new User
    app.post('/user', user.create);

    // Retrieve a single user with userId
    app.get('/user/:userId', user.findOne);
}