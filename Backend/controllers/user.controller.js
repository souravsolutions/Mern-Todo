import asyncHandler from "../utils/async-handler.js";
import ApiResponse from "../utils/api-responce.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const exsistingEmail = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (exsistingEmail) {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
      location: "Email"
    });
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  console.log(user);

  return res
    .status(201)
    .json(new ApiResponse(201, "User Register Sucessfully", user));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User Not Found",
      location: "Not Found"
    });
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      success: false,
      message: "Wrong Password",
      location: "Password"
    });
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const refreshTokenOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  const accessTokenOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  
  user.refreshToken = refreshToken
  await user.save();

  res.cookie("refreshToken", refreshToken, refreshTokenOptions);
  res.cookie("accessToken", accessToken, accessTokenOptions);

  res
    .status(200)
    .json(
      new ApiResponse(201, "Sucessfully Logged In", {
        user,
        accessToken,
        refreshToken,
      })
    );
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("username email");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
})

export { registerUser, loginUser, getMe};
