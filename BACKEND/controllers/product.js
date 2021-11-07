const { User, Token, Product } = require("../models");
const { Motherboard } = require("../DB/motherboard");
const { Memory } = require("../DB/memory");
const { Processor } = require("../DB/processor");
const { GPU } = require("../DB/gpu");

const profile = async (req, res) => {
  User.findById(req.user, { password: false }) // id = req.user
    .then((user) => res.status(200).send(user))
    .catch((err) => console.log(err));
};

const getProduct = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const prods = await Product.find({ type: req.params.TYPE });
  res.send(prods);
};

const addProduct = async (req, res) => {
  // console.log(req);
  res.header("Access-Control-Allow-Origin", "*");

  const newProduct = new Product({
    dbType: "Products",
    title: req.headers.title,
    price: req.headers.price,
    img: req.headers.img,
    type: req.headers.type,
  });
  await newProduct.save();

  // for (let i = 0; i < GPU.length; i++) {
  //   const newProduct = new Product({
  //     dbType: "GPU",
  //     title: GPU[i].title,
  //     price: GPU[i].price,
  //     img: GPU[i].img,
  //     type: GPU[i].type,
  //   });
  //   await newProduct.save();
  // }
  res.send(req.headers);
};

const addItemToCart = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  User.findByIdAndUpdate(req.user, {
    $push: {
      cart: {
        item: req.params.id,
        quantity: req.params.quantity,
      },
    },
  }).then((data) => {
    res.send("Successfully saved to DB");
  });
};

const getCartItems = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  User.findById(req.user)
    .populate("cart.item")
    .then((data) => {
      console.log(data.cart);
      res.send(data.cart);
    });
};

const removeFromCart = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  User.findByIdAndUpdate(req.user, {
    $pull: { cart: { _id: req.params.id } },
  }).then(() => {
    User.findById(req.user)
      .populate("cart.item")
      .then((data) => {
        res.send(data.cart);
      });
  });
};

module.exports = {
  profile,
  addProduct,
  getProduct,
  addItemToCart,
  getCartItems,
  removeFromCart,
};
