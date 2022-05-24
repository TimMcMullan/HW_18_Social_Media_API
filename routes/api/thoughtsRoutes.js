const router = require("express").Router();

const {
    getThoughts,
    getOneThought,
    createThoughts,
    deleteThoughts,
    updateThoughts
} = require("../../controllers/thoughtsController")

// api/thoughts route 
router.route("/").get(getThoughts).post(createThoughts);

// api/thoughts/thoughtsId route 
router.route("/:thoughtsId").get(getOneThought).put(updateThoughts).delete(deleteThoughts);

// api/thoughts/:thoughtsId/reaction/ route 
// router.route("/:thoughtsId/reaction").post(addReaction);

// router.route("/:thoughtsId/reaction/:reactionId").delete(removeReaction);

// export route 
module.exports = router;