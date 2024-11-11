const express=require("express");
const router=express.Router();
const reviewController=require("../Controllers/review");


router.get('/reviews',reviewController.getReviews);
router.post('/reviews',reviewController.postReviews);
module.exports=router;