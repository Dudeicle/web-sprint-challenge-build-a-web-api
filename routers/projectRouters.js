// DEPENDENCIES //
const express = require("express");

// IMPORT DB MODELS //
const ProjectDb = require("../data/helpers/projectModel");
const ActionDb = require("../data/helpers/actionModel");

const router = express.Router();

// ALL PROJECT ROUTERS

router.get("/", (req, res) => {
	ProjectDb.get(req.params.id)
		.then((projects) => {
			res.status(201).json(projects);
		})
		.catch((error) => {
			res.status(404).json({ message: "Error retrieving list of projects" });
		});
}); // WORKING
router.get("/:id", (req, res) => {
	ProjectDb.get(req.params.id)
		.then((project) => {
			res.status(201).json(project);
		})
		.catch((error) => {
			res.status(404).json({ message: "Could not find Project with specified id" });
		});
}); // WORKING
router.get("/:id/actions", (req, res) => {
	const id = req.params.id;

	ProjectDb.getProjectActions(id)
		.then((actions) => {
			res.status(201).json(actions);
		})
		.catch((error) => {
			res
				.status(404)
				.json({ message: "Could not get list of actions associated with given project ID" });
		});
}); // WORKING
router.post("/", (req, res) => {
	const project = req.body;

	if (!project.name || !project.description) {
		res
			.status(400)
			.json({ message: "Invalid entry! Both Name and Description are required fields!" });
	} else {
		ProjectDb.insert(project)
			.then((result) => {
				res.status(201).json({ message: "Project was added to database" });
			})
			.catch((error) => {
				res.status(500).json({ message: "Could not add given project to the database" });
			});
	}
}); // WORKING
router.delete("/:id", (req, res) => {
	ProjectDb.remove(req.params.id)
		.then((result) => {
			res.status(201).json({ message: "Project was nuked from orbit!" });
		})
		.catch((error) => {
			res.status(404).json({
				message:
					"The project with the specified ID either does not exist or has already been deleted",
			});
		});
}); // WORKING
router.put("/:id", (req, res) => {
	const id = req.params.id;
	const changes = req.body;

	ProjectDb.update(id, changes)
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((error) => {
			res.status(404).json({ message: "The project with specified ID could not be found" });
		});
}); // WORKING

// ALL ACTION ROUTERS

router.get("/:id/action/:id", (req, res) => {});
router.post("/:id/action", (req, res) => {});
router.put("/:id/action/:id", (req, res) => {});
router.delete("/:id/action/:id", (req, res) => {});

module.exports = router;
