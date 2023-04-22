// autentication helpers.

import crypto from "crypto";

const SECRET = "HAKUNA-MATATA";

// to create random token for later sessiontoken
export const random = () => {
    return crypto.randomBytes(128).toString("base64");
};

// to incript the password
export const authentication = (salt: string, password: string) => {
    return crypto
        .createHmac("sha256", [salt, password].join("/"))
        .update(SECRET)
        .digest("hex");
};
