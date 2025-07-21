import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/async-handler.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  const accessTokenOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    expires: new Date(Date.now() + 5 * 60 * 1000),
  };

  const refreshTokenOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };

  if (!accessToken && !refreshToken) {
    return res.status(401).json({
      success: false,
      message: "No authentication tokens found",
      location: "Token",
    });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
        location: "User",
      });
    }

    req.user = { id: user.id };
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === 'JsonWebTokenError') {
      try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
          return res.status(403).json({
            success: false,
            message: "Invalid refresh token",
            location: "RefreshToken",
          });
        }

        const newAccessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "5m",
        });
        const newRefreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: "24h",
        });

        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie("accessToken", newAccessToken, accessTokenOptions);
        res.cookie("refreshToken", newRefreshToken, refreshTokenOptions);

        req.user = { id: user.id };

        return next();
      } catch (refreshError) {
        return res.status(403).json({
          success: false,
          message: "Session expired. Please login again.",
          location: "Session",
        });
      }
    }

    console.error("Token Error:", error);

    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
      location: "Token",
    });
  }
});
