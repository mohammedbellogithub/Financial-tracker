const express = require("express");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const queryData = require("../../config/db");
const auth = require("../../middleware/auth");

const date = new Date();
const router = express.Router();

// @route  POST /api/user/auth/signUp
// @desc  Register user
// @access Public
router.post(
  "/signup",
  // Add User Validation
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Please include a password with minimum of six characters"
    ).isLength({ min: 8 })
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      // Check If Email is Unique
      const user = await queryData("SELECT * FROM users WHERE email = $1", [
        email
      ]);

      if (user[0]) {
        res.status(400).json({ errors: [{ msg: "Email already taken" }] });
      } else {
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const sealedPassword = await bcrypt.hash(password, salt);

        // Save User
        await queryData(
          `INSERT INTO users(user_id, full_name, email,pass_word,date_created) values(uuid_generate_v4(),$1,$2 , $3, $4)`,
          [name, email, sealedPassword, date]
        );

        // Generate Token
        const payload = {
          user: await queryData("SELECT user_id FROM users WHERE email = $1", [
            email
          ])
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 36000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);
// @route  POST /api/auth/signin
// @desc  Authenticate User and get token
// @access Public
router.post(
  "/signin",
  [
    check("email", "Please include a valid Email").isEmail(),
    check("password", "Password is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await queryData("SELECT * FROM users WHERE email = $1", [
        email
      ]);

      if (!user[0] || user.length < 1) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const isMatch = await bcrypt.compare(password, user[0].pass_word);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      // Generate Token
      const payload = {
        user: await queryData("SELECT user_id FROM users WHERE email = $1", [
          email
        ])
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route  GET api/auth/signin
// @desc  Get authenticated user
// @access Private
router.get("/signin", auth, async (req, res) => {
  try {
    const user = await queryData(
      "SELECT user_id,full_name,email,date_created FROM users WHERE user_id = $1",
      [req.user]
    );
    if (user === "") {
      res.status(400).json({ msg: "Not a Valid User" });
    }
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
});

// @route  DELETE api/auth/
// @desc DELETE authenticated user
// @access Private
router.delete("/", auth, async (req, res) => {
  try {
    await queryData("DELETE FROM users WHERE user_id = $1", [req.user]);
    res.json({ msg: "User Deleted" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
