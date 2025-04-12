import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Missing auth token in request headers" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.currentUserId = decoded["userId"];
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
