const express = require("express");
const router = express.Router();
const Products = require("../models/products");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./client/public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//REQUEST GET ALL PRODUCTS
router.get("/", upload.single("articleImage"), (req, res) => {
  Products.find()
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json(`Error : ${err}`));
});

//REQUEST ADD NEW PRODUCTS
router.post("/add", upload.single("articleImage"), (req, res) => {
  const newProduct = new Products({
    sku: req.body.sku,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    qty: req.body.qty,
    articleImage: req.file.originalname,
  });

  newProduct
    .save()
    .then(() => res.json("The new product posted successfully"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//REQUEST FIND ARTICLE BY ID
router.get("/:id", (req, res) => {
  Products.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json(`Eror: ${err}`));
});

//REQUEST FIND PRODUCTS BY ID AND UPDATE
router.put("/update/:id", upload.single("articleImage"), (req, res) => {
  Products.findById(req.params.id)
    .then((product) => {
      // product.name = req.body.name;
      // product.description = req.body.description;
      // product.price = req.body.price;
      // product.itemImage = req.file.originalname;

      (product.sku = req.body.sku),
        (product.name = req.body.name),
        (product.price = req.body.price),
        (product.description = req.body.description),
        (product.qty = req.body.qty),
        (product.articleImage = req.file.originalname),
        product
          .save()
          .then(() => res.json("The product is update successfully"))
          .catch((err) => res.status(400).json(`Error: ${err}`));
    })

    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//REQUEST FIND PRODUCTS BY ID AND DELETE
router.delete("/:id", (req, res) => {
  Products.findByIdAndDelete(req.params.id)
    .then(() => res.json("The product is deleted"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
