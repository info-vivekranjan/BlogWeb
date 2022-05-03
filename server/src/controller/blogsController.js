const express = require("express");
const blogs = require("../model/blogModel");
const User = require("../model/blogUsersModel");
const CONSTANTS = require("../constants/constant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { roles } = require("../grantObject");

exports.postBlogs = async (req, res) => {
  const {
    title,
    img,
    href,
    body,
    subTitle_1,
    img_1,
    href_1,
    body_1,
    subTitle_2,
    img_2,
    href_2,
    body_2,
    subTitle_3,
    img_3,
    href_3,
    body_3,
    subTitle_4,
    img_4,
    href_4,
    body_4,
    subTitle_5,
    img_5,
    href_5,
    body_5,
    subTitle_6,
    img_6,
    href_6,
    body_6,
    subTitle_7,
    img_7,
    href_7,
    body_7,
    subTitle_8,
    img_8,
    href_8,
    body_8,
    subTitle_9,
    img_9,
    href_9,
    body_9,
    subTitle_10,
    img_10,
    href_10,
    body_10,
    conclusion_title,
    conclusion_body,
  } = req.body;
  const blog = {
    title,
    img,
    href,
    body,
    subTitle_1,
    img_1,
    href_1,
    body_1,
    subTitle_2,
    img_2,
    href_2,
    body_2,
    subTitle_3,
    img_3,
    href_3,
    body_3,
    subTitle_4,
    img_4,
    href_4,
    body_4,
    subTitle_5,
    img_5,
    href_5,
    body_5,
    subTitle_6,
    img_6,
    href_6,
    body_6,
    subTitle_7,
    img_7,
    href_7,
    body_7,
    subTitle_8,
    img_8,
    href_8,
    body_8,
    subTitle_9,
    img_9,
    href_9,
    body_9,
    subTitle_10,
    img_10,
    href_10,
    body_10,
    conclusion_title,
    conclusion_body,
  };

  await blogs.create(blog, (error, addedBlogs) => {
    if (error) {
      return res.status(500).json({
        code: 2003,
        message: CONSTANTS.SOMETHING_WENT_WRONG,
      });
    } else {
      return res.status(200).json({
        code: 2004,
        message: CONSTANTS.BLOG_ADDED_SUCCESS,
        data: addedBlogs,
      });
    }
  });
};

exports.getAllBlogs = async (req, res) => {
  const pageNumber = parseInt(req.query.pageNumber) || 0;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const skip = pageNumber * pageSize;
  const { title } = req.query;

  const params = {};
  if (req && req.query && req.query.title) {
    params.title = title;
  }

  try {
    let blogData = await blogs.find(params).limit(pageSize).skip(skip);
    if (blogData && blogData.length === 0) {
      return res.status(200).json({
        code: 2000,
        message: CONSTANTS.NO_DATA_FOUND,
        data: blogData,
      });
    } else {
      return res.status(200).json({
        code: 2001,
        message: CONSTANTS.ALL_DATA_SUCCESS,
        data: blogData,
        count: blogData.length,
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

exports.updateBlogs = async (req, res) => {
  const {
    title,
    img,
    href,
    body,
    subTitle_1,
    img_1,
    href_1,
    body_1,
    subTitle_2,
    img_2,
    href_2,
    body_2,
    subTitle_3,
    img_3,
    href_3,
    body_3,
    subTitle_4,
    img_4,
    href_4,
    body_4,
    subTitle_5,
    img_5,
    href_5,
    body_5,
    subTitle_6,
    img_6,
    href_6,
    body_6,
    subTitle_7,
    img_7,
    href_7,
    body_7,
    subTitle_8,
    img_8,
    href_8,
    body_8,
    subTitle_9,
    img_9,
    href_9,
    body_9,
    subTitle_10,
    img_10,
    href_10,
    body_10,
    conclusion_title,
    conclusion_body,
  } = req.body;
  const blog = {
    title,
    img,
    href,
    body,
    subTitle_1,
    img_1,
    href_1,
    body_1,
    subTitle_2,
    img_2,
    href_2,
    body_2,
    subTitle_3,
    img_3,
    href_3,
    body_3,
    subTitle_4,
    img_4,
    href_4,
    body_4,
    subTitle_5,
    img_5,
    href_5,
    body_5,
    subTitle_6,
    img_6,
    href_6,
    body_6,
    subTitle_7,
    img_7,
    href_7,
    body_7,
    subTitle_8,
    img_8,
    href_8,
    body_8,
    subTitle_9,
    img_9,
    href_9,
    body_9,
    subTitle_10,
    img_10,
    href_10,
    body_10,
    conclusion_title,
    conclusion_body,
  };
  try {
    const updateBlogs = await blogs.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });
    if (updateBlogs && updateBlogs.length === 0) {
      return res.status(200).json({
        code: 2000,
        message: CONSTANTS.NO_DATA_FOUND,
        data: updateBlogs,
      });
    } else {
      return res.status(200).json({
        code: 2001,
        message: CONSTANTS.BLOG_UPDATE_SUCCESS,
        data: updateBlogs,
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

exports.deleteBlogs = async (req, res) => {
  try {
    const deletedBlogs = await blogs.findByIdAndDelete(req.params.id);
    return res.status(204).json({
      code: 2001,
      message: CONSTANTS.BLOG_DELETE_SUCCESS,
      data: deletedBlogs,
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
    const { first_name, last_name, email, password, role } = req.body;

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
    if (role) {
      params.role = role;
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
      role: params?.role,
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
