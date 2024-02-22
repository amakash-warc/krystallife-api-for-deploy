const jwt = require("jsonwebtoken");
const { UnauthenticatedError} = require("../errors");

const auth = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Auth Token Missing");
  }

  const token = authHeader.split(" ")[1];
  //console.log(token);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userID: payload.userID, role: payload.role };
    if(req.user.role == 'user'){
      throw new UnauthenticatedError("You are not authorised to login.");
    }
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("Invalid Auth Token");
  }
};

module.exports = auth;
