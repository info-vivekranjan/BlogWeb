const express = require("express");
const todos = require("../model/todoModel");
const User = require("../model/todoUsersModel");
const CONSTANTS = require("../constants/constant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { roles } = require("../grantObject");

exports.postTodos = async (req, res) => {
  const { title, status } = req.body;
  const todo = {
    title,
    status,
  };

  await todos.create(todo, (error, addedTodos) => {
    if (error) {
      return res.status(500).json({
        code: 2003,
        message: CONSTANTS.SOMETHING_WENT_WRONG,
      });
    } else {
      return res.status(200).json({
        code: 2004,
        message: CONSTANTS.TODO_ADDED_SUCCESS,
        data: addedTodos,
      });
    }
  });
};

exports.getAllTodos = async (req, res) => {
  const pageNumber = parseInt(req.query.pageNumber) || 0;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const skip = pageNumber * pageSize;
  const { title } = req.query;

  const params = {};
  if (req && req.query && req.query.title) {
    params.title = title;
  }

  try {
    let todoData = await todos.find(params).limit(pageSize).skip(skip);
    if (todoData && todoData.length === 0) {
      return res.status(200).json({
        code: 2000,
        message: CONSTANTS.NO_DATA_FOUND,
        data: todoData,
      });
    } else {
      return res.status(200).json({
        code: 2001,
        message: CONSTANTS.ALL_DATA_SUCCESS,
        data: todoData,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 2010,
      message: CONSTANTS.SOMETHING_WENT_WRONG,
    });
  }
};

exports.updateTodos = async (req, res) => {
  const { title } = req.body;
  const todo = {
    title,
  };
  try {
    const updateTodos = await todos.findByIdAndUpdate(req.params.id, todo, {
      new: true,
    });
    if (updateTodos && updateTodos.length === 0) {
      return res.status(200).json({
        code: 2000,
        message: CONSTANTS.NO_DATA_FOUND,
        data: updateTodos,
      });
    } else {
      return res.status(200).json({
        code: 2001,
        message: CONSTANTS.TODO_UPDATE_SUCCESS,
        data: updateTodos,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 2010,
      message: CONSTANTS.SOMETHING_WENT_WRONG,
    });
  }
};

exports.deleteTodos = async (req, res) => {
  try {
    const deletedTodos = await todos.findByIdAndDelete(req.params.id);
    return res.status(204).json({
      code: 2001,
      message: CONSTANTS.TODO_DELETE_SUCCESS,
      data: deletedTodos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 2010,
      message: CONSTANTS.SOMETHING_WENT_WRONG,
    });
  }
};

exports.registerUser = async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    const params = {};
    if (first_name) {
      params.first_name = first_name;
    }
    if (last_name) {
      params.last_name = last_name;
    }
    if (email) {
      params.email = email;
    }
    if (password) {
      params.password = password;
    }

    // Validate user input
    if (
      !(
        params?.email &&
        params?.password &&
        params?.first_name &&
        params?.last_name
      )
    ) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email: params?.email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    let encryptedPassword = await bcrypt.hash(params?.password, 10);

    // Create user in our database
    const user = await User.create({
      first_name: params?.first_name,
      last_name: params?.last_name,
      email: params?.email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email: params?.email },
      "TodoToken123",
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    const params = {};
    if (email) {
      params.email = email;
    }
    if (password) {
      params.password = password;
    }

    // Validate user input
    if (!(params?.email && params?.password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email: params?.email });

    if (user && (await bcrypt.compare(params?.password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email: params.email },
        "TodoToken123",
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json({
        code: 2001,
        message: "Signed in successfully",
        data: user,
      });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    return res.status(500).json({
      code: 2002,
      message: CONSTANTS.SOMETHING_WENT_WRONG,
    });
  }
};

exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

exports.allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user)
      return res.status(401).json({
        error: "You need to be logged in to access this route",
      });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
