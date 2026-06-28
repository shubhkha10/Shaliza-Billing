const db = require("../config/db");

exports.sendContactMessage = (req, res) => {
  const userId = req.user?.id || null;

  const { name, email, subject, message } = req.body;

  if (!message) {
    return res.status(400).json({
      message: "Message is required",
    });
  }

  db.query(
    `INSERT INTO contact_messages
    (user_id, name, email, subject, message)
    VALUES (?, ?, ?, ?, ?)`,
    [userId, name, email, subject, message],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Message sent successfully",
      });
    }
  );
};