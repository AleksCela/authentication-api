import database from "../src/databaseConnectivity.js";
export function containsNumber(str) {
    return /\d/.test(str);
}


export function containsSpecialChars(str) {
    const specialChars = /[!?:.]/;
    return specialChars.test(str);
}


export async function validateUsername(username) {
    const usernameCheck = await database.raw(`select username from loginInfo where username='${username}'`)
    console.log(usernameCheck);
    if (usernameCheck.length > 0) {
        console.log("Username already exist");
        return false;
    } else if (username.length < 5 || username.length > 12) {
        console.log("Username must be between 5 and 12 characters");
        return false
    }
    else {
        return true
    }
}


export function validatePassword(password) {
    if (password.length < 5 || password.length > 12 || !containsNumber(password) || !containsSpecialChars(password)) {
        return false
    } else {
        return true
    }
}