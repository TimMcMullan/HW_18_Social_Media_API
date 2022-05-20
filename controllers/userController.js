const { create } = require("domain");
const { User, Thoughts } = require("../models");

const userController = {

    // Create User
createUser(req, res) {
    User.create(req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
},
    // Respond a user by ID

    // Update User

    // Delete User
    // : Student.deleteMany({ _id: { $in: course.students } }) - maybe for deleting thoughts associated with user 
}

module.exports = userController