const express = require("express");
const router = express.Router();
const { createTask, getTasks, getTask, deleteTask, updateTask } = require("../controllers/taskControllers")

router.route("/").post(createTask).get(getTasks);
router.route("/:id").get(getTask).delete(deleteTask).put(updateTask);

module.exports = router;
