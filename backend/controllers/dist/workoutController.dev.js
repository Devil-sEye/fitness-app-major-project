"use strict";

var Workout = require('../models/Workout'); // Create a new workout log


exports.createWorkout = function _callee(req, res) {
  var _req$body, userId, date, type, duration, exercises, newWorkout, savedWorkout;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, userId = _req$body.userId, date = _req$body.date, type = _req$body.type, duration = _req$body.duration, exercises = _req$body.exercises;

          if (!(!userId || !date || !type || !duration || !exercises)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'All workout fields are required'
          }));

        case 4:
          newWorkout = new Workout({
            userId: userId,
            date: date,
            type: type,
            duration: duration,
            exercises: exercises
          });
          _context.next = 7;
          return regeneratorRuntime.awrap(newWorkout.save());

        case 7:
          savedWorkout = _context.sent;
          res.status(201).json({
            message: 'Workout created successfully',
            workout: savedWorkout
          });
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error('Error creating workout:', _context.t0);
          res.status(500).json({
            message: 'Failed to create workout'
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}; // Get all workouts for a user


exports.getWorkoutsByUser = function _callee2(req, res) {
  var userId, workouts;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.params.userId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Workout.find({
            userId: userId
          }).select('-__v'));

        case 4:
          workouts = _context2.sent;
          res.status(200).json(workouts);
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error('Error fetching workouts:', _context2.t0);
          res.status(500).json({
            message: 'Failed to fetch workouts'
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Get a single workout by ID


exports.getWorkoutById = function _callee3(req, res) {
  var workoutId, workout;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          workoutId = req.params.workoutId;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Workout.findById(workoutId).select('-__v'));

        case 4:
          workout = _context3.sent;

          if (workout) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Workout not found'
          }));

        case 7:
          res.status(200).json(workout);
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.error('Error fetching workout:', _context3.t0);
          res.status(500).json({
            message: 'Failed to fetch workout'
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // Update a workout


exports.updateWorkout = function _callee4(req, res) {
  var workoutId, updatedData, updatedWorkout;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          workoutId = req.params.workoutId;
          updatedData = req.body;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Workout.findByIdAndUpdate(workoutId, updatedData, {
            "new": true,
            runValidators: true
          }));

        case 5:
          updatedWorkout = _context4.sent;

          if (updatedWorkout) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Workout not found'
          }));

        case 8:
          res.status(200).json({
            message: 'Workout updated successfully',
            workout: updatedWorkout
          });
          _context4.next = 15;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.error('Error updating workout:', _context4.t0);
          res.status(500).json({
            message: 'Failed to update workout'
          });

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
}; // Delete a workout


exports.deleteWorkout = function _callee5(req, res) {
  var workoutId, deletedWorkout;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          workoutId = req.params.workoutId;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Workout.findByIdAndDelete(workoutId));

        case 4:
          deletedWorkout = _context5.sent;

          if (deletedWorkout) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'Workout not found'
          }));

        case 7:
          res.status(200).json({
            message: 'Workout deleted successfully'
          });
          _context5.next = 14;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.error('Error deleting workout:', _context5.t0);
          res.status(500).json({
            message: 'Failed to delete workout'
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // Get workout statistics


exports.getWorkoutStats = function _callee6(req, res) {
  var userId, workouts, totalWorkouts, totalDuration;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          userId = req.params.userId;
          _context6.next = 4;
          return regeneratorRuntime.awrap(Workout.find({
            userId: userId
          }));

        case 4:
          workouts = _context6.sent;
          totalWorkouts = workouts.length;
          totalDuration = workouts.reduce(function (acc, workout) {
            return acc + workout.duration;
          }, 0);
          res.status(200).json({
            totalWorkouts: totalWorkouts,
            totalDuration: totalDuration
          });
          _context6.next = 14;
          break;

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          console.error('Error fetching workout statistics:', _context6.t0);
          res.status(500).json({
            message: 'Failed to fetch workout statistics'
          });

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // Get workout summaries, history, logs, plans, goals, or progress (common structure)


exports.getWorkoutOverview = function _callee7(req, res) {
  var userId, workouts;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          userId = req.params.userId;
          _context7.next = 4;
          return regeneratorRuntime.awrap(Workout.find({
            userId: userId
          }).select('date type duration exercises').sort({
            date: -1
          }));

        case 4:
          workouts = _context7.sent;
          res.status(200).json(workouts);
          _context7.next = 12;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          console.error('Error fetching workout overview:', _context7.t0);
          res.status(500).json({
            message: 'Failed to fetch workout overview'
          });

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Get distinct workout types


exports.getWorkoutTypes = function _callee8(req, res) {
  var userId, types;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          userId = req.params.userId;
          _context8.next = 4;
          return regeneratorRuntime.awrap(Workout.find({
            userId: userId
          }).distinct('type'));

        case 4:
          types = _context8.sent;
          res.status(200).json(types);
          _context8.next = 12;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          console.error('Error fetching workout types:', _context8.t0);
          res.status(500).json({
            message: 'Failed to fetch workout types'
          });

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Placeholder for recommendations


exports.getRecommendations = function _callee9(req, res) {
  var userId, recommendations;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          try {
            userId = req.params.userId;
            recommendations = [{
              type: 'Cardio',
              duration: 30
            }, {
              type: 'Strength Training',
              duration: 45
            }];
            res.status(200).json(recommendations);
          } catch (error) {
            console.error('Error fetching recommendations:', error);
            res.status(500).json({
              message: 'Failed to fetch recommendations'
            });
          }

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
};