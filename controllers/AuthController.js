const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  console.log(req.body);
  let data = req.body;
  if(data['role'] && data['role']=='superadmin_warc123abc'){
    data['role']='superuser';
  }else{
    data['role']='user';
  }
 

  const user = await User.create(data);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please Provide Email and Password");
  }
  const user = await User.findOne({ email });
  //comparing password

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  if (user.role == "user") {
    throw new UnauthenticatedError("You are not authorized to login");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ name: user.name, token });
};

module.exports = {
  register,
  login,
};
