const User = require('../model/User');

const getUsersController = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createUserController = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = new User({ firstName, lastName, email, password });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.findById(id);
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) user.password = password;
    await user.save();
    res.json(user);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
};
const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const
user = await User.findByIdAndDelete(id);
    res.json({message: "kullanıcı silindi",user});
  }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getUsersController,
    createUserController,
    updateUserController,
    deleteUserController
};