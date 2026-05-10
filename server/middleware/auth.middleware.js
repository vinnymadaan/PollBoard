import jwt from "jsonwebtoken";

import User from "../models/User.models.js";

export const protect = async (req, res, next) => {
  let token;

  try {
    // get token from headers
    const authHeader = req.headers.authorization;

    if (
      authHeader &&
      authHeader.startsWith("Bearer")
    ) {
      token = authHeader.split(" ")[1];

      // verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // get user
      req.user = await User.findById(decoded.id).select(
        "-password"
      );

      next();
    } else {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};