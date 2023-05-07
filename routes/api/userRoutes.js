const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);
router.route('/:userId').delete(deleteUser);
router.route('/:userId').put(updateUser);

// Set up routes for /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend);
router.route('/:userId/friends/:friendId').delete(removeFriend);



module.exports = router;
