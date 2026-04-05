const { JwtService } = require("../../infrastructure/auth/jwtService");

const jwtService = new JwtService(process.env.JWT_SECRET, "1h");

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "No token" });
  }

  const token = header.split(" ")[1];

  try {
    const user = jwtService.verifyToken(token);
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { authMiddleware };
