const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addThoughtResponse,
  removeThoughtResponse,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/responses
router.route('/:thoughtId/responses').post(addThoughtResponse);

// /api/thoughts/:thoughtId/responses/:responseId
router.route('/:thoughtId/responses/:responseId').delete(removeThoughtResponse);

module.exports = router;
