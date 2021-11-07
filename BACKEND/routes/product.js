const { Router } = require("express");
const { ProductController } = require("../controllers");

const router = Router();

const { requireAuth } = require('../middleware/setuser')


router.post("/add-product/", ProductController.addProduct);
router.get("/api/products/:TYPE", ProductController.getProduct);
router.post("/cart/:id/:quantity/", requireAuth ,ProductController.addItemToCart);
router.get("/cart/products", requireAuth ,ProductController.getCartItems);
router.delete("/cart/products/remove/:id", requireAuth ,ProductController.removeFromCart);
// router.post("/signin", UserController.signin);
// router.get("/profile", UserController.profile);

module.exports = router;
