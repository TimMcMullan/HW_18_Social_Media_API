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
        Thoughts.findOne({ _id: req.params.thoughtsId })
            // .select('-__v')
            .then((thoughts) => {
                if (!thoughts) {
                    return res.status(404).json({ message: 'No thought with that ID' });
                }
                res.json(thoughts);
            })
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThoughts(req, res) {
        Thoughts.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { $addToSet: { thought: req.body} },
                    { new: true }
                );
            })
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: 'user ID not found',
                    })
                    : res.json("Thought added!")
            )
            .catch((err) => {
                console.log(err);
            });
    },
    // Delete a thought
    deleteThoughts(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtsId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json({ message: 'Thought deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // Update a thought
    updateThoughts(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
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
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thoughtData) =>
            !thoughtData
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that ID' })
              : res.json(thoughtData)
          )
          .catch((err) => res.status(500).json(err));
},


    // remove reaction
            removeReaction(req, res) {
            console.log('You are removing a reaction');
            Thoughts.findOneAndUpdate(
              { _id: req.params.thoughtsId },
              { $pull: { reactions: {reactionId: req.params.reactionId } } },
              { runValidators: true, new: true }
            )
              .then((thoughtData) =>
                !thoughtData
                  ? res
                      .status(404)
                      .json({ message: 'No reaction with that ID' })
                  : res.json(thoughtData)
              )
              .catch((err) => res.status(500).json(err));
          },
        };



    module.exports = thoughtsController;

