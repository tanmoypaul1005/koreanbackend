const app = require("express");

const { addReview } = require("../Controller/ReviewsController");
const router = app.Router();

//Add Reviews
router.post('/reviews/add',addReview);

module.exports = router;