const reviews=require("../model/reviews")

module.exports.getReviews=(req,res,next)=>{

  reviews.findAll().then((reviews)=>{
    res.status(200).json(reviews);

  }).catch((err)=>{
    console.log(err)
  })

}

module.exports.postReviews=(req,res,next)=>{
  console.log(req.body);
  reviews.create(req.body).then((reviews)=>{
    res.status(200).json(reviews);

  }).catch((err)=>{
    console.log(err)
  })
}