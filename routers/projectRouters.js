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
			if (!project) {
				res.status(404).json({ message: "Could not find project" });
			} else {
				res.status(201).json(project);
			}
		})
		.catch((error) => {
			res.status(500).json({ message: "error retrieving the project from database" });
		});
}); // WORKING
router.get("/:id/actions", (req, res) => {
	const id = req.params.id;

	ProjectDb.getProjectActions(id)
		.then((actions) => {
			if (actions.length < 1) {
				res.status(404).json({ message: "Could not find action" });
			} else {
				res.status(201).json(actions);
			}
		})
		.catch((error) => {
			res.status(500).json({ message: "Error retrieving action from database" });
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

	if (!changes.name || !changes.description) {
		res
			.status(400)
			.json({ message: "Invalid entries of Name and-or Description, both are required fields!" });
	} else {
		ProjectDb.update(id, changes)
			.then((result) => {
				res.status(201).json(result);
			})
			.catch((error) => {
				res.status(404).json({ message: "The project with specified ID could not be found" });
			});
	}
}); // WORKING

// ALL ACTION ROUTERS

router.get("/:id/action/:idaction", (req, res) => {
	const id = req.params.id;
	const Aid = Number(req.params.idaction) - 1;

	ProjectDb.getProjectActions(id)
		.then((actions) => {
			if (actions.length < 1) {
				res.status(404).json({ message: "Project of specified ID has no actions!" });
			} else {
				res.status(201).json(actions[Aid]);
			}
		})
		.catch((error) => {
			res.status(500).json({ message: "Error retrieving action from database" });
		});
}); // WORKING **********
router.post("/:id/action", (req, res) => {
	const action = req.body;

	if (!action.project_id || !action.description || !action.notes) {
		res.status(400).json({
			message:
				"Invalid entry! The fields of -project_id- -description- -notes- are required! And must be filled in!",
		});
	} else {
		ActionDb.insert(action)
			.then((action) => {
				res.status(201).json(action);
			})
			.catch((error) => {
				res.status(500).json({ message: "Could not add action to project!" });
			});
	}
}); // WORKING
router.put("/:id/action/:id", (req, res) => {
	let updatedAction = req.body;

	if (!updatedAction.description || !updatedAction.notes) {
		res.status(400).json({ message: "Please provide valid a description and title" });
	} else {
		try {
			ActionDb.get(req.params.id)
				.then((action) => {
					ActionDb.update(action.id, updatedAction)
						.then((result) => {
							res.status(200).json(result);
						})
						.catch((error) => {
							res.status(500).json({ message: "Action update failed!" });
						});
				})
				.catch((error) => {
					console.log(error);
					res.status(500).json({ message: "error retrieving the project actions" });
				});
		} catch {
			res.status(500).json({
				error: "There was an error while saving the updated action to the database",
			});
		}
	}
}); // WORKING
router.delete("/:id/action/:id", (req, res) => {
	ActionDb.remove(req.params.id)
		.then((result) => {
			res.status(200).json({ message: "Action was nuked from orbit!" });
		})
		.catch((error) => {
			res.status(404).json({ message: "Could not find action to delete" });
		});
}); // WORKING

module.exports = router;
