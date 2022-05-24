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
router.route("/").post(createUser).get(getAllUser);

// api/users/:userId route 
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// api/users/:userId/friends/:friendId route 
router.route("/:userId/friends/:friendId").delete(removeFriend).post(addFriend);

// export route 
module.exports = router;