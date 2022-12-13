const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const { authService, userService, emailService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);

  const accessToken = await user.signToken();

  res.status(httpStatus.CREATED).json({ user, accessToken });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUser(email, password);

  const accessToken = await user.signToken();

  res.status(httpStatus.OK).json({ user, accessToken });
});

module.exports = {
  register,
  login,
};
