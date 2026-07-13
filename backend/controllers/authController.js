
const { UserSchema } = require("../models/Schema");

const signup = async (req, res) => {
  const user = new UserSchema(req.body);

  try {
    const resultUser = await user.save();
    res.send(resultUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserSchema.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User doesn`t exists" });
  }

  if (user.email === email && user.password === password) {
    res.json(user);
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
};

module.exports = {
  signup,
  login,
};
