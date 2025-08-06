const express = require("express");
const {
  AddnewGoal,
  getAllGoals,
  getEachGoal,
  onGoingGoals,
  completedGoals,
  updateProgress,
  deleteGoal,
} = require("../controller/goalController");

const router = express.Router();

// Create a route for addNewGoals
router.post("/", AddnewGoal);

// Create a route for getAllGoals
router.get("/all", getAllGoals);

// Create a route for onGoingGoals
router.get("/ongoing", onGoingGoals);

// Create a route for completedGoals
router.get("/completed", completedGoals);

// Create a route for getEachGoal... anytime you are getting with id it should be dynamic
router.get("/:id", getEachGoal);

// Create a route for updateProgress
router.patch("/:id/progress", updateProgress);

// Create a route for deleteGoal
router.delete("/:id/delete", deleteGoal);

module.exports = router;

