const bcrypt = require("bcryptjs")
const db = require("../database/db.json")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config();


const signin = async (req, res) => {
    const { email, password } = req.body;
    console.log(password)
    if (!email || !password) {
        return res.sendStatus(400);
    }

    const userIndex = db.users.findIndex((value) => value.email === email)

    if (userIndex === -1) {
        return res.sendStatus(404);
    }
    console.log(db.users[userIndex])
    const newpassword = await bcrypt.compare(
        password, db.users[userIndex].hashedpassword
    );

    if (!newpassword) {
        return res.status().json({ error: "Invalid credentials" })
    }

    const payload = {
        id: db.users[userIndex].id,
        email: db.students[userIndex].email,
    }

    const token = jwt.sign(payload, { expireIn: "1m" }, process.env.SECRET)
    res.status(200).json({ status: "OK", data: { access_token: token } })

}

module.exports = { signin }