const router = require("express").Router();

const productsRoute = require("../routers/projectRouters.js");

router.get("/", (req, res) => {
	res.status(200).json({ router: "api" });
});

router.use("/projects", productsRoute);

module.exports = router;
