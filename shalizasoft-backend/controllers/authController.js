const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const db = require("../config/db");

// ======================
// EMAIL CONFIG
// ======================

const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS,
},
});

// ======================
// REGISTER
// ======================

exports.register = async (req, res) => {
try {
const { name, email, password } = req.body;


if (!name || !email || !password) {
  return res.status(400).json({
    message: "All fields are required",
  });
}

db.query(
  "SELECT * FROM users WHERE email = ?",
  [email],
  async (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (results.length > 0) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    db.query(
      `
      INSERT INTO users
      (
        name,
        email,
        password,
        subscription_type
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        name,
        email,
        hashedPassword,
        "FREE",
      ],
      (err) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.status(201).json({
          message:
            "User registered successfully",
        });
      }
    );
  }
);


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// ======================
// LOGIN
// ======================

exports.login = (req, res) => {
const { email, password } = req.body;

db.query(
"SELECT * FROM users WHERE email = ?",
[email],
async (err, results) => {
if (err) {
return res.status(500).json(err);
}


  if (results.length === 0) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  const user = results[0];

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET ||
      "SECRET_KEY_123",
    {
      expiresIn: "1d",
    }
  );

  res.json({
    message: "Login Successful",
    token,

    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      subscription_type:
        user.subscription_type,
      subscription_expiry:
        user.subscription_expiry,
    },
  });
}


);
};

// ======================
// FORGOT PASSWORD
// ======================
exports.forgotPassword = (req, res) => {
const { email } = req.body;

db.query(
"SELECT * FROM users WHERE email = ?",
[email],
async (err, result) => {
try {
if (err) {
return res.status(500).json(err);
}


    if (result.length === 0) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    const user = result[0];

    const resetToken =
      crypto.randomBytes(32).toString("hex");

    const expiry = new Date(
      Date.now() + 3600000
    );

    db.query(
      `
      UPDATE users
      SET
        reset_token = ?,
        reset_token_expiry = ?
      WHERE id = ?
      `,
      [
        resetToken,
        expiry,
        user.id,
      ],
      async (err2) => {

        if (err2) {
          return res.status(500).json(err2);
        }

        const resetLink =
          `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        console.log("EMAIL USER:", process.env.EMAIL_USER);
        console.log("RESET LINK:", resetLink);

        const info =
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject:
              "ShalizaSoft Password Reset",
            html: `
              <h2>Password Reset</h2>

              <p>Click below:</p>

              <a href="${resetLink}">
                Reset Password
              </a>

              <p>Valid for 1 hour.</p>
            `,
          });

        console.log(
          "EMAIL SENT SUCCESSFULLY"
        );
        console.log(info);

        res.json({
          message:
            "Reset email sent successfully",
        });
      }
    );
  } catch (error) {
    console.log(
      "EMAIL ERROR:"
    );
    console.log(error);

    return res.status(500).json({
      message:
        "Email sending failed",
      error:
        error.message,
    });
  }
}


);
};


// ======================
// RESET PASSWORD
// ======================

exports.resetPassword = async (
req,
res
) => {
const { token } = req.params;
const { password } = req.body;

const hashedPassword =
await bcrypt.hash(password, 10);

db.query(
`     SELECT *
    FROM users
    WHERE
      reset_token = ?
      AND reset_token_expiry > NOW()
    `,
[token],
(err, result) => {
if (err) {
return res.status(500).json(err);
}


  if (result.length === 0) {
    return res.status(400).json({
      message:
        "Invalid or expired token",
    });
  }

  const user = result[0];

  db.query(
    `
    UPDATE users
    SET
      password = ?,
      reset_token = NULL,
      reset_token_expiry = NULL
    WHERE id = ?
    `,
    [
      hashedPassword,
      user.id,
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message:
          "Password updated successfully",
      });
    }
  );
}


);
};
