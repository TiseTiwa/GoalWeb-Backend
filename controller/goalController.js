const goalsModel = require("../models/Goals");

// ======= CONTROLLER FOR CREATE/POST NEW GOAL ========

const AddnewGoal = async (req, res) => {
  try {
    const { title, description, progress } = req.body;

    const goal = await goalsModel.create({ title, description, progress });

    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ======== CONTROLLER TO GET ALL EXISTING GOALS THAT HAS BEEN CREATED =======

const getAllGoals = async (req, res) => {
  try {
    const goals = await goalsModel.find();

    res.status(200).json(goals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ====== CONTROLLER TO GET A SINGLE GOAL BY ID =====

const getEachGoal = async (req, res) => {
  try {
    const goal = await goalsModel.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.status(200).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ====== CONTROLLER TO GET ALL ONGOING GOALS ====== (Progress < 100%)

const onGoingGoals = async (req, res) => {
  try {
    const goinggoals = await goalsModel.find({ progress: { $lt: 100 } });

    console.log("Ongoing goals retrieved:", goinggoals);

    res.status(200).json(goinggoals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ====== CONTROLLER TO GET ALL COMPLETED GOALS ==== (Progress === 100%)

const completedGoals = async (req, res) => {
  try {
    const goals = await goalsModel.find({ progress: 100 });
    console.log("Completed goals retrieved:", goals);

    res.status(200).json(goals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ===== CONTROLLER TO UPDATE/PATCH PROGRESS BY ID =====

const updateProgress = async (req, res) => {
  try {
    const { progress } = req.body;

    if (progress === undefined) {
      return res.status(400).json({ error: "Progress value is required" });
    }

    const progressUpdate = await goalsModel.findByIdAndUpdate(
      req.params.id,
      { progress },
      { new: true }
    );

    // if the goal does'nt exist, return a 404 err0r
    if (!progressUpdate) {
      return res.status(404).json({ error: "Goal not found" });
    }

    res.status(200).json(progressUpdate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  ==== CONTROLLER FOR DELETING GOAL BY ID

const deleteGoal = async (req, res) => {
  try {
    const deleteGoal = await goalsModel.findByIdAndDelete(req.params.id);

    if (!deleteGoal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  AddnewGoal,
  getAllGoals,
  getEachGoal,
  onGoingGoals,
  completedGoals,
  updateProgress,
  deleteGoal,
};
