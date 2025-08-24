const jwt = require("jsonwebtoken");

// roles = optional array of allowed roles (e.g., ["admin"])
const protect = (roles = []) => {
  return (req, res, next) => {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN
    if (!token) return res.status(401).json({ msg: "Not authorized" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check roles if specified
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ msg: "Forbidden" });
      }

      // Attach user info to request
      req.user = decoded;
      next();
    } catch (err) {
      console.error("JWT Middleware Error:", err.message);
      res.status(401).json({ msg: "Token invalid" });
    }
  };
};

module.exports = protect;
