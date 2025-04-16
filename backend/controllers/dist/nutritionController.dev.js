"use strict";

var NutritionLog = require('../models/NutritionLog'); // Create a new nutrition log


exports.createNutritionLog = function _callee(req, res) {
  var _req$body, userId, date, mealType, foodItems, totalCalories, newLog, savedLog;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, userId = _req$body.userId, date = _req$body.date, mealType = _req$body.mealType, foodItems = _req$body.foodItems, totalCalories = _req$body.totalCalories;
          newLog = new NutritionLog({
            userId: userId,
            date: date,
            mealType: mealType,
            foodItems: foodItems,
            totalCalories: totalCalories
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(newLog.save());

        case 5:
          savedLog = _context.sent;
          res.status(201).json({
            message: 'Nutrition log created successfully',
            log: savedLog
          });
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error('Error creating nutrition log:', _context.t0);
          res.status(500).json({
            message: 'Failed to create nutrition log'
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // Get a nutrition log by ID


exports.getNutritionLogById = function _callee2(req, res) {
  var logId, log;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          logId = req.params.logId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(NutritionLog.findById(logId));

        case 4:
          log = _context2.sent;

          if (log) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'Nutrition log not found'
          }));

        case 7:
          res.status(200).json(log);
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error('Error fetching nutrition log:', _context2.t0);
          res.status(500).json({
            message: 'Failed to fetch nutrition log'
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // Update a nutrition log


exports.updateNutritionLog = function _callee3(req, res) {
  var logId, updatedLog;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          logId = req.params.logId;
          _context3.next = 4;
          return regeneratorRuntime.awrap(NutritionLog.findByIdAndUpdate(logId, req.body, {
            "new": true,
            runValidators: true
          }));

        case 4:
          updatedLog = _context3.sent;

          if (updatedLog) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Nutrition log not found'
          }));

        case 7:
          res.status(200).json({
            message: 'Nutrition log updated successfully',
            log: updatedLog
          });
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.error('Error updating nutrition log:', _context3.t0);
          res.status(500).json({
            message: 'Failed to update nutrition log'
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // Delete a nutrition log


exports.deleteNutritionLog = function _callee4(req, res) {
  var logId, deletedLog;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          logId = req.params.logId;
          _context4.next = 4;
          return regeneratorRuntime.awrap(NutritionLog.findByIdAndDelete(logId));

        case 4:
          deletedLog = _context4.sent;

          if (deletedLog) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Nutrition log not found'
          }));

        case 7:
          res.status(200).json({
            message: 'Nutrition log deleted successfully'
          });
          _context4.next = 14;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.error('Error deleting nutrition log:', _context4.t0);
          res.status(500).json({
            message: 'Failed to delete nutrition log'
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // Get nutrition logs with dynamic filters


exports.getFilteredNutritionLogs = function _callee5(req, res) {
  var _req$query, userId, date, mealType, foodItem, minCalories, maxCalories, startDate, endDate, filter, logs;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$query = req.query, userId = _req$query.userId, date = _req$query.date, mealType = _req$query.mealType, foodItem = _req$query.foodItem, minCalories = _req$query.minCalories, maxCalories = _req$query.maxCalories, startDate = _req$query.startDate, endDate = _req$query.endDate;
          filter = {};
          if (userId) filter.userId = userId;
          if (date) filter.date = date;
          if (startDate && endDate) filter.date = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          };
          if (mealType) filter.mealType = mealType;
          if (foodItem) filter.foodItems = {
            $in: [foodItem]
          };

          if (minCalories && maxCalories) {
            filter.totalCalories = {
              $gte: parseInt(minCalories),
              $lte: parseInt(maxCalories)
            };
          }

          _context5.next = 11;
          return regeneratorRuntime.awrap(NutritionLog.find(filter));

        case 11:
          logs = _context5.sent;

          if (logs.length) {
            _context5.next = 14;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'No matching nutrition logs found'
          }));

        case 14:
          res.status(200).json(logs);
          _context5.next = 21;
          break;

        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5["catch"](0);
          console.error('Error fetching filtered nutrition logs:', _context5.t0);
          res.status(500).json({
            message: 'Failed to fetch filtered nutrition logs'
          });

        case 21:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 17]]);
};