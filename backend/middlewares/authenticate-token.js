const jwt = require("jsonwebtoken");

exports.authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = verifiedToken.userId;
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "cannot verify token" });
  }
};
