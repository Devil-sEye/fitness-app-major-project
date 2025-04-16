"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var User = require('../models/User');

var bcrypt = require('bcrypt'); // Register a new user


exports.registerUser = function _callee(req, res) {
  var _req$body, username, email, password, age, gender, existingUser, salt, hashedPassword, newUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, age = _req$body.age, gender = _req$body.gender; // Check if user already exists by email

          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'User with this email already exists'
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 9:
          salt = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 12:
          hashedPassword = _context.sent;
          // Create new user instance
          newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            gender: gender,
            age: age,
            isAdmin: false
          }); // Save to DB

          _context.next = 16;
          return regeneratorRuntime.awrap(newUser.save());

        case 16:
          res.status(201).json({
            message: 'User registered successfully'
          });
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.error('Error registering user:', _context.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
}; // Login user


exports.loginUser = function _callee2(req, res) {
  var _req$body2, email, password, user, isMatch, _user$_doc, pwd, userData;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 9:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Invalid credentials'
          }));

        case 12:
          _user$_doc = user._doc, pwd = _user$_doc.password, userData = _objectWithoutProperties(_user$_doc, ["password"]);
          res.status(200).json({
            message: 'Login successful',
            user: userData
          });
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.error('Error during login:', _context2.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
}; // Get all users


exports.getAllUsers = function _callee3(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.find().select('-password'));

        case 3:
          users = _context3.sent;
          // Exclude passwords
          res.status(200).json(users);
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error('Error fetching users:', _context3.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Get user by ID


exports.getUserById = function _callee4(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.id).select('-password'));

        case 3:
          user = _context4.sent;

          if (user) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));

        case 6:
          res.status(200).json(user);
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error('Error fetching user:', _context4.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // Update user


exports.updateUser = function _callee5(req, res) {
  var userId, _req$body3, username, email, age, gender, password, updatedData, salt, updatedUser;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          userId = req.params.id;
          _req$body3 = req.body, username = _req$body3.username, email = _req$body3.email, age = _req$body3.age, gender = _req$body3.gender, password = _req$body3.password;
          _context5.prev = 2;
          updatedData = {
            username: username,
            email: email,
            age: age,
            gender: gender
          }; // If password is provided, hash it

          if (!password) {
            _context5.next = 11;
            break;
          }

          _context5.next = 7;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 7:
          salt = _context5.sent;
          _context5.next = 10;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 10:
          updatedData.password = _context5.sent;

        case 11:
          _context5.next = 13;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(userId, updatedData, {
            "new": true,
            runValidators: true
          }).select('-password'));

        case 13:
          updatedUser = _context5.sent;

          if (updatedUser) {
            _context5.next = 16;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));

        case 16:
          res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
          });
          _context5.next = 23;
          break;

        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](2);
          console.error('Error updating user:', _context5.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 23:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 19]]);
};