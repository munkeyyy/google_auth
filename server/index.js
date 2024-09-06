import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

import { google } from "googleapis";
import passportGoogle from "passport-google-oauth20";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { OAuth2Client } from "google-auth-library";
import userModel from "./models/user.model";
import cookieParser from "cookie-parser";
import querystring from "querystring";
import axios from "axios";


dotenv.config();
const app = express();
const port = 8000;
app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  credentials: true,  // Allow cookies to be sent
  optionsSuccessStatus: 204
}));
app.use(cookieParser());

const connectDb = async () => {
  await mongoose
    .connect(`mongodb://localhost:27017/googleOauth`)
    .then(() => {
      console.log("DB connected!");
    })
    .catch((err) => console.log(err));
};
connectDb();

const redirectURI = "http://localhost:8000/auth/google";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET,
  redirectURI
);
const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];
app.get("/auth/google/url", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  return res.send(authUrl);
});

app.get('/auth/google', async (req, res) => {
  const queryString = new URL(req.url, `http://${req.headers.host}`).searchParams;
  const code = queryString.get('code');
  console.log('Query Parameters:', queryString.toString());
  console.log('Authorization Code:', code);

  if (!code) {
    return res.status(400).send('Authorization code not provided.');
  }

  try {
    // Exchange the authorization code for an access token
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Tokens:', tokens);

    // Set credentials on the OAuth2 client for future API calls
    oauth2Client.setCredentials(tokens);

    // Optionally, fetch user profile information
    const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`);
    
    // Generate a JWT with user info
    const jwtToken = jwt.sign({ user: userInfo.data }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the JWT in a cookie
    res.cookie(process.env.COOKIE_NAME, jwtToken, { httpOnly: true, secure: false });

    // Redirect to the client application with optional token in query params
    res.redirect(`${process.env.CLIENT_URI}?token=${jwtToken}`);
  } catch (error) {
    console.error('Error retrieving access token:', error);
    res.status(500).send('Error retrieving access token');
  }
});

app.get("/user-info",async(req,res)=>{
  try {
    const decoded = jwt.verify(req.cookies[process.env.COOKIE_NAME], process.env.JWT_SECRET);
    console.log("decoded", decoded);
    return res.send(decoded);
  } catch (err) {
    console.log(err);
    res.send(null);
  }
});









app.listen(port, () => {
  console.log(`port started on ${port}`);
});
