const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  // let images = [];

  // if (typeof req.body.images === "string") {
  //   images.push(req.body.images);
  // } else {
  //   images = req.body.images;
  // }

  // const imagesLinks = [];

  // for (let i = 0; i < images.length; i++) {
    //  console.log(images[i]);
  //   const result = await cloudinary.v2.uploader.upload(images[i], {
  //     folder: "products",
  //   });

  //   imagesLinks.push({
  //     public_id: result.public_id,
  //     url: result.secure_url,
  //   });
  // }
  

  // req.body.images = imagesLinks;
  console.log(req.body);
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = parseInt(process.env.productspp);
  
  const productsCount = await Product.countDocuments();
  const page = req.query.page || 1;
  const skipitem = resultPerPage * (page - 1);
  let products=[];
  let productsc
  // const products = await Product.find()

  // const apiFeature = new ApiFeatures(Product.find(), req.query)
  //   .search()
  //   .filter();

  // let products = await apiFeature.query;


  // apiFeature.pagination(resultPerPage);

  // products = await apiFeature.query;
  // const products = await Product.find()
 
 console.log("running");
 
  // SADASDASDASDAS=SDASDSAD
  if(req.query.country&&req.query.city&&req.query.provience){
    products= await Product.find({$and:[{"name":{$regex:req.query.keyword,$options:"i"}},{"category":{$regex:req.query.category,$options:"i"}},{city:req.query.city},{active:true}]}).skip(skipitem).limit(resultPerPage);
    productsc= await Product.find({$and:[{"name":{$regex:req.query.keyword,$options:"i"}},{"category":{$regex:req.query.category,$options:"i"}},{city:req.query.city},{active:true}]}) ;}

  else if(req.query.country&&req.query.provience)
  { products= await Product.find({$and:[{"name":{$regex:req.query.keyword,$options:"i"}},{"category":{$regex:req.query.category,$options:"i"}},{provience:req.query.provience},{active:true}]}).skip(skipitem).limit(resultPerPage);
  productsc= await Product.find({$and:[{"name":{$regex:req.query.keyword,$options:"i"}},{"category":{$regex:req.query.category,$options:"i"}},{provience:req.query.provience},{active:true}]});}

  else if(req.query.country)
  { products= await Product.find({$and:[{"name":{$regex:req.query.keyword,$options:"i"}},{"category":{$regex:req.query.category,$options:"i"}},{country:req.query.country},{active:true}]}).skip(skipitem).limit(resultPerPage);
  productsc= await Product.find({$and:[{"name":{$regex:req.query.keyword,$options:"i"}},{"category":{$regex:req.query.category,$options:"i"}},{country:req.query.country},{active:true}]});}
 else if(req.query.city&&req.query.provience)
 {console.log("city and provience")
 products= await Product.find({$and:[{"name":{$regex:req.query.keyword,$options:"i"}},{"category":{$regex:req.query.category,$options:"i"}},{city:req.query.city},{active:true}]}).skip(skipitem).limit(resultPerPage);
 productsc= await Product.find({$and:[{"name":{$regex:req.query.keyword,$options:"i"}},{"category":{$regex:req.query.category,$options:"i"}},{city:req.query.city},{active:true}]}) ;}
 else if(req.query.city){console.log("city")
  products= await Product.find({$and:[{"name":{$regex:req.query.keyword,$options:"i"}},{"category":{$regex:req.query.category,$options:"i"}},{city:req.query.city},{active:true}]}).skip(skipitem).limit(resultPerPage);
  productsc= await Product.find({$and:[{"name":{$regex:req.query.keyword,$options:"i"}},{"category":{$regex:req.query.category,$options:"i"}},{city:req.query.city},{active:true}]}) ;}

 else if(req.query.provience){console.log("provience")
 products= await Product.find({$and:[{"name":{$regex:req.query.keyword,$options:"i"}},{"category":{$regex:req.query.category,$options:"i"}},{provience:req.query.provience},{active:true}]}).skip(skipitem).limit(resultPerPage);
 productsc= await Product.find({$and:[{"name":{$regex:req.query.keyword,$options:"i"}},{"category":{$regex:req.query.category,$options:"i"}},{provience:req.query.provience},{active:true}]});}
 else{console.log("All")
   
 products= await Product.find({$and:[{"name":{$regex:req.query.keyword,$options:"i"}},{"category":{$regex:req.query.category,$options:"i"}},{active:true}]}).skip(skipitem).limit(resultPerPage);
 productsc= await Product.find({$and:[{"name":{$regex:req.query.keyword,$options:"i"}},{"category":{$regex:req.query.category,$options:"i"}},{active:true}]});}
 

 let filteredProductsCount = productsc.length;

console.log(filteredProductsCount);
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });});
exports.getUserProducts = catchAsyncErrors(async (req, res, next) => {
  console.log(req.params.userid)
  const products = await Product.find({userid:req.params.userid});

  res.status(200).json({
    success: true,
    products,
  }); 
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  // for (let i = 0; i < product.images.length; i++) {
  //   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  // }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
