const { Thoughts, User } = require('../models');
const thoughtsController = {

    // Get all thoughts
    getThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a thought
    getOneThought(req, res) {
        //   Hook up thought Id with route 
        Thoughts.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThoughts(req, res) {
        Thoughts.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((thoughts) =>
                res.json(thoughts))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete a thought
    deleteThoughts(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json({ message: 'Thought deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // Update a thought
        updateThoughts(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            // not sure about this 
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
        // add a reaction 
    addReaction(req, res) {
        console.log('You are adding a reaction');
        Thoughts.findOneAndUpdate(
          { _id: req.params.thoughtsId },
          { $addToSet: { reactionBody: req.body } },
          { runValidators: true, new: true }
        )
          .then((reactions) =>
            !reactions
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that ID' })
              : res.json(reactions)
          )
          .catch((err) => res.status(500).json(err));
      },


    // remove reaction
        removeReaction(req, res) {
        console.log('You are removing a reaction');
        User.findOneAndUpdate(
          { _id: req.params.thoughtsId },
          { $delete: { reactions: req.params.objectId } },
          { runValidators: true, new: true }
        )
          .then((reactions) =>
            !reactions
              ? res
                  .status(404)
                  .json({ message: 'No reaction with that ID' })
              : res.json(reactions)
          )
          .catch((err) => res.status(500).json(err));
      },

};

module.exports = { thoughtsController }

