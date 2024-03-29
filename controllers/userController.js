// const { create } = require("domain");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { User, Thoughts } = require("../models");

const userController = {


  // Get all users 
  getAllUser(req, res) {
    User.find()
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
      // .populate('friends')
      // .populate('thoughts')
    .then((users) => {
      if (!users) {
        return res.status(404).json({ message: 'User ID does not exist' });
      }
      res.json(users);
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Update User .updateUser
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    console.log('User updated.');
  },
  // Delete User .deleteUser
  deleteUser(req, res) {
    User.findOneAndDelete(
      { _id: req.params.userId },
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user found with that ID' })
            : res.json({ message: "User deleted"})
          )
      // .then((thought) =>
      // !thought
      // ? res
      // .status(404)
      // .json({ message: "No thoughts to delete" })
      // : Thoughts.findAllAndDelete(
      //   { thoughts: req.param.userId },
      //   { $delete: { thoughts: req.params.userId }},
      //   { new: true }
      // )
      .catch((err) => { res.status(500).json(err);
      });
  },

  // Add friend .addFriend
  addFriend(req, res) {
    console.log('You are adding a friend');
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )      
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No one found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },


  // remove friend .removeFriend
  removeFriend(req, res) {
    console.log('You are removing a friend');
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No one found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

};

module.exports = userController