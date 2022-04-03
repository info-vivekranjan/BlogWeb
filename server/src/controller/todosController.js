const express = require("express");
const router = express.Router();
const todos = require("../model/todoModel");
const CONSTANTS = require("../constants/constant");

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
