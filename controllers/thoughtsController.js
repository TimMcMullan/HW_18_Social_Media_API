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
            //   .select('-__v')
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
    deleteCourse(req, res) {
        Course.findOneAndDelete({ _id: req.params.courseId })
            .then((course) =>
                !course
                    ? res.status(404).json({ message: 'No course with that ID' })
                    : Student.deleteMany({ _id: { $in: course.students } })
            )
            .then(() => res.json({ message: 'Course and students deleted!' }))
            .catch((err) => res.status(500).json(err));
    },


    
    // Update a course
    updateCourse(req, res) {
        Course.findOneAndUpdate(
            { _id: req.params.courseId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((course) =>
                !course
                    ? res.status(404).json({ message: 'No course with this id!' })
                    : res.json(course)
            )
            .catch((err) => res.status(500).json(err));
    },


};

module.exports = { thoughtsController }

