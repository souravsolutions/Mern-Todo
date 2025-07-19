import { Project } from "../models/project.model.js";
import asyncHandler from "../utils/async-handler.js";

//Project banabo
const createProject = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Project name is required",
    });
  }

  const existing = await Project.findOne({ name, user: userId });

  if (existing) {
    return res
      .status(400)
      .json({ success: false, message: "Project already exists" });
  }

  const project = await Project.create({
    name,
    user: userId,
  });

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project,
  });
});
//Project gulo sob user id onujai proteker project proteker kache show korbo
const getUserProject = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const projects = await Project.find({ user: userId }).sort("-createdAt");

  res.status(200).json({
    success: true,
    message: "Projects fetched successfully",
    data: projects,
  });
});
//project update korbo
const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedProject = await Project.findByIdAndUpdate(
    id,
    { name },
    {
      new: true,
    }
  );

  if (!updatedProject) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: updatedProject,
  });
});
//project Delete korbo
const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const project = await Project.findOneAndDelete({ _id: id, user: userId });

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found or unauthorized",
    });
  }

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});


export { createProject, getUserProject, updateProject, deleteProject }