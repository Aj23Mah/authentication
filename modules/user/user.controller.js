const JWT_SECRET = require("../db/secret");
const userSchema = require("./user.schema");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const generateAccessToken=(data) =>{
  return jwt.sign({...data}, JWT_SECRET, { expiresIn: '1800s' });
}

const getUser = async (req, res) => {
  const users = await userSchema.find({});
  res.send({
    data: users,
    status: 200,
    message: "User retrieved successfully",
  });
};

const getUserById = async (req, res) => {
  try {
    const user = await userSchema.findOne({ _id: req.params.id });
    res.send({
      data: user,
      status: 200,
      message: "User retrieved successfully",
    });
  } catch (e) {
    res.status(400).send("User not found");
  }
};

const postUser = async (req, res) => {
  console.log(req.body);
  try {
    const user = await userSchema.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      status: req.body.status ?? 0,
    });
    res.send({
      data: user,
      status: 201,
      message: "User Created successfully",
    });
  } catch (e) {
    res.status(400).send("User could not be created");
  }
};

const putUser = async (req, res) => {
  console.log(req.body);
  const user = await userSchema.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });
  res.send({
    data: user,
    status: 201,
    message: "User Updated successfully",
  });
};

const deleteUser = async (req, res) => {
  const user = await userSchema.deleteOne({ _id: req.params.id });
  res.send("User deleted Successfully");
};

const signupForm = async (req, res) => {
  try {
    const { name, password, email, status } = req.body;

    const existingUser = await userSchema.findOne({ name });

    if (existingUser) {
      return res.send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userSchema({
      name,
      email,
      password: hashedPassword,
      status
    });

    await newUser.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send("Error creating user");
  }
};

const loginForm = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const user = await userSchema.findOne({ $or: [
      {name},
      {email},
    ] }).lean();
    const matchPassword = await bcrypt.compare(password, user.password);
    // if (user.password === req.body.password) {
    //   res.send("Login successful");
    // } else {
    //   res.send("incorrect password");
    // }
    if (matchPassword) {
      // const data ={
      //   _id: user._id,
      //   name: user.name,

      // }
      const token =await generateAccessToken({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
      // const token =await generateAccessToken({
      //   _id: user._id,
      //   name: user.name,
      //   email: user.email,
  
      // });
      res.send({
        data: {
          user,
          token
        }
      });
    } else {
      res.send("incorrect password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:"Error logging in",
      error
    });
  }
};

module.exports = {
  getUser,
  postUser,
  putUser,
  getUserById,
  deleteUser,

  signupForm,
  loginForm,
};
