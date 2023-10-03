import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {

  const { email, password } = req.body;
  console.log("email: ", email);
  console.log("password: ", password);

  const userWithEmail = await User.findOne({ email }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (!userWithEmail) {
    return res.status(404).json({ message: "User not found." });
  }

  if (userWithEmail.password !== password) {
    return res.status(404).json({ message: "Incorrect password." });
  }

  const jwtToken = jwt.sign(
    { id: userWithEmail.id,
      email: userWithEmail.email, 
      name: userWithEmail.name, 
      company: userWithEmail.company, 
      companyID: userWithEmail.companyID,
      companyType: userWithEmail.companyType },
      process.env.JWT_SECRET,
  )

  res.json({ message: "Login successful.", token: jwtToken, user: userWithEmail });
}

export const registerUser = async (req, res) => {
  const { first_name, last_name, email, phone, password, company, companyID, companyType, occupation } = req.body;

  const userWithEmail = await User.findOne({ email }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (userWithEmail) {
    return res.status(404).json({ message: "User with this email already registered." });
  }

  const newUser = new User({ first_name, last_name, email, phone, password, company, companyID, companyType, occupation });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}