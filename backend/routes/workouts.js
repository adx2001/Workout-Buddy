
const {createWorkout,getWorkouts,getWorkout,deleteWorkout,updateWorkout} =require('../controllers/workoutController')

// GET all workouts
router.get("/", getWorkouts) 

// GET a single workout
router.get("/:id", getWorkout)

// POST a new workout
router.post("/", createWorkout)

// DELETE a workout
router.delete("/:id",deleteWorkout)

// Update a workout
router.patch("/:id",updateWorkout )

module.exports = router;
