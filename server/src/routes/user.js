const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/login", UserController.login)
router.post("/register", UserController.register)

router.use(auth)

router.get("/", UserController.get)
router.put("/", UserController.update)
router.get("/logout", UserController.logout)

module.exports = router;