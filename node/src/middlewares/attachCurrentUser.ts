// TO DO: delete this middleware and add the correct implementation
//        in auth middleware. UserId should be the one logged in
export const attachCurrentUser = (req, res, next) => {
  const userIdFromHeader = req.headers["currentuserid"];

  if (!userIdFromHeader) {
    return res
      .status(401)
      .json({ error: "Missing currentUserId request header" });
  }

  req.currentUserId = Number(userIdFromHeader);
  next();
};
