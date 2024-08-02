const express = require("express");
const router = express.Router();
const notesController = require("../controller/notes");

router.post("/create-group", notesController.createGroup);
router.delete("/delete/:groupId", notesController.deleteGroup);
router.get("/all-groups", notesController.getAllGroupData);
router.put("/update-notes/:groupId", notesController.updateGroup);

module.exports = router;
