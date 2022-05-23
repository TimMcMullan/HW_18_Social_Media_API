const router = require("express").Router();

const {
    getThoughts,
    getOneThought,
    createThoughts,
    deleteThoughts,
    updateThoughts
} = require("../../controllers/thoughtsController")

// api/users route 
router.route("/").get(getThoughts).post(createThoughts);

// api/users/thoughtsId route 
router.route("/:thoughtsId").get(getOneThought).put(updateThoughts).delete(deleteThoughts);

// api/users/:thoughtsId/reaction/:reactionId route 
// router.route("/:thoughtsId/reaction/").post(addReaction)

// router.route("/:thoughtsId/reaction/:reactionId").delete(removeReaction);

// export route 
module.exports = router;