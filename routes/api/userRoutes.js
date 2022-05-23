const router = require("express").Router();

const {
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
    getAllUser,
} = require("../../controllers/userController")

// api/users route 
router.route("/").get(getAllUser).post(createUser);

// api/users/:userId route 
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// api/users/:userId/friends/:friendId route 
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

// export route 
module.exports = router;