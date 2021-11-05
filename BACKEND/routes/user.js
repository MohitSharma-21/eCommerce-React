const { Router } = require("express");
const { UserController } = require("../controllers");

const router = Router();

// const { requireAuth } = require('../middleware/verify')


router.post("/login/", UserController.login);
router.post("/signin", UserController.signin);
// router.get("/profile", UserController.profile);

module.exports = router;
