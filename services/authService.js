const User = require("../schemes/User");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { SALT_ROUNDS, JWT_SECRET } = require("../config")

async function createUser(data) {
    let { email, username, password } = data;

    if (email.trim() == "" || username.trim() == "" || password.trim() == "") {
        throw { message: "All Fields are required" }
    }

    if (!validator.isEmail(email)) {
        throw { message: "Invalid email" }
    }

    let user = await User.findOne({ username: username.toLowerCase().trim() });

    if (user) {
        throw { message: "User exist" }
    }

    const passwordHash = bcrypt.hashSync(password.trim(), SALT_ROUNDS);

    const userObj = new User({ username: username.trim(), email: email.trim(), password: passwordHash });

    return userObj.save();
}

async function register(data) {
    try {
        await createUser(data);
    } catch (err) {
        throw { message: err.message }
    }

    const user = await User.findOne({ username: data.username });

    let token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "2h" });

    return { sessionToken: token, objectId: user._id }
}

async function login(data) {
    let { email, username, password } = data;

    if (email == "" || username == "" || password == "") {
        throw { message: "All Fields are required" }
    }

    let user = await User.findOne({ username: username.toLowerCase() });

    if (!user) {
        throw { message: "Invalid username and password" }
    }

    let isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
        throw { message: "Invalid username and password" }
    }

    let token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "2h" });
    return { sessionToken: token, objectId: user._id }
}



module.exports = {
    register,
    login,
}