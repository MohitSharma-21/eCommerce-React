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

  const prod = await Product.find({ _id: req.params.id });
  // console.log(prod);

  const currItem = new Product({
    dbType: "Cart",
    quantity: req.params.quantity,
    title: prod[0].title,
    price: prod[0].price,
    img: prod[0].img,
  });
  await currItem.save();
  res.send("Successfully saved to DB");
};

const getCartItems = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const prods = await Product.find({ dbType: "Cart" });
  res.send(prods);
};

const removeFromCart = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  await Product.findOneAndDelete({ _id: req.params.id, dbType: "Cart" });

  const prods = await Product.find({ dbType: "Cart" });
  res.send(prods);
};

module.exports = {
  profile,
  addProduct,
  getProduct,
  addItemToCart,
  getCartItems,
  removeFromCart,
};
