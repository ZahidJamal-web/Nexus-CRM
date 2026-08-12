import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const protect = asyncHandler(async (req, res, next) => {
  console.log("========== HEADERS ==========");
  console.log(req.headers);
  console.log("=============================");

  const authHeader = req.get("Authorization");
  console.log("Authorization:", authHeader);

  if (!authHeader) {
    throw new ApiError(401, "Not authorized, no token provided");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Invalid authorization format");
  }

  const token = authHeader.substring(7);

  console.log("Token:", token);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  req.user = user;
  next();
});