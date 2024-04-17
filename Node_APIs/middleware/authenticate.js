// // middleware/authenticate.js

// const jwt = require("jsonwebtoken");
// const secretKey = "Hasti@522004";

// function authenticate(req, res, next) {
//   const token = req.headers["authorization"];
//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Failed to authenticate token" });
//     }
//     req.userId = decoded.id; // Store user ID in request object
//     next();
//   });
// }

// module.exports = authenticate;
