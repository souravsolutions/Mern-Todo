import { Todo } from "../models/todo.model.js";
import asyncHandler from "../utils/async-handler.js";

//create Todo korbo
const createTodo = asyncHandler(async (req, res) => {
  const { title, projectId } = req.body;
  const userId = req.user.id;

  if (!title || !projectId) {
    return res.status(400).json({
      success: false,
      message: "Title and Project ID are required",
    });
  }

  const todo = await Todo.create({
    title,
    project: projectId,
    user: userId,
  });

  res.status(201).json({
    success: true,
    message: "Todo created successfully",
    data: todo,
  });
});
//sob todo gulo ke dekhabo userke
const getTodos = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.id;

  const todos = await Todo.find({ project: projectId, user: userId }).sort(
    "-createdAt"
  );

  res.status(200).json({
    success: true,
    message: "Todos fetched successfully",
    data: todos,
  });
});
//update korbo todo ke
const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = await Todo.findByIdAndUpdate(
    id,
    { title, completed },
    { new: true }
  );

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Todo updated successfully",
    data: todo,
  });
});
//delete korbo todoo ke
const deleteTodo = asyncHandler(async (req, res) => {
    const { id } = req.params
    const userId = req.user.id

    const todo = await Todo.findOneAndDelete({_id: id, user: userId})

    if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found or unauthorized",
    });
  }

  res.status(200).json({
    success: true,
    message: "Todo deleted successfully",
  });
});

export { createTodo, getTodos, updateTodo, deleteTodo }