import { Router, Request, Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  console.log("Incoming Data: ", req.body);
  const { username, password } = req.body;
  // find the user in the database by username
  const user = await User.findOne({
    where: { username: username },
  });
  console.log("User: ", user);
  // if the user does not exist, return a 401 status
  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  // compare the password with the hashed password
  const passwordIsValid = await bcrypt.compare(password, user.password);
  console.log("is Valid: ", passwordIsValid);
  // if the password is invalid, return a 401 status
  if (!passwordIsValid) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  // get the secret key from the environment variables
  const secretKey = process.env.JWT_SECRET_KEY || "";
  // create a JWT token
  const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
  // return the token
  console.log("Token: ", token);
  return res.json({ token });
  // TODO: If the user exists and the password is correct, return a JWT token
};

const router = Router();

// POST /login - Login a user
router.post("/login", login);

export default router;
