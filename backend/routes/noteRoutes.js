const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
} = require("../controller/noteController");

router.use(verifyJWT);
router
  .route("/")
  .get(getAllNotes)
  .post(createNewNote)
  .patch(updateNote)
  .delete(deleteNote);

module.exports = router;
