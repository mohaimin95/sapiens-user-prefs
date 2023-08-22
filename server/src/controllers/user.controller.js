const User = require("../models/User");
const BcryptService = require("../utils/bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
    static async login(req, res) {
        try {
            const { username, password } = req.body;
            if (!username?.trim() || !password) {
                return res.status(400).send({ message: "Missing username/password!" });
            }
            const user = await User.findOne({ username: username?.toLowerCase().trim() }).select("+password");
            if (!user) return res.status(401).send({ message: "Invalid credentials!" });
            const isVerified = await BcryptService.compareHash(password, user.password);
            if (!isVerified) return res.status(401).send({ message: "Invalid credentials!" });
            jwt.sign({
                id: user._id,
            }, process.env.JWT_KEY, {
                algorithm: 'HS256',
            }, (err, token) => {
                if (err) return res.status(500).send({ message: "Something went wrong!" });
                res.cookie('authToken', `Bearer ${token}`, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                });
                res.send({
                    message: "Success!"
                })
            })

        } catch (ex) {
            return res.status(500).send({ message: "Something went wrong!" })
        }
    }
    static async register(req, res) {
        try {
            const { username, password } = req.body;
            if (!username?.trim() || !password) {
                return res.status(400).send({ message: "Missing username/password!" });
            }

            const user = await User.findOne({ username: username?.trim()?.toLowerCase() }, { username: 1 })

            if (user) {
                return res.status(409).send({
                    message: 'Username already exists',
                });
            }
            const pwdHash = await BcryptService.createHash(password);
            const newUser = await new User({
                username,
                password: pwdHash,
            }).save();
            jwt.sign({
                id: newUser._id,
            }, process.env.JWT_KEY, {
                algorithm: 'HS256',
            }, (err, token) => {
                if (err) return res.status(500).send({ message: "Something went wrong!" });
                res.cookie('authToken', `Bearer ${token}`, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                });
                res.status(201).send({
                    message: "Success!"
                })
            })
        } catch (err) {
            console.log(err);
            res
                .status(500)
                .send({ message: "Something went wrong!" });
        }
    }

    // static async update(req, res) {
    //     const {} = req
    // }
    static async get(req, res) {
        try {
            const user = await User.findById(req?.user?.id);
            if (!user) return res.status(404).send({ message: "User is deleted!" });
            res.send({ user })
        } catch (ex) {
            res.status(500).send({ message: "Something went wrong!" })
        }
    }
    static async update(req, res) {
        try {
            if (req?.body?.preferences) {
                await User.updateOne({ _id: req?.user?.id }, { $set: { preferences: req.body.preferences } }, { runValidators: true });
            }
            res.send({ message: "Success!" })
        } catch (ex) {
            res.status(400).send({ message: ex.message })
        }
    }

    static async logout(req, res) {
        try {
            res.clearCookie('authToken', { httpOnly: true }).send({ message: 'Logged out successfully' });
        } catch (ex) {
            res.status(500).send({ message: 'Something went wrong!' });
        }
    }
}

module.exports = UserController