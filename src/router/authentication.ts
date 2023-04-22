import express from "express";

import { login, register } from "../controllers/authentication";

// here we're explicitely setting the router
export default (router: express.Router) => {
    router.post("/auth/register", register);
    router.post("/auth/login", login);
};
