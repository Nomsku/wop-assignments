"use strict";
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { login } = require("../controllers/authController");
const { addUser } = require("../models/userModel");
const { httpError } = require("../utils/errors");
const bcryptjs = require('bcryptjs');

router.post("/login", login);

const user_post = async (req, res, next) => {
  try {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error('user_post validation', errors.array());
      next(httpError('Invalid data', 400));
      return;
    }

    const salt = bcryptjs.genSaltSync(10);
    const pwd = bcryptjs.hashSync(req.body.passwd, salt);

    const data = [
      req.body.name,
      req.body.email,
      pwd,
    ];

    const result = await addUser(data, next);
    if (result.affectedRows < 1) {
      next(httpError('Invalid data', 400));
      return;
    }

    res.json({
      message: 'user added',
      user_id: result.insertId,
    });
  } catch (e) {
    console.error('user_post', e.message);
    next(httpError('Internal server error', 500));
  }
};

router.post(
  "/register",
  body("name").isLength({ min: 3 }).escape(),
  body("email").isEmail(),
  body("passwd").matches("/(?=.*p{Lu}).{8,}/u"),
  user_post
);

module.exports = router, user_post;