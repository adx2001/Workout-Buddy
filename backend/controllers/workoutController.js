const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {
  const workout = await Workout.find({}).sort({ createdAt: -1 });
  res.status(201).json(workout);
};

//get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "no such workout" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(401).json({ error: "no such workout found" });
  }
  res.status(201).json(workout);
};

//create new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  //add doc to db
  try {
    const workout = await Workout.create({ title, reps, load }); // Use await to wait for database operation
    res.status(201).json(workout); // Use res.status(201) for successful resource creation
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "no such workout" });
  }
  const workout = await Workout.findByIdAndDelete({ _id: id });
  if (!workout) {
    res.status(400).json({ error: "no such workout" });
  }
  res.status(201).json(workout);
};

//update a workout
const updateWorkout=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:'no such workout found'})
    }
    const workout= await Workout.findByIdAndUpdate({_id:id},{
        ...req.body
    })
    
    if(!workout){
        res.status(400).json({error:"no such workout to update"})
    }
    res.status(201).json(workout)

}

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
};
