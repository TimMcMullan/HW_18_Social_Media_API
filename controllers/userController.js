const { create } = require("domain");
const { User, Thoughts } = require("../models");

const userController = {


    // Get all users 
    getUser(req, res) {
        User.fine()
        .select('-__v')
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // create user 
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
        // Get one user by ID 
        getSingleUser(req, res) {
            User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            then((dbUserData) => {
                if(!dbUserData) {
                    return res.status(404).json({ message: 'User ID does not exist' });
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
        }


   

    // Update User .updateUser

    // Delete User .deleteUser

    // Add friend .addFriend

    // remove friend .removeFriend
    // : Student.deleteMany({ _id: { $in: course.students } }) - maybe for deleting thoughts associated with user 


}

module.exports = userController