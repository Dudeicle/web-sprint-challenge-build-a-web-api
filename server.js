// DEPENDENCIES //
const express = require("express");
const helmet = require("helmet");

// FIRST LEVEL ROUTER //
const projectsRouters = require("./apiRouter/projects-route.js");

const server = express();

// GLOBAL MIDDLEWARE //
server.use(express.json());
server.use(helmet());

// server will use /api + PROJECTS-ROUTE which will add /projects + projectRouters //
server.use("/api", projectsRouters);

// should see this when first opening page //
server.get("/", (req, res) => {
	res.send(`<h2>Let's write this Sprint Code!</h2>`);
});

module.exports = server;
