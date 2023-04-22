// this is the server part that deals with requests and responses

import express from "express";
import { createUser, getUserByEmail } from "../db/users"; // the actions already set for CRUD operations in users.ts
import { authentication, random } from "../helpers"; // the random token generator

// to log in an existing user
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { password, email } = req.body; // the data entered by the user when logging in (username and password) ;

        if (!email || !password) {
            return res.sendStatus(400); // if no email or password where entered; send back error
        }

        // check if there's a user with this email. If there isn't, then return error
        const user = await getUserByEmail(email).select(
            "+authentication.salt +authentication.password"
        ); // if we don't add this last part select() we won't be able to acces properties authentication and salt
        if (!user) {
            return res.sendStatus(400);
        }

        // authenticate a user without knowing their password
        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(
            salt,
            user._id.toString()
        );

        await user.save();

        // to set the cookie
        res.cookie("test001", user.authentication.sessionToken, {
            domain: "localhost",
            path: "/",
        });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

// to register a new user
export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body; // the data we're getting from the resquest, defined in the authentication schema

        if (!email || !password || !username) {
            return res.sendStatus(400); // if we are missing any of this, send error message
        }

        // to check if the email entered already exists, if it does exist then send error 400
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.sendStatus(400);
        }

        // to generate a random token for the session (salt) and set all the user session info in USER.
        const salt = random();

        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).json(user).end(); // send back a succesfull message, make the user info a json file and then end the process here.
    } catch (error) {
        console.log(error);
        return res.sendStatus(400); // to send error message
    }
};
